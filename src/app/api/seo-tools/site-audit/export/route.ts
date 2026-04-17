/**
 * CSV Export — converts a SiteAuditResult into a SEMrush-like CSV download.
 *
 * POST /api/seo-tools/site-audit/export
 * Body: SiteAuditResult (the full audit result object)
 * Response: text/csv attachment
 */

import { NextRequest } from 'next/server';
import type { SiteAuditResult } from '@/types/site-audit';
import { buildSiteAuditCsv } from '@/lib/site-audit/csv';

export const dynamic = 'force-dynamic';


export async function POST(req: NextRequest) {
  let result: SiteAuditResult;
  try {
    result = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!result?.pages?.length) {
    return new Response(JSON.stringify({ error: 'No pages in audit result' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { csv, filename } = buildSiteAuditCsv(result);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
