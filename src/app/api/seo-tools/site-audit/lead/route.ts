import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isMailerConfigured, sendSiteAuditReportEmails } from '@/lib/mailer';

interface TopIssue {
  title: string;
  severity: 'error' | 'warning' | 'notice';
  affectedPages: number;
}

interface AuditSummary {
  healthScore: number;
  pagesScanned: number;
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  topIssues: TopIssue[];
}

function getTrimmedValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeDomain(input: string) {
  const cleaned = input.trim();
  if (!cleaned) return '';

  try {
    const withScheme = /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
    return new URL(withScheme).hostname.replace(/^www\./i, '');
  } catch {
    return cleaned
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      .trim();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = getTrimmedValue(body.email).toLowerCase();
    const url = getTrimmedValue(body.url);
    const summary = (body.summary || {}) as Partial<AuditSummary>;

    if (!email || !url) {
      return NextResponse.json({ error: 'Email and URL are required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const domain = normalizeDomain(url);

    const healthScore = Number(summary.healthScore ?? 0);
    const pagesScanned = Number(summary.pagesScanned ?? 0);
    const errorCount = Number(summary.errorCount ?? 0);
    const warningCount = Number(summary.warningCount ?? 0);
    const noticeCount = Number(summary.noticeCount ?? 0);
    const topIssues = Array.isArray(summary.topIssues)
      ? summary.topIssues
          .slice(0, 8)
          .map((issue) => ({
            title: getTrimmedValue((issue as TopIssue).title) || 'Issue',
            severity: (issue as TopIssue).severity || 'notice',
            affectedPages: Number((issue as TopIssue).affectedPages ?? 0),
          }))
      : [];

    const nameFromEmail = email.split('@')[0]?.replace(/[._-]+/g, ' ') || 'Site Audit User';
    const leadName = nameFromEmail
      .split(' ')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Site Audit User';

    const lead = await prisma.contactLead.create({
      data: {
        name: leadName,
        email,
        businessType: 'Site Audit',
        source: 'seo-site-audit',
        message: `Site audited: ${domain} | Health: ${healthScore}/100 | Pages: ${pagesScanned} | Errors: ${errorCount} | Warnings: ${warningCount} | Notices: ${noticeCount}`,
        status: 'new',
      },
    });

    let emailStatus: 'sent' | 'partial' | 'failed' | 'skipped' = 'skipped';

    if (isMailerConfigured()) {
      try {
        const result = await sendSiteAuditReportEmails({
          email,
          domain,
          healthScore,
          pagesScanned,
          errorCount,
          warningCount,
          noticeCount,
          topIssues,
        });

        if (result.adminSent && result.userSent) emailStatus = 'sent';
        else if (result.adminSent || result.userSent) emailStatus = 'partial';
        else emailStatus = 'failed';

        if (result.errors.length) {
          console.error('[site-audit-lead] Email issue:', result.errors.join(' | '));
        }
      } catch (err) {
        emailStatus = 'failed';
        console.error('[site-audit-lead] Email error:', err instanceof Error ? err.message : err);
      }
    }

    return NextResponse.json(
      {
        message: 'Site audit lead captured',
        leadId: lead.id,
        emailStatus,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Site audit lead error:', error);
    return NextResponse.json({ error: 'Failed to capture site audit lead' }, { status: 500 });
  }
}
