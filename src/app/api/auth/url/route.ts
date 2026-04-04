import { NextRequest, NextResponse } from 'next/server';
import {
  createSupabaseRouteClient,
  isSupabaseConfigured,
  mergeSupabaseCookies,
} from '@/lib/supabase';

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: 'Supabase auth is not configured' }, { status: 500 });
    }

    const supabaseResponse = new NextResponse();
    const supabase = createSupabaseRouteClient(req, supabaseResponse);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${APP_URL}/api/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        skipBrowserRedirect: true,
      },
    });

    if (error || !data.url) {
      return NextResponse.json(
        { error: error?.message || 'Failed to create Google sign-in URL' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ url: data.url });
    mergeSupabaseCookies(supabaseResponse, response);
    return response;
  } catch (error) {
    console.error('Auth URL error:', error);
    return NextResponse.json({ error: 'Failed to get auth URL' }, { status: 500 });
  }
}
