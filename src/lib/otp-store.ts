import dns from 'dns';
import nodemailer from 'nodemailer';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);

/* ─── In-memory OTP store ─── */
export interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
  verified: boolean;
}

export const otpStore = new Map<string, OtpEntry>();

// Periodic cleanup of expired entries (every 5 minutes)
if (typeof globalThis !== 'undefined') {
  const globalStore = globalThis as any;
  if (!globalStore.__otpCleanupInterval) {
    globalStore.__otpCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [email, entry] of otpStore.entries()) {
        // Remove entries older than 15 minutes
        if (now - entry.createdAt > 15 * 60 * 1000) {
          otpStore.delete(email);
        }
      }
    }, 5 * 60 * 1000);
  }
}

/* ─── Check if email is OTP-verified ─── */
export function isEmailVerified(email: string): boolean {
  const entry = otpStore.get(email.toLowerCase());
  return !!entry?.verified;
}

/* ─── SMTP Config (reuses contact mailer env vars) ─── */
const SMTP_HOST = process.env.CONTACT_SMTP_HOST || '';
const SMTP_PORT = Number(process.env.CONTACT_SMTP_PORT || 587);
const SMTP_USER = process.env.CONTACT_SMTP_USER || '';
const SMTP_PASSWORD = process.env.CONTACT_SMTP_PASSWORD || '';
const SMTP_SECURE =
  (process.env.CONTACT_SMTP_SECURE || '').toLowerCase() === 'true' || SMTP_PORT === 465;

export const OTP_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM || `Shree Gauli <${SMTP_USER}>`;

export async function getOtpTransporter() {
  const GMAIL_IPS = ['142.251.163.108', '142.251.163.109', '173.194.76.108', '173.194.76.109'];
  let host = SMTP_HOST;

  if (SMTP_HOST === 'smtp.gmail.com') {
    host = GMAIL_IPS[Math.floor(Math.random() * GMAIL_IPS.length)];
  } else {
    try {
      const ips = await resolve4(SMTP_HOST);
      if (ips.length > 0) host = ips[0];
    } catch {
      // Fall back to hostname
    }
  }

  return nodemailer.createTransport({
    host,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: {
      servername: SMTP_HOST,
    },
  });
}
