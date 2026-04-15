/**
 * Per-page HTML analyzer — uses cheerio to extract all SEO-relevant data
 * from a single crawled page.
 */

import * as cheerio from 'cheerio';
import { createHash } from 'crypto';
import type { CrawlPageData } from './crawler';
import type { PageAuditResult, PageLink, PageImage, ResourceRef } from '@/types/site-audit';

function stripTags(html: string): string {
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

function textClean(t: string): string {
  return t.replace(/\s+/g, ' ').trim();
}

export function analyzePage(crawl: CrawlPageData): PageAuditResult {
  const $ = crawl.html ? cheerio.load(crawl.html) : null;

  // ─── Base result for error pages ───
  const emptyResult: PageAuditResult = {
    url: crawl.url,
    statusCode: crawl.statusCode,
    redirectedTo: crawl.redirectChain.length > 0 ? crawl.finalUrl : null,
    redirectChain: crawl.redirectChain,
    crawlDepth: crawl.crawlDepth,
    title: '',
    metaDescription: '',
    canonical: '',
    robots: '',
    xRobotsTag: crawl.headers['x-robots-tag'] || '',
    viewport: '',
    charset: '',
    lang: '',
    doctype: false,
    h1s: [],
    h2s: [],
    h3s: [],
    wordCount: 0,
    textToHtmlRatio: 0,
    contentHash: '',
    links: [],
    internalLinkCount: 0,
    externalLinkCount: 0,
    images: [],
    totalImages: 0,
    missingAltCount: 0,
    resources: [],
    schemaTypes: [],
    schemaErrors: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: '',
    twitterTitle: '',
    twitterImage: '',
    ttfb: crawl.ttfb,
    htmlSize: crawl.htmlSize,
    headers: crawl.headers,
    semanticElements: {
      hasMain: false,
      hasNav: false,
      hasArticle: false,
      hasSection: false,
      hasAside: false,
      hasHeader: false,
      hasFooter: false,
      score: 0,
    },
    fetchError: crawl.fetchError,
  };

  if (!$ || crawl.fetchError) return emptyResult;

  // ─── Meta tags ───
  const title = textClean($('title').first().text());
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const canonical = $('link[rel="canonical"]').attr('href')?.trim() || '';
  const robots = $('meta[name="robots"]').attr('content')?.trim() || '';
  const viewport = $('meta[name="viewport"]').attr('content')?.trim() || '';
  const charset = ($('meta[charset]').attr('charset') || '').trim() ||
    ($('meta[http-equiv="Content-Type"]').attr('content')?.match(/charset=([^\s;]+)/i)?.[1] || '').trim();
  const lang = ($('html').attr('lang') || '').trim();
  const doctype = crawl.html.trimStart().substring(0, 15).toLowerCase().startsWith('<!doctype');

  // ─── Open Graph ───
  const ogTitle = $('meta[property="og:title"]').attr('content')?.trim() || '';
  const ogDescription = $('meta[property="og:description"]').attr('content')?.trim() || '';
  const ogImage = $('meta[property="og:image"]').attr('content')?.trim() || '';

  // ─── Twitter Cards ───
  const twitterCard = $('meta[name="twitter:card"]').attr('content')?.trim() || '';
  const twitterTitle = $('meta[name="twitter:title"]').attr('content')?.trim() || '';
  const twitterImage = $('meta[name="twitter:image"]').attr('content')?.trim() || '';

  // ─── Headings ───
  const h1s = $('h1').map((_, el) => textClean($(el).text())).get().filter(Boolean);
  const h2s = $('h2').map((_, el) => textClean($(el).text())).get().filter(Boolean).slice(0, 20);
  const h3s = $('h3').map((_, el) => textClean($(el).text())).get().filter(Boolean).slice(0, 15);

  // ─── Content stats ───
  const bodyText = stripTags(crawl.html);
  const wordCount = bodyText.split(/\s+/).filter((w) => w.length > 0).length;
  const textLength = bodyText.length;
  const htmlLength = crawl.html.length;
  const textToHtmlRatio = htmlLength > 0 ? Math.round((textLength / htmlLength) * 100) : 0;
  const contentHash = createHash('md5').update(bodyText.toLowerCase().slice(0, 5000)).digest('hex');

  // ─── Links ───
  const pageOrigin = new URL(crawl.finalUrl || crawl.url).origin;
  const links: PageLink[] = [];

  $('a[href]').each((_, el) => {
    const raw = $(el).attr('href') || '';
    if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return;

    try {
      const resolved = new URL(raw, crawl.finalUrl || crawl.url).toString();
      const isInternal = new URL(resolved).origin === pageOrigin;
      const rel = ($(el).attr('rel') || '').toLowerCase();
      links.push({
        href: resolved,
        anchorText: textClean($(el).text()).slice(0, 200),
        isInternal,
        isNofollow: rel.includes('nofollow'),
      });
    } catch { /* malformed */ }
  });

  const internalLinkCount = links.filter((l) => l.isInternal).length;
  const externalLinkCount = links.filter((l) => !l.isInternal).length;

  // ─── Images ───
  const images: PageImage[] = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    const alt = $(el).attr('alt') || '';
    images.push({ src, alt, hasAlt: $(el).attr('alt') !== undefined && alt.trim().length > 0 });
  });

  const totalImages = images.length;
  const missingAltCount = images.filter((i) => !i.hasAlt).length;

  // ─── Resources (JS / CSS) ───
  const resources: ResourceRef[] = [];
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      try {
        resources.push({ url: new URL(src, crawl.finalUrl || crawl.url).toString(), type: 'script' });
      } catch { /* relative URL failed */ }
    }
  });
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        resources.push({ url: new URL(href, crawl.finalUrl || crawl.url).toString(), type: 'stylesheet' });
      } catch { /* relative URL failed */ }
    }
  });

  // ─── Structured data ───
  const schemaTypes: string[] = [];
  const schemaErrors: string[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).html();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item['@type']) {
          const types = Array.isArray(item['@type']) ? item['@type'] : [item['@type']];
          schemaTypes.push(...types);
        }
        if (item['@graph'] && Array.isArray(item['@graph'])) {
          for (const g of item['@graph']) {
            if (g['@type']) {
              const gt = Array.isArray(g['@type']) ? g['@type'] : [g['@type']];
              schemaTypes.push(...gt);
            }
          }
        }
      }
    } catch (e) {
      schemaErrors.push(e instanceof Error ? e.message : 'Invalid JSON-LD');
    }
  });

  // ─── Semantic HTML ───
  const semanticElements = {
    hasMain: $('main').length > 0,
    hasNav: $('nav').length > 0,
    hasArticle: $('article').length > 0,
    hasSection: $('section').length > 0,
    hasAside: $('aside').length > 0,
    hasHeader: $('header').length > 0,
    hasFooter: $('footer').length > 0,
    score: 0,
  };
  semanticElements.score = [
    semanticElements.hasMain,
    semanticElements.hasNav,
    semanticElements.hasArticle,
    semanticElements.hasSection,
    semanticElements.hasAside,
    semanticElements.hasHeader,
    semanticElements.hasFooter,
  ].filter(Boolean).length;

  return {
    url: crawl.url,
    statusCode: crawl.statusCode,
    redirectedTo: crawl.redirectChain.length > 0 ? crawl.finalUrl : null,
    redirectChain: crawl.redirectChain,
    crawlDepth: crawl.crawlDepth,
    title,
    metaDescription,
    canonical,
    robots,
    xRobotsTag: crawl.headers['x-robots-tag'] || '',
    viewport,
    charset,
    lang,
    doctype,
    h1s,
    h2s,
    h3s,
    wordCount,
    textToHtmlRatio,
    contentHash,
    links,
    internalLinkCount,
    externalLinkCount,
    images,
    totalImages,
    missingAltCount,
    resources,
    schemaTypes,
    schemaErrors,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterImage,
    ttfb: crawl.ttfb,
    htmlSize: crawl.htmlSize,
    headers: crawl.headers,
    semanticElements,
    fetchError: crawl.fetchError,
  };
}
