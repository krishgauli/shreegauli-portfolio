import type { User as DbUser } from '@prisma/client';
import type { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const APP_AUTH_COOKIE = 'auth_token';

type AppTokenPayload = {
  email: string;
  id: string;
  name: string;
  role: string;
};

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set.');
  }

  return secret;
}

export function getUiRole(role?: string | null) {
  return role === 'super_admin' ? 'admin' : role || 'client';
}

export function createAppAuthToken(user: Pick<DbUser, 'email' | 'id' | 'name' | 'role'>) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: getUiRole(user.role),
    } satisfies AppTokenPayload,
    getJwtSecret(),
    { expiresIn: '7d' }
  );
}

export function verifyAppAuthToken(token: string) {
  return jwt.verify(token, getJwtSecret()) as AppTokenPayload;
}

export function getAppAuthTokenFromRequest(req: NextRequest) {
  return req.cookies.get(APP_AUTH_COOKIE)?.value || null;
}

export function setAppAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(APP_AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export function clearAppAuthCookies(response: NextResponse) {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    expires: new Date(0),
    path: '/',
  };

  response.cookies.set('session', '', cookieOptions);
  response.cookies.set(APP_AUTH_COOKIE, '', cookieOptions);
  response.cookies.set('token', '', cookieOptions);
  response.cookies.delete('session');
  response.cookies.delete(APP_AUTH_COOKIE);
  response.cookies.delete('token');
}

export function serializeAppUser(user: DbUser) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: getUiRole(user.role),
    avatar: user.avatar || null,
    plan: user.plan || null,
    planId: user.planId || null,
    stripeCustomerId: user.stripeCustomerId || null,
    stripeSubscriptionId: user.stripeSubscriptionId || null,
    subscriptionStatus: user.subscriptionStatus || null,
  };
}
