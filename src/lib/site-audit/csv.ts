import type { PageAuditResult, SiteAuditResult } from '@/types/site-audit';

function escapeCsv(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function pageToRow(page: PageAuditResult): string[] {
  return [
    page.url,
    String(page.statusCode),
    page.redirectedTo || '',
    page.redirectChain.join(' → '),
    String(page.crawlDepth),
    page.title || '',
    String(page.title?.length || 0),
    page.metaDescription || '',
    String(page.metaDescription?.length || 0),
    page.h1s.join(' | ') || '',
    String(page.h1s.length),
    page.h2s.join(' | ') || '',
    page.canonical || '',
    page.robots || '',
    page.xRobotsTag || '',
    page.viewport ? 'Yes' : 'No',
    page.charset || '',
    page.lang || '',
    page.doctype ? 'Yes' : 'No',
    String(page.wordCount),
    `${page.textToHtmlRatio}%`,
    page.contentHash,
    String(page.internalLinkCount),
    String(page.externalLinkCount),
    String(page.links.length),
    String(page.totalImages),
    String(page.missingAltCount),
    String(page.resources.filter((r) => r.type === 'script').length),
    String(page.resources.filter((r) => r.type === 'stylesheet').length),
    page.schemaTypes.join(', ') || 'None',
    page.schemaErrors.length ? page.schemaErrors.join('; ') : 'None',
    page.ogTitle || '',
    page.ogDescription || '',
    page.ogImage || '',
    page.twitterCard || '',
    page.twitterTitle || '',
    page.twitterImage || '',
    `${page.ttfb}ms`,
    `${Math.round(page.htmlSize / 1024)}KB`,
    page.headers['content-encoding'] || 'None',
    page.headers['cache-control'] || '',
    page.headers['strict-transport-security'] || '',
    `${page.semanticElements.score}/7`,
    page.likelyJsRendered ? 'Yes' : 'No',
    page.fetchError || '',
  ];
}

const CSV_HEADERS = [
  'URL',
  'Status Code',
  'Redirected To',
  'Redirect Chain',
  'Crawl Depth',
  'Title',
  'Title Length',
  'Meta Description',
  'Meta Description Length',
  'H1',
  'H1 Count',
  'H2s',
  'Canonical',
  'Meta Robots',
  'X-Robots-Tag',
  'Viewport',
  'Charset',
  'Language',
  'Doctype',
  'Word Count',
  'Text/HTML Ratio',
  'Content Hash',
  'Internal Links',
  'External Links',
  'Total Links',
  'Total Images',
  'Missing ALT',
  'JS Files',
  'CSS Files',
  'Schema Types',
  'Schema Errors',
  'OG Title',
  'OG Description',
  'OG Image',
  'Twitter Card',
  'Twitter Title',
  'Twitter Image',
  'TTFB',
  'HTML Size',
  'Content Encoding',
  'Cache-Control',
  'HSTS',
  'Semantic Score',
  'JS Rendered',
  'Fetch Error',
];

export function buildSiteAuditCsv(result: SiteAuditResult) {
  const lines: string[] = [];

  lines.push(`# Site Audit Report — ${result.domain}`);
  lines.push(`# Crawled: ${result.crawledAt}`);
  lines.push(`# Pages Scanned: ${result.pagesScanned}`);
  lines.push(`# Health Score: ${result.healthScore}/100`);
  lines.push(`# Errors: ${result.errorCount} | Warnings: ${result.warningCount} | Notices: ${result.noticeCount}`);
  lines.push('');

  lines.push('## Issues Summary');
  lines.push('Severity,Category,Issue,Affected Pages');
  for (const issue of result.issues) {
    lines.push(
      [
        issue.severity.toUpperCase(),
        issue.category,
        escapeCsv(issue.title),
        String(issue.affectedPages.length),
      ].join(','),
    );
  }
  lines.push('');

  lines.push('## Pages Detail');
  lines.push(CSV_HEADERS.join(','));
  for (const page of result.pages) {
    lines.push(pageToRow(page).map(escapeCsv).join(','));
  }

  const csv = lines.join('\n');
  const filename = `site-audit-${result.domain}-${new Date().toISOString().slice(0, 10)}.csv`;

  return { csv, filename };
}
