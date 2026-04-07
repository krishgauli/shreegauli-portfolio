import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/lib/prisma';


export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      // Always return success to prevent email enumeration
      return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    if (!user) {
      // Don't reveal whether the email exists
      return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' });
    }

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    // Build reset URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
      || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // Email sending removed — token saved in DB for manual reset if needed
    return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
