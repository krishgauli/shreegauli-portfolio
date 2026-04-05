import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function requireAdminAuth(request: NextRequest) {
  const { requireAdmin } = await import('@/lib/auth');
  const auth = await requireAdmin(request);
  if ('response' in auth) return { error: auth.response };
  return { user: auth.user };
}

/**
 * GET    /api/invoices/clients/[id] — get single client
 * PATCH  /api/invoices/clients/[id] — update client
 * DELETE /api/invoices/clients/[id] — delete client
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      invoices: { orderBy: { issueDate: 'desc' }, take: 20 },
    },
  });

  if (!client) return NextResponse.json({ success: false, error: 'Client not found' }, { status: 404 });
  return NextResponse.json({ success: true, client });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  const body = await request.json();

  const client = await prisma.client.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name.trim() }),
      ...(body.email !== undefined && { email: body.email.trim().toLowerCase() }),
      ...(body.company !== undefined && { company: body.company?.trim() || null }),
      ...(body.phone !== undefined && { phone: body.phone?.trim() || null }),
      ...(body.billingAddress !== undefined && { billingAddress: body.billingAddress?.trim() || null }),
      ...(body.city !== undefined && { city: body.city?.trim() || null }),
      ...(body.state !== undefined && { state: body.state?.trim() || null }),
      ...(body.country !== undefined && { country: body.country?.trim() || null }),
      ...(body.zipCode !== undefined && { zipCode: body.zipCode?.trim() || null }),
      ...(body.monthlyRate !== undefined && { monthlyRate: body.monthlyRate ? parseFloat(body.monthlyRate) : null }),
      ...(body.currency !== undefined && { currency: body.currency }),
      ...(body.billingDay !== undefined && { billingDay: parseInt(body.billingDay) }),
      ...(body.payoneerEmail !== undefined && { payoneerEmail: body.payoneerEmail?.trim() || null }),
      ...(body.notes !== undefined && { notes: body.notes?.trim() || null }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  });

  return NextResponse.json({ success: true, client });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminAuth(request);
  if ('error' in auth) return auth.error;

  const { id } = await params;
  await prisma.client.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
