/**
 * Cross-page analyzer — detects issues that require comparing data across
 * multiple pages: duplicates, broken internal links, orphaned pages, etc.
 */

import type { PageAuditResult } from '@/types/site-audit';

/* ─── Duplicate detection ─── */

export interface DuplicateGroup {
  value: string;
  pages: string[];
}

export function findDuplicateTitles(pages: PageAuditResult[]): DuplicateGroup[] {
  return findDuplicates(pages, (p) => p.title);
}

export function findDuplicateDescriptions(pages: PageAuditResult[]): DuplicateGroup[] {
  return findDuplicates(pages, (p) => p.metaDescription);
}

export function findDuplicateContent(pages: PageAuditResult[]): DuplicateGroup[] {
  return findDuplicates(pages, (p) => p.contentHash);
}

function findDuplicates(
  pages: PageAuditResult[],
  getter: (p: PageAuditResult) => string,
): DuplicateGroup[] {
  const map = new Map<string, string[]>();

  for (const page of pages) {
    const val = getter(page);
    if (!val) continue;
    const group = map.get(val) || [];
    group.push(page.url);
    map.set(val, group);
  }

  return [...map.entries()]
    .filter(([, urls]) => urls.length > 1)
    .map(([value, pages]) => ({ value, pages }));
}

/* ─── Broken internal links ─── */

export interface BrokenLink {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  statusCode: number;
}

export function findBrokenInternalLinks(pages: PageAuditResult[]): BrokenLink[] {
  // Build a map of crawled URLs → status codes
  const statusMap = new Map<string, number>();
  for (const page of pages) {
    statusMap.set(normalise(page.url), page.statusCode);
    // Also register redirected-to URLs
    if (page.redirectedTo) {
      statusMap.set(normalise(page.redirectedTo), page.statusCode);
    }
  }

  const broken: BrokenLink[] = [];

  for (const page of pages) {
    for (const link of page.links) {
      if (!link.isInternal) continue;
      const target = normalise(link.href);
      const status = statusMap.get(target);
      // If we crawled it and it's 4xx/5xx, or if it points to a page we got status 0 (fetch error)
      if (status !== undefined && (status >= 400 || status === 0)) {
        broken.push({
          sourceUrl: page.url,
          targetUrl: link.href,
          anchorText: link.anchorText,
          statusCode: status,
        });
      }
    }
  }

  return broken;
}

/* ─── Orphaned pages (in sitemap but not linked from any other page) ─── */

export function findOrphanedPages(pages: PageAuditResult[]): string[] {
  // All pages that are internally linked to from at least one other page
  const linkedTo = new Set<string>();
  const crawledUrls = new Set<string>();

  for (const page of pages) {
    crawledUrls.add(normalise(page.url));
    for (const link of page.links) {
      if (link.isInternal) {
        linkedTo.add(normalise(link.href));
      }
    }
  }

  // The homepage is never orphaned
  const sorted = [...crawledUrls].sort((a, b) => a.length - b.length);
  const homepage = sorted[0]; // shortest URL is likely homepage

  return [...crawledUrls].filter(
    (url) => url !== homepage && !linkedTo.has(url),
  );
}

/* ─── Redirect chains (> 1 redirect) ─── */

export interface RedirectChainInfo {
  url: string;
  chain: string[];
  length: number;
}

export function findRedirectChains(pages: PageAuditResult[]): RedirectChainInfo[] {
  return pages
    .filter((p) => p.redirectChain.length > 1)
    .map((p) => ({
      url: p.url,
      chain: [...p.redirectChain, p.redirectedTo || p.url],
      length: p.redirectChain.length,
    }));
}

/* ─── Deep pages (crawl depth > threshold) ─── */

export function findDeepPages(pages: PageAuditResult[], maxDepth = 3): { url: string; depth: number }[] {
  return pages
    .filter((p) => p.crawlDepth > maxDepth)
    .map((p) => ({ url: p.url, depth: p.crawlDepth }));
}

/* ─── Internal nofollow links ─── */

export function findInternalNofollowLinks(pages: PageAuditResult[]): { sourceUrl: string; targetUrl: string }[] {
  const results: { sourceUrl: string; targetUrl: string }[] = [];
  for (const page of pages) {
    for (const link of page.links) {
      if (link.isInternal && link.isNofollow) {
        results.push({ sourceUrl: page.url, targetUrl: link.href });
      }
    }
  }
  return results;
}

/* ─── Pages with only one internal link pointing to them ─── */

export function findPoorlyLinkedPages(pages: PageAuditResult[]): { url: string; incomingCount: number }[] {
  const incomingMap = new Map<string, number>();

  // Init all crawled pages at 0
  for (const page of pages) {
    incomingMap.set(normalise(page.url), 0);
  }

  for (const page of pages) {
    for (const link of page.links) {
      if (!link.isInternal) continue;
      const target = normalise(link.href);
      if (incomingMap.has(target)) {
        incomingMap.set(target, (incomingMap.get(target) || 0) + 1);
      }
    }
  }

  // Exclude homepage (shortest URL)
  const sorted = [...incomingMap.keys()].sort((a, b) => a.length - b.length);
  const homepage = sorted[0];

  return [...incomingMap.entries()]
    .filter(([url, count]) => url !== homepage && count <= 1)
    .map(([url, incomingCount]) => ({ url, incomingCount }));
}

/* ─── Helper ─── */

function normalise(url: string): string {
  try {
    const u = new URL(url);
    u.hash = '';
    u.pathname = u.pathname.replace(/\/+$/, '') || '/';
    return u.toString();
  } catch {
    return url;
  }
}
