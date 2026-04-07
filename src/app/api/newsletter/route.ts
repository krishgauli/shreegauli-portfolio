import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { isMailerConfigured, sendNewsletterEmails } from '@/lib/mailer';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, source } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.active) {
        return NextResponse.json({ message: 'Already subscribed', emailStatus: 'skipped' }, { status: 200 });
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { active: true },
        });

        // Send welcome email on reactivation too
        let emailStatus: 'sent' | 'partial' | 'failed' | 'skipped' = 'skipped';
        if (isMailerConfigured()) {
          try {
            const emailResult = await sendNewsletterEmails(email, source || 'reactivation');
            if (emailResult.adminSent && emailResult.userSent) emailStatus = 'sent';
            else if (emailResult.adminSent || emailResult.userSent) emailStatus = 'partial';
            else emailStatus = 'failed';
          } catch (emailError) {
            console.error('Newsletter reactivation email error:', emailError);
            emailStatus = 'failed';
          }
        }

        return NextResponse.json({ message: 'Subscription reactivated', emailStatus }, { status: 200 });
      }
    }

    // Create new subscription
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        source: source || 'footer',
      },
    });

    // Send welcome + admin notification emails (non-blocking)
    let emailStatus: 'sent' | 'partial' | 'failed' | 'skipped' = 'skipped';
    if (isMailerConfigured()) {
      try {
        const emailResult = await sendNewsletterEmails(email, source || 'footer');
        if (emailResult.adminSent && emailResult.userSent) emailStatus = 'sent';
        else if (emailResult.adminSent || emailResult.userSent) emailStatus = 'partial';
        else emailStatus = 'failed';
      } catch (emailError) {
        console.error('Newsletter email error:', emailError);
        emailStatus = 'failed';
      }
    }

    return NextResponse.json({ message: 'Successfully subscribed', subscriber, emailStatus }, { status: 201 });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if ('response' in auth) return auth.response;

  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { active: true },
      orderBy: { subscribedAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ subscribers, count: subscribers.length }, { status: 200 });
  } catch (error) {
    console.error('Newsletter fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
