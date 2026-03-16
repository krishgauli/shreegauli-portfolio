import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { hashPassword } from '@/lib/password';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is not set.');
  return secret;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Check existing user
    let user;
    try {
      const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
      if (existing) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }

      const hashedPw = await hashPassword(password);
      // Public signup always gets 'client' role — never trust a client-supplied role
      user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          password: hashedPw,
          name: name.trim(),
          role: 'client',
        },
      });
    } catch (dbError) {
      console.error('[SIGNUP] Database error:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: 'client' },
      getJwtSecret(),
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'client',
          avatar: user.avatar ?? null,
        },
      },
      { status: 201 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[SIGNUP] Unhandled error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
