'use client';

import { useState } from 'react';
import {
  Search, AlertTriangle, CheckCircle2, XCircle,
  ChevronDown, ChevronUp, Download, Loader2,
  RefreshCw, ArrowRight, Gauge, Link2, ImageIcon, Zap,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';

type Status = 'pass' | 'warn' | 'fail';
type Impact = 'critical' | 'high' | 'medium' | 'low';

interface SeoCheck {
  id: string; label: string; status: Status; message: string;
  impact: Impact; recommendation?: string;
}

interface SeoResult {
  url: string; score: number; checks: SeoCheck[];
  headings: { h1: string[]; h2: string[]; h3: string[] };
  images: { total: number; missingAlt: number };
  links: { internal: number; external: number };
  performance: { ttfb: number; size: number };
  rawMeta: {
    title: string; description: string; canonical: string;
    robots: string; ogTitle: string; ogDescription: string; ogImage: string;
  };
}

const IMPACT_ORDER: Impact[] = ['critical', 'high', 'medium', 'low'];
const IMPACT_LABEL: Record<Impact, string> = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const IMPACT_CLASSES: Record<Impact, string> = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  high:     'text-orange-400 bg-orange-500/10 border-orange-500/20',
  medium:   'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low:      'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

function StatusIcon({ status }: { status: Status }) {
  if (status === 'pass') return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
  if (status === 'warn') return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
  return <XCircle className="w-4 h-4 text-red-400 shrink-0" />;
}

function scoreColor(s: number) {
  return s >= 80 ? 'text-emerald-400' : s >= 60 ? 'text-amber-400' : 'text-red-400';
}

function scoreLabel(s: number) {
  return s >= 80 ? 'Good' : s >= 60 ? 'Needs work' : 'Poor';
}

function CheckRow({ check, open, onToggle }: { check: SeoCheck; open: boolean; onToggle: () => void }) {
  const hasDetails = !!check.recommendation;
  return (
    <div className={cn('rounded-xl border transition-colors', open ? 'border-white/10 bg-white/[0.04]' : 'border-white/[0.05] hover:border-white/10')}>
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
        onClick={onToggle}
      >
        <StatusIcon status={check.status} />
        <span className="flex-1 text-sm font-medium text-white">{check.label}</span>
        <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border hidden sm:inline-flex', IMPACT_CLASSES[check.impact])}>
          {IMPACT_LABEL[check.impact]}
        </span>
        {hasDetails
          ? open ? <ChevronUp className="w-3.5 h-3.5 text-[#64748B] shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
          : <span className="w-3.5" />}
      </button>
      {open && (
        <div className="px-11 pb-4 space-y-2">
          <p className="text-sm text-[#94A3B8]">{check.message}</p>
          {check.recommendation && (
            <div className="flex gap-2 items-start rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 px-3 py-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#7C3AED] shrink-0 mt-0.5" />
              <p className="text-xs text-[#C4B5FD] leading-relaxed">{check.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const EXAMPLE_URLS = ['https://ahrefs.com', 'https://moz.com', 'https://neilpatel.com'];

export default function SeoToolsClient() {
  const [url, setUrl]         = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<SeoResult | null>(null);
  const [error, setError]     = useState('');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  async function analyze(targetUrl?: string) {
    const input = targetUrl ?? url.trim();
    if (!input) return;
    setError(''); setResult(null); setOpenIds(new Set());
    if (!url && targetUrl) setUrl(targetUrl);
    setLoading(true);
    try {
      const res = await fetch('/api/seo-tools/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: input }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Analysis failed'); return; }
      setResult(data);
      // Auto-expand all failures
      setOpenIds(new Set(data.checks.filter((c: SeoCheck) => c.status === 'fail').map((c: SeoCheck) => c.id)));
    } catch {
      setError('Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function toggle(id: string) {
    setOpenIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function reset() { setResult(null); setUrl(''); setError(''); setOpenIds(new Set()); }

  function downloadReport() {
    if (!result) return;
    const fails = result.checks.filter(c => c.status === 'fail');
    const warns  = result.checks.filter(c => c.status === 'warn');
    const lines = [
      '═══════════════════════════════════════════════════════════',
      '  SEO AUDIT REPORT',
      '═══════════════════════════════════════════════════════════',
      `  URL:       ${result.url}`,
      `  Score:     ${result.score}/100 — ${scoreLabel(result.score)}`,
      `  Generated: ${new Date().toLocaleString()}`,
      '',
      '── FAILURES (Fix immediately) ──────────────────────────────',
      ...(fails.length ? fails.map(c => `  ✗ [${c.impact.toUpperCase()}] ${c.label}\n    Issue: ${c.message}${c.recommendation ? `\n    Fix:   ${c.recommendation}` : ''}`) : ['  None — great!']),
      '',
      '── WARNINGS (Should fix) ───────────────────────────────────',
      ...(warns.length ? warns.map(c => `  ⚠ [${c.impact.toUpperCase()}] ${c.label}\n    Issue: ${c.message}${c.recommendation ? `\n    Fix:   ${c.recommendation}` : ''}`) : ['  None']),
      '',
      '── KEY META ────────────────────────────────────────────────',
      `  Title:       ${result.rawMeta.title || '(missing)'}`,
      `  Description: ${result.rawMeta.description || '(missing)'}`,
      `  H1:          ${result.headings.h1[0] || '(missing)'}`,
      `  Canonical:   ${result.rawMeta.canonical || '(missing)'}`,
      `  OG Image:    ${result.rawMeta.ogImage || '(missing)'}`,
      '',
      '── PERFORMANCE ─────────────────────────────────────────────',
      `  TTFB:           ${result.performance.ttfb}ms`,
      `  Page size:      ${result.performance.size} KB`,
      `  Images:         ${result.images.total} total, ${result.images.missingAlt} missing alt`,
      `  Internal links: ${result.links.internal}`,
      `  External links: ${result.links.external}`,
      '',
      '── H2 HEADINGS ─────────────────────────────────────────────',
      ...(result.headings.h2.slice(0, 8).map(h => `  • ${h}`) || ['  (none)']),
      '',
      '═══════════════════════════════════════════════════════════',
      '  Generated by shreegauli.com/seo-tools',
      '═══════════════════════════════════════════════════════════',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `seo-report-${new URL(result.url).hostname}-${Date.now()}.txt`;
    a.click();
  }

  const grouped = result
    ? IMPACT_ORDER
        .map(impact => ({
          impact,
          checks: result.checks
            .filter(c => c.impact === impact)
            .sort(c => (c.status === 'fail' ? -1 : c.status === 'warn' ? 0 : 1)),
        }))
        .filter(g => g.checks.length > 0)
    : [];

  const failCount = result?.checks.filter(c => c.status === 'fail').length ?? 0;
  const warnCount = result?.checks.filter(c => c.status === 'warn').length ?? 0;
  const passCount = result?.checks.filter(c => c.status === 'pass').length ?? 0;

  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="SEO Tools"
            title="Audit any page in seconds"
            subtitle="Paste any URL to instantly surface what's hurting your rankings, what to fix first, and exactly why it matters."
          />

          {/* URL input */}
          <form
            onSubmit={e => { e.preventDefault(); analyze(); }}
            className="mt-10 flex gap-3"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="rounded-xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#6D28D9] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="hidden sm:inline">{loading ? 'Analyzing…' : 'Analyze'}</span>
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!result && !loading && !error && (
            <div className="mt-10 space-y-6">
              {/* Try examples */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#475569]">Try:</span>
                {EXAMPLE_URLS.map(u => (
                  <button
                    key={u}
                    onClick={() => { setUrl(u); analyze(u); }}
                    className="text-xs text-[#7C3AED] hover:text-[#9B5CF6] border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    {u.replace('https://', '')}
                  </button>
                ))}
              </div>

              {/* Checks list */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <p className="text-sm font-semibold text-white mb-4">What gets checked</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    ['Title tag length & quality', 'critical'],
                    ['Meta description', 'critical'],
                    ['H1 heading presence & count', 'critical'],
                    ['HTTPS security', 'critical'],
                    ['Mobile viewport meta', 'critical'],
                    ['Robots noindex detection', 'critical'],
                    ['Canonical URL tag', 'high'],
                    ['Image alt text coverage', 'high'],
                    ['Server response time (TTFB)', 'high'],
                    ['Open Graph completeness', 'medium'],
                    ['JSON-LD schema markup', 'medium'],
                    ['Page HTML size', 'medium'],
                    ['Internal link count', 'medium'],
                    ['Heading structure (H2/H3)', 'low'],
                  ].map(([label, impact]) => (
                    <div key={label} className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', {
                        'bg-red-400': impact === 'critical',
                        'bg-orange-400': impact === 'high',
                        'bg-amber-400': impact === 'medium',
                        'bg-blue-400': impact === 'low',
                      })} />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Python download */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">Python CLI script also available</p>
                  <p className="text-sm text-[#64748B]">Crawl full sitemaps, audit bulk URL lists from a .txt file, export CSV reports — all from your terminal.</p>
                  <code className="mt-2 block text-xs text-[#7C3AED] font-mono">pip install requests beautifulsoup4 colorama</code>
                  <code className="block text-xs text-[#555] font-mono">python seo-audit.py https://example.com --sitemap</code>
                </div>
                <a
                  href="/seo-audit.py"
                  download
                  className="inline-flex items-center gap-2 shrink-0 text-sm font-medium text-white bg-[#7C3AED]/20 hover:bg-[#7C3AED]/30 border border-[#7C3AED]/30 rounded-xl px-4 py-2.5 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download seo-audit.py
                </a>
              </div>
            </div>
          )}

          {/* ── Results ─────────────────────────────────────────────────── */}
          {result && (
            <div className="mt-10 space-y-8">

              {/* Score card */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="text-center shrink-0 w-28">
                  <div className={cn('text-6xl font-black tabular-nums leading-none', scoreColor(result.score))}>
                    {result.score}
                  </div>
                  <div className="text-xs text-[#64748B] mt-1">/ 100</div>
                  <div className={cn('mt-1.5 text-sm font-semibold', scoreColor(result.score))}>
                    {scoreLabel(result.score)}
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-3 gap-3 w-full">
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">{failCount}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Failures</div>
                  </div>
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400">{warnCount}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Warnings</div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">{passCount}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">Passed</div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={downloadReport}
                    className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/20 rounded-lg px-3 py-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white border border-white/[0.08] hover:border-white/20 rounded-lg px-3 py-2 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> New
                  </button>
                </div>
              </div>

              {/* Quick stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Zap, label: 'TTFB', value: `${result.performance.ttfb}ms`, sub: result.performance.ttfb > 800 ? '⚠ Slow' : result.performance.ttfb > 400 ? 'OK' : '✓ Fast' },
                  { icon: Gauge, label: 'Page Size', value: `${result.performance.size} KB`, sub: result.performance.size > 500 ? '⚠ Heavy' : '✓ Good' },
                  { icon: ImageIcon, label: 'Missing Alt', value: `${result.images.missingAlt}/${result.images.total}`, sub: 'Images' },
                  { icon: Link2, label: 'Links', value: String(result.links.internal), sub: `${result.links.external} external` },
                ].map(({ icon: Icon, label, value, sub }) => (
                  <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                    <Icon className="w-4 h-4 text-[#475569] mx-auto mb-1.5" />
                    <div className="text-xl font-bold text-white">{value}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{label}</div>
                    <div className="text-xs text-[#475569]">{sub}</div>
                  </div>
                ))}
              </div>

              {/* Meta snapshot */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-3">Meta Snapshot</p>
                {[
                  { label: 'Title',       val: result.rawMeta.title },
                  { label: 'Description', val: result.rawMeta.description },
                  { label: 'H1',          val: result.headings.h1[0] },
                  { label: 'Canonical',   val: result.rawMeta.canonical },
                  { label: 'Robots',      val: result.rawMeta.robots },
                  { label: 'OG Image',    val: result.rawMeta.ogImage },
                ].map(row => (
                  <div key={row.label} className="flex gap-3 text-sm">
                    <span className="text-[#475569] w-24 shrink-0 font-mono text-xs pt-0.5">{row.label}</span>
                    <span className={row.val ? 'text-[#CBD5E1] break-all leading-relaxed' : 'text-red-400 italic'}>
                      {row.val || '— missing'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Checks grouped by impact */}
              {grouped.map(({ impact, checks }) => (
                <div key={impact}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={cn('text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border', IMPACT_CLASSES[impact])}>
                      {IMPACT_LABEL[impact]} Impact
                    </span>
                    <div className="h-px flex-1 bg-white/[0.05]" />
                    <span className="text-xs text-[#475569]">{checks.length} check{checks.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="space-y-2">
                    {checks.map(c => (
                      <CheckRow key={c.id} check={c} open={openIds.has(c.id)} onToggle={() => toggle(c.id)} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Heading structure */}
              {(result.headings.h1.length > 0 || result.headings.h2.length > 0) && (
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#64748B] mb-4">Heading Structure</p>
                  <div className="space-y-1.5">
                    {result.headings.h1.map((h, i) => (
                      <p key={i} className="text-sm font-semibold text-white flex gap-2">
                        <span className="text-xs font-mono text-[#7C3AED] bg-[#7C3AED]/10 rounded px-1.5 py-0.5 shrink-0 h-fit mt-0.5">H1</span>
                        {h}
                      </p>
                    ))}
                    {result.headings.h2.slice(0, 8).map((h, i) => (
                      <p key={i} className="text-sm text-[#94A3B8] flex gap-2 pl-4">
                        <span className="text-xs font-mono text-[#475569] bg-white/5 rounded px-1.5 py-0.5 shrink-0 h-fit mt-0.5">H2</span>
                        {h}
                      </p>
                    ))}
                    {result.headings.h3.slice(0, 4).map((h, i) => (
                      <p key={i} className="text-xs text-[#64748B] flex gap-2 pl-8">
                        <span className="font-mono bg-white/5 rounded px-1.5 py-0.5 shrink-0 h-fit">H3</span>
                        {h}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Python script CTA */}
              <div className="rounded-2xl border border-[#7C3AED]/20 bg-[#7C3AED]/5 p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Need bulk audits?</p>
                  <p className="text-xs text-[#64748B] mt-1">Download the Python script to crawl entire sitemaps, process lists of URLs, and export CSV reports from your terminal.</p>
                </div>
                <a
                  href="/seo-audit.py"
                  download
                  className="inline-flex items-center gap-2 shrink-0 text-sm font-medium text-[#C4B5FD] hover:text-white border border-[#7C3AED]/30 rounded-xl px-4 py-2.5 transition-colors"
                >
                  <Download className="w-4 h-4" /> seo-audit.py
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
