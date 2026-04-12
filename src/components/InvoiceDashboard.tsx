'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ───────────────────────────────────────────────────────────
interface Client {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  monthlyRate: number | null;
  currency: string;
  billingDay: number;
  isActive: boolean;
  payoneerEmail: string | null;
  billingAddress: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
  notes: string | null;
  _count?: { invoices: number };
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  currency: string;
  description: string | null;
  lineItems: { description: string; qty: number; rate: number; amount: number }[];
  status: string;
  issueDate: string;
  dueDate: string;
  paidAt: string | null;
  paymentLink: string | null;
  sentAt: string | null;
  client: { name: string; email: string; company: string | null };
}

interface InvoiceStat {
  status: string;
  _sum: { total: number | null };
  _count: number;
}

type Tab = 'invoices' | 'clients' | 'create';

// ─── Helpers ─────────────────────────────────────────────────────────
function formatCurrency(amount: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  sent: 'bg-blue-100 text-blue-700',
  paid: 'bg-green-100 text-green-700',
  overdue: 'bg-red-100 text-red-700',
  cancelled: 'bg-gray-200 text-gray-500',
};

// ─── Main Component ──────────────────────────────────────────────────
export default function InvoiceDashboard() {
  const [tab, setTab] = useState<Tab>('invoices');
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<InvoiceStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // ── Client form state ───────────────────────────────────────────────
  const [clientForm, setClientForm] = useState({
    name: '', email: '', company: '', phone: '',
    billingAddress: '', city: '', state: '', country: 'US', zipCode: '',
    monthlyRate: '', currency: 'USD', billingDay: '1',
    payoneerEmail: '', notes: '',
  });

  // ── Invoice form state ──────────────────────────────────────────────
  const [invoiceForm, setInvoiceForm] = useState({
    clientId: '',
    description: '',
    rate: '',
    qty: '1',
    taxRate: '0',
    dueInDays: '15',
    notes: '',
    clientNotes: '',
    paymentLink: '',
  });

  // ── Inline payment-link editor state ────────────────────────────────
  const [editingPaymentLink, setEditingPaymentLink] = useState<string | null>(null);
  const [paymentLinkDraft, setPaymentLinkDraft] = useState('');

  function showFeedback(type: 'success' | 'error', message: string) {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  }

  async function extractError(res: Response, fallback: string) {
    try {
      const data = await res.json();
      return data?.error || data?.message || fallback;
    } catch {
      return fallback;
    }
  }

  function handleUnauthorized() {
    setAuthError('Your admin session has expired or you do not have access to billing.');
    showFeedback('error', 'Unauthorized. Please log in again.');
  }

  // ── Fetch data ──────────────────────────────────────────────────────
  const fetchClients = useCallback(async () => {
    const res = await fetch('/api/invoices/clients');
    if (res.status === 401 || res.status === 403) {
      setAuthError('Your admin session has expired or you do not have access to billing.');
      setClients([]);
      return;
    }

    if (!res.ok) {
      const message = await extractError(res, 'Failed to load clients');
      showFeedback('error', message);
      return;
    }

    const data = await res.json();
    setClients(data.clients || []);
  }, []);

  const fetchInvoices = useCallback(async () => {
    const res = await fetch('/api/invoices');
    if (res.status === 401 || res.status === 403) {
      setAuthError('Your admin session has expired or you do not have access to billing.');
      setInvoices([]);
      setStats([]);
      return;
    }

    if (!res.ok) {
      const message = await extractError(res, 'Failed to load invoices');
      showFeedback('error', message);
      return;
    }

    const data = await res.json();
    setInvoices(data.invoices || []);
    setStats(data.stats || []);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        await Promise.all([fetchClients(), fetchInvoices()]);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [fetchClients, fetchInvoices]);

  // ── Create Client ───────────────────────────────────────────────────
  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();
    setActionLoading('create-client');
    try {
      const res = await fetch('/api/invoices/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientForm),
      });
      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }
      const data = await res.json();
      if (data.success) {
        showFeedback('success', `Client "${data.client.name}" created`);
        setClientForm({ name: '', email: '', company: '', phone: '', billingAddress: '', city: '', state: '', country: 'US', zipCode: '', monthlyRate: '', currency: 'USD', billingDay: '1', payoneerEmail: '', notes: '' });
        fetchClients();
      } else {
        showFeedback('error', data.error || 'Failed to create client');
      }
    } catch {
      showFeedback('error', 'Network error');
    }
    setActionLoading(null);
  }

  // ── Create Invoice ──────────────────────────────────────────────────
  async function handleCreateInvoice(e: React.FormEvent) {
    e.preventDefault();
    if (!invoiceForm.clientId) {
      showFeedback('error', 'Select a client first');
      return;
    }
    setActionLoading('create-invoice');
    try {
      const rate = parseFloat(invoiceForm.rate) || 0;
      const qty = parseInt(invoiceForm.qty) || 1;
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: invoiceForm.clientId,
          lineItems: [{ description: invoiceForm.description || 'Digital Marketing Services', qty, rate, amount: rate * qty }],
          taxRate: parseFloat(invoiceForm.taxRate) || 0,
          dueInDays: parseInt(invoiceForm.dueInDays) || 15,
          notes: invoiceForm.notes,
          clientNotes: invoiceForm.clientNotes,
          description: invoiceForm.description,
          paymentLink: invoiceForm.paymentLink || undefined,
        }),
      });
      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }
      const data = await res.json();
      if (data.success) {
        showFeedback('success', `Invoice ${data.invoice.invoiceNumber} created`);
        setInvoiceForm({ clientId: '', description: '', rate: '', qty: '1', taxRate: '0', dueInDays: '15', notes: '', clientNotes: '', paymentLink: '' });
        fetchInvoices();
      } else {
        showFeedback('error', data.error || 'Failed to create invoice');
      }
    } catch {
      showFeedback('error', 'Network error');
    }
    setActionLoading(null);
  }

  // ── Invoice actions ─────────────────────────────────────────────────
  async function markPaid(id: string) {
    setActionLoading(id);
    const res = await fetch(`/api/invoices/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'paid' }),
    });
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized();
      setActionLoading(null);
      return;
    }
    if (!res.ok) {
      showFeedback('error', await extractError(res, 'Failed to mark invoice as paid'));
      setActionLoading(null);
      return;
    }
    fetchInvoices();
    showFeedback('success', 'Invoice marked as paid');
    setActionLoading(null);
  }

  async function deleteClient(id: string) {
    if (!confirm('Delete this client and all their invoices?')) return;
    setActionLoading(id);
    const res = await fetch(`/api/invoices/clients/${id}`, { method: 'DELETE' });
    if (res.status === 401 || res.status === 403) {
      handleUnauthorized();
      setActionLoading(null);
      return;
    }
    if (!res.ok) {
      showFeedback('error', await extractError(res, 'Failed to delete client'));
      setActionLoading(null);
      return;
    }
    fetchClients();
    fetchInvoices();
    showFeedback('success', 'Client deleted');
    setActionLoading(null);
  }

  // ── Save / update payment link on an invoice ────────────────────────
  async function savePaymentLink(invoiceId: string) {
    setActionLoading(invoiceId);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentLink: paymentLinkDraft }),
      });
      if (res.status === 401 || res.status === 403) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) {
        showFeedback('error', await extractError(res, 'Failed to update payment link'));
        return;
      }
      setEditingPaymentLink(null);
      setPaymentLinkDraft('');
      fetchInvoices();
      showFeedback('success', 'Payment link updated');
    } catch {
      showFeedback('error', 'Network error');
    }
    setActionLoading(null);
  }

  // ── Stats ───────────────────────────────────────────────────────────
  const totalRevenue = stats.find((s) => s.status === 'paid')?._sum?.total ?? 0;
  const totalOutstanding = stats
    .filter((s) => ['sent', 'overdue'].includes(s.status))
    .reduce((sum, s) => sum + (s._sum?.total ?? 0), 0);
  const overdueCount = stats.find((s) => s.status === 'overdue')?._count ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="animate-spin h-8 w-8 border-4 border-violet-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feedback toast */}
      {feedback && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
          feedback.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {feedback.message}
        </div>
      )}

      {authError && (
        <div className="rounded-xl border border-amber-300/40 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium">{authError}</p>
            <Link
              href="/login?next=/dashboard/admin/invoices"
              className="inline-flex items-center rounded-md border border-amber-400/40 bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-900 transition hover:bg-amber-200 dark:border-amber-400/40 dark:bg-amber-500/20 dark:text-amber-100 dark:hover:bg-amber-500/30"
            >
              Go to login
            </Link>
          </div>
        </div>
      )}

      {/* Header + Stats */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Invoices & Billing</h1>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-full bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300">
            Collected: {formatCurrency(totalRevenue)}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-300">
            Outstanding: {formatCurrency(totalOutstanding)}
          </span>
          {overdueCount > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300">
              {overdueCount} overdue
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-100/80 p-1 dark:border-white/10 dark:bg-white/5 w-fit">
        {(['invoices', 'clients', 'create'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
              tab === t
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white/10 hover:text-[#f8fafc] dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            {t === 'create' ? 'Create New' : t}
          </button>
        ))}
      </div>

      {/* ── Invoices Tab ─────────────────────────────────────────────── */}
      {tab === 'invoices' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-600 dark:border-white/10 dark:text-slate-300">
                <th className="px-4 py-3 font-medium">Invoice #</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Issued</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                    No invoices yet. Create one from the &quot;Create New&quot; tab.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-100 hover:bg-white/10 dark:border-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-violet-400">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3">
                      <div className="text-slate-900 dark:text-white">{inv.client.name}</div>
                      {inv.client.company && (
                        <div className="text-slate-500 dark:text-slate-400 text-xs">{inv.client.company}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">
                      {formatCurrency(inv.total, inv.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[inv.status] || 'bg-gray-100 text-gray-700'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{formatDate(inv.issueDate)}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{formatDate(inv.dueDate)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {inv.status !== 'paid' && inv.status !== 'cancelled' && (
                          <>
                            <button
                              onClick={() => markPaid(inv.id)}
                              disabled={actionLoading === inv.id}
                              className="px-2.5 py-1 bg-green-600 hover:bg-green-500 text-white text-xs rounded-md transition disabled:opacity-50"
                            >
                              Mark Paid
                            </button>
                          </>
                        )}

                        {/* Payment Link: show link or edit button */}
                        {editingPaymentLink === inv.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="url"
                              placeholder="Paste Payoneer link…"
                              value={paymentLinkDraft}
                              onChange={(e) => setPaymentLinkDraft(e.target.value)}
                              className="dashboard-input w-48 rounded-md px-2 py-1 text-xs text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                            />
                            <button
                              onClick={() => savePaymentLink(inv.id)}
                              disabled={actionLoading === inv.id}
                              className="px-2 py-1 bg-violet-600 hover:bg-violet-500 text-white text-xs rounded-md transition disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingPaymentLink(null); setPaymentLinkDraft(''); }}
                              className="px-2 py-1 bg-slate-300 hover:bg-slate-200 text-slate-700 text-xs rounded-md transition dark:bg-white/10 dark:text-slate-300 dark:hover:bg-white/20"
                            >
                              ✕
                            </button>
                          </div>
                        ) : inv.paymentLink ? (
                          <div className="flex items-center gap-1">
                            <a
                              href={inv.paymentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-md transition"
                            >
                              Pay Link
                            </a>
                            <button
                              onClick={() => { setEditingPaymentLink(inv.id); setPaymentLinkDraft(inv.paymentLink || ''); }}
                              className="px-1.5 py-1 text-slate-400 hover:text-violet-400 text-xs transition"
                              title="Edit payment link"
                            >
                              ✏️
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => { setEditingPaymentLink(inv.id); setPaymentLinkDraft(''); }}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-white text-xs rounded-md transition"
                          >
                            + Pay Link
                          </button>
                        )}
                      </div>
                      {/* Payment terms notice */}
                      {inv.paymentLink && inv.status !== 'paid' && inv.status !== 'cancelled' && (
                        <p className="mt-1 text-[10px] leading-tight text-slate-400 dark:text-slate-500 text-right max-w-xs ml-auto">
                          Payment must be settled before the 14th. Invoice attached at payment link — client can pay by logging in.
                        </p>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Clients Tab ──────────────────────────────────────────────── */}
      {tab === 'clients' && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden dark:border-white/10 dark:bg-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-600 dark:border-white/10 dark:text-slate-300">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Monthly Rate</th>
                <th className="px-4 py-3 font-medium">Invoices</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500 dark:text-slate-400">
                    No clients yet. Add one from the &quot;Create New&quot; tab.
                  </td>
                </tr>
              ) : (
                clients.map((cl) => (
                  <tr key={cl.id} className="border-b border-slate-100 hover:bg-white/10 dark:border-white/5 transition-colors">
                    <td className="px-4 py-3 text-slate-900 dark:text-white font-medium">{cl.name}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cl.email}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cl.company || '—'}</td>
                    <td className="px-4 py-3 text-slate-900 dark:text-white">
                      {cl.monthlyRate ? `${formatCurrency(cl.monthlyRate, cl.currency)}/mo` : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{cl._count?.invoices ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${cl.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {cl.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteClient(cl.id)}
                        disabled={actionLoading === cl.id}
                        className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded-md transition disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Create Tab ───────────────────────────────────────────────── */}
      {tab === 'create' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Create Client Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Add Client</h2>
            <form onSubmit={handleCreateClient} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Full Name *" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} required className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                <input placeholder="Email *" type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} required className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Company" value={clientForm.company} onChange={(e) => setClientForm({ ...clientForm, company: e.target.value })} className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                <input placeholder="Phone" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              </div>
              <input placeholder="Billing Address" value={clientForm.billingAddress} onChange={(e) => setClientForm({ ...clientForm, billingAddress: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              <div className="grid grid-cols-3 gap-3">
                <input placeholder="City" value={clientForm.city} onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })} className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                <input placeholder="State" value={clientForm.state} onChange={(e) => setClientForm({ ...clientForm, state: e.target.value })} className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                <input placeholder="ZIP Code" value={clientForm.zipCode} onChange={(e) => setClientForm({ ...clientForm, zipCode: e.target.value })} className="dashboard-input rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Monthly Rate ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" value={clientForm.monthlyRate} onChange={(e) => setClientForm({ ...clientForm, monthlyRate: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Payoneer Email</label>
                  <input type="email" placeholder="you@payoneer.com" value={clientForm.payoneerEmail} onChange={(e) => setClientForm({ ...clientForm, payoneerEmail: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                </div>
              </div>
              <textarea placeholder="Notes (internal)" value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} rows={2} className="dashboard-input w-full resize-none rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              <button type="submit" disabled={actionLoading === 'create-client'} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50">
                {actionLoading === 'create-client' ? 'Creating...' : 'Add Client'}
              </button>
            </form>
          </div>

          {/* Create Invoice Form */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Create Invoice</h2>
            <form onSubmit={handleCreateInvoice} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Client *</label>
                <select value={invoiceForm.clientId} onChange={(e) => setInvoiceForm({ ...invoiceForm, clientId: e.target.value })} required className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white">
                  <option value="" className="bg-white text-slate-800 dark:bg-gray-900 dark:text-white">Select a client…</option>
                  {clients.filter((c) => c.isActive).map((c) => (
                    <option key={c.id} value={c.id} className="bg-white text-slate-800 dark:bg-gray-900 dark:text-white">
                      {c.name} {c.company ? `(${c.company})` : ''} {c.monthlyRate ? `— ${formatCurrency(c.monthlyRate)}/mo` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <input placeholder="Service Description" value={invoiceForm.description} onChange={(e) => setInvoiceForm({ ...invoiceForm, description: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Rate ($) *</label>
                  <input type="number" step="0.01" placeholder="0.00" value={invoiceForm.rate} onChange={(e) => setInvoiceForm({ ...invoiceForm, rate: e.target.value })} required className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Qty</label>
                  <input type="number" value={invoiceForm.qty} onChange={(e) => setInvoiceForm({ ...invoiceForm, qty: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Tax Rate (%)</label>
                  <input type="number" step="0.01" value={invoiceForm.taxRate} onChange={(e) => setInvoiceForm({ ...invoiceForm, taxRate: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Due in (days)</label>
                <input type="number" value={invoiceForm.dueInDays} onChange={(e) => setInvoiceForm({ ...invoiceForm, dueInDays: e.target.value })} className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              </div>

              {/* Payment Link */}
              <div>
                <label className="mb-1 block text-xs text-slate-600 dark:text-slate-400">Payment Link (Payoneer)</label>
                <input
                  type="url"
                  placeholder="https://payoneer.com/your-custom-link"
                  value={invoiceForm.paymentLink}
                  onChange={(e) => setInvoiceForm({ ...invoiceForm, paymentLink: e.target.value })}
                  className="dashboard-input w-full rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                />
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
                  Leave empty to auto-generate from client&apos;s Payoneer email. Or paste your custom Payoneer payment request link.
                </p>
              </div>

              {/* Payment terms notice – auto shown when a link is entered */}
              {invoiceForm.paymentLink && (
                <div className="rounded-lg border border-amber-300/40 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                  <strong>Payment Terms:</strong> Payment must be settled before the 14th of the invoiced month. The invoice is attached at the payment link — the client can pay by logging in through the link above.
                </div>
              )}
              <textarea placeholder="Client-facing notes (shown on invoice)" value={invoiceForm.clientNotes} onChange={(e) => setInvoiceForm({ ...invoiceForm, clientNotes: e.target.value })} rows={2} className="dashboard-input w-full resize-none rounded-lg px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500" />
              <button type="submit" disabled={actionLoading === 'create-invoice'} className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50">
                {actionLoading === 'create-invoice' ? 'Creating...' : 'Create Invoice'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
