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
  const isBooking = lead.source === 'booking-page';
  const tagColor = isBooking ? '#22d3ee' : '#7c3aed';
  const tagText = isBooking ? 'New Booking Request' : 'New Lead';
  const heading = isBooking
    ? `${escapeHtml(lead.name)} wants to book a call`
    : `${escapeHtml(lead.name)} just submitted the site form`;

  return `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: ${tagColor}; font-weight: 700;">${tagText}</p>
        <h1 style="margin: 0 0 12px; font-size: 28px; color: #0f172a;">${heading}</h1>
        <p style="margin: 0 0 24px; color: #475569; line-height: 1.6;">
          ${isBooking
            ? `A booking request came in from <strong>${escapeHtml(lead.email)}</strong>. Review the details below and send a calendar invite.`
            : `A new inquiry came in from <strong>${escapeHtml(lead.email)}</strong>. You can reply directly to this email to continue the conversation.`
          }
        </p>

        <table style="width: 100%; border-collapse: collapse;">
          ${formatLeadField('Submitted', formatDate(lead.createdAt))}
          ${formatLeadField('Email', lead.email)}
          ${formatLeadField('Phone', lead.phone)}
          ${formatLeadField('Business / Brand', lead.businessType)}
          ${formatLeadField('Budget', lead.budget)}
          ${formatLeadField('Source', lead.source)}
          ${formatLeadField(isBooking ? 'Booking Details' : 'Message', lead.message)}
        </table>

        ${isBooking ? `
        <div style="margin-top: 24px; padding: 16px; border-radius: 12px; background: #f0fdfa; border: 1px solid #99f6e4;">
          <p style="margin: 0; color: #0d9488; font-weight: 600; font-size: 14px;">Action needed: Send a Google Meet / Zoom calendar invite to ${escapeHtml(lead.email)}</p>
        </div>
        ` : ''}
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

/* ─── Newsletter subscription notification ─── */
export async function sendNewsletterNotification(email: string, source: string): Promise<boolean> {
  if (!isContactMailerConfigured()) return false;

  const transporter = getTransporter();

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #22d3ee; font-weight: 700;">New Subscriber</p>
        <h1 style="margin: 0 0 12px; font-size: 24px; color: #0f172a;">Someone just subscribed to the newsletter</h1>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 120px;">Email</td>
            <td style="padding: 10px 0; color: #0f172a;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Source</td>
            <td style="padding: 10px 0; color: #0f172a;">${escapeHtml(source)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Time</td>
            <td style="padding: 10px 0; color: #0f172a;">${formatDate(new Date())}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  const subscriberHtml = `
    <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 32px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e2e8f0;">
        <p style="margin: 0 0 8px; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #7c3aed; font-weight: 700;">Welcome</p>
        <h1 style="margin: 0 0 12px; font-size: 24px; color: #0f172a;">You&rsquo;re on the list!</h1>
        <p style="margin: 0 0 16px; color: #475569; line-height: 1.7;">
          Thanks for subscribing to Shree Gauli&rsquo;s newsletter. You&rsquo;ll receive occasional updates on digital marketing insights, SEO tips, and more.
        </p>
        <p style="margin: 0; color: #475569; line-height: 1.7;">
          If you ever want to unsubscribe, just reply to any email and let me know.
        </p>
      </div>
    </div>
  `;

  try {
    await Promise.allSettled([
      transporter.sendMail({
        from: CONTACT_EMAIL_FROM,
        to: CONTACT_NOTIFICATION_RECIPIENTS,
        replyTo: email,
        subject: `New newsletter subscriber: ${email}`,
        html: adminHtml,
        text: `New newsletter subscriber: ${email}\nSource: ${source}\nTime: ${formatDate(new Date())}`,
      }),
      transporter.sendMail({
        from: CONTACT_EMAIL_FROM,
        to: email,
        replyTo: CONTACT_REPLY_TO,
        subject: "You're subscribed — welcome!",
        html: subscriberHtml,
        text: "Thanks for subscribing to Shree Gauli's newsletter! You'll receive occasional updates on digital marketing insights, SEO tips, and more.",
      }),
    ]);
    return true;
  } catch (error) {
    console.error('Newsletter email notification error:', error);
    return false;
  }
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
