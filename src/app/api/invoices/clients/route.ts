import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET  /api/invoices/clients — list all clients
 * POST /api/invoices/clients — create a new client
 */

async function requireAdminAuth(request: NextRequest) {
  const { requireAdmin } = await import('@/lib/auth');
  const auth = await requireAdmin(request);
  if ('response' in auth) return { error: auth.response };
  return { user: auth.user };
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { invoices: true } },
    },
  });

  return NextResponse.json({ success: true, clients });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const body = await request.json();
  const { name, email, company, phone, billingAddress, city, state, country, zipCode, monthlyRate, currency, billingDay, payoneerEmail, notes } = body;

  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
  }

  // Check for duplicate email
  const existing = await prisma.client.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (existing) {
    return NextResponse.json({ success: false, error: 'A client with this email already exists' }, { status: 409 });
  }

  const client = await prisma.client.create({
    data: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      phone: phone?.trim() || null,
      billingAddress: billingAddress?.trim() || null,
      city: city?.trim() || null,
      state: state?.trim() || null,
      country: country?.trim() || 'US',
      zipCode: zipCode?.trim() || null,
      monthlyRate: monthlyRate ? parseFloat(monthlyRate) : null,
      currency: currency || 'USD',
      billingDay: billingDay ? parseInt(billingDay) : 1,
      payoneerEmail: payoneerEmail?.trim() || null,
      notes: notes?.trim() || null,
    },
  });

  return NextResponse.json({ success: true, client }, { status: 201 });
}
