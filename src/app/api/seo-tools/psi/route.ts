/**
 * Google PageSpeed Insights proxy — relays requests to the PSI API v5
 * so the browser doesn't hit CORS issues, and we can add error handling.
 *
 * GET /api/seo-tools/psi?url=https://example.com&strategy=mobile
 * Response: JSON (full PSI response or extracted metrics)
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 120; // PSI can take up to 60s per test

interface LabMetrics {
  performanceScore: number;
  fcp: number;
  lcp: number;
  cls: number;
  tbt: number;
  si: number;
  tti: number;
  serverResponseTime: number;
  accessibilityScore: number;
  seoScore: number;
  bestPracticesScore: number;
}

interface FieldMetric {
  p75: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function extractFieldMetric(metrics: Record<string, unknown> | undefined, key: string): FieldMetric | null {
  if (!metrics) return null;
  const m = metrics[key] as { percentile?: number; category?: string } | undefined;
  if (!m) return null;
  const cat = m.category || '';
  return {
    p75: m.percentile ?? 0,
    rating: cat === 'FAST' ? 'good' : cat === 'AVERAGE' ? 'needs-improvement' : 'poor',
  };
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const strategy = req.nextUrl.searchParams.get('strategy') || 'mobile';

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  // Build PSI API URL with multiple category params
  const params = new URLSearchParams();
  params.append('url', url);
  params.append('strategy', strategy);
  params.append('category', 'performance');
  params.append('category', 'accessibility');
  params.append('category', 'seo');
  params.append('category', 'best-practices');

  try {
    const resp = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`,
      { signal: AbortSignal.timeout(90_000) },
    );

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      if (resp.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited by Google PageSpeed API. Try again in a minute.' },
          { status: 429 },
        );
      }
      return NextResponse.json(
        { error: `PageSpeed API error: ${resp.status}`, detail: errText },
        { status: resp.status },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await resp.json();
    const lh = data.lighthouseResult;

    if (!lh) {
      return NextResponse.json({ error: 'No Lighthouse data in response' }, { status: 502 });
    }

    // Extract lab metrics
    const audit = (id: string): number => lh.audits?.[id]?.numericValue ?? 0;
    const catScore = (id: string): number => Math.round((lh.categories?.[id]?.score ?? 0) * 100);

    const lab: LabMetrics = {
      performanceScore: catScore('performance'),
      fcp: Math.round(audit('first-contentful-paint')),
      lcp: Math.round(audit('largest-contentful-paint')),
      cls: parseFloat(audit('cumulative-layout-shift').toFixed(3)),
      tbt: Math.round(audit('total-blocking-time')),
      si: Math.round(audit('speed-index')),
      tti: Math.round(audit('interactive')),
      serverResponseTime: Math.round(audit('server-response-time')),
      accessibilityScore: catScore('accessibility'),
      seoScore: catScore('seo'),
      bestPracticesScore: catScore('best-practices'),
    };

    // Extract Chrome UX Report field data
    const metrics = data.loadingExperience?.metrics as Record<string, unknown> | undefined;
    const field = {
      lcp: extractFieldMetric(metrics, 'LARGEST_CONTENTFUL_PAINT_MS'),
      cls: extractFieldMetric(metrics, 'CUMULATIVE_LAYOUT_SHIFT_SCORE'),
      inp: extractFieldMetric(metrics, 'INTERACTION_TO_NEXT_PAINT'),
      fcp: extractFieldMetric(metrics, 'FIRST_CONTENTFUL_PAINT_MS'),
      ttfb: extractFieldMetric(metrics, 'EXPERIMENTAL_TIME_TO_FIRST_BYTE'),
      hasData: !!metrics && Object.keys(metrics).length > 0,
    };

    return NextResponse.json({
      url,
      strategy,
      lab,
      field,
      fetchedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'PSI request failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
