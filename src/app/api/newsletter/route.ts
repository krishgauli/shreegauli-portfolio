import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import { sendNewsletterNotification } from '@/lib/contact-mailer';

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

        // Send reactivation notification and await delivery in serverless runtime
        const delivered = await sendNewsletterNotification(email, source || 'reactivation');
        const emailStatus = delivered ? 'sent' : 'failed';
        if (!delivered) {
          console.error('[newsletter] Reactivation email delivery failed for:', email);
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

    // Send email notifications (admin + welcome email to subscriber) and await in serverless runtime
    const delivered = await sendNewsletterNotification(email, source || 'footer');
    const emailStatus = delivered ? 'sent' : 'failed';
    if (!delivered) {
      console.error('[newsletter] Subscription email delivery failed for:', email);
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
