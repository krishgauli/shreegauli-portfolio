import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { isMailerConfigured, sendContactEmails } from '@/lib/mailer';

function getTrimmedValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = getTrimmedValue(body.name);
    const email = getTrimmedValue(body.email).toLowerCase();
    const phone = getTrimmedValue(body.phone);
    const businessType = getTrimmedValue(body.businessType);
    const budget = getTrimmedValue(body.budget);
    const message = getTrimmedValue(body.message);
    const source = getTrimmedValue(body.source) || 'unknown';

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const lead = await prisma.contactLead.create({
      data: {
        name,
        email,
        phone: phone || null,
        businessType: businessType || null,
        budget: budget || null,
        message: message || null,
        source,
        status: 'new',
      },
    });

    let emailStatus: 'sent' | 'partial' | 'failed' | 'skipped' = 'skipped';

    if (isMailerConfigured()) {
      try {
        const result = await sendContactEmails({
          name,
          email,
          phone,
          businessType,
          budget,
          message,
          source,
          createdAt: lead.createdAt,
        });

        if (result.adminSent && result.userSent) emailStatus = 'sent';
        else if (result.adminSent || result.userSent) emailStatus = 'partial';
        else emailStatus = 'failed';

        if (result.errors.length) {
          console.error('[contact-lead] Email issue:', result.errors.join(' | '));
        }
      } catch (err) {
        emailStatus = 'failed';
        console.error('[contact-lead] Email error:', err instanceof Error ? err.message : err);
      }
    }

    return NextResponse.json(
      { message: 'Lead submitted successfully', lead, emailStatus },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact lead error:', error);
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const leads = await prisma.contactLead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ leads, count: leads.length }, { status: 200 });
  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// PATCH endpoint for updating lead fields (status + all editable fields)
export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json();
    const { id, status, name, email, phone, businessType, budget, message, source } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Build update data dynamically — only include fields that were sent
    const data: Record<string, unknown> = {};
    if (status !== undefined) data.status = status;
    if (name !== undefined) data.name = name.trim();
    if (email !== undefined) data.email = email.trim().toLowerCase();
    if (phone !== undefined) data.phone = phone.trim() || null;
    if (businessType !== undefined) data.businessType = businessType.trim() || null;
    if (budget !== undefined) data.budget = budget.trim() || null;
    if (message !== undefined) data.message = message.trim() || null;
    if (source !== undefined) data.source = source.trim() || null;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    // Validate email if being updated
    if (data.email && !isValidEmail(data.email as string)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const lead = await prisma.contactLead.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json({ message: 'Lead updated successfully', lead }, { status: 200 });
  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

// DELETE endpoint for removing leads
export async function DELETE(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const ids = searchParams.get('ids'); // comma-separated for bulk delete

    if (!id && !ids) {
      return NextResponse.json({ error: 'ID or IDs required' }, { status: 400 });
    }

    if (ids) {
      // Bulk delete
      const idArray = ids.split(',').map(i => parseInt(i.trim())).filter(i => !isNaN(i));
      if (idArray.length === 0) {
        return NextResponse.json({ error: 'No valid IDs provided' }, { status: 400 });
      }
      const result = await prisma.contactLead.deleteMany({
        where: { id: { in: idArray } },
      });
      return NextResponse.json({ message: `${result.count} lead(s) deleted`, count: result.count }, { status: 200 });
    }

    // Single delete
    await prisma.contactLead.delete({
      where: { id: parseInt(id!) },
    });

    return NextResponse.json({ message: 'Lead deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Lead delete error:', error);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
