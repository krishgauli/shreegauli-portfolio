/**
 * Invoice HTML generator — produces a professional invoice
 * that can be rendered in-browser or converted to PDF.
 *
 * Includes Payoneer payment link and business branding.
 */

export interface InvoiceLineItem {
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;       // formatted date string
  dueDate: string;
  // Business (from)
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessPhone?: string;
  // Client (to)
  clientName: string;
  clientEmail: string;
  clientCompany?: string;
  clientAddress?: string;
  // Items
  lineItems: InvoiceLineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  // Payment
  paymentLink?: string;
  paymentMethod?: string;
  // Notes
  notes?: string;
  status: string;
}

/**
 * Generates a complete self-contained HTML invoice document.
 */
export function generateInvoiceHtml(data: InvoiceData): string {
  const currencySymbol = data.currency === 'USD' ? '$' : data.currency;
  const fmt = (n: number) => `${currencySymbol}${n.toFixed(2)}`;
  const isPaid = data.status === 'paid';

  const lineItemRows = data.lineItems
    .map(
      (item) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${item.description}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.qty}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">${fmt(item.rate)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">${fmt(item.amount)}</td>
    </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice ${data.invoiceNumber}</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6;color:#1f2937;">
  <div style="max-width:680px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px 40px;color:#fff;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="vertical-align:top;">
            <h1 style="margin:0;font-size:28px;font-weight:700;color:#fff;">INVOICE</h1>
            <p style="margin:4px 0 0;opacity:0.85;font-size:14px;color:#fff;">${data.invoiceNumber}</p>
          </td>
          <td style="vertical-align:top;text-align:right;">
            <div style="font-size:20px;font-weight:700;color:#fff;">${data.businessName}</div>
            <div style="font-size:13px;opacity:0.85;margin-top:4px;color:#fff;">${data.businessEmail}</div>
            ${data.businessPhone ? `<div style="font-size:13px;opacity:0.85;color:#fff;">${data.businessPhone}</div>` : ''}
          </td>
        </tr>
      </table>
    </div>

    <!-- Status Badge + Dates -->
    <div style="padding:24px 40px;border-bottom:1px solid #e5e7eb;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td style="vertical-align:middle;">
            <span style="display:inline-block;padding:4px 14px;border-radius:20px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;${
              isPaid
                ? 'background:#d1fae5;color:#065f46;'
                : data.status === 'overdue'
                ? 'background:#fee2e2;color:#991b1b;'
                : 'background:#fef3c7;color:#92400e;'
            }">${data.status}</span>
          </td>
          <td style="vertical-align:middle;text-align:right;font-size:14px;color:#6b7280;">
            <div><strong>Issued:</strong> ${data.issueDate}</div>
            <div><strong>Due:</strong> ${data.dueDate}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Bill To -->
    <div style="padding:24px 40px;border-bottom:1px solid #e5e7eb;">
      <div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;margin-bottom:8px;">Bill To</div>
      <div style="font-size:16px;font-weight:600;">${data.clientName}</div>
      ${data.clientCompany ? `<div style="font-size:14px;color:#6b7280;">${data.clientCompany}</div>` : ''}
      <div style="font-size:14px;color:#6b7280;">${data.clientEmail}</div>
      ${data.clientAddress ? `<div style="font-size:14px;color:#6b7280;">${data.clientAddress}</div>` : ''}
    </div>

    <!-- Line Items Table -->
    <div style="padding:24px 40px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:10px 12px;text-align:left;font-weight:600;border-bottom:2px solid #e5e7eb;">Description</th>
            <th style="padding:10px 12px;text-align:center;font-weight:600;border-bottom:2px solid #e5e7eb;">Qty</th>
            <th style="padding:10px 12px;text-align:right;font-weight:600;border-bottom:2px solid #e5e7eb;">Rate</th>
            <th style="padding:10px 12px;text-align:right;font-weight:600;border-bottom:2px solid #e5e7eb;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${lineItemRows}
        </tbody>
      </table>

      <!-- Totals -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:20px;">
        <tr>
          <td>&nbsp;</td>
          <td style="width:260px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td style="padding:6px 0;font-size:14px;color:#6b7280;">Subtotal</td>
                <td style="padding:6px 0;font-size:14px;color:#6b7280;text-align:right;">${fmt(data.subtotal)}</td>
              </tr>
              ${
                data.taxRate > 0
                  ? `<tr>
                      <td style="padding:6px 0;font-size:14px;color:#6b7280;">Tax (${data.taxRate}%)</td>
                      <td style="padding:6px 0;font-size:14px;color:#6b7280;text-align:right;">${fmt(data.taxAmount)}</td>
                    </tr>`
                  : ''
              }
              <tr>
                <td style="padding:12px 0;font-size:18px;font-weight:700;border-top:2px solid #1f2937;">Total</td>
                <td style="padding:12px 0;font-size:18px;font-weight:700;border-top:2px solid #1f2937;text-align:right;">${fmt(data.total)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- Payment Button -->
    ${
      !isPaid && data.paymentLink
        ? `<div style="padding:0 40px 32px;text-align:center;">
            <a href="${data.paymentLink}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;padding:14px 48px;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;letter-spacing:0.3px;">
              Pay Now via Payoneer
            </a>
            <p style="margin-top:10px;font-size:12px;color:#9ca3af;">
              Click above to make a secure payment through Payoneer
            </p>
          </div>`
        : ''
    }

    ${isPaid ? `<div style="padding:0 40px 32px;text-align:center;">
      <div style="display:inline-block;padding:14px 48px;background:#d1fae5;color:#065f46;border-radius:8px;font-size:16px;font-weight:600;">
        ✓ Payment Received — Thank You!
      </div>
    </div>` : ''}

    <!-- Notes -->
    ${
      data.notes
        ? `<div style="padding:0 40px 24px;">
            <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:13px;color:#6b7280;">
              <strong>Notes:</strong> ${data.notes}
            </div>
          </div>`
        : ''
    }

    <!-- Footer -->
    <div style="padding:20px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
      <p style="margin:0;font-size:12px;color:#9ca3af;">
        ${data.businessName} · ${data.businessAddress}
      </p>
      <p style="margin:4px 0 0;font-size:12px;color:#9ca3af;">
        Questions? Email ${data.businessEmail}
      </p>
    </div>

  </div>
</body>
</html>`;
}

/**
 * Build a Payoneer "Request Payment" link.
 * Payoneer doesn't have a public API for this, so we construct
 * a mailto-style link or use their billing URL.
 */
export function buildPayoneerPaymentLink(opts: {
  payoneerEmail: string;
  amount: number;
  currency: string;
  invoiceNumber: string;
  clientEmail: string;
}): string {
  // Payoneer's request-payment page (clients can pay via card/bank)
  // This uses the Payoneer billing request URL format
  return `https://myaccount.payoneer.com/MainPage/Widget.aspx?w=RequestPayment&amount=${opts.amount}&currency=${opts.currency}&description=Invoice%20${encodeURIComponent(opts.invoiceNumber)}`;
}
