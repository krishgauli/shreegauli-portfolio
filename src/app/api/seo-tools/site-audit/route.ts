/**
 * Site Audit API — SSE endpoint that crawls a website and streams progress
 * events, then sends the full audit result at completion.
 *
 * POST /api/seo-tools/site-audit
 * Body: { url: string, maxPages?: number }
 *
 * Response: text/event-stream
 *   data: { type: "progress", pagesScanned, totalDiscovered, currentUrl }
 *   data: { type: "complete", result: SiteAuditResult }
 */

import { NextRequest } from 'next/server';
import { DEFAULT_AUDIT_CONFIG, SiteAuditConfig } from '@/types/site-audit';
import { crawlSite } from '@/lib/site-audit/crawler';
import { analyzePage } from '@/lib/site-audit/page-analyzer';
import { buildSiteAuditResult } from '@/lib/site-audit/checks';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // Vercel Pro — 5 min for full-site crawls

export async function POST(req: NextRequest) {
  let body: { url?: string; maxPages?: number };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rawUrl = (body.url || '').trim();
  if (!rawUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Normalise URL
  let startUrl: string;
  try {
    const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    startUrl = parsed.origin + (parsed.pathname === '/' ? '' : parsed.pathname);
    if (!startUrl.endsWith('/')) startUrl += '/';
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const config: SiteAuditConfig = {
    ...DEFAULT_AUDIT_CONFIG,
    maxPages: body.maxPages || DEFAULT_AUDIT_CONFIG.maxPages,
  };

  // Create SSE stream
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          // stream may have been closed by client
        }
      };

      try {
        // 1. Crawl
        const crawledPages = await crawlSite(startUrl, config, (scanned, discovered, currentUrl) => {
          send({ type: 'progress', pagesScanned: scanned, totalDiscovered: discovered, currentUrl });
        });

        send({ type: 'progress', pagesScanned: crawledPages.length, totalDiscovered: crawledPages.length, currentUrl: 'Analyzing pages…' });

        // 2. Analyse each page
        const analysedPages = crawledPages.map((crawl) => analyzePage(crawl));

        // 3. Run checks + build result
        const domain = new URL(startUrl).hostname;
        const result = buildSiteAuditResult(domain, analysedPages);

        // 4. Send complete event
        send({ type: 'complete', result });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        send({ type: 'error', message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
