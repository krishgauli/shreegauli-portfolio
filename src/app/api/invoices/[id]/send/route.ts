import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoiceHtml, type InvoiceLineItem } from '@/lib/invoice-generator';
import { sendInvoiceEmail } from '@/lib/invoice-mailer';

export const dynamic = 'force-dynamic';

const BUSINESS = {
  name: 'Shree Krishna Gauli',
  email: process.env.CONTACT_SMTP_USER || 'hello@shreegauli.com',
  address: 'Dallas, TX, United States',
  phone: '',
};

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

async function requireAdminAuth(request: NextRequest) {
  const { requireAdmin } = await import('@/lib/auth');
  const auth = await requireAdmin(request);
  if ('response' in auth) return { error: auth.response };
  return { user: auth.user };
}

/**
 * POST /api/invoices/[id]/send — send (or re-send) an invoice email
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { client: true },
  });

  if (!invoice) {
    return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });
  }

  const client = invoice.client;
  const clientAddress = [client.billingAddress, client.city, client.state, client.zipCode, client.country]
    .filter(Boolean)
    .join(', ');

  const html = generateInvoiceHtml({
    invoiceNumber: invoice.invoiceNumber,
    issueDate: formatDate(invoice.issueDate),
    dueDate: formatDate(invoice.dueDate),
    businessName: BUSINESS.name,
    businessEmail: BUSINESS.email,
    businessAddress: BUSINESS.address,
    businessPhone: BUSINESS.phone,
    clientName: client.name,
    clientEmail: client.email,
    clientCompany: client.company || undefined,
    clientAddress: clientAddress || undefined,
    lineItems: (invoice.lineItems as unknown as InvoiceLineItem[]) || [],
    subtotal: invoice.subtotal,
    taxRate: invoice.taxRate,
    taxAmount: invoice.taxAmount,
    total: invoice.total,
    currency: invoice.currency,
    paymentLink: invoice.paymentLink || undefined,
    paymentMethod: invoice.paymentMethod || undefined,
    notes: invoice.clientNotes || undefined,
    status: invoice.status,
  });

  await sendInvoiceEmail({
    to: client.email,
    invoiceNumber: invoice.invoiceNumber,
    clientName: client.name,
    total: formatCurrency(invoice.total, invoice.currency),
    dueDate: formatDate(invoice.dueDate),
    invoiceHtml: html,
    paymentLink: invoice.paymentLink || undefined,
  });

  // Update status + tracking
  await prisma.invoice.update({
    where: { id },
    data: {
      status: invoice.status === 'draft' ? 'sent' : invoice.status,
      sentAt: new Date(),
      sentTo: client.email,
    },
  });

  return NextResponse.json({ success: true, message: `Invoice sent to ${client.email}` });
}
