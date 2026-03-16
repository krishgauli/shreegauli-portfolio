import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Status = 'pass' | 'warn' | 'fail';
type Impact = 'critical' | 'high' | 'medium' | 'low';

interface SeoCheck {
  id: string;
  label: string;
  status: Status;
  message: string;
  impact: Impact;
  recommendation?: string;
}

interface KeywordTerm {
  term: string;
  frequency: number;
}

interface SeoResult {
  url: string;
  score: number;
  checks: SeoCheck[];
  headings: { h1: string[]; h2: string[]; h3: string[] };
  images: { total: number; missingAlt: number };
  links: { internal: number; external: number };
  performance: { ttfb: number; size: number };
  keywords: { topTerms: KeywordTerm[]; wordCount: number };
  authority: { rank: number | null; referringDomains: number | null };
  rawMeta: {
    title: string;
    description: string;
    canonical: string;
    robots: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    twitterTitle: string;
    twitterImage: string;
    lang: string;
  };
}

function extractMeta(html: string, name: string): string {
  const re1 = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`, 'i');
  return (html.match(re1) ?? html.match(re2))?.[1]?.trim() ?? '';
}

function extractProperty(html: string, property: string): string {
  const re1 = new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i');
  return (html.match(re1) ?? html.match(re2))?.[1]?.trim() ?? '';
}

function sanitizeText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTopTerms(text: string): { topTerms: KeywordTerm[]; wordCount: number } {
  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'this', 'that', 'you', 'your', 'from', 'have', 'are', 'was', 'were', 'will',
    'can', 'has', 'had', 'they', 'their', 'them', 'about', 'into', 'than', 'then', 'there', 'here', 'when',
    'what', 'which', 'who', 'why', 'how', 'our', 'out', 'all', 'not', 'but', 'use', 'using', 'also', 'more',
    'get', 'new', 'any', 'each', 'over', 'under', 'after', 'before', 'between', 'where', 'while', 'through',
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word));

  const unigramCount = new Map<string, number>();
  const bigramCount = new Map<string, number>();

  for (let i = 0; i < words.length; i += 1) {
    const unigram = words[i];
    unigramCount.set(unigram, (unigramCount.get(unigram) ?? 0) + 1);

    if (i < words.length - 1) {
      const bigram = `${words[i]} ${words[i + 1]}`;
      bigramCount.set(bigram, (bigramCount.get(bigram) ?? 0) + 1);
    }
  }

  const topUnigrams = [...unigramCount.entries()]
    .filter(([, count]) => count > 1)
    .map(([term, frequency]) => ({ term, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 12);

  const topBigrams = [...bigramCount.entries()]
    .filter(([, count]) => count > 1)
    .map(([term, frequency]) => ({ term, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 8);

  return {
    topTerms: [...topUnigrams, ...topBigrams].slice(0, 20),
    wordCount: words.length,
  };
}

async function getOpenPageRankAuthority(hostname: string): Promise<{ rank: number | null; referringDomains: number | null }> {
  const apiKey = process.env.OPENPAGERANK_API_KEY;
  if (!apiKey) {
    return { rank: null, referringDomains: null };
  }

  try {
    const response = await fetch(
      `https://openpagerank.com/api/v1.0/getPageRank?domains%5B0%5D=${encodeURIComponent(hostname)}`,
      {
        headers: {
          'API-OPR': apiKey,
        },
        next: { revalidate: 60 * 60 },
      }
    );

    if (!response.ok) return { rank: null, referringDomains: null };

    const data = await response.json();
    const first = data?.response?.[0];

    return {
      rank: typeof first?.page_rank_decimal === 'number' ? first.page_rank_decimal : null,
      referringDomains: typeof first?.rank === 'string' ? Number(first.rank) || null : null,
    };
  } catch {
    return { rank: null, referringDomains: null };
  }
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
        headers: { 'User-Agent': 'SEOAuditBot/2.0 (+https://shreegauli.com)' },
        signal: AbortSignal.timeout(15000),
      });
      const buf = await res.arrayBuffer();
      contentLength = buf.byteLength;
      html = new TextDecoder().decode(buf);
    } catch (error: unknown) {
      if (error instanceof Error) {
        fetchError = error.message;
      } else {
        fetchError = 'Failed to fetch URL';
      }
    }

    const ttfb = Date.now() - startTime;
    if (!html) return NextResponse.json({ error: fetchError || 'Empty response from URL' }, { status: 400 });

    const title = (html.match(/<title[^>]*>([^<]{1,220})<\/title>/i)?.[1] ?? '').trim();
    const description = extractMeta(html, 'description');
    const canonical = (
      html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ??
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)
    )?.[1]?.trim() ?? '';
    const robots = extractMeta(html, 'robots');
    const viewport = extractMeta(html, 'viewport');
    const charset = (html.match(/<meta[^>]+charset=["']?([^"'\s>]+)/i)?.[1] ?? '').trim();

    const ogTitle = extractProperty(html, 'og:title');
    const ogDescription = extractProperty(html, 'og:description');
    const ogImage = extractProperty(html, 'og:image');
    const twitterCard = extractMeta(html, 'twitter:card');
    const twitterTitle = extractMeta(html, 'twitter:title');
    const twitterImage = extractMeta(html, 'twitter:image');

    const htmlLang = (html.match(/<html[^>]+lang=["']([^"']+)["']/i)?.[1] ?? '').trim();
    const hasSchema = /<script[^>]+type=["']application\/ld\+json["']/i.test(html);
    const hasFavicon = /<link[^>]+rel=["'][^"']*icon[^"']*["'][^>]*>/i.test(html);

    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => sanitizeText(m[1])).filter(Boolean);
    const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => sanitizeText(m[1])).filter(Boolean).slice(0, 15);
    const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map((m) => sanitizeText(m[1])).filter(Boolean).slice(0, 10);

    const imgTags = [...html.matchAll(/<img[^>]+>/gi)].map((m) => m[0]);
    const missingAlt = imgTags.filter((tag) => !/alt=["'][^"']+["']/i.test(tag)).length;

    const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((m) => m[1]);
    const internalLinks = hrefs.filter((href) => !href.startsWith('http') || href.includes(url.hostname)).length;
    const externalLinks = hrefs.filter((href) => href.startsWith('http') && !href.includes(url.hostname)).length;

    const bodyText = sanitizeText(html);
    const keywordStats = extractTopTerms(bodyText);
    const sizeKb = Math.round(contentLength / 1024);
    const isHttps = url.protocol === 'https:';

    const trustedDomains = ['wikipedia.org', 'google.com', 'github.com', 'gov', 'edu', 'forbes.com', 'nytimes.com'];
    const authorityOutboundLinks = hrefs.filter((href) => trustedDomains.some((domain) => href.includes(domain))).length;

    const checks: SeoCheck[] = [];

    if (!title) {
      checks.push({ id: 'title', label: 'Page Title', status: 'fail', impact: 'critical', message: 'No <title> tag found', recommendation: 'Add a unique 50–60 character title with your primary keyword.' });
    } else if (title.length < 30) {
      checks.push({ id: 'title', label: 'Page Title', status: 'warn', impact: 'high', message: `Title too short (${title.length} chars)`, recommendation: 'Expand the title to 50–60 characters.' });
    } else if (title.length > 60) {
      checks.push({ id: 'title', label: 'Page Title', status: 'warn', impact: 'medium', message: `Title may truncate (${title.length} chars)`, recommendation: 'Keep title under 60 characters for SERP display.' });
    } else {
      checks.push({ id: 'title', label: 'Page Title', status: 'pass', impact: 'critical', message: `Good title length (${title.length} chars)` });
    }

    if (!description) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'fail', impact: 'critical', message: 'No meta description found', recommendation: 'Write a compelling 120–160 character description.' });
    } else if (description.length < 90) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'warn', impact: 'high', message: `Description too short (${description.length} chars)`, recommendation: 'Expand to improve click-through from search.' });
    } else if (description.length > 160) {
      checks.push({ id: 'description', label: 'Meta Description', status: 'warn', impact: 'medium', message: `Description may truncate (${description.length} chars)`, recommendation: 'Keep it under 160 characters.' });
    } else {
      checks.push({ id: 'description', label: 'Meta Description', status: 'pass', impact: 'critical', message: `${description.length} chars — optimal` });
    }

    if (h1s.length === 0) {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'fail', impact: 'critical', message: 'No H1 heading found', recommendation: 'Add one clear H1 that reflects search intent.' });
    } else if (h1s.length > 1) {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'warn', impact: 'high', message: `${h1s.length} H1 tags found`, recommendation: 'Use one primary H1 for the page topic.' });
    } else {
      checks.push({ id: 'h1', label: 'H1 Heading', status: 'pass', impact: 'critical', message: `H1 present: ${h1s[0].slice(0, 72)}` });
    }

    checks.push(
      canonical
        ? { id: 'canonical', label: 'Canonical URL', status: 'pass', impact: 'high', message: canonical.slice(0, 100) }
        : { id: 'canonical', label: 'Canonical URL', status: 'warn', impact: 'high', message: 'Canonical tag missing', recommendation: 'Add canonical URL to avoid duplicate indexing issues.' }
    );

    checks.push(
      isHttps
        ? { id: 'https', label: 'HTTPS', status: 'pass', impact: 'critical', message: 'Secure HTTPS connection enabled' }
        : { id: 'https', label: 'HTTPS', status: 'fail', impact: 'critical', message: 'Site is not served over HTTPS', recommendation: 'Enable SSL/TLS for trust and ranking benefit.' }
    );

    checks.push(
      viewport
        ? { id: 'viewport', label: 'Mobile Viewport', status: 'pass', impact: 'critical', message: 'Viewport meta tag is present' }
        : { id: 'viewport', label: 'Mobile Viewport', status: 'fail', impact: 'critical', message: 'Viewport tag missing', recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">.' }
    );

    checks.push(
      htmlLang
        ? { id: 'html-lang', label: 'HTML Lang Attribute', status: 'pass', impact: 'high', message: `lang="${htmlLang}"` }
        : { id: 'html-lang', label: 'HTML Lang Attribute', status: 'warn', impact: 'high', message: 'No lang attribute on <html>', recommendation: 'Set <html lang="en"> (or your language) to improve language targeting.' }
    );

    checks.push(
      charset
        ? { id: 'charset', label: 'Character Encoding', status: 'pass', impact: 'medium', message: `charset=${charset}` }
        : { id: 'charset', label: 'Character Encoding', status: 'warn', impact: 'medium', message: 'Charset meta missing', recommendation: 'Add <meta charset="utf-8"> to avoid encoding issues.' }
    );

    checks.push(
      hasFavicon
        ? { id: 'favicon', label: 'Favicon', status: 'pass', impact: 'low', message: 'Favicon link tag found' }
        : { id: 'favicon', label: 'Favicon', status: 'warn', impact: 'low', message: 'Favicon link not found', recommendation: 'Add a favicon for brand identity in browser tabs and SERPs.' }
    );

    const ogMissing = [!ogTitle && 'og:title', !ogDescription && 'og:description', !ogImage && 'og:image'].filter(Boolean) as string[];
    checks.push(
      ogMissing.length
        ? { id: 'og', label: 'Open Graph', status: 'warn', impact: 'medium', message: `Missing ${ogMissing.join(', ')}`, recommendation: 'Add full OG tags for better social previews.' }
        : { id: 'og', label: 'Open Graph', status: 'pass', impact: 'medium', message: 'All key Open Graph tags exist' }
    );

    const twitterMissing = [!twitterCard && 'twitter:card', !twitterTitle && 'twitter:title', !twitterImage && 'twitter:image'].filter(Boolean) as string[];
    checks.push(
      twitterMissing.length
        ? { id: 'twitter', label: 'Twitter Cards', status: 'warn', impact: 'low', message: `Missing ${twitterMissing.join(', ')}`, recommendation: 'Add Twitter card tags for stronger social snippets.' }
        : { id: 'twitter', label: 'Twitter Cards', status: 'pass', impact: 'low', message: 'Twitter tags complete' }
    );

    checks.push(
      hasSchema
        ? { id: 'schema', label: 'Structured Data', status: 'pass', impact: 'medium', message: 'JSON-LD schema detected' }
        : { id: 'schema', label: 'Structured Data', status: 'warn', impact: 'medium', message: 'No JSON-LD schema found', recommendation: 'Add schema markup to increase rich result eligibility.' }
    );

    if (imgTags.length > 0) {
      if (missingAlt === 0) {
        checks.push({ id: 'img-alt', label: 'Image Alt Text', status: 'pass', impact: 'high', message: `All ${imgTags.length} images have alt text` });
      } else {
        checks.push({ id: 'img-alt', label: 'Image Alt Text', status: missingAlt / imgTags.length > 0.5 ? 'fail' : 'warn', impact: 'high', message: `${missingAlt}/${imgTags.length} images missing alt`, recommendation: 'Add descriptive alt text for accessibility and image SEO.' });
      }
    }

    checks.push(
      robots.toLowerCase().includes('noindex')
        ? { id: 'robots', label: 'Robots Directive', status: 'fail', impact: 'critical', message: 'Page has noindex directive', recommendation: 'Remove noindex if this page should rank.' }
        : { id: 'robots', label: 'Robots Directive', status: 'pass', impact: 'critical', message: robots || 'No robots tag (default index/follow)' }
    );

    if (ttfb > 800) {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'fail', impact: 'high', message: `TTFB ${ttfb}ms`, recommendation: 'Use CDN caching and optimize server response.' });
    } else if (ttfb > 400) {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'warn', impact: 'high', message: `TTFB ${ttfb}ms`, recommendation: 'Aim below 400ms for better UX.' });
    } else {
      checks.push({ id: 'ttfb', label: 'Server Response Time', status: 'pass', impact: 'high', message: `TTFB ${ttfb}ms` });
    }

    checks.push(
      sizeKb > 500
        ? { id: 'pagesize', label: 'HTML Size', status: 'warn', impact: 'medium', message: `${sizeKb} KB`, recommendation: 'Reduce HTML/inline script payload size.' }
        : { id: 'pagesize', label: 'HTML Size', status: 'pass', impact: 'medium', message: `${sizeKb} KB` }
    );

    checks.push(
      internalLinks < 3
        ? { id: 'links', label: 'Internal Linking', status: 'warn', impact: 'medium', message: `${internalLinks} internal links`, recommendation: 'Add contextual internal links to key pages.' }
        : { id: 'links', label: 'Internal Linking', status: 'pass', impact: 'medium', message: `${internalLinks} internal, ${externalLinks} external` }
    );

    if (keywordStats.wordCount < 300) {
      checks.push({ id: 'wordcount', label: 'Content Depth', status: 'fail', impact: 'high', message: `Only ${keywordStats.wordCount} indexable words`, recommendation: 'Expand topic depth to at least 600+ words where relevant.' });
    } else if (keywordStats.wordCount < 600) {
      checks.push({ id: 'wordcount', label: 'Content Depth', status: 'warn', impact: 'medium', message: `${keywordStats.wordCount} words`, recommendation: 'Consider expanding content depth for broader intent coverage.' });
    } else {
      checks.push({ id: 'wordcount', label: 'Content Depth', status: 'pass', impact: 'medium', message: `${keywordStats.wordCount} words` });
    }

    checks.push(
      authorityOutboundLinks > 0
        ? { id: 'authority-outbound', label: 'Authority Outbound Links', status: 'pass', impact: 'low', message: `${authorityOutboundLinks} trusted outbound links found` }
        : { id: 'authority-outbound', label: 'Authority Outbound Links', status: 'warn', impact: 'low', message: 'No trusted outbound references detected', recommendation: 'Reference authoritative sources where relevant to strengthen trust signals.' }
    );

    const weights: Record<Impact, number> = {
      critical: 25,
      high: 15,
      medium: 8,
      low: 3,
    };

    let total = 0;
    let earned = 0;
    for (const check of checks) {
      const w = weights[check.impact];
      total += w;
      if (check.status === 'pass') earned += w;
      if (check.status === 'warn') earned += w * 0.5;
    }

    const score = total > 0 ? Math.round((earned / total) * 100) : 0;
    const authority = await getOpenPageRankAuthority(url.hostname);

    const result: SeoResult = {
      url: url.toString(),
      score,
      checks,
      headings: { h1: h1s, h2: h2s, h3: h3s },
      images: { total: imgTags.length, missingAlt },
      links: { internal: internalLinks, external: externalLinks },
      performance: { ttfb, size: sizeKb },
      keywords: keywordStats,
      authority,
      rawMeta: {
        title,
        description,
        canonical,
        robots,
        ogTitle,
        ogDescription,
        ogImage,
        twitterCard,
        twitterTitle,
        twitterImage,
        lang: htmlLang,
      },
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error('[SEO Analyze]', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
