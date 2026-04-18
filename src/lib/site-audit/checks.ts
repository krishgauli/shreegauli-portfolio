/**
 * Issue checker — runs ~50 SEO checks across all crawled pages and produces
 * categorised issues matching SEMrush site audit columns.
 */

import type {
  PageAuditResult,
  SiteAuditIssue,
  AffectedPage,
  IssueCategory,
  IssueSeverity,
  SiteAuditResult,
} from '@/types/site-audit';

import {
  findDuplicateTitles,
  findDuplicateDescriptions,
  findDuplicateContent,
  findBrokenInternalLinks,
  findOrphanedPages,
  findRedirectChains,
  findDeepPages,
  findInternalNofollowLinks,
  findPoorlyLinkedPages,
} from './cross-analyzer';

/* ─── Helper to push an issue only if it has affected pages ─── */

function push(
  issues: SiteAuditIssue[],
  id: string,
  category: IssueCategory,
  severity: IssueSeverity,
  title: string,
  description: string,
  affectedPages: AffectedPage[],
) {
  if (affectedPages.length === 0) return;
  issues.push({ id, category, severity, title, description, affectedPages });
}

/* ─── Main check runner ─── */

export function runAllChecks(pages: PageAuditResult[]): SiteAuditIssue[] {
  const issues: SiteAuditIssue[] = [];
  const htmlPages = pages.filter((p) => p.statusCode >= 200 && p.statusCode < 400 && !p.fetchError);

  // ═══════════════════════════════════
  //  CRAWLABILITY
  // ═══════════════════════════════════

  // 5xx errors
  push(issues, 'errors-5xx', 'crawlability', 'error',
    '5xx server errors',
    'Pages returning 5xx status codes are broken and invisible to search engines.',
    pages.filter((p) => p.statusCode >= 500).map((p) => ({ url: p.url, detail: `Status ${p.statusCode}` })),
  );

  // 4xx errors
  push(issues, 'errors-4xx', 'crawlability', 'error',
    '4xx client errors',
    'Pages returning 4xx status codes (like 404) cannot be indexed.',
    pages.filter((p) => p.statusCode >= 400 && p.statusCode < 500).map((p) => ({ url: p.url, detail: `Status ${p.statusCode}` })),
  );

  // Fetch failures
  push(issues, 'fetch-errors', 'crawlability', 'error',
    'Pages that could not be fetched',
    'These pages failed to load — they may be down, timing out, or blocking our crawler.',
    pages.filter((p) => p.fetchError).map((p) => ({ url: p.url, detail: p.fetchError || 'Unknown error' })),
  );

  // Broken internal links
  const brokenLinks = findBrokenInternalLinks(pages);
  push(issues, 'broken-internal-links', 'crawlability', 'error',
    'Broken internal links',
    'Internal links pointing to pages with 4xx/5xx status hurt crawlability and user experience.',
    brokenLinks.map((b) => ({ url: b.sourceUrl, detail: `Links to ${b.targetUrl} (${b.statusCode})` })),
  );

  // Redirect chains
  const chains = findRedirectChains(pages);
  push(issues, 'redirect-chains', 'crawlability', 'warning',
    'Redirect chains and loops',
    'Pages with more than one redirect hop lose PageRank and slow down crawling.',
    chains.map((c) => ({ url: c.url, detail: `${c.length} redirects: ${c.chain.join(' → ')}` })),
  );

  // Temporary redirects (302, 307)
  push(issues, 'temporary-redirects', 'crawlability', 'warning',
    'Temporary redirects',
    '302/307 redirects do not pass full link equity. Switch to 301 if permanent.',
    pages.filter((p) => p.statusCode === 302 || p.statusCode === 307).map((p) => ({
      url: p.url, detail: `${p.statusCode} redirect to ${p.redirectedTo || 'unknown'}`,
    })),
  );

  // Permanent redirects (informational)
  push(issues, 'permanent-redirects', 'crawlability', 'notice',
    'Permanent redirects',
    'These pages return 301/308 redirects. Ensure internal links point directly to final URLs.',
    pages.filter((p) => (p.statusCode === 301 || p.statusCode === 308) && p.redirectChain.length > 0).map((p) => ({
      url: p.url, detail: `Redirects to ${p.redirectedTo || 'unknown'}`,
    })),
  );

  // Blocked by robots/noindex
  push(issues, 'noindex-pages', 'crawlability', 'warning',
    'Blocked by noindex directive',
    'Pages with noindex will not appear in search results.',
    htmlPages.filter((p) => p.robots.toLowerCase().includes('noindex') || p.xRobotsTag.toLowerCase().includes('noindex')).map((p) => ({
      url: p.url, detail: p.robots ? `meta robots: ${p.robots}` : `X-Robots-Tag: ${p.xRobotsTag}`,
    })),
  );

  // Orphaned pages
  const orphaned = findOrphanedPages(pages);
  push(issues, 'orphaned-pages', 'crawlability', 'warning',
    'Orphaned pages',
    'These pages are not linked from any other page on the site — search engines may not discover them.',
    orphaned.map((url) => ({ url, detail: 'No internal links pointing to this page' })),
  );

  // Deep pages (crawl depth > 3)
  const deep = findDeepPages(pages, 3);
  push(issues, 'deep-pages', 'crawlability', 'warning',
    'Pages with deep crawl depth',
    'Pages more than 3 clicks from the homepage may receive less crawl attention and link equity.',
    deep.map((d) => ({ url: d.url, detail: `Crawl depth: ${d.depth}` })),
  );

  // ═══════════════════════════════════
  //  HTTPS & SECURITY
  // ═══════════════════════════════════

  // Non-secure pages
  push(issues, 'non-secure', 'https', 'error',
    'Non-secure pages (HTTP)',
    'Pages served over HTTP are flagged as insecure by browsers and penalised by search engines.',
    htmlPages.filter((p) => p.url.startsWith('http://')).map((p) => ({ url: p.url, detail: 'Served over HTTP' })),
  );

  // Mixed content (HTTP resources on HTTPS page)
  push(issues, 'mixed-content', 'https', 'warning',
    'Mixed content',
    'HTTPS pages loading resources over HTTP trigger browser warnings.',
    htmlPages.filter((p) => {
      if (!p.url.startsWith('https://')) return false;
      return p.resources.some((r) => r.url.startsWith('http://'));
    }).map((p) => ({
      url: p.url,
      detail: `${p.resources.filter((r) => r.url.startsWith('http://')).length} insecure resource(s)`,
    })),
  );

  // No HSTS
  push(issues, 'no-hsts', 'https', 'notice',
    'No HSTS support',
    'Strict-Transport-Security header is missing. HSTS forces browsers to use HTTPS.',
    htmlPages.filter((p) => p.url.startsWith('https://') && !p.headers['strict-transport-security']).map((p) => ({
      url: p.url, detail: 'Missing Strict-Transport-Security header',
    })),
  );

  // Links to HTTP from HTTPS
  push(issues, 'links-to-http', 'https', 'warning',
    'HTTPS pages linking to HTTP',
    'Internal links pointing to HTTP URLs create mixed navigation and potential redirect overhead.',
    htmlPages.filter((p) => {
      if (!p.url.startsWith('https://')) return false;
      return p.links.some((l) => l.isInternal && l.href.startsWith('http://'));
    }).map((p) => ({
      url: p.url,
      detail: `${p.links.filter((l) => l.isInternal && l.href.startsWith('http://')).length} HTTP internal link(s)`,
    })),
  );

  // ═══════════════════════════════════
  //  CONTENT
  // ═══════════════════════════════════

  // Missing title
  push(issues, 'missing-title', 'content', 'error',
    'Missing page title',
    'Pages without a <title> tag will show poorly in search results.',
    htmlPages.filter((p) => !p.title).map((p) => ({ url: p.url, detail: 'No <title> tag found' })),
  );

  // Title too short
  push(issues, 'title-too-short', 'content', 'warning',
    'Title too short',
    'Titles under 30 characters may not effectively describe the page or target keywords.',
    htmlPages.filter((p) => p.title && p.title.length < 30).map((p) => ({
      url: p.url, detail: `${p.title.length} characters: "${p.title}"`,
    })),
  );

  // Title too long
  push(issues, 'title-too-long', 'content', 'warning',
    'Title too long',
    'Titles over 60 characters get truncated in search results.',
    htmlPages.filter((p) => p.title && p.title.length > 60).map((p) => ({
      url: p.url, detail: `${p.title.length} characters: "${p.title.slice(0, 70)}…"`,
    })),
  );

  // Duplicate titles
  const dupTitles = findDuplicateTitles(htmlPages);
  for (const group of dupTitles) {
    push(issues, `dup-title-${issues.length}`, 'content', 'warning',
      'Duplicate title tag',
      'Multiple pages share the same title, making it harder for search engines to differentiate them.',
      group.pages.map((url) => ({ url, detail: `Shared title: "${group.value.slice(0, 60)}"` })),
    );
  }

  // Missing meta description
  push(issues, 'missing-description', 'content', 'warning',
    'Missing meta description',
    'Pages without meta descriptions may get poor click-through rates from search results.',
    htmlPages.filter((p) => !p.metaDescription).map((p) => ({ url: p.url, detail: 'No meta description' })),
  );

  // Duplicate meta descriptions
  const dupDescs = findDuplicateDescriptions(htmlPages);
  for (const group of dupDescs) {
    push(issues, `dup-desc-${issues.length}`, 'content', 'warning',
      'Duplicate meta description',
      'Multiple pages share the same meta description.',
      group.pages.map((url) => ({ url, detail: `Shared: "${group.value.slice(0, 80)}"` })),
    );
  }

  // Missing H1
  push(issues, 'missing-h1', 'content', 'error',
    'Missing H1 heading',
    'Every page should have one clear H1 heading that describes the main topic.',
    htmlPages.filter((p) => p.h1s.length === 0).map((p) => ({ url: p.url, detail: 'No H1 found' })),
  );

  // Multiple H1
  push(issues, 'multiple-h1', 'content', 'warning',
    'Multiple H1 tags',
    'Using more than one H1 can confuse search engines about the page\'s primary topic.',
    htmlPages.filter((p) => p.h1s.length > 1).map((p) => ({
      url: p.url, detail: `${p.h1s.length} H1 tags found`,
    })),
  );

  // Duplicate H1 and title
  push(issues, 'h1-title-duplicate', 'content', 'notice',
    'Duplicate content in H1 and title',
    'H1 and title are identical — using slightly different wording can target more keywords.',
    htmlPages.filter((p) => p.title && p.h1s.length > 0 && p.h1s[0].toLowerCase() === p.title.toLowerCase()).map((p) => ({
      url: p.url, detail: `Both are: "${p.title.slice(0, 60)}"`,
    })),
  );

  // Low word count
  push(issues, 'low-word-count', 'content', 'warning',
    'Low word count',
    'Pages with fewer than 300 words may be considered thin content by search engines.',
    htmlPages.filter((p) => p.wordCount < 300 && p.wordCount > 0).map((p) => ({
      url: p.url, detail: `${p.wordCount} words`,
    })),
  );

  // Low text-to-HTML ratio
  push(issues, 'low-text-ratio', 'content', 'notice',
    'Low text to HTML ratio',
    'Pages with less than 10% text-to-HTML ratio may have too much code relative to content.',
    htmlPages.filter((p) => p.textToHtmlRatio < 10 && p.textToHtmlRatio > 0).map((p) => ({
      url: p.url, detail: `${p.textToHtmlRatio}% text-to-HTML ratio`,
    })),
  );

  // Too much content
  push(issues, 'too-much-content', 'content', 'notice',
    'Too much content',
    'Extremely long pages (10,000+ words) may lose reader engagement.',
    htmlPages.filter((p) => p.wordCount > 10000).map((p) => ({
      url: p.url, detail: `${p.wordCount} words`,
    })),
  );

  // Duplicate content (by hash)
  const dupContent = findDuplicateContent(htmlPages);
  for (const group of dupContent) {
    push(issues, `dup-content-${issues.length}`, 'content', 'warning',
      'Duplicate content',
      'Multiple pages have very similar content, which can cause keyword cannibalisation.',
      group.pages.map((url) => ({ url, detail: 'Content matches other page(s)' })),
    );
  }

  // Missing lang attribute
  push(issues, 'missing-lang', 'content', 'warning',
    'Missing lang attribute',
    'The <html> element should have a lang attribute for accessibility and language targeting.',
    htmlPages.filter((p) => !p.lang).map((p) => ({ url: p.url, detail: 'No lang attribute on <html>' })),
  );

  // Missing charset
  push(issues, 'missing-charset', 'content', 'notice',
    'Encoding not declared',
    'Declaring character encoding prevents text rendering issues.',
    htmlPages.filter((p) => !p.charset).map((p) => ({ url: p.url, detail: 'No charset declared' })),
  );

  // Missing doctype
  push(issues, 'missing-doctype', 'content', 'notice',
    'Doctype not declared',
    'Missing <!DOCTYPE html> can trigger quirks mode rendering.',
    htmlPages.filter((p) => !p.doctype).map((p) => ({ url: p.url, detail: 'No DOCTYPE declaration' })),
  );

  // JavaScript-rendered (SPA) pages
  push(issues, 'js-rendered', 'content', 'warning',
    'JavaScript-rendered pages detected',
    'These pages appear to render content primarily via client-side JavaScript. Search engine crawlers may not see the full content. Consider server-side rendering (SSR) or static generation for better SEO.',
    htmlPages.filter((p) => p.likelyJsRendered).map((p) => ({
      url: p.url,
      detail: `${p.wordCount} words in raw HTML, ${p.resources.filter((r) => r.type === 'script').length} script files`,
    })),
  );

  // Missing viewport
  push(issues, 'missing-viewport', 'content', 'error',
    'Viewport not configured',
    'Pages without a viewport meta tag won\'t render properly on mobile devices.',
    htmlPages.filter((p) => !p.viewport).map((p) => ({ url: p.url, detail: 'No viewport meta tag' })),
  );

  // ═══════════════════════════════════
  //  LINKS
  // ═══════════════════════════════════

  // Pages with only one internal link
  const poorlyLinked = findPoorlyLinkedPages(pages);
  push(issues, 'low-internal-links', 'links', 'warning',
    'Pages with only one internal link',
    'Pages with very few incoming internal links receive less PageRank and may be hard for crawlers to find.',
    poorlyLinked.map((p) => ({ url: p.url, detail: `${p.incomingCount} incoming internal link(s)` })),
  );

  // Too many on-page links
  push(issues, 'too-many-links', 'links', 'notice',
    'Too many on-page links',
    'Pages with over 100 links may dilute link equity and overwhelm users.',
    htmlPages.filter((p) => p.links.length > 100).map((p) => ({
      url: p.url, detail: `${p.links.length} total links`,
    })),
  );

  // Links with no anchor text
  push(issues, 'empty-anchor', 'links', 'warning',
    'Links with no anchor text',
    'Links without descriptive anchor text miss an opportunity to signal relevance.',
    htmlPages.filter((p) => p.links.some((l) => l.isInternal && !l.anchorText.trim())).map((p) => ({
      url: p.url,
      detail: `${p.links.filter((l) => l.isInternal && !l.anchorText.trim()).length} link(s) without anchor text`,
    })),
  );

  // Internal nofollow links
  const internalNofollow = findInternalNofollowLinks(pages);
  push(issues, 'internal-nofollow', 'links', 'warning',
    'Nofollow on internal links',
    'Using rel="nofollow" on internal links wastes crawl budget and blocks PageRank flow.',
    internalNofollow.map((n) => ({ url: n.sourceUrl, detail: `Nofollow link to ${n.targetUrl}` })),
  );

  // Missing canonical
  push(issues, 'missing-canonical', 'links', 'warning',
    'Missing canonical URL',
    'Pages without a canonical tag risk being seen as duplicate content.',
    htmlPages.filter((p) => !p.canonical).map((p) => ({ url: p.url, detail: 'No canonical tag' })),
  );

  // Multiple canonical URLs (placeholder — would need deeper parse)
  // Handled by checking if canonical doesn't match the page URL
  push(issues, 'canonical-mismatch', 'links', 'notice',
    'Canonical URL mismatch',
    'The canonical tag points to a different URL — ensure this is intentional.',
    htmlPages.filter((p) => {
      if (!p.canonical) return false;
      try {
        const c = new URL(p.canonical, p.url).toString().replace(/\/+$/, '');
        const u = p.url.replace(/\/+$/, '');
        return c !== u;
      } catch { return false; }
    }).map((p) => ({
      url: p.url, detail: `Canonical: ${p.canonical}`,
    })),
  );

  // Long URLs
  push(issues, 'long-urls', 'links', 'notice',
    'Too long URLs',
    'URLs over 200 characters can cause crawling issues and are harder to share.',
    htmlPages.filter((p) => p.url.length > 200).map((p) => ({
      url: p.url, detail: `${p.url.length} characters`,
    })),
  );

  // Underscores in URL
  push(issues, 'underscores-in-url', 'links', 'notice',
    'Underscores in URL',
    'Search engines treat hyphens as word separators but not underscores.',
    htmlPages.filter((p) => new URL(p.url).pathname.includes('_')).map((p) => ({
      url: p.url, detail: 'URL pathname contains underscores',
    })),
  );

  // ═══════════════════════════════════
  //  PERFORMANCE
  // ═══════════════════════════════════

  // Large HTML page size
  push(issues, 'large-html', 'performance', 'warning',
    'Large HTML page size',
    'Pages over 500KB slow down rendering and waste bandwidth.',
    htmlPages.filter((p) => p.htmlSize > 512_000).map((p) => ({
      url: p.url, detail: `${Math.round(p.htmlSize / 1024)} KB`,
    })),
  );

  // Slow TTFB
  push(issues, 'slow-ttfb', 'performance', 'warning',
    'Slow page load speed',
    'Pages with TTFB over 800ms indicate slow server response.',
    htmlPages.filter((p) => p.ttfb > 800).map((p) => ({
      url: p.url, detail: `TTFB: ${p.ttfb}ms`,
    })),
  );

  // Uncompressed pages
  push(issues, 'uncompressed', 'performance', 'warning',
    'Uncompressed pages',
    'Pages not using gzip or Brotli compression transfer more data than needed.',
    htmlPages.filter((p) => {
      const enc = (p.headers['content-encoding'] || '').toLowerCase();
      return !enc.includes('gzip') && !enc.includes('br') && !enc.includes('deflate');
    }).map((p) => ({
      url: p.url, detail: 'No Content-Encoding header (gzip/br)',
    })),
  );

  // Uncached resources (no Cache-Control)
  push(issues, 'no-cache', 'performance', 'notice',
    'Uncached pages',
    'Pages without Cache-Control headers force repeat downloads.',
    htmlPages.filter((p) => !p.headers['cache-control']).map((p) => ({
      url: p.url, detail: 'No Cache-Control header',
    })),
  );

  // Too many JS/CSS files
  push(issues, 'too-many-resources', 'performance', 'notice',
    'Too many JavaScript and CSS files',
    'Loading many separate resource files increases page load time.',
    htmlPages.filter((p) => p.resources.length > 30).map((p) => ({
      url: p.url, detail: `${p.resources.length} resource files`,
    })),
  );

  // ═══════════════════════════════════
  //  MARKUP & SOCIAL
  // ═══════════════════════════════════

  // Structured data errors
  push(issues, 'schema-errors', 'markup', 'error',
    'Structured data markup errors',
    'Invalid JSON-LD will not generate rich results in search.',
    htmlPages.filter((p) => p.schemaErrors.length > 0).map((p) => ({
      url: p.url, detail: p.schemaErrors.join('; '),
    })),
  );

  // Missing structured data
  push(issues, 'no-schema', 'markup', 'notice',
    'No structured data',
    'Adding JSON-LD schema increases eligibility for rich results.',
    htmlPages.filter((p) => p.schemaTypes.length === 0 && p.schemaErrors.length === 0).map((p) => ({
      url: p.url, detail: 'No JSON-LD schema found',
    })),
  );

  // Missing ALT attributes
  push(issues, 'missing-alt', 'markup', 'warning',
    'Missing ALT attributes',
    'Images without alt text are inaccessible and miss image SEO opportunities.',
    htmlPages.filter((p) => p.missingAltCount > 0).map((p) => ({
      url: p.url, detail: `${p.missingAltCount}/${p.totalImages} images missing alt`,
    })),
  );

  // Low semantic HTML
  push(issues, 'low-semantic', 'markup', 'notice',
    'Low Semantic HTML usage',
    'Using semantic elements (main, nav, article, section) improves accessibility and SEO signals.',
    htmlPages.filter((p) => p.semanticElements.score < 3).map((p) => ({
      url: p.url, detail: `Only ${p.semanticElements.score}/7 semantic elements used`,
    })),
  );

  // Missing Open Graph
  push(issues, 'missing-og', 'social', 'warning',
    'Missing Open Graph tags',
    'Pages without Open Graph tags display poorly when shared on social media.',
    htmlPages.filter((p) => !p.ogTitle && !p.ogDescription && !p.ogImage).map((p) => ({
      url: p.url, detail: 'No og:title, og:description, or og:image',
    })),
  );

  // Missing Twitter Cards
  push(issues, 'missing-twitter', 'social', 'notice',
    'Missing Twitter Card tags',
    'Twitter card meta tags improve how your links appear on Twitter/X.',
    htmlPages.filter((p) => !p.twitterCard).map((p) => ({
      url: p.url, detail: 'No twitter:card meta tag',
    })),
  );

  return issues;
}

/* ─── Score calculation ─── */

const SEVERITY_WEIGHT: Record<IssueSeverity, number> = {
  error: 10,
  warning: 4,
  notice: 1,
};

const CATEGORY_WEIGHTS: Record<IssueCategory, number> = {
  crawlability: 25,
  https: 15,
  performance: 15,
  content: 20,
  links: 10,
  markup: 10,
  social: 5,
};

export function calculateHealthScore(issues: SiteAuditIssue[], pageCount: number): number {
  if (pageCount === 0) return 0;

  const categoryScores = calculateCategoryScores(issues, pageCount);
  let weightedTotal = 0;
  let totalWeight = 0;

  for (const [category, weight] of Object.entries(CATEGORY_WEIGHTS) as [IssueCategory, number][]) {
    weightedTotal += categoryScores[category] * weight;
    totalWeight += weight;
  }

  if (totalWeight === 0) return 0;
  return Math.max(0, Math.min(100, Math.round(weightedTotal / totalWeight)));
}

export function calculateCategoryScores(
  issues: SiteAuditIssue[],
  pageCount: number,
): Record<IssueCategory, number> {
  const categories: IssueCategory[] = ['crawlability', 'https', 'performance', 'content', 'links', 'markup', 'social'];
  const scores: Record<IssueCategory, number> = {} as Record<IssueCategory, number>;

  for (const cat of categories) {
    const catIssues = issues.filter((i) => i.category === cat);
    if (catIssues.length === 0) {
      scores[cat] = 100;
      continue;
    }

    let penalty = 0;
    for (const issue of catIssues) {
      const weight = SEVERITY_WEIGHT[issue.severity];
      const ratio = issue.affectedPages.length / Math.max(pageCount, 1);
      penalty += weight * ratio;
    }

    scores[cat] = Math.max(0, Math.min(100, Math.round(100 - penalty * 15)));
  }

  return scores;
}

/* ─── Build full result ─── */

export function buildSiteAuditResult(
  domain: string,
  pages: PageAuditResult[],
): SiteAuditResult {
  const issues = runAllChecks(pages);
  const healthScore = calculateHealthScore(issues, pages.length);
  const categoryScores = calculateCategoryScores(issues, pages.length);

  const errorCount = issues.filter((i) => i.severity === 'error').reduce((s, i) => s + i.affectedPages.length, 0);
  const warningCount = issues.filter((i) => i.severity === 'warning').reduce((s, i) => s + i.affectedPages.length, 0);
  const noticeCount = issues.filter((i) => i.severity === 'notice').reduce((s, i) => s + i.affectedPages.length, 0);

  return {
    domain,
    crawledAt: new Date().toISOString(),
    pagesScanned: pages.length,
    totalIssues: issues.reduce((s, i) => s + i.affectedPages.length, 0),
    healthScore,
    errorCount,
    warningCount,
    noticeCount,
    issues,
    pages,
    categoryScores,
  };
}
