import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface SearchConsoleRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

function normalizeSiteUrl(input: string): string {
  const parsed = new URL(input.startsWith('http') ? input : `https://${input}`);
  return `${parsed.protocol}//${parsed.host}/`;
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('seo_gsc_token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Google Search Console not connected' }, { status: 401 });
  }

  try {
    const { siteUrl: rawSiteUrl } = await req.json();
    if (!rawSiteUrl) {
      return NextResponse.json({ error: 'siteUrl is required' }, { status: 400 });
    }

    const siteUrl = normalizeSiteUrl(rawSiteUrl);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90);

    const response = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
          dimensions: ['query'],
          rowLimit: 250,
          startRow: 0,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data?.error?.message || 'Failed to fetch keyword data' }, { status: 400 });
    }

    const rows: SearchConsoleRow[] = data?.rows ?? [];
    const normalized = rows.map((row) => ({
      query: row.keys?.[0] ?? '',
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: Number(((row.ctr ?? 0) * 100).toFixed(2)),
      position: Number((row.position ?? 0).toFixed(2)),
    }));

    const topPerforming = normalized
      .filter((item) => item.position > 0 && item.position <= 3)
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 25);

    const ranking = normalized
      .filter((item) => item.position > 3 && item.position <= 20)
      .sort((a, b) => a.position - b.position)
      .slice(0, 35);

    const lowCtr = normalized
      .filter((item) => item.impressions > 200 && item.ctr < 2)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25);

    const buried = normalized
      .filter((item) => item.position > 30)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 25);

    return NextResponse.json({
      siteUrl,
      dateRange: {
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
      },
      topPerforming,
      ranking,
      lowCtr,
      buried,
    });
  } catch (error) {
    console.error('[SEO Keywords]', error);
    return NextResponse.json({ error: 'Keyword analysis failed' }, { status: 500 });
  }
}
