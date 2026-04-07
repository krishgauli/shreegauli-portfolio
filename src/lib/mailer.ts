/**
 * Gmail SMTP mailer — sends notification emails on form submissions.
 *
 * Env vars (set in Vercel):
 *   SMTP_USER          — Gmail address (e.g. hello@shreegauli.com)
 *   SMTP_APP_PASSWORD   — Gmail App Password (16-char)
 *   SMTP_ADMIN_EMAIL   — (optional) override admin recipient; defaults to SMTP_USER
 */

import nodemailer from 'nodemailer';

/* ── Config ───────────────────────────────────────────────────────── */

const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD || '';
const ADMIN_EMAIL = process.env.SMTP_ADMIN_EMAIL || SMTP_USER;
const SITE_URL = process.env.APP_URL || 'https://shreegauli.com';
const BRAND = {
  name: 'Shree Krishna Gauli',
  tagline: 'Digital Marketing Consultant',
  email: SMTP_USER || 'hello@shreegauli.com',
  address: '3001 Skyway Cir N, Irving, TX 75038',
  phone: '972-848-1153',
  url: SITE_URL,
  linkedin: 'https://www.linkedin.com/in/gauli/',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
};

/* ── Transporter (singleton) ──────────────────────────────────────── */

let _transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (_transporter) return _transporter;
  _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD },
  });
  return _transporter;
}

export function isMailerConfigured() {
  return Boolean(SMTP_USER && SMTP_APP_PASSWORD);
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}

/* ── Shared email shell ───────────────────────────────────────────── */

function emailShell(bodyHtml: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shree Krishna Gauli</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

<!-- Header -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
  <tr>
    <td align="center" style="padding:28px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:14px;vertical-align:middle;">
            <!-- Brand icon – purple gradient circle -->
            <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#a855f7);display:inline-block;"></div>
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">${esc(BRAND.name.toUpperCase())}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<!-- Body -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
  <tr>
    <td align="center" style="padding:32px 16px 48px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
        <tr>
          <td style="padding:40px 36px 32px;">
            ${bodyHtml}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<!-- Help bar -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
  <tr>
    <td align="center" style="padding:0 16px 24px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td align="center" style="padding:0 0 16px;">
            <p style="margin:0;font-size:14px;color:#64748b;">Questions? Reply to this email or call us &mdash; happy to help.</p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0 0 24px;">
            <a href="mailto:${esc(BRAND.email)}" style="font-size:14px;color:#0f172a;text-decoration:underline;">✉ ${esc(BRAND.email)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<!-- Footer -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
  <tr>
    <td align="center" style="padding:0 16px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-top:1px solid #e2e8f0;">
        <tr>
          <td align="center" style="padding:24px 0 8px;">
            <!-- Social icons -->
            <a href="${esc(BRAND.facebook)}" style="display:inline-block;margin:0 6px;width:40px;height:40px;border-radius:50%;background:#0f172a;text-align:center;line-height:40px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">f</a>
            <a href="${esc(BRAND.instagram)}" style="display:inline-block;margin:0 6px;width:40px;height:40px;border-radius:50%;background:#0f172a;text-align:center;line-height:40px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">✿</a>
            <a href="${esc(BRAND.linkedin)}" style="display:inline-block;margin:0 6px;width:40px;height:40px;border-radius:50%;background:#0f172a;text-align:center;line-height:40px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">in</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:12px 0 8px;">
            <a href="${esc(BRAND.url)}/terms" style="font-size:13px;color:#64748b;text-decoration:none;">Terms of Service</a>
            <span style="color:#cbd5e1;margin:0 8px;">•</span>
            <a href="${esc(BRAND.url)}/privacy" style="font-size:13px;color:#64748b;text-decoration:none;">Privacy Policy</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:16px 0 32px;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">© ${new Date().getFullYear()} ${esc(BRAND.name)} · ${esc(BRAND.address)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

/* ── Email templates ──────────────────────────────────────────────── */

interface LeadData {
  name: string;
  email: string;
  phone?: string | null;
  businessType?: string | null;
  budget?: string | null;
  message?: string | null;
  source?: string;
  createdAt?: Date;
}

function detailRow(label: string, value?: string | null) {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:10px 12px;color:#64748b;font-weight:600;font-size:14px;vertical-align:top;width:140px;border-bottom:1px solid #f1f5f9;">${esc(label)}</td>
      <td style="padding:10px 12px;color:#0f172a;font-size:14px;border-bottom:1px solid #f1f5f9;">${esc(value)}</td>
    </tr>`;
}

/**
 * User confirmation email — "Thanks for Reaching Out"
 */
function userConfirmationHtml(lead: LeadData) {
  const isBooking = lead.source === 'booking-page';

  return emailShell(`
    <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#0f172a;">Thanks for Reaching Out</h1>
    <p style="margin:0 0 28px;font-size:14px;color:#64748b;">Contact Form submission received</p>

    <p style="margin:0 0 16px;font-size:15px;color:#0f172a;line-height:1.6;">Hi ${esc(lead.name)},</p>
    <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.7;">
      Thank you for contacting ${esc(BRAND.name)}. Our team will review your message and reply shortly.
    </p>

    <p style="margin:0 0 12px;font-size:14px;color:#64748b;">We have received the details below:</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;margin:0 0 28px;">
      ${detailRow('Name', lead.name)}
      ${detailRow('Email', lead.email)}
      ${detailRow('Phone', lead.phone)}
      ${detailRow('Business', lead.businessType)}
      ${detailRow('Budget', lead.budget)}
      ${detailRow('Message', lead.message)}
      ${detailRow('Source', lead.source)}
    </table>

    ${isBooking ? `
    <div style="margin:0 0 28px;padding:16px 20px;border-radius:12px;background:#f0fdf4;border:1px solid #86efac;">
      <p style="margin:0;color:#15803d;font-weight:600;font-size:14px;">We'll send you a calendar invite shortly.</p>
    </div>` : ''}

    <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">
      If your request is urgent, you can reply directly to this email.
    </p>
  `);
}

/**
 * Admin notification email — "New Lead"
 */
function adminNotificationHtml(lead: LeadData) {
  const isBooking = lead.source === 'booking-page';
  const tagColor = isBooking ? '#06b6d4' : '#7c3aed';
  const tagText = isBooking ? 'NEW BOOKING REQUEST' : 'NEW LEAD';
  const heading = isBooking
    ? `${esc(lead.name)} wants to book a call`
    : `New inquiry from ${esc(lead.name)}`;

  return emailShell(`
    <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${tagColor};font-weight:700;">${tagText}</p>
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0f172a;">${heading}</h1>
    <p style="margin:0 0 28px;font-size:14px;color:#64748b;">Submitted ${formatDate(lead.createdAt || new Date())}</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;margin:0 0 28px;">
      ${detailRow('Name', lead.name)}
      ${detailRow('Email', lead.email)}
      ${detailRow('Phone', lead.phone)}
      ${detailRow('Business', lead.businessType)}
      ${detailRow('Budget', lead.budget)}
      ${detailRow('Source', lead.source)}
      ${detailRow('Message', lead.message)}
    </table>

    ${isBooking ? `
    <div style="margin:0 0 20px;padding:16px 20px;border-radius:12px;background:#ecfeff;border:1px solid #67e8f9;">
      <p style="margin:0;color:#0e7490;font-weight:600;font-size:14px;">Action: Send a calendar invite to ${esc(lead.email)}</p>
    </div>` : ''}

    <p style="margin:0;font-size:14px;color:#64748b;">Reply to this email to respond directly to the lead.</p>
  `);
}

/* ── Public API ────────────────────────────────────────────────────── */

export interface ContactEmailResult {
  userSent: boolean;
  adminSent: boolean;
  errors: string[];
}

/**
 * Send both admin notification + user confirmation emails for a contact lead.
 */
export async function sendContactEmails(lead: LeadData): Promise<ContactEmailResult> {
  if (!isMailerConfigured()) {
    return { userSent: false, adminSent: false, errors: ['SMTP not configured'] };
  }

  const transporter = getTransporter();
  const from = `${BRAND.name} <${SMTP_USER}>`;

  const [adminResult, userResult] = await Promise.allSettled([
    transporter.sendMail({
      from,
      to: ADMIN_EMAIL,
      replyTo: lead.email,
      subject: `New lead from ${lead.name}`,
      html: adminNotificationHtml(lead),
    }),
    transporter.sendMail({
      from,
      to: lead.email,
      replyTo: SMTP_USER,
      subject: 'Thanks for Reaching Out — Shree Krishna Gauli',
      html: userConfirmationHtml(lead),
    }),
  ]);

  const errors: string[] = [];
  if (adminResult.status === 'rejected') {
    errors.push(`Admin email failed: ${adminResult.reason instanceof Error ? adminResult.reason.message : 'Unknown'}`);
  }
  if (userResult.status === 'rejected') {
    errors.push(`User email failed: ${userResult.reason instanceof Error ? userResult.reason.message : 'Unknown'}`);
  }

  if (errors.length) console.error('[Mailer]', errors.join(' | '));

  return {
    adminSent: adminResult.status === 'fulfilled',
    userSent: userResult.status === 'fulfilled',
    errors,
  };
}
