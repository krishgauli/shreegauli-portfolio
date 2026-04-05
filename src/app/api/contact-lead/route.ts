import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { isContactMailerConfigured, sendContactLeadEmails } from '@/lib/contact-mailer';

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

    let emailStatus: 'failed' | 'partial' | 'sent' | 'skipped' = 'skipped';

    if (isContactMailerConfigured()) {
      try {
        const result = await sendContactLeadEmails(lead);

        if (result.notificationSent && result.confirmationSent) {
          emailStatus = 'sent';
        } else if (result.notificationSent || result.confirmationSent) {
          emailStatus = 'partial';
        } else {
          emailStatus = 'failed';
        }

        if (result.errors.length > 0) {
          console.error('Contact lead email delivery issue:', result.errors.join(' | '));
        }
      } catch (error) {
        emailStatus = 'failed';
        console.error('Contact lead email error:', error);
      }
    } else {
      console.warn('Contact mailer not configured. Lead was saved but emails were skipped.');
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

// PATCH endpoint for updating lead status
export async function PATCH(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status are required' }, { status: 400 });
    }

    const lead = await prisma.contactLead.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return NextResponse.json({ message: 'Lead updated successfully', lead }, { status: 200 });
  } catch (error) {
    console.error('Lead update error:', error);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
