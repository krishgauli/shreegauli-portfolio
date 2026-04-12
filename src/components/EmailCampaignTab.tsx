'use client';

import { useState, useEffect, useCallback } from 'react';

// ─── Types ─────────────────────────────────────────────────────────
interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  businessType: string | null;
  status: string;
  source: string | null;
  createdAt: string;
}

interface SendResult {
  email: string;
  name: string;
  sent: boolean;
  error?: string;
}

type CampaignStatus = 'idle' | 'sending' | 'done';

// ─── Component ─────────────────────────────────────────────────────
export default function EmailCampaignTab() {
  // Lead data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selection
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Campaign compose
  const [subject, setSubject] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');

  // Send state
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>('idle');
  const [results, setResults] = useState<SendResult[]>([]);
  const [progress, setProgress] = useState({ sent: 0, failed: 0, total: 0 });

  // ── Fetch leads ──────────────────────────────────────────────────
  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/contact-lead');
      if (res.status === 401 || res.status === 403) {
        setError('Unauthorized. Please log in again.');
        return;
      }
      if (!res.ok) {
        setError('Failed to load leads');
        return;
      }
      const data = await res.json();
      setLeads(data.leads || []);
    } catch {
      setError('Network error loading leads');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // ── Filtering ────────────────────────────────────────────────────
  const filteredLeads = leads.filter((l) => {
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.businessType && l.businessType.toLowerCase().includes(q)) ||
        (l.phone && l.phone.includes(q))
      );
    }
    return true;
  });

  // ── Selection helpers ────────────────────────────────────────────
  const toggleSelect = (id: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredLeads.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  const selectedLeads = leads.filter((l) => selected.has(l.id));

  // ── Send campaign ───────────────────────────────────────────────
  async function handleSend() {
    if (!subject.trim()) {
      alert('Please enter a subject line.');
      return;
    }
    if (!bodyHtml.trim()) {
      alert('Please enter the email body content.');
      return;
    }
    if (selectedLeads.length === 0) {
      alert('Select at least one lead to send to.');
      return;
    }

    const confirmed = confirm(
      `Send "${subject}" to ${selectedLeads.length} lead(s)? Emails will be sent one-by-one.`,
    );
    if (!confirmed) return;

    setCampaignStatus('sending');
    setResults([]);
    setProgress({ sent: 0, failed: 0, total: selectedLeads.length });

    try {
      const res = await fetch('/api/email-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          bodyHtml: bodyHtml.trim(),
          recipients: selectedLeads.map((l) => ({ name: l.name, email: l.email })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Campaign send failed');
        setCampaignStatus('idle');
        return;
      }

      setResults(data.results || []);
      setProgress({ sent: data.sentCount, failed: data.failedCount, total: data.total });
      setCampaignStatus('done');
    } catch {
      alert('Network error sending campaign');
      setCampaignStatus('idle');
    }
  }

  function resetCampaign() {
    setCampaignStatus('idle');
    setResults([]);
    setProgress({ sent: 0, failed: 0, total: 0 });
    setSubject('');
    setBodyHtml('');
    setSelected(new Set());
  }

  // ── Render ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-4 text-red-300 text-sm">
        {error}
      </div>
    );
  }

  const statusOptions = ['all', 'new', 'contacted', 'qualified', 'closed'];

  return (
    <div className="space-y-6">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#f8fafc]">Email Campaign</h2>
          <p className="text-sm text-[#94a3b8] mt-1">
            Select leads, compose your message, and send emails one-by-one using your branded template.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
            {leads.length} total leads
          </span>
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {selected.size} selected
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* ── LEFT: Lead selection (3 cols) ─────────────────────────── */}
        <div className="xl:col-span-3 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search leads by name, email, business…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dashboard-input flex-1 min-w-[200px] rounded-xl px-4 py-2.5 text-sm"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="dashboard-input rounded-xl px-3 py-2.5 text-sm min-w-[140px]"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s === 'all' ? 'All statuses' : s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
            <button
              onClick={toggleSelectAll}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold transition border border-white/10 hover:border-cyan-400/30 hover:bg-white/5 text-slate-300"
            >
              {selected.size === filteredLeads.length && filteredLeads.length > 0
                ? 'Deselect All'
                : `Select All (${filteredLeads.length})`}
            </button>
          </div>

          {/* Lead list */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden max-h-[520px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-white/10 text-left text-[#94a3b8] text-xs uppercase tracking-wider bg-[#0f172a]/90 backdrop-blur">
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selected.size === filteredLeads.length && filteredLeads.length > 0}
                      onChange={toggleSelectAll}
                      className="accent-violet-500 w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3 hidden md:table-cell">Business</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-[#94a3b8]">
                      No leads found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => toggleSelect(lead.id)}
                      className={`border-b border-white/5 cursor-pointer transition-colors ${
                        selected.has(lead.id)
                          ? 'bg-violet-500/10 hover:bg-violet-500/15'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="accent-violet-500 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-[#f8fafc]">{lead.name}</td>
                      <td className="px-4 py-3 text-[#94a3b8]">{lead.email}</td>
                      <td className="px-4 py-3 text-[#94a3b8] hidden md:table-cell">
                        {lead.businessType || '—'}
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                            lead.status === 'new'
                              ? 'bg-blue-500/15 text-blue-300'
                              : lead.status === 'contacted'
                                ? 'bg-amber-500/15 text-amber-300'
                                : lead.status === 'qualified'
                                  ? 'bg-green-500/15 text-green-300'
                                  : 'bg-slate-500/15 text-slate-400'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── RIGHT: Compose & send (2 cols) ───────────────────────── */}
        <div className="xl:col-span-2 space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
            <h3 className="text-base font-bold text-[#f8fafc]">Compose Email</h3>

            {/* Template preview info */}
            <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-xs text-violet-300">
              <strong>Template:</strong> Your branded header (SG logo + SHREE GAULI) and footer
              (social links, terms, copyright) are automatically included. Just write the body below.
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                Subject Line *
              </label>
              <input
                type="text"
                placeholder="e.g. Special offer for your business…"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={campaignStatus === 'sending'}
                className="dashboard-input w-full rounded-lg px-4 py-2.5 text-sm disabled:opacity-50"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-xs font-medium text-[#94a3b8] mb-1.5">
                Email Body (HTML supported) *
              </label>
              <p className="text-[10px] text-[#64748b] mb-2">
                Each email starts with &quot;Hi [Name],&quot; automatically. Write your message below.
                You can use HTML tags for formatting.
              </p>
              <textarea
                placeholder={`<p style="font-size:16px;color:#0f172a;line-height:1.6;">
  Write your email body here...
</p>

<p style="font-size:16px;color:#0f172a;line-height:1.6;">
  Add more paragraphs, links, or any content.
</p>

<p style="font-size:16px;color:#0f172a;">
  Best regards,<br/>
  <strong>Shree Gauli</strong>
</p>`}
                value={bodyHtml}
                onChange={(e) => setBodyHtml(e.target.value)}
                disabled={campaignStatus === 'sending'}
                rows={10}
                className="dashboard-input w-full rounded-lg px-4 py-3 text-sm font-mono resize-y disabled:opacity-50"
              />
            </div>

            {/* Selected recipients summary */}
            <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#94a3b8]">Recipients:</span>
                <span className="font-bold text-[#f8fafc]">{selected.size} lead(s)</span>
              </div>
              {selected.size > 0 && selected.size <= 8 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {selectedLeads.map((l) => (
                    <span
                      key={l.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-[10px] text-[#e2e8f0]"
                    >
                      {l.name}
                      <button
                        onClick={() => toggleSelect(l.id)}
                        className="text-red-400 hover:text-red-300 ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {selected.size > 8 && (
                <p className="mt-1 text-[10px] text-[#64748b]">
                  {selectedLeads.slice(0, 5).map((l) => l.name).join(', ')} and{' '}
                  {selected.size - 5} more…
                </p>
              )}
            </div>

            {/* Send button */}
            {campaignStatus === 'idle' && (
              <button
                onClick={handleSend}
                disabled={selected.size === 0 || !subject.trim() || !bodyHtml.trim()}
                className="w-full py-3 rounded-xl font-bold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)',
                  color: '#f8fafc',
                  boxShadow: '0 16px 36px -18px rgba(124, 58, 237, 0.72)',
                }}
              >
                Send to {selected.size} Lead(s)
              </button>
            )}

            {/* Sending progress */}
            {campaignStatus === 'sending' && (
              <div className="text-center py-4 space-y-3">
                <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-[#94a3b8]">
                  Sending emails one-by-one… Please wait.
                </p>
                <p className="text-xs text-[#64748b]">
                  This may take {Math.ceil(progress.total * 1.5)} seconds.
                </p>
              </div>
            )}

            {/* Results */}
            {campaignStatus === 'done' && (
              <div className="space-y-3">
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm">
                  <p className="font-bold text-green-300">Campaign Complete</p>
                  <p className="text-green-200/80 text-xs mt-1">
                    ✓ {progress.sent} sent · ✗ {progress.failed} failed · {progress.total} total
                  </p>
                </div>

                {results.filter((r) => !r.sent).length > 0 && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
                    <p className="text-xs font-bold text-red-300 mb-1">Failed:</p>
                    {results
                      .filter((r) => !r.sent)
                      .map((r, i) => (
                        <p key={i} className="text-[10px] text-red-200/70">
                          {r.name} ({r.email}): {r.error}
                        </p>
                      ))}
                  </div>
                )}

                <button
                  onClick={resetCampaign}
                  className="w-full py-2.5 rounded-xl font-bold text-sm border border-white/10 text-[#e2e8f0] hover:bg-white/5 transition"
                >
                  New Campaign
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
