/**
 * Invoice email sender — sends HTML invoices to clients via nodemailer.
 * Reuses the existing SMTP configuration from contact-mailer / password-reset-mailer.
 */

import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolve4 = promisify(dns.resolve4);

const SMTP_HOST = process.env.CONTACT_SMTP_HOST || '';
const SMTP_PORT = Number(process.env.CONTACT_SMTP_PORT || 587);
const SMTP_USER = process.env.CONTACT_SMTP_USER || '';
const SMTP_PASS = process.env.CONTACT_SMTP_PASSWORD || '';
const SMTP_SECURE =
  (process.env.CONTACT_SMTP_SECURE || '').toLowerCase() === 'true' || SMTP_PORT === 465;
const EMAIL_FROM =
  process.env.INVOICE_EMAIL_FROM || process.env.CONTACT_EMAIL_FROM || `Shree Gauli <${SMTP_USER}>`;

async function getTransporter() {
  let host = SMTP_HOST;

  if (SMTP_HOST === 'smtp.gmail.com') {
    const GMAIL_IPS = ['142.251.163.108', '142.251.163.109', '173.194.76.108', '173.194.76.109'];
    host = GMAIL_IPS[Math.floor(Math.random() * GMAIL_IPS.length)];
  } else {
    try {
      const ips = await resolve4(SMTP_HOST);
      if (ips.length > 0) host = ips[0];
    } catch {
      /* fallback to hostname */
    }
  }

  return nodemailer.createTransport({
    host,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { servername: SMTP_HOST },
  });
}

interface SendInvoiceEmailOpts {
  to: string;
  invoiceNumber: string;
  clientName: string;
  total: string;           // formatted, e.g. "$1,500.00"
  dueDate: string;         // formatted date
  invoiceHtml: string;     // Full HTML invoice document
  paymentLink?: string;
}

/**
 * Send an invoice email with the HTML invoice embedded in the body.
 */
export async function sendInvoiceEmail(opts: SendInvoiceEmailOpts): Promise<void> {
  if (!SMTP_HOST || !SMTP_USER) {
    console.warn('[Invoice Email] SMTP not configured — skipping email send');
    return;
  }

  const transporter = await getTransporter();

  const subject = `Invoice ${opts.invoiceNumber} — ${opts.total} due ${opts.dueDate}`;

  // Plain text fallback
  const textBody = [
    `Hi ${opts.clientName},`,
    '',
    `Please find your invoice ${opts.invoiceNumber} for ${opts.total}.`,
    `Due date: ${opts.dueDate}`,
    '',
    opts.paymentLink ? `Pay now: ${opts.paymentLink}` : '',
    '',
    'If you have any questions, please reply to this email.',
    '',
    'Best regards,',
    'Shree Krishna Gauli',
    'shreegauli.com',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: opts.to,
    subject,
    text: textBody,
    html: opts.invoiceHtml,
  });

  console.log(`[Invoice Email] Sent ${opts.invoiceNumber} to ${opts.to}`);
}

/**
 * Send a payment reminder email for overdue invoices.
 */
export async function sendPaymentReminder(opts: {
  to: string;
  invoiceNumber: string;
  clientName: string;
  total: string;
  dueDate: string;
  daysOverdue: number;
  paymentLink?: string;
}): Promise<void> {
  if (!SMTP_HOST || !SMTP_USER) return;

  const transporter = await getTransporter();

  const subject = `Payment Reminder: Invoice ${opts.invoiceNumber} is ${opts.daysOverdue} day${opts.daysOverdue > 1 ? 's' : ''} overdue`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);padding:24px 32px;border-radius:12px 12px 0 0;color:#fff;">
        <h2 style="margin:0;font-size:20px;">Payment Reminder</h2>
      </div>
      <div style="padding:24px 32px;background:#fff;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p>Hi ${opts.clientName},</p>
        <p>This is a friendly reminder that invoice <strong>${opts.invoiceNumber}</strong> for <strong>${opts.total}</strong> was due on <strong>${opts.dueDate}</strong> and is now <strong>${opts.daysOverdue} day${opts.daysOverdue > 1 ? 's' : ''} overdue</strong>.</p>
        ${
          opts.paymentLink
            ? `<p style="text-align:center;margin:24px 0;">
                <a href="${opts.paymentLink}" style="display:inline-block;padding:12px 36px;background:#7c3aed;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Pay Now</a>
              </p>`
            : ''
        }
        <p>If you've already made this payment, please disregard this notice.</p>
        <p>Best regards,<br/>Shree Krishna Gauli</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: opts.to,
    subject,
    text: `Hi ${opts.clientName}, Invoice ${opts.invoiceNumber} for ${opts.total} is ${opts.daysOverdue} days overdue. ${opts.paymentLink || ''}`,
    html,
  });

  console.log(`[Invoice Reminder] Sent reminder for ${opts.invoiceNumber} to ${opts.to}`);
}
