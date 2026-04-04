import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createAppAuthToken, serializeAppUser, setAppAuthCookie } from '@/lib/app-session';
import { hashPassword, isHashed, verifyPassword } from '@/lib/password';
import {
  createSupabaseAuthClient,
  ensureSupabasePasswordUser,
  isSupabaseConfigured,
} from '@/lib/supabase';
import { syncAppUser } from '@/lib/user-sync';

async function handleLegacyLogin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return null;
  }

  const passwordValid = await verifyPassword(password, user.password || '');
  if (!passwordValid) {
    return null;
  }

  if (user.password && !isHashed(user.password)) {
    const upgraded = await hashPassword(password);
    return syncAppUser({
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      passwordHash: upgraded,
    });
  }

  return user;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    let appUser = null;

    if (isSupabaseConfigured()) {
      const supabase = createSupabaseAuthClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        const localUser = await prisma.user.findUnique({ where: { email } });
        const passwordHash =
          !localUser || !localUser.password || !isHashed(localUser.password)
            ? await hashPassword(password)
            : undefined;

        appUser = await syncAppUser({
          email,
          name:
            localUser?.name ||
            (typeof data.user.user_metadata?.name === 'string'
              ? data.user.user_metadata.name
              : null),
          avatar:
            localUser?.avatar ||
            (typeof data.user.user_metadata?.avatar_url === 'string'
              ? data.user.user_metadata.avatar_url
              : null),
          passwordHash,
        });
      } else {
        const legacyUser = await handleLegacyLogin(email, password);

        if (legacyUser) {
          try {
            await ensureSupabasePasswordUser({
              email,
              name: legacyUser.name,
              password,
            });
          } catch (migrationError) {
            console.error('[LOGIN] Failed to migrate user to Supabase:', migrationError);
            return NextResponse.json(
              { error: 'Login succeeded locally, but account migration to Supabase failed.' },
              { status: 500 }
            );
          }

          appUser = legacyUser;
        }
      }
    } else {
      appUser = await handleLegacyLogin(email, password);
    }

    if (!appUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = createAppAuthToken(appUser);
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: serializeAppUser(appUser),
      },
      { status: 200 }
    );

    setAppAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
