import type { ContactLead } from '@prisma/client';
import nodemailer from 'nodemailer';

const CONTACT_SMTP_HOST = process.env.CONTACT_SMTP_HOST || process.env.SMTP_HOST || '';
const CONTACT_SMTP_PORT = Number(process.env.CONTACT_SMTP_PORT || process.env.SMTP_PORT || 587);
const CONTACT_SMTP_USER = process.env.CONTACT_SMTP_USER || process.env.SMTP_USER || '';
const CONTACT_SMTP_PASSWORD = process.env.CONTACT_SMTP_PASSWORD || process.env.SMTP_PASSWORD || '';
const CONTACT_SMTP_SECURE =
  (process.env.CONTACT_SMTP_SECURE || process.env.SMTP_SECURE || '').toLowerCase() === 'true' ||
  CONTACT_SMTP_PORT === 465;
const CONTACT_NOTIFICATION_RECIPIENTS = parseRecipients(
  process.env.CONTACT_NOTIFICATION_RECIPIENTS
);
const CONTACT_EMAIL_FROM =
  process.env.CONTACT_EMAIL_FROM ||
  process.env.SMTP_FROM ||
  `Shree Gauli <${CONTACT_SMTP_USER}>`;
const CONTACT_REPLY_TO = process.env.CONTACT_REPLY_TO || CONTACT_SMTP_USER;

type ContactEmailStatus = {
  confirmationSent: boolean;
  notificationSent: boolean;
  errors: string[];
};

function parseRecipients(value?: string) {
  const parsed = (value || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : CONTACT_SMTP_USER ? [CONTACT_SMTP_USER] : [];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatLeadField(label: string, value?: string | null) {
  if (!value) return '';

  return `
    <tr>
      <td style="padding: 10px 0; color: #64748b; font-weight: 600; vertical-align: top; width: 180px;">${escapeHtml(label)}</td>
      <td style="padding: 10px 0; color: #0f172a;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function getTransporter() {
  if (!isContactMailerConfigured()) {
    throw new Error(
      'Contact mailer is not configured. Missing CONTACT_SMTP_HOST, CONTACT_SMTP_USER, or CONTACT_SMTP_PASSWORD.'
    );
  }

  return nodemailer.createTransport({
    host: CONTACT_SMTP_HOST,
    port: CONTACT_SMTP_PORT,
    secure: CONTACT_SMTP_SECURE,
    auth: {
      user: CONTACT_SMTP_USER,
      pass: CONTACT_SMTP_PASSWORD,
    },
  });
}

function getLeadNotificationHtml(lead: ContactLead) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed; font-weight: 700;">New Lead</p>
        <h1 style="margin: 0 0 12px; font-size: 28px; color: #0f172a;">${escapeHtml(lead.name)} just submitted the site form</h1>
        <p style="margin: 0 0 24px; color: #475569; line-height: 1.6;">
          A new inquiry came in from <strong>${escapeHtml(lead.email)}</strong>. You can reply directly to this email to continue the conversation.
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          ${formatLeadField('Submitted', formatDate(lead.createdAt))}
          ${formatLeadField('Email', lead.email)}
          ${formatLeadField('Phone', lead.phone)}
          ${formatLeadField('Business / Brand', lead.businessType)}
          ${formatLeadField('Budget', lead.budget)}
          ${formatLeadField('Source', lead.source)}
          ${formatLeadField('Message', lead.message)}
        </table>
      </div>
    </div>
  `;
}

function getLeadNotificationText(lead: ContactLead) {
  return [
    `${lead.name} submitted the site form.`,
    '',
    `Submitted: ${formatDate(lead.createdAt)}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.businessType ? `Business / Brand: ${lead.businessType}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.source ? `Source: ${lead.source}` : null,
    lead.message ? `Message: ${lead.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function getLeadConfirmationHtml(lead: ContactLead) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed; font-weight: 700;">Thanks for reaching out</p>
        <h1 style="margin: 0 0 12px; font-size: 28px; color: #0f172a;">Hi ${escapeHtml(lead.name)}, your message is in.</h1>
        <p style="margin: 0 0 16px; color: #475569; line-height: 1.7;">
          Thanks for contacting Shree Gauli. I received your inquiry and will get back to you as soon as possible, usually within one business day.
        </p>
        ${
          lead.message
            ? `<div style="margin: 24px 0; padding: 20px; border-radius: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
                 <p style="margin: 0 0 8px; color: #475569; font-weight: 600;">Your message</p>
                 <p style="margin: 0; color: #0f172a; line-height: 1.7;">${escapeHtml(lead.message)}</p>
               </div>`
            : ''
        }
        <p style="margin: 0; color: #475569; line-height: 1.7;">
          If your request is urgent, you can reply to this email and it will come straight through.
        </p>
      </div>
    </div>
  `;
}

function getLeadConfirmationText(lead: ContactLead) {
  return [
    `Hi ${lead.name},`,
    '',
    'Thanks for contacting Shree Gauli. I received your inquiry and will get back to you as soon as possible, usually within one business day.',
    lead.message ? '' : null,
    lead.message ? `Your message: ${lead.message}` : null,
    '',
    'If your request is urgent, simply reply to this email.',
  ]
    .filter(Boolean)
    .join('\n');
}

export function isContactMailerConfigured() {
  return Boolean(CONTACT_SMTP_HOST && CONTACT_SMTP_USER && CONTACT_SMTP_PASSWORD);
}

export async function sendContactLeadEmails(lead: ContactLead): Promise<ContactEmailStatus> {
  const transporter = getTransporter();

  const [notificationResult, confirmationResult] = await Promise.allSettled([
    transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_NOTIFICATION_RECIPIENTS,
      replyTo: lead.email,
      subject: `New lead from ${lead.name}`,
      html: getLeadNotificationHtml(lead),
      text: getLeadNotificationText(lead),
    }),
    transporter.sendMail({
      from: CONTACT_EMAIL_FROM,
      to: lead.email,
      replyTo: CONTACT_REPLY_TO,
      subject: 'We received your message',
      html: getLeadConfirmationHtml(lead),
      text: getLeadConfirmationText(lead),
    }),
  ]);

  const errors = [
    notificationResult.status === 'rejected' ? notificationResult.reason : null,
    confirmationResult.status === 'rejected' ? confirmationResult.reason : null,
  ]
    .filter(Boolean)
    .map((error) => (error instanceof Error ? error.message : 'Unknown email delivery error'));

  return {
    confirmationSent: confirmationResult.status === 'fulfilled',
    notificationSent: notificationResult.status === 'fulfilled',
    errors,
  };
}
