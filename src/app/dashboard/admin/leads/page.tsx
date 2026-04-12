'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Users, Mail, Phone, Calendar, Building2, DollarSign,
  Target, AlertCircle, Plus, Pencil, Trash2, Search, X, Check,
  ChevronDown, ChevronUp,
} from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  businessType: string | null;
  budget: string | null;
  message: string | null;
  source: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

type LeadFormData = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  budget: string;
  message: string;
  source: string;
  status: string;
};

const EMPTY_FORM: LeadFormData = {
  name: '', email: '', phone: '', businessType: '', budget: '', message: '', source: '', status: 'new',
};

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'closed'] as const;

const SOURCE_OPTIONS = ['website', 'referral', 'social', 'ads', 'unknown'] as const;

function getStatusColor(status: string) {
  switch (status) {
    case 'new': return 'bg-blue-900/40 text-blue-300 border-blue-700';
    case 'contacted': return 'bg-yellow-900/40 text-yellow-300 border-yellow-700';
    case 'qualified': return 'bg-emerald-900/40 text-emerald-300 border-emerald-700';
    case 'closed': return 'bg-slate-700 text-white border-slate-600';
    default: return 'bg-slate-700 text-white border-slate-600';
  }
}

/* ─── Modal Wrapper ─── */
function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-bold text-[#f8fafc]">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ─── Lead Form ─── */
function LeadForm({
  data, onChange, onSubmit, submitting, submitLabel,
}: {
  data: LeadFormData;
  onChange: (d: LeadFormData) => void;
  onSubmit: () => void;
  submitting: boolean;
  submitLabel: string;
}) {
  const set = (key: keyof LeadFormData, value: string) => onChange({ ...data, [key]: value });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Name *</label>
          <input
            className="dashboard-input w-full"
            value={data.name}
            onChange={e => set('name', e.target.value)}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Email *</label>
          <input
            className="dashboard-input w-full"
            type="email"
            value={data.email}
            onChange={e => set('email', e.target.value)}
            placeholder="email@example.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Phone</label>
          <input
            className="dashboard-input w-full"
            value={data.phone}
            onChange={e => set('phone', e.target.value)}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Source</label>
          <select
            className="dashboard-input w-full"
            value={data.source}
            onChange={e => set('source', e.target.value)}
          >
            <option value="">Select source</option>
            {SOURCE_OPTIONS.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Business Type</label>
          <input
            className="dashboard-input w-full"
            value={data.businessType}
            onChange={e => set('businessType', e.target.value)}
            placeholder="e.g. Dental, Medical"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Budget</label>
          <input
            className="dashboard-input w-full"
            value={data.budget}
            onChange={e => set('budget', e.target.value)}
            placeholder="e.g. $2000 - $5000"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
        <div className="flex gap-2">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => set('status', s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                data.status === s
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">Message / Notes</label>
        <textarea
          className="dashboard-input w-full min-h-[80px] resize-y"
          value={data.message}
          onChange={e => set('message', e.target.value)}
          placeholder="Lead details or notes..."
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onSubmit}
          disabled={submitting || !data.name.trim() || !data.email.trim()}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </div>
  );
}

/* ─── Confirm Dialog ─── */
function ConfirmDialog({
  open, onClose, onConfirm, title, message, confirming,
}: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; message: string; confirming: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-bold text-[#f8fafc] mb-2">{title}</h3>
        <p className="text-sm text-slate-400 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirming}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-500 disabled:opacity-40 transition-colors"
          >
            {confirming ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

export default function ContactLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Search & filter
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [showAdd, setShowAdd] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);

  // Form state
  const [formData, setFormData] = useState<LeadFormData>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  // Selection for bulk actions
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/contact-lead');
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ─── Filtered leads ─── */
  const filtered = useMemo(() => {
    let list = leads;
    if (statusFilter !== 'all') list = list.filter(l => l.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone && l.phone.includes(q)) ||
        (l.businessType && l.businessType.toLowerCase().includes(q))
      );
    }
    return list;
  }, [leads, statusFilter, search]);

  /* ─── Stats ─── */
  const newLeads = leads.filter(l => l.status === 'new').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
  const todayLeads = leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;

  /* ─── CREATE ─── */
  const openAdd = () => { setFormData(EMPTY_FORM); setShowAdd(true); };
  const handleCreate = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(prev => [data.lead, ...prev]);
        setShowAdd(false);
      }
    } catch (err) {
      console.error('Create lead error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── EDIT ─── */
  const openEdit = (lead: Lead) => {
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      businessType: lead.businessType || '',
      budget: lead.budget || '',
      message: lead.message || '',
      source: lead.source || '',
      status: lead.status,
    });
    setEditLead(lead);
  };
  const handleEdit = async () => {
    if (!editLead) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editLead.id, ...formData }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(prev => prev.map(l => l.id === editLead.id ? data.lead : l));
        setEditLead(null);
      }
    } catch (err) {
      console.error('Edit lead error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── DELETE ─── */
  const handleDelete = async () => {
    if (!deleteLead) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/contact-lead?id=${deleteLead.id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== deleteLead.id));
        setSelected(prev => { const s = new Set(prev); s.delete(deleteLead.id); return s; });
        setDeleteLead(null);
        if (expandedId === deleteLead.id) setExpandedId(null);
      }
    } catch (err) {
      console.error('Delete lead error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── BULK DELETE ─── */
  const handleBulkDelete = async () => {
    if (selected.size === 0) return;
    setSubmitting(true);
    try {
      const ids = Array.from(selected).join(',');
      const res = await fetch(`/api/contact-lead?ids=${ids}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => !selected.has(l.id)));
        setSelected(new Set());
        setBulkDeleteConfirm(false);
      }
    } catch (err) {
      console.error('Bulk delete error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ─── QUICK STATUS UPDATE ─── */
  const updateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/contact-lead', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error('Status update error:', err);
    }
  };

  /* ─── SELECTION ─── */
  const toggleSelect = (id: number) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };
  const toggleSelectAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map(l => l.id)));
    }
  };

  return (
    <div className="dashboard-scope dashboard-shell min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">

        {/* ─── Header ─── */}
        <div className="mb-8">
          <Link href="/dashboard/admin" className="inline-flex items-center gap-2 text-[#e2e8f0] hover:text-[#f8fafc] mb-4 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#f8fafc]">Contact Leads</h1>
              <p className="text-[#94a3b8] mt-1 text-sm">Manage, track, and follow up on your incoming leads</p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/30"
            >
              <Plus className="h-4 w-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-emerald-500' },
            { label: 'New', value: newLeads, icon: AlertCircle, color: 'text-blue-400' },
            { label: 'Qualified', value: qualifiedLeads, icon: Target, color: 'text-emerald-400' },
            { label: 'Today', value: todayLeads, icon: Calendar, color: 'text-slate-400' },
          ].map(s => (
            <div key={s.label} className="bg-slate-900/80 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#94a3b8]">{s.label}</p>
                  <p className="text-2xl font-black text-[#f8fafc] mt-1">{s.value}</p>
                </div>
                <s.icon className={`h-10 w-10 ${s.color} opacity-60`} />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Toolbar: Search + Filter + Bulk ─── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              className="dashboard-input w-full pl-10"
              placeholder="Search by name, email, phone, business type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <select
            className="dashboard-input w-full sm:w-40"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          {selected.size > 0 && (
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/80 text-white text-sm font-medium hover:bg-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete ({selected.size})
            </button>
          )}
        </div>

        {/* ─── Leads List ─── */}
        {loading ? (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-slate-400">Loading leads...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-12 text-center">
            <Users className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">{search || statusFilter !== 'all' ? 'No leads match your filters' : 'No leads yet'}</p>
            {!search && statusFilter === 'all' && (
              <button onClick={openAdd} className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                + Add your first lead
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Select all row */}
            <div className="flex items-center gap-3 px-2 text-xs text-slate-500">
              <button
                onClick={toggleSelectAll}
                className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${
                  selected.size === filtered.length && filtered.length > 0
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                {selected.size === filtered.length && filtered.length > 0 && <Check className="h-3 w-3" />}
              </button>
              <span>
                {selected.size > 0
                  ? `${selected.size} of ${filtered.length} selected`
                  : `${filtered.length} lead${filtered.length !== 1 ? 's' : ''}`}
              </span>
            </div>

            {filtered.map(lead => {
              const isExpanded = expandedId === lead.id;
              const isSelected = selected.has(lead.id);
              return (
                <div
                  key={lead.id}
                  className={`bg-slate-900/80 border rounded-2xl overflow-hidden transition-colors ${
                    isSelected ? 'border-emerald-600/50' : 'border-white/10'
                  }`}
                >
                  {/* ─── Row ─── */}
                  <div className="flex items-center gap-3 p-4 sm:p-5">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleSelect(lead.id)}
                      className={`h-5 w-5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </button>

                    {/* Main content — clickable to expand */}
                    <div
                      className="flex-1 min-w-0 cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#f8fafc] truncate">{lead.name}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        {lead.source && lead.source !== 'unknown' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-purple-900/40 text-purple-300 border border-purple-700">
                            {lead.source}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.email}</span>
                        {lead.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.phone}</span>}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEdit(lead)}
                        className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-colors"
                        title="Edit lead"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteLead(lead)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        title="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* ─── Expanded details ─── */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-5 bg-white/[0.02]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        {lead.businessType && (
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                              <Building2 className="h-3.5 w-3.5" /> Business Type
                            </div>
                            <p className="text-sm text-[#f8fafc] font-medium">{lead.businessType}</p>
                          </div>
                        )}
                        {lead.budget && (
                          <div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                              <DollarSign className="h-3.5 w-3.5" /> Budget
                            </div>
                            <p className="text-sm text-[#f8fafc] font-medium">{lead.budget}</p>
                          </div>
                        )}
                      </div>

                      {lead.message && (
                        <div className="mb-5">
                          <div className="text-xs font-medium text-slate-500 mb-1.5">Message / Notes</div>
                          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <p className="text-sm text-[#e2e8f0] whitespace-pre-wrap">{lead.message}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-2">Quick Status Update</div>
                        <div className="flex flex-wrap gap-2">
                          {STATUS_OPTIONS.map(s => (
                            <button
                              key={s}
                              onClick={() => updateStatus(lead.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                                lead.status === s
                                  ? 'bg-emerald-600 text-white border-emerald-500'
                                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                              }`}
                            >
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Add Lead Modal ─── */}
      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add New Lead">
        <LeadForm data={formData} onChange={setFormData} onSubmit={handleCreate} submitting={submitting} submitLabel="Create Lead" />
      </Modal>

      {/* ─── Edit Lead Modal ─── */}
      <Modal open={!!editLead} onClose={() => setEditLead(null)} title="Edit Lead">
        <LeadForm data={formData} onChange={setFormData} onSubmit={handleEdit} submitting={submitting} submitLabel="Save Changes" />
      </Modal>

      {/* ─── Delete Confirm ─── */}
      <ConfirmDialog
        open={!!deleteLead}
        onClose={() => setDeleteLead(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete "${deleteLead?.name}"? This action cannot be undone.`}
        confirming={submitting}
      />

      {/* ─── Bulk Delete Confirm ─── */}
      <ConfirmDialog
        open={bulkDeleteConfirm}
        onClose={() => setBulkDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
        title="Delete Selected Leads"
        message={`Are you sure you want to delete ${selected.size} selected lead(s)? This action cannot be undone.`}
        confirming={submitting}
      />
    </div>
  );
}
