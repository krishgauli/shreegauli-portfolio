import { NextRequest, NextResponse } from 'next/server';
import { createAppAuthToken, serializeAppUser, setAppAuthCookie } from '@/lib/app-session';
import {
  createSupabaseRouteClient,
  isSupabaseConfigured,
  mergeSupabaseCookies,
} from '@/lib/supabase';
import { syncAppUser } from '@/lib/user-sync';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

function htmlResponse(
  messageType: 'OAUTH_AUTH_SUCCESS' | 'OAUTH_AUTH_ERROR',
  payload: Record<string, unknown>
) {
  const targetOrigin = APP_URL;
  const message = JSON.stringify({ type: messageType, ...payload });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authentication</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f3f4f6; }
          .container { text-align: center; }
          .spinner { border: 4px solid #e5e7eb; border-top: 4px solid #3b82f6; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 20px; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          p { color: #666; margin: 10px 0; }
          button { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 20px; }
          button:hover { background: #2563eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <p>Connecting your account...</p>
          <p id="status" style="font-size: 14px; color: #999;"></p>
          <button onclick="closeSelf()">Close this window</button>
        </div>
        <script>
          (function () {
            var msg = ${JSON.stringify(message)};
            var parsed = JSON.parse(msg);
            var messageType = ${JSON.stringify(messageType)};

            function updateStatus(msg) {
              var statusEl = document.getElementById('status');
              if (statusEl) statusEl.textContent = msg;
            }

            function attemptClose() {
              try {
                window.close();
              } catch (e) {
                console.error('[OAuth Callback] window.close() error:', e);
              }
            }

            if (window.opener) {
              try {
                window.opener.postMessage(parsed, ${JSON.stringify(targetOrigin)});
                updateStatus('Connected! You can close this window...');
                setTimeout(function() {
                  attemptClose();
                }, 500);
              } catch (err) {
                try {
                  window.opener.postMessage(parsed, '*');
                  updateStatus('Connected! You can close this window...');
                  setTimeout(function() {
                    attemptClose();
                  }, 500);
                } catch (err2) {
                  updateStatus('Authentication complete. Please close this window.');
                  setTimeout(function() {
                    attemptClose();
                  }, 1000);
                }
              }
            } else {
              try {
                if (messageType === 'OAUTH_AUTH_SUCCESS') {
                  var role = (parsed.user && parsed.user.role) ? parsed.user.role : 'client';
                  var dashboardPath = role === 'admin' || role === 'super_admin' ? '/dashboard/admin' : '/dashboard/client';
                  updateStatus('Connected! Redirecting...');
                  setTimeout(function() {
                    window.location.replace(${JSON.stringify(targetOrigin)} + dashboardPath);
                  }, 250);
                } else {
                  var err = encodeURIComponent(parsed.error || 'Google login failed');
                  updateStatus('Authentication failed. Redirecting to login...');
                  setTimeout(function() {
                    window.location.replace(${JSON.stringify(targetOrigin)} + '/login?oauthError=' + err);
                  }, 250);
                }
              } catch (e) {
                updateStatus('Authentication complete. Please close this window.');
                setTimeout(function() {
                  attemptClose();
                }, 1000);
              }
            }
          })();

          function closeSelf() {
            window.close();
          }
        </script>
      </body>
    </html>
  `;
}

function htmlResponseResult(
  messageType: 'OAUTH_AUTH_SUCCESS' | 'OAUTH_AUTH_ERROR',
  payload: Record<string, unknown>,
  status = 200
) {
  return new NextResponse(htmlResponse(messageType, payload), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const oauthError = req.nextUrl.searchParams.get('error');

  if (oauthError) {
    return htmlResponseResult('OAUTH_AUTH_ERROR', {
      error: `Google OAuth error: ${oauthError}`,
    });
  }

  if (!code) {
    return htmlResponseResult('OAUTH_AUTH_ERROR', { error: 'Missing authorization code' }, 400);
  }

  if (!isSupabaseConfigured()) {
    return htmlResponseResult('OAUTH_AUTH_ERROR', {
      error: 'Supabase auth is not configured',
    });
  }

  try {
    const supabaseResponse = new NextResponse();
    const supabase = createSupabaseRouteClient(req, supabaseResponse);
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      throw exchangeError;
    }

    const {
      data: { user: identityUser },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !identityUser?.email) {
      throw userError || new Error('Google account email is unavailable');
    }

    const appUser = await syncAppUser({
      email: identityUser.email,
      name:
        typeof identityUser.user_metadata?.name === 'string'
          ? identityUser.user_metadata.name
          : null,
      avatar:
        typeof identityUser.user_metadata?.avatar_url === 'string'
          ? identityUser.user_metadata.avatar_url
          : null,
    });

    const token = createAppAuthToken(appUser);

    try {
      await supabase.auth.signOut();
    } catch (signOutError) {
      console.warn('[AUTH CALLBACK] Supabase signOut cleanup failed:', signOutError);
    }

    const response = htmlResponseResult('OAUTH_AUTH_SUCCESS', {
      token,
      user: serializeAppUser(appUser),
    });

    setAppAuthCookie(response, token);
    mergeSupabaseCookies(supabaseResponse, response);

    return response;
  } catch (error) {
    console.error('Auth callback error:', error);
    return htmlResponseResult('OAUTH_AUTH_ERROR', {
      error: error instanceof Error ? error.message : 'Google login failed',
    });
  }
}
