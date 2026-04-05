import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);

const SMTP_HOST = process.env.CONTACT_SMTP_HOST || '';
const SMTP_PORT = Number(process.env.CONTACT_SMTP_PORT || 587);
const SMTP_USER = process.env.CONTACT_SMTP_USER || '';
const SMTP_PASS = process.env.CONTACT_SMTP_PASSWORD || '';
const SMTP_SECURE = (process.env.CONTACT_SMTP_SECURE || '').toLowerCase() === 'true' || SMTP_PORT === 465;
const EMAIL_FROM = process.env.CONTACT_EMAIL_FROM || `Shree Gauli <${SMTP_USER}>`;

async function getTransporter() {
  const GMAIL_IPS = ['142.251.163.108', '142.251.163.109', '173.194.76.108', '173.194.76.109'];
  let host = SMTP_HOST;

  if (SMTP_HOST === 'smtp.gmail.com') {
    host = GMAIL_IPS[Math.floor(Math.random() * GMAIL_IPS.length)];
  } else {
    try {
      const ips = await resolve4(SMTP_HOST);
      if (ips.length > 0) host = ips[0];
    } catch { /* fallback to hostname */ }
  }

  return nodemailer.createTransport({
    host,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { servername: SMTP_HOST },
  });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function sendPasswordResetEmail(email: string, name: string, resetUrl: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP not configured — cannot send password reset email');
  }

  const transporter = await getTransporter();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#070B14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#070B14;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;background-color:#0F172A;border-radius:16px;border:1px solid rgba(255,255,255,0.08);overflow:hidden;">
        <!-- Header -->
        <tr><td style="padding:32px 32px 0;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#F8FAFC;">
            Shree<span style="color:#7C3AED;">.</span>
          </p>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding:24px 32px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#F8FAFC;">Reset your password</h1>
          <p style="margin:0 0 24px;font-size:14px;color:#94A3B8;line-height:1.6;">
            Hi ${escapeHtml(name)}, we received a request to reset your password.
            Click the button below to choose a new one. This link expires in <strong style="color:#E2E8F0;">1 hour</strong>.
          </p>

          <a href="${resetUrl}" style="display:inline-block;background-color:#7C3AED;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 32px;border-radius:12px;">
            Reset Password
          </a>

          <p style="margin:24px 0 0;font-size:13px;color:#64748B;line-height:1.6;">
            If you didn't request this, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 32px;">
          <div style="border-top:1px solid rgba(255,255,255,0.06);"></div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px 32px;">
          <p style="margin:0;font-size:12px;color:#475569;line-height:1.5;">
            Can't click the button? Copy and paste this link:<br>
            <a href="${resetUrl}" style="color:#7C3AED;word-break:break-all;">${resetUrl}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: 'Reset your password — Shree Gauli',
    html,
  });
}
