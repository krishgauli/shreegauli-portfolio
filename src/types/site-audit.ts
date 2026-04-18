/* ─── Site Audit shared types ─── */

export type IssueSeverity = 'error' | 'warning' | 'notice';

export type IssueCategory =
  | 'crawlability'
  | 'https'
  | 'performance'
  | 'content'
  | 'links'
  | 'markup'
  | 'social';

/* ─── Config ─── */
export interface SiteAuditConfig {
  maxPages: number;
  maxDepth: number;
  timeout: number;          // per-page fetch timeout ms
  userAgent: string;
  concurrency: number;      // parallel fetches
  checkExternalLinks: boolean;
  retryCount: number;       // retries per URL fetch
  retryBaseDelayMs: number; // exponential backoff base delay
  maxRetryDelayMs: number;  // cap for retry backoff delay
  crawlDelayMs: number;     // delay between crawl batches
}

export const DEFAULT_AUDIT_CONFIG: SiteAuditConfig = {
  maxPages: 500,
  maxDepth: 10,
  timeout: 8_000,
  userAgent: 'SiteAuditBot/1.0 (+https://www.shreegauli.com/seo-tools)',
  concurrency: 10,
  checkExternalLinks: true,
  retryCount: 2,
  retryBaseDelayMs: 300,
  maxRetryDelayMs: 2_000,
  crawlDelayMs: 50,
};

/* ─── Resource reference (script / stylesheet) ─── */
export interface ResourceRef {
  url: string;
  type: 'script' | 'stylesheet';
}

/* ─── Link found on a page ─── */
export interface PageLink {
  href: string;          // resolved absolute URL
  anchorText: string;
  isInternal: boolean;
  isNofollow: boolean;
}

/* ─── Image found on a page ─── */
export interface PageImage {
  src: string;
  alt: string;
  hasAlt: boolean;
}

/* ─── Per-page crawl + analysis result ─── */
export interface PageAuditResult {
  url: string;
  statusCode: number;
  redirectedTo: string | null;       // final URL after redirects
  redirectChain: string[];           // list of intermediate URLs
  crawlDepth: number;

  // HTML meta
  title: string;
  metaDescription: string;
  canonical: string;
  robots: string;                    // meta robots value
  xRobotsTag: string;               // X-Robots-Tag response header
  viewport: string;
  charset: string;
  lang: string;
  doctype: boolean;

  // Headings
  h1s: string[];
  h2s: string[];
  h3s: string[];

  // Content
  wordCount: number;
  textToHtmlRatio: number;           // 0–100 percentage
  contentHash: string;               // for duplicate detection

  // Links
  links: PageLink[];
  internalLinkCount: number;
  externalLinkCount: number;

  // Images
  images: PageImage[];
  totalImages: number;
  missingAltCount: number;

  // Resources (JS / CSS)
  resources: ResourceRef[];

  // Schema / structured data
  schemaTypes: string[];             // e.g. ["Person", "WebSite"]
  schemaErrors: string[];            // JSON parse errors

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  // Twitter Cards
  twitterCard: string;
  twitterTitle: string;
  twitterImage: string;

  // Performance
  ttfb: number;                      // ms
  htmlSize: number;                  // bytes

  // Response headers (for security / perf checks)
  headers: Record<string, string>;

  // Semantic HTML
  semanticElements: {
    hasMain: boolean;
    hasNav: boolean;
    hasArticle: boolean;
    hasSection: boolean;
    hasAside: boolean;
    hasHeader: boolean;
    hasFooter: boolean;
    score: number;                   // 0–7 count
  };

  // Errors during fetch / parse
  fetchError: string | null;

  // JS rendering detection
  likelyJsRendered: boolean;
}

/* ─── An affected page within an issue ─── */
export interface AffectedPage {
  url: string;
  detail: string;
}

/* ─── A single site-wide issue ─── */
export interface SiteAuditIssue {
  id: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  affectedPages: AffectedPage[];
}

/* ─── Full site audit result ─── */
export interface SiteAuditResult {
  domain: string;
  crawledAt: string;                 // ISO timestamp
  pagesScanned: number;
  totalIssues: number;
  healthScore: number;               // 0–100
  errorCount: number;
  warningCount: number;
  noticeCount: number;
  issues: SiteAuditIssue[];
  pages: PageAuditResult[];
  categoryScores: Record<IssueCategory, number>;  // 0–100 per category
}

/* ─── SSE events ─── */
export interface AuditProgressEvent {
  type: 'progress';
  pagesScanned: number;
  totalDiscovered: number;
  currentUrl: string;
}

export interface AuditCompleteEvent {
  type: 'complete';
  result: SiteAuditResult;
}

export type AuditSSEEvent = AuditProgressEvent | AuditCompleteEvent;

/* ─── Core Web Vitals (from Google PageSpeed Insights) ─── */

export interface CoreWebVitals {
  performanceScore: number;      // 0–100
  fcp: number;                   // First Contentful Paint (ms)
  lcp: number;                   // Largest Contentful Paint (ms)
  cls: number;                   // Cumulative Layout Shift
  tbt: number;                   // Total Blocking Time (ms) — proxy for INP
  si: number;                    // Speed Index (ms)
  tti: number;                   // Time to Interactive (ms)
  serverResponseTime: number;    // TTFB (ms)
  accessibilityScore: number;    // 0–100
  seoScore: number;              // 0–100
  bestPracticesScore: number;    // 0–100
}

export interface CruxFieldMetric {
  p75: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface CruxFieldData {
  lcp: CruxFieldMetric | null;
  cls: CruxFieldMetric | null;
  inp: CruxFieldMetric | null;
  fcp: CruxFieldMetric | null;
  ttfb: CruxFieldMetric | null;
  hasData: boolean;
}

export interface PagePerformanceResult {
  url: string;
  strategy: 'mobile' | 'desktop';
  lab: CoreWebVitals;
  field: CruxFieldData;
  fetchedAt: string;
}
