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
 * GET    /api/invoices/[id]          — get single invoice with HTML preview
 * PATCH  /api/invoices/[id]          — update invoice (status, payment, etc.)
 * DELETE /api/invoices/[id]          — delete invoice
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { client: true },
  });

  if (!invoice) return NextResponse.json({ success: false, error: 'Invoice not found' }, { status: 404 });

  // Generate HTML preview
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

  return NextResponse.json({ success: true, invoice, html });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};

  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'paid') {
      updateData.paidAt = new Date();
    }
  }
  if (body.transactionId !== undefined) updateData.transactionId = body.transactionId;
  if (body.notes !== undefined) updateData.notes = body.notes;
  if (body.clientNotes !== undefined) updateData.clientNotes = body.clientNotes;

  const invoice = await prisma.invoice.update({
    where: { id },
    data: updateData,
    include: { client: true },
  });

  return NextResponse.json({ success: true, invoice });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  await prisma.invoice.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
