import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoiceHtml, buildPayoneerPaymentLink, type InvoiceLineItem } from '@/lib/invoice-generator';
import { sendInvoiceEmail, sendPaymentReminder } from '@/lib/invoice-mailer';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const BUSINESS = {
  name: 'Shree Krishna Gauli',
  email: process.env.CONTACT_SMTP_USER || 'hello@shreegauli.com',
  address: 'Dallas, TX, United States',
  phone: '',
};

const PAYONEER_EMAIL = process.env.PAYONEER_EMAIL || '';

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/**
 * Monthly Invoice Cron Job
 *
 * Triggered on the 1st of each month at 9:00 AM CST.
 * For each active client with a monthlyRate set:
 *   1. Creates an invoice for the current month
 *   2. Emails the invoice with a Payoneer payment link
 *
 * Also checks for overdue invoices and sends reminders.
 *
 * Security: Protected by CRON_SECRET.
 */
export async function GET(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    const monthName = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // ── 1. Generate recurring invoices for active clients ───────────────
    const activeClients = await prisma.client.findMany({
      where: {
        isActive: true,
        monthlyRate: { not: null, gt: 0 },
      },
    });

    const results: { clientName: string; invoiceNumber: string; status: string }[] = [];

    for (const client of activeClients) {
      // Check if we already invoiced this client for this month
      const existingInvoice = await prisma.invoice.findFirst({
        where: {
          clientId: client.id,
          issueDate: {
            gte: new Date(year, month, 1),
            lt: new Date(year, month + 1, 1),
          },
        },
      });

      if (existingInvoice) {
        results.push({ clientName: client.name, invoiceNumber: existingInvoice.invoiceNumber, status: 'already_exists' });
        continue;
      }

      // Generate invoice number
      const prefix = `INV-${year}-`;
      const last = await prisma.invoice.findFirst({
        where: { invoiceNumber: { startsWith: prefix } },
        orderBy: { invoiceNumber: 'desc' },
        select: { invoiceNumber: true },
      });
      const seq = last ? parseInt(last.invoiceNumber.replace(prefix, ''), 10) + 1 : 1;
      const invoiceNumber = `${prefix}${seq.toString().padStart(4, '0')}`;

      const lineItems: InvoiceLineItem[] = [
        {
          description: `Monthly Digital Marketing Services — ${monthName}`,
          qty: 1,
          rate: client.monthlyRate!,
          amount: client.monthlyRate!,
        },
      ];

      const subtotal = client.monthlyRate!;
      const taxAmount = 0; // Adjust per client if needed
      const total = subtotal + taxAmount;
      const issueDate = new Date();
      const dueDate = new Date(year, month, 15); // Due 15th of same month
      if (dueDate < issueDate) dueDate.setMonth(dueDate.getMonth() + 1);

      // Build Payoneer payment link
      const payoneerEmail = client.payoneerEmail || PAYONEER_EMAIL;
      const paymentLink = payoneerEmail
        ? buildPayoneerPaymentLink({
            payoneerEmail,
            amount: total,
            currency: client.currency || 'USD',
            invoiceNumber,
            clientEmail: client.email,
          })
        : null;

      // Create invoice
      const invoice = await prisma.invoice.create({
        data: {
          invoiceNumber,
          clientId: client.id,
          subtotal,
          taxRate: 0,
          taxAmount,
          total,
          currency: client.currency || 'USD',
          description: `Monthly Digital Marketing Services — ${monthName}`,
          lineItems: lineItems as unknown as Record<string, unknown>[],
          status: 'sent',
          issueDate,
          dueDate,
          paymentMethod: 'payoneer',
          paymentLink,
          sentAt: new Date(),
          sentTo: client.email,
        },
      });

      // Send email
      try {
        const clientAddress = [client.billingAddress, client.city, client.state, client.zipCode, client.country]
          .filter(Boolean)
          .join(', ');

        const html = generateInvoiceHtml({
          invoiceNumber,
          issueDate: formatDate(issueDate),
          dueDate: formatDate(dueDate),
          businessName: BUSINESS.name,
          businessEmail: BUSINESS.email,
          businessAddress: BUSINESS.address,
          businessPhone: BUSINESS.phone,
          clientName: client.name,
          clientEmail: client.email,
          clientCompany: client.company || undefined,
          clientAddress: clientAddress || undefined,
          lineItems,
          subtotal,
          taxRate: 0,
          taxAmount,
          total,
          currency: client.currency || 'USD',
          paymentLink: paymentLink || undefined,
          paymentMethod: 'payoneer',
          status: 'sent',
        });

        await sendInvoiceEmail({
          to: client.email,
          invoiceNumber,
          clientName: client.name,
          total: formatCurrency(total, client.currency || 'USD'),
          dueDate: formatDate(dueDate),
          invoiceHtml: html,
          paymentLink: paymentLink || undefined,
        });

        results.push({ clientName: client.name, invoiceNumber, status: 'sent' });
      } catch (emailErr) {
        console.error(`[Monthly Invoice] Failed to email ${client.email}:`, emailErr);
        results.push({ clientName: client.name, invoiceNumber, status: 'created_email_failed' });
      }
    }

    // ── 2. Send reminders for overdue invoices ─────────────────────────
    const overdueInvoices = await prisma.invoice.findMany({
      where: {
        status: 'sent',
        dueDate: { lt: now },
      },
      include: { client: true },
    });

    const reminders: string[] = [];

    for (const inv of overdueInvoices) {
      const daysOverdue = Math.floor((now.getTime() - inv.dueDate.getTime()) / (1000 * 60 * 60 * 24));

      // Mark as overdue
      await prisma.invoice.update({
        where: { id: inv.id },
        data: { status: 'overdue' },
      });

      // Send reminder (only at 1, 7, 14, 30 days overdue to avoid spam)
      if ([1, 7, 14, 30].includes(daysOverdue)) {
        try {
          await sendPaymentReminder({
            to: inv.client.email,
            invoiceNumber: inv.invoiceNumber,
            clientName: inv.client.name,
            total: formatCurrency(inv.total, inv.currency),
            dueDate: formatDate(inv.dueDate),
            daysOverdue,
            paymentLink: inv.paymentLink || undefined,
          });
          reminders.push(`${inv.invoiceNumber} → ${inv.client.email} (${daysOverdue}d overdue)`);
        } catch {
          console.error(`[Overdue Reminder] Failed for ${inv.invoiceNumber}`);
        }
      }
    }

    console.log(`[Monthly Invoice Cron] Generated ${results.length} invoices, sent ${reminders.length} reminders`);

    return NextResponse.json({
      success: true,
      message: `Processed ${activeClients.length} clients`,
      invoices: results,
      reminders,
    });
  } catch (error) {
    console.error('[Monthly Invoice Cron] Error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Cron job failed' },
      { status: 500 }
    );
  }
}
