'use client';

import { useCallback, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownToLine,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Loader2,
  Printer,
  Search,
  ShieldAlert,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  AuditProgressEvent,
  IssueCategory,
  IssueSeverity,
  SiteAuditIssue,
  SiteAuditResult,
} from '@/types/site-audit';

/* ─────── Severity styling ─────── */

const SEV_CLASSES: Record<IssueSeverity, string> = {
  error: 'text-red-400 bg-red-500/10 border-red-500/25',
  warning: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  notice: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
};

const SEV_ICON: Record<IssueSeverity, React.ComponentType<{ className?: string }>> = {
  error: XCircle,
  warning: AlertTriangle,
  notice: ShieldAlert,
};

const SEV_LABEL: Record<IssueSeverity, string> = { error: 'Error', warning: 'Warning', notice: 'Notice' };

/* ─────── Category config ─────── */

const CATEGORY_INFO: Record<IssueCategory, { label: string; emoji: string }> = {
  crawlability: { label: 'Crawlability', emoji: '🕷️' },
  https: { label: 'HTTPS', emoji: '🔒' },
  performance: { label: 'Performance', emoji: '⚡' },
  content: { label: 'Content', emoji: '📝' },
  links: { label: 'Links', emoji: '🔗' },
  markup: { label: 'Markup', emoji: '🏷️' },
  social: { label: 'Social', emoji: '📱' },
};

/* ─────── Score Donut ─────── */

function ScoreDonut({ score }: { score: number }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color =
    score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-[#64748B]">/ 100</span>
      </div>
    </div>
  );
}

/* ─────── Category Score Bar ─────── */

function CategoryBar({ category, score }: { category: IssueCategory; score: number }) {
  const color =
    score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-red-500';
  const info = CATEGORY_INFO[category];

  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-center">{info.emoji}</span>
      <span className="w-28 text-xs text-[#CBD5E1]">{info.label}</span>
      <div className="flex-1 rounded-full bg-white/[0.06] h-2.5">
        <div
          className={cn('h-2.5 rounded-full transition-all duration-700', color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-semibold text-[#CBD5E1]">{score}%</span>
    </div>
  );
}

/* ─────── Expandable Issue Row ─────── */

function IssueRow({ issue }: { issue: SiteAuditIssue }) {
  const [open, setOpen] = useState(false);
  const Icon = SEV_ICON[issue.severity];

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left"
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-sm font-semibold text-white">{issue.title}</span>
        <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase', SEV_CLASSES[issue.severity])}>
          {SEV_LABEL[issue.severity]}
        </span>
        <span className="text-xs text-[#64748B]">{issue.affectedPages.length} page{issue.affectedPages.length !== 1 ? 's' : ''}</span>
        {open ? <ChevronDown className="h-4 w-4 text-[#64748B]" /> : <ChevronRight className="h-4 w-4 text-[#64748B]" />}
      </button>

      {open && (
        <div className="border-t border-white/[0.06] px-4 py-3 space-y-1">
          <p className="text-xs text-[#94A3B8] mb-2">{issue.description}</p>
          <div className="max-h-56 overflow-y-auto space-y-1">
            {issue.affectedPages.map((ap, i) => (
              <div key={`${ap.url}-${i}`} className="flex items-start gap-2 text-xs">
                <span className="shrink-0 text-[#64748B]">•</span>
                <a href={ap.url} target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline break-all">
                  {ap.url}
                </a>
                {ap.detail && <span className="text-[#64748B] ml-1">— {ap.detail}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────── Main Tab Component ─────── */

export default function SiteAuditTab() {
  const [domain, setDomain] = useState('');
  const [maxPages, setMaxPages] = useState(500);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<AuditProgressEvent | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [error, setError] = useState('');
  const [filterSev, setFilterSev] = useState<IssueSeverity | 'all'>('all');
  const [filterCat, setFilterCat] = useState<IssueCategory | 'all'>('all');
  const abortRef = useRef<AbortController | null>(null);

  /* Start audit */
  const startAudit = useCallback(async () => {
    const cleaned = domain.trim();
    if (!cleaned) return;

    setLoading(true);
    setResult(null);
    setError('');
    setProgress(null);

    abortRef.current = new AbortController();

    try {
      const resp = await fetch('/api/seo-tools/site-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleaned, maxPages }),
        signal: abortRef.current.signal,
      });

      if (!resp.ok || !resp.body) {
        const data = await resp.json().catch(() => ({}));
        setError(data.error || `Server error: ${resp.status}`);
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const chunk of lines) {
          const dataLine = chunk.replace(/^data:\s*/, '').trim();
          if (!dataLine) continue;
          try {
            const event = JSON.parse(dataLine);
            if (event.type === 'progress') {
              setProgress(event as AuditProgressEvent);
            } else if (event.type === 'complete') {
              setResult(event.result as SiteAuditResult);
            } else if (event.type === 'error') {
              setError(event.message || 'Audit failed');
            }
          } catch { /* skip malformed */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Audit cancelled.');
      } else {
        setError('Failed to connect to audit API.');
      }
    } finally {
      setLoading(false);
    }
  }, [domain, maxPages]);

  /* Cancel */
  const cancelAudit = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  /* CSV export */
  const downloadCsv = useCallback(async () => {
    if (!result) return;
    try {
      const resp = await fetch('/api/seo-tools/site-audit/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `site-audit-${result.domain}-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('CSV download failed.');
    }
  }, [result]);

  /* Filtered issues */
  const filteredIssues = result
    ? result.issues.filter((i) => {
        if (filterSev !== 'all' && i.severity !== filterSev) return false;
        if (filterCat !== 'all' && i.category !== filterCat) return false;
        return true;
      })
    : [];

  /* ─── RENDER ─── */

  return (
    <div className="space-y-6">
      {/* Launch bar */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (loading) cancelAudit();
            else startAudit();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Globe className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#475569] outline-none focus:border-[#7C3AED]/60"
            />
          </div>
          <select
            value={maxPages}
            onChange={(e) => setMaxPages(Number(e.target.value))}
            disabled={loading}
            className="rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-3 text-sm text-[#CBD5E1] outline-none focus:border-[#7C3AED]/60"
          >
            <option value={100}>100 pages</option>
            <option value={250}>250 pages</option>
            <option value={500}>500 pages</option>
            <option value={1000}>1,000 pages</option>
            <option value={5000}>Unlimited</option>
          </select>
          <button
            type="submit"
            disabled={!domain.trim() && !loading}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition',
              loading
                ? 'bg-red-500/80 hover:bg-red-500'
                : 'bg-[#7C3AED] hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60',
            )}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Cancel
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Run Full Audit
              </>
            )}
          </button>
        </form>
        <p className="mt-3 text-[11px] text-[#64748B]">100% free • No signup • No paywall • Crawls every page • 50+ checks per page • CSV export included</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>
        )}
      </div>

      {/* Progress */}
      {loading && progress && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#7C3AED]" />
            <div>
              <p className="text-sm font-semibold text-white">
                Crawling… {progress.pagesScanned}/{progress.totalDiscovered} pages
              </p>
              <p className="text-xs text-[#64748B] truncate max-w-md">{progress.currentUrl}</p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
            <div
              className="h-2 rounded-full bg-[#7C3AED] transition-all duration-300"
              style={{
                width: `${progress.totalDiscovered > 0 ? Math.round((progress.pagesScanned / progress.totalDiscovered) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !result && (
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 text-center">
          <Globe className="mx-auto h-10 w-10 text-[#475569]" />
          <p className="mt-4 text-base font-semibold text-white">Enterprise-grade site audit. Completely free.</p>
          <p className="mt-2 text-sm text-[#94A3B8] max-w-lg mx-auto">
            Other tools charge $100+/mo and cap you at a handful of pages. We crawl your <strong className="text-white">entire</strong> site —
            100, 500, even 1,000+ pages — and run <strong className="text-white">50+ SEO checks</strong> on every single one.
            Crawlability, content, links, performance, schema, and social tags. Then export the full report as CSV.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />No page limit</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />50+ checks per page</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />CSV export</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />No signup required</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Real-time progress</span>
          </div>
        </div>
      )}

      {/* Results */}
      {result && (
        <>
          {/* ── Top cards ── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Health score donut */}
            <div className="sm:col-span-2 lg:col-span-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <ScoreDonut score={result.healthScore} />
              <p className="mt-2 text-center text-xs text-[#64748B]">Site Health</p>
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 text-center flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-white">{result.pagesScanned}</p>
              <p className="text-xs text-[#64748B]">Pages Scanned</p>
            </div>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-center flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-red-400">{result.errorCount}</p>
              <p className="text-xs text-[#64748B]">Errors</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-center flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-amber-400">{result.warningCount}</p>
              <p className="text-xs text-[#64748B]">Warnings</p>
            </div>
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 text-center flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-blue-400">{result.noticeCount}</p>
              <p className="text-xs text-[#64748B]">Notices</p>
            </div>
          </div>

          {/* ── Category breakdown ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-sm font-semibold text-white mb-4">Category Scores</p>
            <div className="space-y-3">
              {(Object.keys(CATEGORY_INFO) as IssueCategory[]).map((cat) => (
                <CategoryBar key={cat} category={cat} score={result.categoryScores[cat] ?? 100} />
              ))}
            </div>
          </div>

          {/* ── Action bar (filter + export) ── */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterSev}
              onChange={(e) => setFilterSev(e.target.value as IssueSeverity | 'all')}
              className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-xs text-[#CBD5E1] outline-none"
            >
              <option value="all">All severities</option>
              <option value="error">Errors only</option>
              <option value="warning">Warnings only</option>
              <option value="notice">Notices only</option>
            </select>

            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value as IssueCategory | 'all')}
              className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-xs text-[#CBD5E1] outline-none"
            >
              <option value="all">All categories</option>
              {(Object.keys(CATEGORY_INFO) as IssueCategory[]).map((cat) => (
                <option key={cat} value={cat}>{CATEGORY_INFO[cat].label}</option>
              ))}
            </select>

            <div className="ml-auto flex gap-2">
              <button
                type="button"
                onClick={downloadCsv}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                <ArrowDownToLine className="h-3.5 w-3.5" />
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-white"
              >
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
          </div>

          {/* ── Issues list ── */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Issues ({filteredIssues.length}/{result.issues.length})
              </p>
            </div>
            {filteredIssues.length === 0 ? (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <p className="text-sm text-emerald-300">
                  {filterSev === 'all' && filterCat === 'all'
                    ? 'No issues found — great job!'
                    : 'No issues match the current filter.'}
                </p>
              </div>
            ) : (
              filteredIssues
                .sort((a, b) => {
                  const order: IssueSeverity[] = ['error', 'warning', 'notice'];
                  const diff = order.indexOf(a.severity) - order.indexOf(b.severity);
                  if (diff !== 0) return diff;
                  return b.affectedPages.length - a.affectedPages.length;
                })
                .map((issue) => <IssueRow key={issue.id} issue={issue} />)
            )}
          </div>

          {/* ── Pages table ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <p className="text-sm font-semibold text-white mb-4">All Crawled Pages</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[#64748B]">
                    <th className="py-2 pr-3 font-medium">URL</th>
                    <th className="py-2 pr-3 font-medium">Status</th>
                    <th className="py-2 pr-3 font-medium">Title</th>
                    <th className="py-2 pr-3 font-medium">Words</th>
                    <th className="py-2 pr-3 font-medium">Links</th>
                    <th className="py-2 pr-3 font-medium">Images</th>
                    <th className="py-2 pr-3 font-medium">TTFB</th>
                    <th className="py-2 pr-3 font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {result.pages.map((page) => (
                    <tr key={page.url} className="border-b border-white/[0.05] text-[#CBD5E1]">
                      <td className="py-2 pr-3 max-w-[240px] truncate">
                        <a href={page.url} target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] hover:underline">
                          {new URL(page.url).pathname || '/'}
                        </a>
                      </td>
                      <td className={cn('py-2 pr-3', page.statusCode >= 400 ? 'text-red-400' : page.statusCode >= 300 ? 'text-amber-400' : 'text-emerald-400')}>
                        {page.statusCode}
                      </td>
                      <td className="py-2 pr-3 max-w-[200px] truncate">{page.title || '—'}</td>
                      <td className="py-2 pr-3">{page.wordCount}</td>
                      <td className="py-2 pr-3">{page.internalLinkCount + page.externalLinkCount}</td>
                      <td className="py-2 pr-3">
                        {page.totalImages}
                        {page.missingAltCount > 0 && (
                          <span className="text-red-400 ml-1">({page.missingAltCount} no alt)</span>
                        )}
                      </td>
                      <td className={cn('py-2 pr-3', page.ttfb > 800 ? 'text-red-400' : '')}>{page.ttfb}ms</td>
                      <td className="py-2 pr-3">{Math.round(page.htmlSize / 1024)}KB</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Audit CTA ── */}
          <div className="rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/[0.06] p-6">
            <p className="text-sm font-semibold text-white">Want these issues fixed for you?</p>
            <p className="mt-2 text-sm text-[#94A3B8]">
              This free audit found <strong className="text-white">{result.totalIssues} issues</strong> across <strong className="text-white">{result.pagesScanned} pages</strong>.
              Other agencies charge $500+ just for the report. Book a free call and I&apos;ll walk you through the highest-impact fixes.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9] transition-colors"
              >
                Book a free review
              </a>
              <a
                href="/working-together"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[#E2E8F0] hover:border-white/[0.2] transition-colors"
              >
                See how I work
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
