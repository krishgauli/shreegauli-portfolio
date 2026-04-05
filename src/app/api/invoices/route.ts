import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateInvoiceHtml, buildPayoneerPaymentLink, type InvoiceLineItem } from '@/lib/invoice-generator';
import { sendInvoiceEmail } from '@/lib/invoice-mailer';

export const dynamic = 'force-dynamic';

const BUSINESS = {
  name: 'Shree Krishna Gauli',
  email: process.env.CONTACT_SMTP_USER || 'hello@shreegauli.com',
  address: 'Dallas, TX, United States',
  phone: '',
};

const PAYONEER_EMAIL = process.env.PAYONEER_EMAIL || '';
const SITE_URL = process.env.APP_URL || 'https://shreegauli.com';

async function requireAdminAuth(request: NextRequest) {
  const { requireAdmin } = await import('@/lib/auth');
  const auth = await requireAdmin(request);
  if ('response' in auth) return { error: auth.response };
  return { user: auth.user };
}

/**
 * Generate the next sequential invoice number: INV-YYYY-NNNN
 */
async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;

  const last = await prisma.invoice.findFirst({
    where: { invoiceNumber: { startsWith: prefix } },
    orderBy: { invoiceNumber: 'desc' },
    select: { invoiceNumber: true },
  });

  const seq = last ? parseInt(last.invoiceNumber.replace(prefix, ''), 10) + 1 : 1;
  return `${prefix}${seq.toString().padStart(4, '0')}`;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

/**
 * GET  /api/invoices — list invoices (with optional filters)
 * POST /api/invoices — create a new invoice
 */
export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const clientId = searchParams.get('clientId');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (clientId) where.clientId = clientId;

  const invoices = await prisma.invoice.findMany({
    where,
    orderBy: { issueDate: 'desc' },
    include: { client: { select: { name: true, email: true, company: true } } },
    take: 100,
  });

  // Aggregate stats
  const stats = await prisma.invoice.groupBy({
    by: ['status'],
    _sum: { total: true },
    _count: true,
  });

  return NextResponse.json({ success: true, invoices, stats });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const {
    clientId,
    lineItems,
    taxRate = 0,
    dueInDays = 15,
    notes,
    clientNotes,
    sendEmail = false,
    description,
  } = body as {
    clientId: string;
    lineItems: InvoiceLineItem[];
    taxRate?: number;
    dueInDays?: number;
    notes?: string;
    clientNotes?: string;
    sendEmail?: boolean;
    description?: string;
  };

  if (!clientId) {
    return NextResponse.json({ success: false, error: 'clientId is required' }, { status: 400 });
  }
  if (!lineItems?.length) {
    return NextResponse.json({ success: false, error: 'At least one line item is required' }, { status: 400 });
  }

  const client = await prisma.client.findUnique({ where: { id: clientId } });
  if (!client) {
    return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
  }

  // Calculate amounts
  const subtotal = lineItems.reduce((sum: number, item: InvoiceLineItem) => sum + item.amount, 0);
  const taxAmount = Math.round(subtotal * (taxRate / 100) * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;

  const invoiceNumber = await nextInvoiceNumber();
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + dueInDays);

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

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientId,
      subtotal,
      taxRate,
      taxAmount,
      total,
      currency: client.currency || 'USD',
      description: description || lineItems.map((i: InvoiceLineItem) => i.description).join(', '),
      lineItems: lineItems as unknown as Record<string, unknown>[],
      status: sendEmail ? 'sent' : 'draft',
      issueDate,
      dueDate,
      paymentMethod: 'payoneer',
      paymentLink,
      notes,
      clientNotes,
      sentAt: sendEmail ? new Date() : null,
      sentTo: sendEmail ? client.email : null,
    },
    include: { client: true },
  });

  // Send email if requested
  if (sendEmail) {
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
        taxRate,
        taxAmount,
        total,
        currency: client.currency || 'USD',
        paymentLink: paymentLink || undefined,
        paymentMethod: 'payoneer',
        notes: clientNotes || undefined,
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
    } catch (emailError) {
      console.error('[Invoice] Email send failed:', emailError);
      // Don't fail the creation — invoice is saved, just email failed
    }
  }

  return NextResponse.json({ success: true, invoice }, { status: 201 });
}
