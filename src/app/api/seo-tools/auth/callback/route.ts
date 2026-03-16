import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getRedirectUri(req: NextRequest) {
  const configured = process.env.APP_URL?.trim();
  const base = configured || req.nextUrl.origin;
  return `${base}/api/seo-tools/auth/callback`;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/seo-tools?gsc=error', req.nextUrl.origin));
  }

  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const error = req.nextUrl.searchParams.get('error');
  const stateCookie = req.cookies.get('seo_gsc_state')?.value;

  if (error || !code || !state || !stateCookie || stateCookie !== state) {
    return NextResponse.redirect(new URL('/seo-tools?gsc=error', req.nextUrl.origin));
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getRedirectUri(req),
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData?.access_token) {
      return NextResponse.redirect(new URL('/seo-tools?gsc=error', req.nextUrl.origin));
    }

    const response = NextResponse.redirect(new URL('/seo-tools?gsc=connected', req.nextUrl.origin));
    response.cookies.delete('seo_gsc_state');
    response.cookies.set('seo_gsc_token', tokenData.access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.redirect(new URL('/seo-tools?gsc=error', req.nextUrl.origin));
  }
}
