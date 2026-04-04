import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createAppAuthToken, serializeAppUser, setAppAuthCookie } from '@/lib/app-session';
import { hashPassword } from '@/lib/password';
import {
  createSupabaseAdminClient,
  findSupabaseUserByEmail,
  isSupabaseConfigured,
} from '@/lib/supabase';
import { syncAppUser } from '@/lib/user-sync';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const existingLocalUser = await prisma.user.findUnique({ where: { email } });
    if (existingLocalUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    if (isSupabaseConfigured()) {
      const existingSupabaseUser = await findSupabaseUserByEmail(email);
      if (existingSupabaseUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      const supabaseAdmin = createSupabaseAdminClient();
      const { error } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        password,
        user_metadata: {
          name,
        },
      });

      if (error) {
        console.error('[SIGNUP] Supabase create user error:', error);
        return NextResponse.json({ error: error.message || 'Signup failed' }, { status: 500 });
      }
    }

    const passwordHash = await hashPassword(password);
    const user = await syncAppUser({
      email,
      name,
      passwordHash,
    });

    const token = createAppAuthToken(user);
    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: serializeAppUser(user),
      },
      { status: 201 }
    );

    setAppAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('[SIGNUP] Unhandled error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
