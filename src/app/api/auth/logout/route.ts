import { NextResponse } from 'next/server';
import { clearAppAuthCookies } from '@/lib/app-session';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 });
  clearAppAuthCookies(response);

  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}
