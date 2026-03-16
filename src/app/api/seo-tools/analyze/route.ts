import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface SeoCheck {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
  recommendation?: string;
}

interface SeoResult {
  url: string;
  score: number;
  checks: SeoCheck[];
  headings: { h1: string[]; h2: string[]; h3: string[] };
  images: { total: number; missingAlt: number };
  links: { internal: number; external: number };
  performance: { ttfb: number; size: number };
  rawMeta: {
    title: string; description: string; canonical: string;
    robots: string; ogTitle: string; ogDescription: string; ogImage: string;
  };
}

function extractMeta(html: string, name: string): string {
  const re1 = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i');
  return (html.match(re1) ?? html.match(re2))?.[1]?.trim() ?? '';
}

function extractOg(html: string, prop: string): string {
  const re1 = new RegExp(`<meta[^>]+property=["']og:${prop}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${prop}["']`, 'i');
  return (html.match(re1) ?? html.match(re2))?.[1]?.trim() ?? '';
}

export async function POST(req: NextRequest) {
  try {
    const { url: rawUrl } = await req.json();
    if (!rawUrl) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    let url: URL;
    try {
      url = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    } catch {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const startTime = Date.now();
    let html = '';
    let contentLength = 0;
    let fetchError = '';

    try {
      const res = await fetch(url.toString(), {
        headers: { 'User-Agent': 'SEOAuditBot/1.0 (+https://shreegauli.com)' },
        signal: AbortSignal.timeout(15000),
      });
      const buf = await res.arrayBuffer();
      contentLength = buf.byteLength;
      html = new TextDecoder().decode(buf);
    } catch (e: any) {
      fetchError = e?.message ?? 'Failed to fetch URL';
    }

    const ttfb = Date.now() - startTime;
    if (!html) return NextResponse.json({ error: fetchError || 'Empty response from URL' }, { status: 400 });

    // ── Extract meta ──────────────────────────────────────────────────────
    const titleMatch = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i);
    const title = titleMatch?.[1]?.trim() ?? '';
    const description = extractMeta(html, 'description');
    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    const canonical = canonicalMatch?.[1]?.trim() ?? '';
    const robots  = extractMeta(html, 'robots');
    const viewport = extractMeta(html, 'viewport');
    const ogTitle = extractOg(html, 'title');
    const ogDesc  = extractOg(html, 'description');
    const ogImage = extractOg(html, 'image');

    // ── Headings ────────────────────────────────────────────────────────────
    const h1s = [...html.matchAll(/<h1[^>]*>([^<]{1,200})<\/h1>/gi)].map(m => m[1].trim());
    const h2s = [...html.matchAll(/<h2[^>]*>([^<]{1,200})<\/h2>/gi)].map(m => m[1].trim()).slice(0, 12);
    const h3s = [...html.matchAll(/<h3[^>]*>([^<]{1,200})<\/h3>/gi)].map(m => m[1].trim()).slice(0, 8);

    // ── Images ──────────────────────────────────────────────────────────────
    const imgTags = [...html.matchAll(/<img[^>]+>/gi)].map(m => m[0]);
    const missingAlt = imgTags.filter(t => !/alt=["'][^"']+["']/i.test(t)).length;

    // ── Links ────────────────────────────────────────────────────────────────
    const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
    const internalLinks = hrefs.filter(h => !h.startsWith('http') || h.includes(url.hostname)).length;
    const externalLinks = hrefs.filter(h => h.startsWith('http') && !h.includes(url.hostname)).length;

    // ── Extra signals ────────────────────────────────────────────────────────
    const hasSchema  = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
    const isHttps    = url.protocol === 'https:';
    const sizeKb     = Math.round(contentLength / 1024);

    // ── Build checks ─────────────────────────────────────────────────────────
    const checks: SeoCheck[] = [];

    // Title
    if (!title) {
      checks.push({ id: 'title', label: 'Page Title', status: 'fail', impact: 'critical', message: 'No <title> tag found', recommendation: 'Add a unique, keyword-rich title tag between 50–60 characters.' });
    } else if (title.length < 30) {
      checks.push({ id: 'title', label: 'Page Title', status: 'warn', impact: 'high', message: `Title too short (${title.length} chars): "${title}"`, recommendation: 'Expand to 50–60 characters. Place primary keyword near the start.' });
    } else if (title.length > 60) {
      checks.push({ id: 'title', label: 'Page Title', status: 'warn', impact: 'medium', message: `Title may truncate in SERPs (${title.length} chars)`, recommendation: 'Keep under 60 characters to avoid Google truncating the title.' });
    } else {
      checks.push({ id: 'title', label: 'Page Title', status: 'pass', impact: 'critical', message: `"${title}" (${title.length} chars — ideal)` });
    }

    // Description
    if (!description) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'fail', impact: 'critical', message: 'No meta description found', recommendation: 'Write a compelling description at 120–160 characters including your primary keyword.' });
    } else if (description.length < 80) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'warn', impact: 'high', message: `Description too short (${description.length} chars)`, recommendation: 'Expand to 120–160 characters to maximise SERP snippet visibility.' });
    } else if (description.length > 160) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'warn', impact: 'medium', message: `Description may be truncated (${description.length} chars)`, recommendation: 'Trim to under 160 characters.' });
    } else {
      checks.push({ id: 'description', label: 'Meta Description', status: 'pass', impact: 'critical', message: `${description.length} chars — good length` });
    }

    // H1
    if (h1s.length === 0) {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'fail', impact: 'critical', message: 'No H1 tag found on this page', recommendation: 'Add exactly one H1 containing your primary keyword.' });
    } else if (h1s.length > 1) {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'warn', impact: 'high', message: `${h1s.length} H1 tags found — only one recommended`, recommendation: 'Use a single H1 as the main page heading.' });
    } else {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'pass', impact: 'critical', message: `"${h1s[0].slice(0, 80)}"` });
    }

    // Canonical
    if (!canonical) {
      checks.push({ id: 'canonical', label: 'Canonical URL', status: 'warn', impact: 'high', message: 'No canonical link tag found', recommendation: 'Add <link rel="canonical" href="…"> to prevent duplicate content penalties.' });
    } else {
      checks.push({ id: 'canonical', label: 'Canonical URL', status: 'pass', impact: 'high', message: canonical.slice(0, 80) });
    }

    // HTTPS
    if (!isHttps) {
      checks.push({ id: 'https', label: 'HTTPS', status: 'fail', impact: 'critical', message: 'Page served over HTTP — not secure', recommendation: 'Migrate to HTTPS. Google uses it as a ranking signal and browsers flag HTTP as insecure.' });
    } else {
      checks.push({ id: 'https', label: 'HTTPS', status: 'pass', impact: 'critical', message: 'Secure HTTPS connection confirmed' });
    }

    // Viewport
    if (!viewport) {
      checks.push({ id: 'viewport', label: 'Mobile Viewport', status: 'fail', impact: 'critical', message: 'No viewport meta tag — mobile-unfriendly', recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.' });
    } else {
      checks.push({ id: 'viewport', label: 'Mobile Viewport', status: 'pass', impact: 'critical', message: 'Mobile viewport meta tag present' });
    }

    // Open Graph
    const missingOg = [!ogTitle && 'og:title', !ogDesc && 'og:description', !ogImage && 'og:image'].filter(Boolean) as string[];
    if (missingOg.length > 0) {
      checks.push({ id: 'og', label: 'Open Graph Tags', status: 'warn', impact: 'medium', message: `Missing: ${missingOg.join(', ')}`, recommendation: 'Add complete OG tags for rich previews on social media (Twitter, LinkedIn, Facebook).' });
    } else {
      checks.push({ id: 'og', label: 'Open Graph Tags', status: 'pass', impact: 'medium', message: 'og:title, og:description, og:image all present' });
    }

    // Schema
    if (!hasSchema) {
      checks.push({ id: 'schema', label: 'Schema Markup', status: 'warn', impact: 'medium', message: 'No JSON-LD structured data detected', recommendation: 'Add schema.org markup (Person, LocalBusiness, Article) to earn rich results in Google.' });
    } else {
      checks.push({ id: 'schema', label: 'Schema Markup', status: 'pass', impact: 'medium', message: 'JSON-LD structured data found' });
    }

    // Image alt text
    if (imgTags.length > 0) {
      if (missingAlt === 0) {
        checks.push({ id: 'img-alt', label: 'Image Alt Text', status: 'pass', impact: 'high', message: `All ${imgTags.length} images have alt attributes` });
      } else {
        const ratio = missingAlt / imgTags.length;
        checks.push({ id: 'img-alt', label: 'Image Alt Text', status: ratio > 0.5 ? 'fail' : 'warn', impact: 'high', message: `${missingAlt} of ${imgTags.length} images missing alt text`, recommendation: 'Add descriptive alt attributes for accessibility and Google Image Search visibility.' });
      }
    }

    // Robots meta
    if (robots.toLowerCase().includes('noindex')) {
      checks.push({ id: 'robots', label: 'Robots Directive', status: 'fail', impact: 'critical', message: 'Page has noindex — Google will NOT index this page', recommendation: "Remove 'noindex' from the robots meta tag unless you intentionally want to hide this page." });
    } else {
      checks.push({ id: 'robots', label: 'Robots Directive', status: 'pass', impact: 'critical', message: robots ? robots : 'No robots meta (defaults to index, follow — good)' });
    }

    // TTFB
    if (ttfb > 800) {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'fail', impact: 'high', message: `TTFB: ${ttfb}ms — Google's threshold is 800ms`, recommendation: 'Optimise server, add a CDN, enable caching headers to get below 200ms.' });
    } else if (ttfb > 400) {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'warn', impact: 'high', message: `TTFB: ${ttfb}ms — within limits but improvable`, recommendation: 'CDN + server-side caching can push this under 200ms for a Core Web Vitals boost.' });
    } else {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'pass', impact: 'high', message: `TTFB: ${ttfb}ms — fast` });
    }

    // Page size
    if (sizeKb > 500) {
      checks.push({ id: 'pagesize', label: 'Page HTML Size', status: 'warn', impact: 'medium', message: `${sizeKb} KB — heavy initial HTML payload`, recommendation: 'Defer non-critical JS/CSS. Enable Gzip/Brotli compression on the server.' });
    } else {
      checks.push({ id: 'pagesize', label: 'Page HTML Size', status: 'pass', impact: 'medium', message: `${sizeKb} KB — within acceptable range` });
    }

    // Internal links
    if (internalLinks < 3) {
      checks.push({ id: 'links', label: 'Internal Links', status: 'warn', impact: 'medium', message: `Only ${internalLinks} internal link(s) detected`, recommendation: 'Add contextual internal links to distribution PageRank and improve crawl depth.' });
    } else {
      checks.push({ id: 'links', label: 'Internal Links', status: 'pass', impact: 'medium', message: `${internalLinks} internal, ${externalLinks} external links` });
    }

    // ── Score ────────────────────────────────────────────────────────────────
    const weights: Record<string, number> = { critical: 25, high: 15, medium: 8, low: 3 };
    let total = 0, earned = 0;
    for (const c of checks) {
      const w = weights[c.impact] ?? 5;
      total += w;
      if (c.status === 'pass')      earned += w;
      else if (c.status === 'warn') earned += w * 0.5;
    }
    const score = total > 0 ? Math.round((earned / total) * 100) : 0;

    const result: SeoResult = {
      url: url.toString(),
      score,
      checks,
      headings: { h1: h1s, h2: h2s, h3: h3s },
      images: { total: imgTags.length, missingAlt },
      links: { internal: internalLinks, external: externalLinks },
      performance: { ttfb, size: sizeKb },
      rawMeta: { title, description, canonical, robots, ogTitle, ogDescription: ogDesc, ogImage },
    };

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('[SEO Analyze]', err);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
