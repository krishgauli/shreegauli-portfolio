import { NextRequest, NextResponse } from 'next/server';
import { otpStore } from '@/lib/otp-store';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (typeof body.email === 'string' ? body.email.trim() : '').toLowerCase();
    const code = typeof body.code === 'string' ? body.code.trim() : '';

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!code || code.length !== 6) {
      return NextResponse.json({ error: 'A 6-digit code is required' }, { status: 400 });
    }

    const stored = otpStore.get(email);

    if (!stored) {
      return NextResponse.json({ error: 'No verification code found. Please request a new one.' }, { status: 400 });
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email);
      return NextResponse.json({ error: 'Code expired. Please request a new one.' }, { status: 400 });
    }

    if (stored.code !== code) {
      return NextResponse.json({ error: 'Invalid code. Please check and try again.' }, { status: 400 });
    }

    // Mark as verified (keep in store for the contact-lead submission to check)
    otpStore.set(email, { ...stored, verified: true });

    // Auto-cleanup after 10 minutes
    setTimeout(() => {
      otpStore.delete(email);
    }, 10 * 60 * 1000);

    return NextResponse.json({ message: 'Email verified successfully', verified: true }, { status: 200 });
  } catch (error) {
    console.error('OTP verify error:', error);
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 });
  }
}
