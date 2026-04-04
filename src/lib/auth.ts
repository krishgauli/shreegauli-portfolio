import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAppAuthTokenFromRequest, verifyAppAuthToken } from '@/lib/app-session';

export function hasAdminAccess(role?: string | null): boolean {
  return role === 'admin' || role === 'super_admin';
}

export async function getAuthenticatedDbUser(req: NextRequest) {
  const token = getAppAuthTokenFromRequest(req);
  if (!token) return null;

  try {
    const decoded = verifyAppAuthToken(token) as { id?: string };
    if (!decoded?.id) return null;

    const dbUser = await prisma.user.findUnique({ where: { id: decoded.id } });
    return dbUser;
  } catch {
    return null;
  }
}

export async function requireAdmin(req: NextRequest): Promise<{ user: NonNullable<Awaited<ReturnType<typeof getAuthenticatedDbUser>>> } | { response: NextResponse }> {
  const user = await getAuthenticatedDbUser(req);

  if (!user) {
    return {
      response: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    };
  }

  if (!hasAdminAccess(user.role)) {
    return {
      response: NextResponse.json({ error: 'Admin access required' }, { status: 403 }),
    };
  }

  return { user };
}

export async function requireAuthenticatedUser(
  req: NextRequest
): Promise<
  | { user: NonNullable<Awaited<ReturnType<typeof getAuthenticatedDbUser>>> }
  | { response: NextResponse }
> {
  const user = await getAuthenticatedDbUser(req);

  if (!user) {
    return {
      response: NextResponse.json({ error: 'Not authenticated' }, { status: 401 }),
    };
  }

  return { user };
}
