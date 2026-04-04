import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, hashPassword } from '@/lib/password';
import { requireAuthenticatedUser } from '@/lib/auth';
import {
  createSupabaseAuthClient,
  ensureSupabasePasswordUser,
  isSupabaseConfigured,
} from '@/lib/supabase';
import { SUPABASE_PASSWORD_PLACEHOLDER } from '@/lib/user-sync';

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if ('response' in auth) return auth.response;

    return NextResponse.json({
      hasPassword:
        !!auth.user.password && auth.user.password !== SUPABASE_PASSWORD_PLACEHOLDER,
      role: auth.user.role,
    });
  } catch (error) {
    console.error('Get password settings error:', error);
    return NextResponse.json({ error: 'Failed to load password settings' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireAuthenticatedUser(req);
    if ('response' in auth) return auth.response;

    const body = await req.json();
    const currentPassword =
      typeof body.currentPassword === 'string' ? body.currentPassword : '';
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
    const confirmPassword =
      typeof body.confirmPassword === 'string' ? body.confirmPassword : '';

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'All password fields are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New password and confirmation do not match' },
        { status: 400 }
      );
    }

    let currentValid = false;

    if (isSupabaseConfigured()) {
      const supabase = createSupabaseAuthClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: auth.user.email,
        password: currentPassword,
      });
      currentValid = !error;
    }

    if (!currentValid) {
      currentValid = await verifyPassword(currentPassword, auth.user.password || '');
    }

    if (!currentValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      try {
        await ensureSupabasePasswordUser({
          email: auth.user.email,
          name: auth.user.name,
          password: newPassword,
        });
      } catch (supabaseError) {
        console.error('Supabase password update error:', supabaseError);
        return NextResponse.json(
          { error: 'Failed to update password in Supabase' },
          { status: 500 }
        );
      }
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: auth.user.id },
      data: { password: hashed },
    });

    return NextResponse.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Update password error:', error);
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}
