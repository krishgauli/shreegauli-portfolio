import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getOtpTransporter, OTP_EMAIL_FROM } from '@/lib/otp-store';
import { otpStore } from '@/lib/otp-store';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (typeof body.email === 'string' ? body.email.trim() : '').toLowerCase();
    const name = typeof body.name === 'string' ? body.name.trim() : '';

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Rate limit: max 3 OTPs per email per 10 minutes
    const existing = otpStore.get(email);
    if (existing && existing.attempts >= 3 && Date.now() - existing.createdAt < 10 * 60 * 1000) {
      return NextResponse.json(
        { error: 'Too many attempts. Please wait a few minutes and try again.' },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP
    otpStore.set(email, {
      code,
      expiresAt,
      attempts: (existing?.attempts || 0) + 1,
      createdAt: existing?.createdAt || Date.now(),
      verified: false,
    });

    // Send OTP email
    const transporter = await getOtpTransporter();
    const displayName = name || 'there';

    await transporter.sendMail({
      from: OTP_EMAIL_FROM,
      to: email,
      subject: `${code} is your verification code`,
      html: `
        <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
          <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed; font-weight: 700;">Email Verification</p>
            <h1 style="margin: 0 0 8px; font-size: 28px; color: #0f172a;">Hi ${displayName.replace(/[<>"'&]/g, '')},</h1>
            <p style="margin: 0 0 24px; color: #475569; line-height: 1.7;">
              Use this code to verify your email address. It expires in 5 minutes.
            </p>
            <div style="margin: 0 auto 24px; padding: 20px 32px; background: #f1f5f9; border-radius: 16px; display: inline-block;">
              <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #7c3aed;">${code}</span>
            </div>
            <p style="margin: 0; color: #94a3b8; font-size: 13px;">
              If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        </div>
      `,
      text: `Your verification code is: ${code}\n\nThis code expires in 5 minutes.\n\nIf you didn't request this, please ignore this email.`,
    });

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json({ error: 'Failed to send verification code. Please try again.' }, { status: 500 });
  }
}
