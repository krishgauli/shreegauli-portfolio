'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Globe,
  KeyRound,
  Link2,
  Loader2,
  Printer,
  Search,
  ShieldCheck,
  Target,
  XCircle,
  X,
} from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { cn } from '@/lib/utils';
import SiteAuditTab from './SiteAuditTab';

type Status = 'pass' | 'warn' | 'fail';
type Impact = 'critical' | 'high' | 'medium' | 'low';
type SeoTab = 'audit' | 'onpage' | 'keywords' | 'backlinks' | 'report';

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

interface KeywordRow {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface KeywordsResponse {
  siteUrl: string;
  dateRange: { start: string; end: string };
  topPerforming: KeywordRow[];
  ranking: KeywordRow[];
  lowCtr: KeywordRow[];
  buried: KeywordRow[];
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

const TAB_ITEMS: Array<{ id: SeoTab; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: 'audit', label: 'Site Audit', icon: Globe },
  { id: 'onpage', label: 'On-Page', icon: Search },
  { id: 'keywords', label: 'Keywords', icon: KeyRound },
  { id: 'backlinks', label: 'Backlinks', icon: Link2 },
  { id: 'report', label: 'Full Report', icon: BarChart3 },
];

const IMPACT_ORDER: Impact[] = ['critical', 'high', 'medium', 'low'];
const IMPACT_LABEL: Record<Impact, string> = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const IMPACT_CLASSES: Record<Impact, string> = {
  critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/25',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  low: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
};

function getScoreColor(score: number) {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-amber-400';
  return 'text-red-400';
}

function getScoreLabel(score: number) {
  if (score >= 80) return 'Good';
  if (score >= 60) return 'Needs work';
  return 'Poor';
}

function StatusIcon({ status }: { status: Status }) {
  if (status === 'pass') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === 'warn') return <AlertTriangle className="h-4 w-4 text-amber-400" />;
  return <XCircle className="h-4 w-4 text-red-400" />;
}

function countByStatus(checks: SeoCheck[], status: Status) {
  return checks.filter((check) => check.status === status).length;
}

function normalizeInputUrl(input: string) {
  return input.startsWith('http://') || input.startsWith('https://') ? input : `https://${input}`;
}

function makeSiteOrigin(input: string) {
  const parsed = new URL(normalizeInputUrl(input));
  return `${parsed.protocol}//${parsed.host}/`;
}

function KeywordTable({ title, rows, tip }: { title: string; rows: KeywordRow[]; tip: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-white">{title}</p>
        <span className="text-xs text-[#64748B]">{rows.length} keywords</span>
      </div>
      <p className="mt-1 text-xs text-[#94A3B8]">{tip}</p>

      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-[#64748B]">No keywords in this bucket.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-[#64748B]">
                <th className="py-2 pr-3 font-medium">Keyword</th>
                <th className="py-2 pr-3 font-medium">Position</th>
                <th className="py-2 pr-3 font-medium">Impressions</th>
                <th className="py-2 pr-3 font-medium">Clicks</th>
                <th className="py-2 pr-3 font-medium">CTR</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${title}-${row.query}`} className="border-b border-white/[0.05] text-[#CBD5E1]">
                  <td className="py-2 pr-3 max-w-[260px] truncate">{row.query}</td>
                  <td className="py-2 pr-3">{row.position}</td>
                  <td className="py-2 pr-3">{row.impressions}</td>
                  <td className="py-2 pr-3">{row.clicks}</td>
                  <td className="py-2 pr-3">{row.ctr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function SeoToolsClient() {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<SeoTab>('audit');
  const [loadingAnalyze, setLoadingAnalyze] = useState(false);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<SeoResult | null>(null);
  const [keywordData, setKeywordData] = useState<KeywordsResponse | null>(null);
  const [gscConnected, setGscConnected] = useState(false);
  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadState, setLeadState] = useState<'idle' | 'success' | 'error'>('idle');
  const [leadFeedback, setLeadFeedback] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gsc = params.get('gsc');
    if (gsc === 'connected') {
      setGscConnected(true);
      setActiveTab('keywords');
    }
    if (gsc === 'error') {
      setError('Google Search Console connection failed. Please try again.');
    }

    const tab = params.get('tab') as SeoTab | null;
    if (tab && TAB_ITEMS.some((item) => item.id === tab)) {
      setActiveTab(tab);
    }
  }, []);

  const groupedChecks = useMemo(() => {
    if (!result) return [];
    return IMPACT_ORDER.map((impact) => ({
      impact,
      checks: result.checks.filter((check) => check.impact === impact),
    })).filter((bucket) => bucket.checks.length > 0);
  }, [result]);

  function updateTab(tab: SeoTab) {
    setActiveTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', next);
  }

  async function analyze() {
    const cleaned = url.trim();
    if (!cleaned) return;

    setError('');
    setKeywordData(null);
    setLoadingAnalyze(true);

    try {
      const response = await fetch('/api/seo-tools/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleaned }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Failed to analyze URL');
        return;
      }

      setResult(data);
      updateTab('onpage');
    } catch {
      setError('Unable to analyze this URL right now.');
    } finally {
      setLoadingAnalyze(false);
    }
  }

  async function fetchKeywordData() {
    if (!result) {
      setError('Analyze a URL first, then open Keywords tab.');
      return;
    }

    setError('');
    setLoadingKeywords(true);

    try {
      const response = await fetch('/api/seo-tools/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ siteUrl: makeSiteOrigin(result.url) }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Could not load keyword data');
        return;
      }

      setKeywordData(data);
      setGscConnected(true);
    } catch {
      setError('Could not fetch Search Console keyword data.');
    } finally {
      setLoadingKeywords(false);
    }
  }

  function connectGsc() {
    window.location.href = '/api/seo-tools/auth';
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;

    setLeadSubmitting(true);
    setLeadState('idle');
    setLeadFeedback('');

    try {
      const auditSummary = [
        `SEO audit request for ${result.url}`,
        `Score: ${result.score}/100`,
        `Failures: ${failCount}`,
        `Warnings: ${warnCount}`,
        leadData.message.trim(),
      ]
        .filter(Boolean)
        .join('\n\n');

      const response = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name.trim(),
          email: leadData.email.trim(),
          phone: '',
          businessType: 'seo-audit-review',
          budget: '',
          message: auditSummary,
          source: 'seo-tools',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit the audit request.');
      }

      setLeadData({ name: '', email: '', message: '' });
      setLeadState('success');
      setLeadFeedback(
        data.emailStatus === 'sent'
          ? 'Your audit request is in and a confirmation email is already on its way.'
          : 'Your audit request is in. I will follow up with the next steps shortly.'
      );
    } catch (submitError) {
      setLeadState('error');
      setLeadFeedback(
        submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLeadSubmitting(false);
    }
  }

  const failCount = result ? countByStatus(result.checks, 'fail') : 0;
  const warnCount = result ? countByStatus(result.checks, 'warn') : 0;
  const passCount = result ? countByStatus(result.checks, 'pass') : 0;

  return (
    <PageShell>
      <section className="section-pad relative z-10 px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="SEO Tools"
            title="Full SEO Audit Suite"
            as="h1"
            subtitle="Run on-page checks, ranking keyword opportunities, backlink authority signals, and export-ready full report — directly in this page."
          />

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                analyze();
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
                <input
                  type="text"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#475569] outline-none focus:border-[#7C3AED]/60"
                />
              </div>
              <button
                type="submit"
                disabled={loadingAnalyze || !url.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAnalyze ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {loadingAnalyze ? 'Analyzing...' : 'Analyze URL'}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {TAB_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = item.id === activeTab;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateTab(item.id)}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition',
                      active
                        ? 'border-[#7C3AED]/40 bg-[#7C3AED]/15 text-[#C4B5FD]'
                        : 'border-white/[0.08] bg-white/[0.02] text-[#94A3B8] hover:text-white'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {error && <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
          </div>

          {/* Site Audit tab — independent of single-page result */}
          {activeTab === 'audit' && (
            <div className="mt-8">
              <SiteAuditTab />
            </div>
          )}

          {activeTab !== 'audit' && !result ? (
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-sm text-[#94A3B8]">
              Run an audit to unlock On-Page, Keywords, Backlinks, and Full Report tabs.
            </div>
          ) : activeTab !== 'audit' && result ? (
            <div className="mt-8 space-y-6">
              {activeTab === 'onpage' && (
                <>
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-center">
                        <p className={cn('text-4xl font-bold', getScoreColor(result.score))}>{result.score}</p>
                        <p className="mt-1 text-xs text-[#64748B]">SEO Score / 100</p>
                        <p className={cn('text-sm font-semibold', getScoreColor(result.score))}>{getScoreLabel(result.score)}</p>
                      </div>
                      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
                        <p className="text-3xl font-bold text-red-400">{failCount}</p>
                        <p className="text-xs text-[#64748B]">Failures</p>
                      </div>
                      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-center">
                        <p className="text-3xl font-bold text-amber-400">{warnCount}</p>
                        <p className="text-xs text-[#64748B]">Warnings</p>
                      </div>
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                        <p className="text-3xl font-bold text-emerald-400">{passCount}</p>
                        <p className="text-xs text-[#64748B]">Passed</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                      <ShieldCheck className="mx-auto h-4 w-4 text-[#64748B]" />
                      <p className="mt-2 text-xl font-bold text-white">{result.performance.ttfb}ms</p>
                      <p className="text-xs text-[#64748B]">TTFB</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                      <Globe className="mx-auto h-4 w-4 text-[#64748B]" />
                      <p className="mt-2 text-xl font-bold text-white">{result.performance.size} KB</p>
                      <p className="text-xs text-[#64748B]">HTML Size</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                      <Target className="mx-auto h-4 w-4 text-[#64748B]" />
                      <p className="mt-2 text-xl font-bold text-white">{result.keywords.wordCount}</p>
                      <p className="text-xs text-[#64748B]">Indexable Words</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
                      <Link2 className="mx-auto h-4 w-4 text-[#64748B]" />
                      <p className="mt-2 text-xl font-bold text-white">{result.links.internal}</p>
                      <p className="text-xs text-[#64748B]">Internal Links</p>
                    </div>
                  </div>

                  {groupedChecks.map((bucket) => (
                    <div key={bucket.impact} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className={cn('rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wider', IMPACT_CLASSES[bucket.impact])}>
                          {IMPACT_LABEL[bucket.impact]} Impact
                        </span>
                        <span className="text-xs text-[#64748B]">{bucket.checks.length} checks</span>
                      </div>
                      <div className="space-y-2">
                        {bucket.checks.map((check) => (
                          <div key={check.id} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                            <div className="flex items-center gap-2">
                              <StatusIcon status={check.status} />
                              <p className="text-sm font-semibold text-white">{check.label}</p>
                            </div>
                            <p className="mt-1 text-sm text-[#94A3B8]">{check.message}</p>
                            {check.recommendation && (
                              <p className="mt-2 text-xs text-[#C4B5FD]">Fix: {check.recommendation}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'keywords' && (
                <>
                  {!gscConnected && (
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                      <p className="text-sm font-semibold text-white">Connect Google Search Console</p>
                      <p className="mt-2 text-sm text-[#94A3B8]">
                        For keywords that already rank and opportunities to rank higher, connect your Search Console account.
                      </p>
                      <button
                        type="button"
                        onClick={connectGsc}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9]"
                      >
                        <KeyRound className="h-4 w-4" />
                        Connect Google Search Console
                      </button>
                    </div>
                  )}

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">On-Page Extracted Keywords</p>
                        <p className="text-xs text-[#64748B]">Fast fallback data when Search Console is not connected.</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.keywords.topTerms.length === 0 ? (
                        <p className="text-sm text-[#64748B]">No repeated terms detected.</p>
                      ) : (
                        result.keywords.topTerms.map((term) => (
                          <span
                            key={term.term}
                            className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-3 py-1 text-xs text-[#C4B5FD]"
                          >
                            {term.term} · {term.frequency}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={fetchKeywordData}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-white"
                      disabled={loadingKeywords}
                    >
                      {loadingKeywords ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BarChart3 className="h-3.5 w-3.5" />}
                      {loadingKeywords ? 'Loading...' : 'Load ranking keyword data'}
                    </button>
                    {keywordData && (
                      <span className="text-xs text-[#64748B]">
                        {keywordData.siteUrl} · {keywordData.dateRange.start} to {keywordData.dateRange.end}
                      </span>
                    )}
                  </div>

                  {keywordData && (
                    <div className="space-y-4">
                      <KeywordTable
                        title="Top Performing (Pos 1-3)"
                        rows={keywordData.topPerforming}
                        tip="Protect these rankings with freshness updates and internal links."
                      />
                      <KeywordTable
                        title="Ranking Opportunities (Pos 4-20)"
                        rows={keywordData.ranking}
                        tip="These are closest to page-1 wins; optimize sections and add keyword-specific FAQs."
                      />
                      <KeywordTable
                        title="Low CTR Keywords"
                        rows={keywordData.lowCtr}
                        tip="Rewrite title/meta to improve click-through for high-impression terms."
                      />
                      <KeywordTable
                        title="Buried Keywords (Pos >30)"
                        rows={keywordData.buried}
                        tip="Needs stronger topical depth, supporting pages, and link authority."
                      />
                    </div>
                  )}
                </>
              )}

              {activeTab === 'backlinks' && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                      <p className="text-xs uppercase tracking-widest text-[#64748B]">Domain Authority (OPR)</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {result.authority.rank !== null ? result.authority.rank.toFixed(2) : 'N/A'}
                      </p>
                      <p className="text-xs text-[#64748B]">Open PageRank score</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                      <p className="text-xs uppercase tracking-widest text-[#64748B]">Referring Domains</p>
                      <p className="mt-2 text-3xl font-bold text-white">{result.authority.referringDomains ?? 'N/A'}</p>
                      <p className="text-xs text-[#64748B]">Estimated by Open PageRank</p>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                      <p className="text-xs uppercase tracking-widest text-[#64748B]">Link Profile</p>
                      <p className="mt-2 text-3xl font-bold text-white">{result.links.external}</p>
                      <p className="text-xs text-[#64748B]">External links on the audited page</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                    <p className="text-sm font-semibold text-white">Backlink & authority recommendations</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#94A3B8]">
                      <li>- Build topical backlinks to pages with ranking positions 4-20 first.</li>
                      <li>- Convert unlinked brand mentions into contextual links.</li>
                      <li>- Publish comparison pages to attract organic editorial backlinks.</li>
                      <li>- Strengthen internal linking from high-authority pages to money pages.</li>
                    </ul>
                  </div>
                </>
              )}

              {activeTab === 'report' && result && (
                <div className="space-y-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-white">Full SEO Audit Report</p>
                      <p className="text-sm text-[#94A3B8]">Includes on-page checks, keyword opportunities, and backlink authority summary.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9]"
                    >
                      <Printer className="h-4 w-4" />
                      Print / Save as PDF
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className={cn('text-3xl font-bold', getScoreColor(result.score))}>{result.score}</p>
                      <p className="text-xs text-[#64748B]">SEO score</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="text-3xl font-bold text-white">{result.authority.rank !== null ? result.authority.rank.toFixed(2) : 'N/A'}</p>
                      <p className="text-xs text-[#64748B]">Authority score</p>
                    </div>
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                      <p className="text-3xl font-bold text-white">{keywordData?.ranking.length ?? 0}</p>
                      <p className="text-xs text-[#64748B]">Ranking opportunities</p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <p className="text-sm font-semibold text-white">Top fixes to rank higher</p>
                    <ul className="mt-3 space-y-2 text-sm text-[#94A3B8]">
                      {result.checks
                        .filter((check) => check.status !== 'pass')
                        .slice(0, 8)
                        .map((check) => (
                          <li key={`report-${check.id}`}>
                            - <span className="text-white">{check.label}:</span> {check.recommendation || check.message}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Post-audit CTA */}
          {result && (
            <div className="mt-10 rounded-[32px] border border-[#7C3AED]/30 bg-[#7C3AED]/[0.06] p-6 sm:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4B5FD]">
                    Audit Review
                  </p>
                  <p className="mt-4 text-2xl font-bold text-[#F8FAFC]">
                    Need help fixing these issues?
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#CBD5E1]">
                    This result already tells us where the page is losing momentum.
                    If you want, send the audit through and I&apos;ll review the
                    highest-impact fixes before the next call.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-4">
                      <p className="text-2xl font-bold text-[#F8FAFC]">{result.score}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#64748B]">Score</p>
                    </div>
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
                      <p className="text-2xl font-bold text-red-400">{failCount}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#64748B]">Failures</p>
                    </div>
                    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                      <p className="text-2xl font-bold text-amber-400">{warnCount}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#64748B]">Warnings</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
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

                <form onSubmit={submitLead} className="grid gap-4 rounded-[28px] border border-white/[0.10] bg-[#020617]/55 p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm text-[#E2E8F0]">
                      Name
                      <input
                        type="text"
                        value={leadData.name}
                        onChange={(event) => setLeadData((current) => ({ ...current, name: event.target.value }))}
                        required
                        autoComplete="name"
                        className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                        placeholder="Your name"
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-[#E2E8F0]">
                      Email
                      <input
                        type="email"
                        value={leadData.email}
                        onChange={(event) => setLeadData((current) => ({ ...current, email: event.target.value }))}
                        required
                        autoComplete="email"
                        className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm text-[#E2E8F0]">
                    What should I focus on first?
                    <textarea
                      value={leadData.message}
                      onChange={(event) => setLeadData((current) => ({ ...current, message: event.target.value }))}
                      rows={4}
                      className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                      placeholder="Optional: tell me what matters most right now, like local rankings, low-converting service pages, or technical cleanup."
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={leadSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {leadSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    {leadSubmitting ? 'Sending audit...' : 'Send this audit for review'}
                  </button>

                  {leadFeedback && leadState === 'error' && (
                    <p
                      aria-live="polite"
                      className="text-sm text-rose-300"
                    >
                      {leadFeedback}
                    </p>
                  )}
                </form>

                {/* Success Popup */}
                {leadState === 'success' && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0F172A] p-8 text-center shadow-2xl">
                      <button
                        onClick={() => setLeadState('idle')}
                        className="absolute right-4 top-4 text-[#94A3B8] hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#F8FAFC] mb-2">Audit request sent!</h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">{leadFeedback}</p>
                      <button
                        onClick={() => setLeadState('idle')}
                        className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                      >
                        Got it
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
