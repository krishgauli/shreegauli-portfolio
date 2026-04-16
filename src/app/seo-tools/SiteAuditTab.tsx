'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownToLine,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Globe,
  Loader2,
  Monitor,
  Printer,
  Search,
  ShieldAlert,
  Smartphone,
  XCircle,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  AuditProgressEvent,
  IssueCategory,
  IssueSeverity,
  SiteAuditIssue,
  SiteAuditResult,
  PagePerformanceResult,
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

function ScoreDonut({ score, small }: { score: number; small?: boolean }) {
  const dim = small ? 100 : 120;
  const r = small ? 40 : 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const color =
    score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444';

  return (
    <div className={cn('relative mx-auto', small ? 'h-20 w-20' : 'h-36 w-36')}>
      <svg viewBox={`0 0 ${dim} ${dim}`} className="h-full w-full -rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={small ? 6 : 8} />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={small ? 6 : 8}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-bold text-white', small ? 'text-lg' : 'text-3xl')}>{score}</span>
        {!small && <span className="text-xs text-[#64748B]">/ 100</span>}
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

/* ─────── CWV Metric Thresholds (from Google) ─────── */

const CWV_THRESHOLDS: Record<string, { good: number; poor: number; unit: string; label: string }> = {
  lcp:  { good: 2500, poor: 4000, unit: 'ms', label: 'Largest Contentful Paint' },
  fcp:  { good: 1800, poor: 3000, unit: 'ms', label: 'First Contentful Paint' },
  cls:  { good: 0.1,  poor: 0.25, unit: '',   label: 'Cumulative Layout Shift' },
  tbt:  { good: 200,  poor: 600,  unit: 'ms', label: 'Total Blocking Time' },
  si:   { good: 3400, poor: 5800, unit: 'ms', label: 'Speed Index' },
  ttfb: { good: 800,  poor: 1800, unit: 'ms', label: 'Server Response Time' },
};

function getCwvRating(value: number, metric: string): 'good' | 'needs-improvement' | 'poor' {
  const t = CWV_THRESHOLDS[metric];
  if (!t) return 'good';
  if (value <= t.good) return 'good';
  if (value <= t.poor) return 'needs-improvement';
  return 'poor';
}

const RATING_STYLES: Record<string, string> = {
  good: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'needs-improvement': 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  poor: 'text-red-400 border-red-500/30 bg-red-500/10',
};

function formatCwvValue(value: number, metric: string): string {
  if (metric === 'cls') return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(1)} s`;
  return `${Math.round(value)} ms`;
}

function CwvMetricCard({ label, value, metric }: { label: string; value: number; metric: string }) {
  const rating = getCwvRating(value, metric);
  return (
    <div className={cn('rounded-xl border p-4 text-center', RATING_STYLES[rating])}>
      <p className="text-2xl font-bold">{formatCwvValue(value, metric)}</p>
      <p className="mt-1 text-[11px] opacity-80">{label}</p>
    </div>
  );
}

function FieldDataRow({ label, metric }: { label: string; metric: { p75: number; rating: string } | null }) {
  if (!metric) return null;
  const style = RATING_STYLES[metric.rating] || RATING_STYLES.good;
  return (
    <div className="flex items-center gap-2">
      <span className={cn('inline-block h-2 w-2 rounded-full', metric.rating === 'good' ? 'bg-emerald-400' : metric.rating === 'needs-improvement' ? 'bg-amber-400' : 'bg-red-400')} />
      <span className="text-xs text-[#CBD5E1]">{label}:</span>
      <span className={cn('text-xs font-semibold', style.split(' ')[0])}>{metric.p75}</span>
      <span className="text-[10px] text-[#64748B]">({metric.rating.replace('-', ' ')})</span>
    </div>
  );
}

/* ─────── Main Tab Component ─────── */

export default function SiteAuditTab() {
  const [domain, setDomain] = useState('');
  const [maxPages, setMaxPages] = useState(500);
  const [leadEmail, setLeadEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingRun, setPendingRun] = useState(false);
  const [reportStatus, setReportStatus] = useState<'' | 'sent' | 'partial' | 'failed'>('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<AuditProgressEvent | null>(null);
  const [result, setResult] = useState<SiteAuditResult | null>(null);
  const [error, setError] = useState('');
  const [filterSev, setFilterSev] = useState<IssueSeverity | 'all'>('all');
  const [filterCat, setFilterCat] = useState<IssueCategory | 'all'>('all');
  const abortRef = useRef<AbortController | null>(null);

  /* CWV state */
  const [cwvLoading, setCwvLoading] = useState(false);
  const [cwvResults, setCwvResults] = useState<PagePerformanceResult[]>([]);
  const [cwvError, setCwvError] = useState('');
  const [cwvStrategy, setCwvStrategy] = useState<'mobile' | 'desktop'>('mobile');

  const isValidLeadEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const submitAuditLead = useCallback(async (auditResult: SiteAuditResult, email: string) => {
    const topIssues = [...auditResult.issues]
      .sort((a, b) => b.affectedPages.length - a.affectedPages.length)
      .slice(0, 8)
      .map((issue) => ({
        title: issue.title,
        severity: issue.severity,
        affectedPages: issue.affectedPages.length,
      }));

    try {
      const response = await fetch('/api/seo-tools/site-audit/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          url: domain.trim(),
          summary: {
            healthScore: auditResult.healthScore,
            pagesScanned: auditResult.pagesScanned,
            errorCount: auditResult.errorCount,
            warningCount: auditResult.warningCount,
            noticeCount: auditResult.noticeCount,
            topIssues,
          },
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setReportStatus('failed');
        return;
      }

      if (payload.emailStatus === 'sent') setReportStatus('sent');
      else if (payload.emailStatus === 'partial') setReportStatus('partial');
      else if (payload.emailStatus === 'failed') setReportStatus('failed');
      else setReportStatus('partial');
    } catch {
      setReportStatus('failed');
    }
  }, [domain]);

  /* Analyze Core Web Vitals via our PSI proxy */
  const analyzeCWV = useCallback(async (siteUrl: string) => {
    setCwvLoading(true);
    setCwvError('');
    setCwvResults([]);

    for (const strategy of ['mobile', 'desktop'] as const) {
      try {
        const resp = await fetch(
          `/api/seo-tools/psi?url=${encodeURIComponent(siteUrl)}&strategy=${strategy}`,
        );

        if (!resp.ok) {
          const data = await resp.json().catch(() => ({}));
          if (resp.status === 429) {
            setCwvError('Rate limited — try again in a minute');
            break;
          }
          throw new Error(data.error || `PSI error: ${resp.status}`);
        }

        const psi = await resp.json();
        setCwvResults((prev) => [
          ...prev,
          {
            url: psi.url,
            strategy: psi.strategy,
            lab: psi.lab,
            field: psi.field,
            fetchedAt: psi.fetchedAt,
          },
        ]);
      } catch (err) {
        setCwvError(err instanceof Error ? err.message : 'CWV analysis failed');
      }
    }

    setCwvLoading(false);
  }, []);

  /* Auto-run CWV when audit completes */
  const cwvDomainRef = useRef('');
  useEffect(() => {
    if (!result) return;
    if (cwvDomainRef.current === result.domain) return;
    cwvDomainRef.current = result.domain;
    analyzeCWV(`https://${result.domain}`);
  }, [result, analyzeCWV]);

  /* Start audit */
  const startAudit = useCallback(async () => {
    const cleaned = domain.trim();
    if (!cleaned) return;

    setLoading(true);
    setResult(null);
    setError('');
    setReportStatus('');
    setProgress(null);
    setCwvResults([]);
    setCwvError('');
    cwvDomainRef.current = '';

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
              const completedResult = event.result as SiteAuditResult;
              setResult(completedResult);
              if (leadEmail.trim()) {
                void submitAuditLead(completedResult, leadEmail);
              }
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
  }, [domain, maxPages, leadEmail, submitAuditLead]);

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
            else {
              setPendingRun(true);
              setShowEmailModal(true);
            }
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
        <p className="mt-3 text-[11px] text-[#64748B]">100% free • No signup • No paywall • Crawls every page • Core Web Vitals • 50+ checks per page • CSV export included</p>

        {reportStatus === 'sent' && (
          <div className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            Audit report sent to your email and added to our lead pipeline.
          </div>
        )}
        {reportStatus === 'partial' && (
          <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
            Audit completed and lead saved. Email delivery is partially successful.
          </div>
        )}
        {reportStatus === 'failed' && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            Audit completed, but report email failed. Lead is still captured.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>
        )}
      </div>

      {showEmailModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => {
              setShowEmailModal(false);
              setPendingRun(false);
            }}
            aria-label="Close"
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/[0.12] bg-[#0B1120] p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Send audit report to email</h3>
            <p className="mt-2 text-sm text-[#94A3B8]">
              We will email your full audit summary and add this request to our admin lead pipeline.
            </p>
            <div className="mt-4">
              <label htmlFor="audit-email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                Email address
              </label>
              <input
                id="audit-email"
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#475569] outline-none focus:border-[#7C3AED]/60"
              />
            </div>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEmailModal(false);
                  setPendingRun(false);
                }}
                className="rounded-lg border border-white/[0.14] px-4 py-2 text-sm font-semibold text-[#CBD5E1] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!isValidLeadEmail(leadEmail)}
                onClick={() => {
                  if (!isValidLeadEmail(leadEmail)) return;
                  setShowEmailModal(false);
                  if (pendingRun) {
                    setPendingRun(false);
                    void startAudit();
                  }
                }}
                className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send Report & Run Audit
              </button>
            </div>
          </div>
        </div>
      )}

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
            Plus real <strong className="text-white">Core Web Vitals</strong> from Google PageSpeed Insights.
            Crawlability, content, links, performance, schema, and social tags. Then export the full report as CSV.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />No page limit</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Core Web Vitals</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />50+ checks per page</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />CSV export</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />No signup required</span>
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />JS rendering detection</span>
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

          {/* ── Core Web Vitals (Google PageSpeed Insights) ── */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#7C3AED]" />
                <div>
                  <p className="text-sm font-semibold text-white">Core Web Vitals</p>
                  <p className="text-[11px] text-[#64748B]">Powered by Google PageSpeed Insights</p>
                </div>
              </div>
              {cwvResults.length > 0 && (
                <div className="flex rounded-lg border border-white/[0.12] overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => setCwvStrategy('mobile')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 transition',
                      cwvStrategy === 'mobile' ? 'bg-[#7C3AED] text-white' : 'text-[#64748B] hover:text-white',
                    )}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => setCwvStrategy('desktop')}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 transition',
                      cwvStrategy === 'desktop' ? 'bg-[#7C3AED] text-white' : 'text-[#64748B] hover:text-white',
                    )}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                    Desktop
                  </button>
                </div>
              )}
            </div>

            {cwvLoading && cwvResults.length === 0 && (
              <div className="flex items-center gap-3 py-4">
                <Loader2 className="h-5 w-5 animate-spin text-[#7C3AED]" />
                <div>
                  <p className="text-sm text-white">Running Lighthouse analysis…</p>
                  <p className="text-xs text-[#64748B]">This takes 15–30 seconds</p>
                </div>
              </div>
            )}

            {cwvError && !cwvResults.length && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
                {cwvError}
              </div>
            )}

            {(() => {
              const current = cwvResults.find((r) => r.strategy === cwvStrategy);
              if (!current) return null;
              const { lab, field } = current;

              return (
                <>
                  {/* Lighthouse category scores */}
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                    <div className="flex flex-col items-center gap-1">
                      <ScoreDonut score={lab.performanceScore} small />
                      <p className="text-[11px] text-[#64748B]">Performance</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ScoreDonut score={lab.accessibilityScore} small />
                      <p className="text-[11px] text-[#64748B]">Accessibility</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ScoreDonut score={lab.seoScore} small />
                      <p className="text-[11px] text-[#64748B]">SEO</p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ScoreDonut score={lab.bestPracticesScore} small />
                      <p className="text-[11px] text-[#64748B]">Best Practices</p>
                    </div>
                  </div>

                  {/* CWV metric cards */}
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                    <CwvMetricCard label="LCP" value={lab.lcp} metric="lcp" />
                    <CwvMetricCard label="FCP" value={lab.fcp} metric="fcp" />
                    <CwvMetricCard label="CLS" value={lab.cls} metric="cls" />
                    <CwvMetricCard label="TBT" value={lab.tbt} metric="tbt" />
                    <CwvMetricCard label="Speed Index" value={lab.si} metric="si" />
                    <CwvMetricCard label="TTFB" value={lab.serverResponseTime} metric="ttfb" />
                  </div>

                  {/* Chrome UX Report field data */}
                  {field.hasData && (
                    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                      <p className="text-xs font-semibold text-white mb-2">Real User Data (Chrome UX Report — 28-day p75)</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <FieldDataRow label="LCP" metric={field.lcp} />
                        <FieldDataRow label="FCP" metric={field.fcp} />
                        <FieldDataRow label="CLS" metric={field.cls} />
                        <FieldDataRow label="INP" metric={field.inp} />
                        <FieldDataRow label="TTFB" metric={field.ttfb} />
                      </div>
                    </div>
                  )}

                  {!field.hasData && (
                    <p className="text-[11px] text-[#475569]">
                      No Chrome UX Report data available — site may not have enough traffic for field metrics.
                    </p>
                  )}

                  {cwvLoading && cwvResults.length === 1 && (
                    <div className="flex items-center gap-2 text-xs text-[#64748B]">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Loading {cwvStrategy === 'mobile' ? 'desktop' : 'mobile'} results…
                    </div>
                  )}
                </>
              );
            })()}
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
