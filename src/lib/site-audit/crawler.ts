/**
 * BFS site crawler — discovers and fetches internal pages starting from a root URL.
 *
 * Features:
 *   • Respects robots.txt (fetched once at start)
 *   • Configurable max pages, depth, concurrency
 *   • Follows redirects and records the chain
 *   • Reports progress via callback
 */

import type { SiteAuditConfig } from '@/types/site-audit';

/* ─── Robots.txt parser (lightweight) ─── */

interface RobotsRules {
  disallow: string[];
  allow: string[];
  sitemaps: string[];
}

function parseRobotsTxt(txt: string, userAgent: string): RobotsRules {
  const rules: RobotsRules = { disallow: [], allow: [], sitemaps: [] };
  let active = false;
  const lines = txt.split('\n');

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    const lower = line.toLowerCase();
    if (lower.startsWith('user-agent:')) {
      const agent = lower.slice('user-agent:'.length).trim();
      active = agent === '*' || userAgent.toLowerCase().includes(agent);
    } else if (active && lower.startsWith('disallow:')) {
      const path = line.slice('disallow:'.length).trim();
      if (path) rules.disallow.push(path);
    } else if (active && lower.startsWith('allow:')) {
      const path = line.slice('allow:'.length).trim();
      if (path) rules.allow.push(path);
    } else if (lower.startsWith('sitemap:')) {
      const sitemapUrl = line.slice('sitemap:'.length).trim();
      if (sitemapUrl) rules.sitemaps.push(sitemapUrl);
    }
  }

  return rules;
}

function isAllowedByRobots(pathname: string, rules: RobotsRules): boolean {
  // Longest match wins — check allow first (more specific)
  let bestAllow = -1;
  let bestDisallow = -1;

  for (const p of rules.allow) {
    if (pathname.startsWith(p) && p.length > bestAllow) bestAllow = p.length;
  }
  for (const p of rules.disallow) {
    if (pathname.startsWith(p) && p.length > bestDisallow) bestDisallow = p.length;
  }

  if (bestAllow === -1 && bestDisallow === -1) return true;    // no matching rules
  if (bestAllow > bestDisallow) return true;                    // allow wins
  if (bestDisallow > bestAllow) return false;                   // disallow wins
  return true;                                                  // tie → allow
}

/* ─── Raw crawl result for a single page ─── */

export interface CrawlPageData {
  url: string;
  finalUrl: string;
  statusCode: number;
  redirectChain: string[];
  html: string;
  headers: Record<string, string>;
  ttfb: number;
  htmlSize: number;
  crawlDepth: number;
  fetchError: string | null;
}

export type CrawlProgressFn = (pagesScanned: number, totalDiscovered: number, currentUrl: string) => void;

/* ─── Normalise URL for deduplication ─── */

function normaliseUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    // strip hash, trailing slash, common tracking params
    u.hash = '';
    const p = u.pathname.replace(/\/+$/, '') || '/';
    u.pathname = p;
    u.searchParams.delete('utm_source');
    u.searchParams.delete('utm_medium');
    u.searchParams.delete('utm_campaign');
    u.searchParams.delete('utm_term');
    u.searchParams.delete('utm_content');
    u.searchParams.delete('ref');
    u.searchParams.delete('fbclid');
    u.searchParams.delete('gclid');
    return u.toString();
  } catch {
    return rawUrl;
  }
}

function isSameOrigin(url: string, origin: string): boolean {
  try {
    return new URL(url).origin === origin;
  } catch {
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 408 || status === 425 || status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

async function fetchWithRetry(
  url: string,
  config: SiteAuditConfig,
  init?: RequestInit,
): Promise<Response> {
  const maxAttempts = Math.max(1, config.retryCount + 1);
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(config.timeout),
      });

      if (!shouldRetryStatus(response.status) || attempt === maxAttempts) {
        return response;
      }

      const delay = Math.min(config.maxRetryDelayMs, config.retryBaseDelayMs * 2 ** (attempt - 1));
      await sleep(delay);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts) {
        throw error;
      }
      const delay = Math.min(config.maxRetryDelayMs, config.retryBaseDelayMs * 2 ** (attempt - 1));
      await sleep(delay);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Fetch failed after retries');
}

function extractLocUrlsFromSitemapXml(xml: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>([\s\S]*?)<\/loc>/gi;
  let match: RegExpExecArray | null;

  while ((match = locRegex.exec(xml)) !== null) {
    const loc = match[1].trim();
    if (loc) urls.push(loc);
  }

  return urls;
}

async function discoverSitemapUrls(
  origin: string,
  robots: RobotsRules,
  config: SiteAuditConfig,
): Promise<string[]> {
  const initialSitemaps = new Set<string>([
    `${origin}/sitemap.xml`,
    ...robots.sitemaps,
  ]);

  const sitemapQueue = [...initialSitemaps];
  const seenSitemaps = new Set<string>();
  const discoveredUrls = new Set<string>();
  const maxSitemapFiles = 25;

  while (sitemapQueue.length > 0 && seenSitemaps.size < maxSitemapFiles) {
    const sitemapUrl = sitemapQueue.shift();
    if (!sitemapUrl || seenSitemaps.has(sitemapUrl)) continue;
    seenSitemaps.add(sitemapUrl);

    try {
      const response = await fetchWithRetry(sitemapUrl, config, {
        headers: { 'User-Agent': config.userAgent },
      });

      if (!response.ok) continue;

      const xml = await response.text();
      const locs = extractLocUrlsFromSitemapXml(xml);

      for (const loc of locs) {
        try {
          const resolved = new URL(loc, sitemapUrl).toString();
          const normalised = normaliseUrl(resolved);
          const parsed = new URL(normalised);

          if (parsed.origin !== origin) continue;

          const isXmlLike = parsed.pathname.endsWith('.xml') || parsed.pathname.includes('sitemap');
          if (isXmlLike && !seenSitemaps.has(normalised) && sitemapQueue.length < maxSitemapFiles) {
            sitemapQueue.push(normalised);
            continue;
          }

          if (!/\.(jpg|jpeg|png|gif|svg|webp|ico|pdf|zip|css|js|woff|woff2|ttf|eot|xml|json)$/i.test(parsed.pathname)) {
            discoveredUrls.add(normalised);
          }
        } catch {
          // Skip malformed entries
        }
      }
    } catch {
      // Ignore unreachable sitemap and continue
    }
  }

  return [...discoveredUrls];
}

/* ─── Fetch a single page handling redirects manually ─── */

async function fetchPage(
  url: string,
  config: SiteAuditConfig,
): Promise<{ finalUrl: string; statusCode: number; redirectChain: string[]; html: string; headers: Record<string, string>; size: number }> {
  const redirectChain: string[] = [];
  let currentUrl = url;
  let hops = 0;
  const maxRedirects = 5;

  while (hops < maxRedirects) {
    const resp = await fetchWithRetry(currentUrl, config, {
      headers: { 'User-Agent': config.userAgent },
      redirect: 'manual',
    });

    const status = resp.status;

    if (status >= 300 && status < 400) {
      const location = resp.headers.get('location');
      if (!location) {
        const buf = await resp.arrayBuffer();
        return { finalUrl: currentUrl, statusCode: status, redirectChain, html: new TextDecoder().decode(buf), headers: headersToRecord(resp.headers), size: buf.byteLength };
      }
      redirectChain.push(currentUrl);
      currentUrl = new URL(location, currentUrl).toString();
      hops++;
      continue;
    }

    const buf = await resp.arrayBuffer();
    const headers = headersToRecord(resp.headers);
    return { finalUrl: currentUrl, statusCode: status, redirectChain, html: new TextDecoder().decode(buf), headers, size: buf.byteLength };
  }

  return { finalUrl: currentUrl, statusCode: 301, redirectChain, html: '', headers: {}, size: 0 };
}

function headersToRecord(h: Headers): Record<string, string> {
  const obj: Record<string, string> = {};
  h.forEach((v, k) => { obj[k.toLowerCase()] = v; });
  return obj;
}

/* ─── BFS crawler ─── */

export async function crawlSite(
  startUrl: string,
  config: SiteAuditConfig,
  onProgress?: CrawlProgressFn,
): Promise<CrawlPageData[]> {
  const rootUrl = new URL(startUrl);
  const origin = rootUrl.origin;

  let robots: RobotsRules = { disallow: [], allow: [], sitemaps: [] };
  try {
    const robotsResp = await fetchWithRetry(`${origin}/robots.txt`, config, {
      headers: { 'User-Agent': config.userAgent },
    });
    if (robotsResp.ok) {
      robots = parseRobotsTxt(await robotsResp.text(), config.userAgent);
    }
  } catch {
    // No robots.txt or unreachable robots endpoint
  }

  const visited = new Set<string>();
  const results: CrawlPageData[] = [];

  const queue: Array<{ url: string; depth: number }> = [];
  const addSeed = (seedUrl: string, depth: number) => {
    const normalised = normaliseUrl(seedUrl);
    if (visited.has(normalised)) return;

    try {
      const parsed = new URL(normalised);
      if (!isAllowedByRobots(parsed.pathname, robots)) return;
      visited.add(normalised);
      queue.push({ url: normalised, depth });
    } catch {
      // Skip malformed seed URL
    }
  };

  addSeed(startUrl, 0);
  const sitemapUrls = await discoverSitemapUrls(origin, robots, config);
  for (const sitemapUrl of sitemapUrls) {
    addSeed(sitemapUrl, 0);
    if (queue.length >= config.maxPages) break;
  }

  while (queue.length > 0 && results.length < config.maxPages) {
    // Take a batch of up to `concurrency` items from the queue
    const batch = queue.splice(0, Math.min(config.concurrency, config.maxPages - results.length));

    const promises = batch.map(async ({ url, depth }) => {
      onProgress?.(results.length, results.length + queue.length + batch.length, url);

      const start = Date.now();
      let data: CrawlPageData;

      try {
        const page = await fetchPage(url, config);
        data = {
          url,
          finalUrl: page.finalUrl,
          statusCode: page.statusCode,
          redirectChain: page.redirectChain,
          html: page.html,
          headers: page.headers,
          ttfb: Date.now() - start,
          htmlSize: page.size,
          crawlDepth: depth,
          fetchError: null,
        };
      } catch (err) {
        data = {
          url,
          finalUrl: url,
          statusCode: 0,
          redirectChain: [],
          html: '',
          headers: {},
          ttfb: Date.now() - start,
          htmlSize: 0,
          crawlDepth: depth,
          fetchError: err instanceof Error ? err.message : 'Fetch failed',
        };
      }

      // Extract internal links from html for BFS discovery
      if (data.html && depth < config.maxDepth) {
        const hrefRegex = /href=["']([^"']+)["']/gi;
        let match: RegExpExecArray | null;
        while ((match = hrefRegex.exec(data.html)) !== null) {
          try {
            const resolved = new URL(match[1], data.finalUrl || url).toString();
            const norm = normaliseUrl(resolved);

            if (!isSameOrigin(norm, origin)) continue;

            const parsed = new URL(norm);
            // Skip non-page resources
            if (/\.(jpg|jpeg|png|gif|svg|webp|ico|pdf|zip|css|js|woff|woff2|ttf|eot|xml|json)$/i.test(parsed.pathname)) continue;
            // Skip fragments-only, mailto, tel
            if (norm === normaliseUrl(url)) continue;

            if (!visited.has(norm) && isAllowedByRobots(parsed.pathname, robots)) {
              visited.add(norm);
              queue.push({ url: norm, depth: depth + 1 });
            }
          } catch { /* malformed href — skip */ }
        }
      }

      return data;
    });

    const batchResults = await Promise.all(promises);
    results.push(...batchResults);

    onProgress?.(results.length, results.length + queue.length, results[results.length - 1]?.url || '');

    if (queue.length > 0 && config.crawlDelayMs > 0) {
      await sleep(config.crawlDelayMs);
    }
  }

  return results;
}
