import { NextRequest, NextResponse } from 'next/server';
import { isMailerConfigured } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

async function requireAdminAuth(request: NextRequest) {
  const { requireAdmin } = await import('@/lib/auth');
  const auth = await requireAdmin(request);
  if ('response' in auth) return { error: auth.response };
  return { user: auth.user };
}

/**
 * POST /api/email-campaign
 * Sends campaign emails one-by-one to each selected lead.
 *
 * Body: { subject: string; bodyHtml: string; recipients: { name: string; email: string }[] }
 *
 * Returns per-recipient results so the UI can show progress.
 */
export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  if (!isMailerConfigured()) {
    return NextResponse.json(
      { success: false, error: 'Email SMTP is not configured. Set SMTP_USER and SMTP_APP_PASSWORD.' },
      { status: 500 },
    );
  }

  const body = await request.json();
  const { subject, bodyHtml, recipients } = body as {
    subject: string;
    bodyHtml: string;
    recipients: { name: string; email: string }[];
  };

  if (!subject?.trim()) {
    return NextResponse.json({ success: false, error: 'Subject is required' }, { status: 400 });
  }
  if (!bodyHtml?.trim()) {
    return NextResponse.json({ success: false, error: 'Email body is required' }, { status: 400 });
  }
  if (!recipients?.length) {
    return NextResponse.json({ success: false, error: 'Select at least one recipient' }, { status: 400 });
  }

  // Dynamic imports so cold starts stay lean
  const nodemailer = (await import('nodemailer')).default;

  const SMTP_USER = process.env.SMTP_USER || '';
  const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD || '';
  const SITE_URL = process.env.APP_URL || 'https://www.shreegauli.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: SMTP_USER, pass: SMTP_APP_PASSWORD },
  });

  const from = `"Shree Gauli" <${SMTP_USER}>`;

  // Build the full email HTML using the same shell template
  function esc(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /**
   * Convert plain-text body to styled HTML paragraphs.
   * If the input already contains HTML tags, pass it through unchanged.
   */
  function formatBody(raw: string): string {
    const hasHtml = /<\/?[a-z][\s\S]*?>/i.test(raw);
    if (hasHtml) return raw;

    // Split on double newlines → paragraphs; single newlines → <br>
    return raw
      .split(/\n\s*\n/)
      .map((para) => {
        const inner = para.trim().replace(/\n/g, '<br>');
        return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#334155;">${inner}</p>`;
      })
      .join('\n');
  }

  const BRAND = {
    name: 'Shree Gauli',
    email: SMTP_USER || 'hello@shreegauli.com',
    address: '3001 Skyway Cir N, Irving, TX 75038',
    linkedin: 'https://www.linkedin.com/in/gauli/',
    facebook: 'https://www.facebook.com/profile.php?id=61582408185149',
    url: SITE_URL,
  };

  function campaignEmailHtml(recipientName: string, htmlBody: string) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shree Gauli</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

<!-- Header -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;">
  <tr>
    <td align="center" style="padding:28px 24px;">
      <table role="presentation" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding-right:14px;vertical-align:middle;">
            <div style="width:40px;height:40px;border-radius:9999px;background:#7c3aed;color:#ffffff;font-weight:700;font-size:14px;line-height:40px;text-align:center;display:inline-block;">SG</div>
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:0.5px;">${esc(BRAND.name)}</span>
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
            <p style="margin:0 0 16px;font-size:16px;color:#0f172a;">Hi ${esc(recipientName)},</p>
            <div style="font-size:15px;line-height:1.7;color:#334155;">${htmlBody}</div>
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
            <a href="mailto:${esc(BRAND.email)}" style="font-size:14px;color:#0f172a;text-decoration:underline;">&#x2709; ${esc(BRAND.email)}</a>
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
            <a href="${esc(BRAND.facebook)}" style="display:inline-block;margin:0 6px;width:40px;height:40px;border-radius:50%;background:#0f172a;text-align:center;line-height:40px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">f</a>
            <a href="${esc(BRAND.linkedin)}" style="display:inline-block;margin:0 6px;width:40px;height:40px;border-radius:50%;background:#0f172a;text-align:center;line-height:40px;color:#ffffff;font-size:16px;font-weight:bold;text-decoration:none;">in</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:12px 0 8px;">
            <a href="${esc(BRAND.url)}/terms" style="font-size:13px;color:#64748b;text-decoration:none;">Terms of Service</a>
            <span style="color:#cbd5e1;margin:0 8px;">&bull;</span>
            <a href="${esc(BRAND.url)}/privacy" style="font-size:13px;color:#64748b;text-decoration:none;">Privacy Policy</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:16px 0 32px;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">&copy; ${new Date().getFullYear()} ${esc(BRAND.name)} &middot; ${esc(BRAND.address)}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
  }

  // Send emails sequentially (one-by-one) to avoid rate limits
  const results: { email: string; name: string; sent: boolean; error?: string }[] = [];

  for (const recipient of recipients) {
    try {
      await transporter.sendMail({
        from,
        to: recipient.email,
        replyTo: SMTP_USER,
        subject,
        html: campaignEmailHtml(recipient.name || 'there', formatBody(bodyHtml)),
      });
      results.push({ email: recipient.email, name: recipient.name, sent: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error(`[EmailCampaign] Failed to send to ${recipient.email}:`, msg);
      results.push({ email: recipient.email, name: recipient.name, sent: false, error: msg });
    }

    // Small delay between sends to be nice to Gmail rate limits
    if (recipients.indexOf(recipient) < recipients.length - 1) {
      await new Promise((r) => setTimeout(r, 1200));
    }
  }

  const sentCount = results.filter((r) => r.sent).length;
  const failedCount = results.filter((r) => !r.sent).length;

  return NextResponse.json({
    success: true,
    sentCount,
    failedCount,
    total: recipients.length,
    results,
  });
}
