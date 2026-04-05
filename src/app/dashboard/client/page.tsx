'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  BarChart2,
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  CreditCard,
  Check,
  ArrowUpRight,
  Loader2,
  Shield,
  Rocket,
  Zap,
  ExternalLink,
  X,
  CheckCircle2,
  XCircle,
  Building2,
  MapPin,
  User,
  Camera,
  Save,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SearchConsoleTab from '@/components/SearchConsoleTab';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import PremiumAnalyticsChat from '@/components/PremiumAnalyticsChat';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import DashboardLoader from '@/components/DashboardLoader';
import { useSitePreferences } from '@/components/SitePreferencesProvider';
import PricingCard from '@/components/PricingCard';
import BillingView from '@/components/BillingView';
import ManageBillingModal from '@/components/ManageBillingModal';
import WeeklyOngoingWork from '@/components/WeeklyOngoingWork';

/* ─── Plan Definitions ─── */
const PLANS = [
  {
    id: 'hourly',
    name: 'Hourly',
    price: '$50',
    period: '/ Hour',
    icon: Shield,
    features: ['Website Design & Development', 'SEO & Local Search', 'Google Ads Management', 'Social Media Management', 'Monthly Strategy Calls', 'Performance Reporting'],
    variant: 'professional' as const,
    tier: 1,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$1,499',
    period: '/ Month',
    icon: Rocket,
    features: ['30 Hours / Month', 'Full-Stack Development', 'Advanced SEO & Analytics', 'Google & Meta Ads', 'Dedicated Project Manager', 'Priority Support & SLA', 'Weekly Strategy Reports'],
    variant: 'professional' as const,
    popular: true,
    tier: 2,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$2,500',
    period: '/ Month',
    icon: Zap,
    features: ['50 Hours / Month', 'Custom Software Solutions', 'Multi-Platform Campaigns', 'Advanced Analytics & BI', 'Conversion Rate Optimization', 'White-Glove Onboarding', 'Enterprise SLA & Support'],
    variant: 'professional' as const,
    tier: 3,
  },
  {
    id: 'custom',
    name: 'Custom',
    price: 'Custom',
    period: '',
    icon: Sparkles,
    features: ['Tailored Hours & Scope', 'Dedicated Team & Resources', 'Custom Integrations & APIs', 'Multi-Channel Strategy', 'Executive Reporting & BI', 'White-Glove Onboarding', 'Enterprise SLA & Support'],
    variant: 'premium' as const,
    tier: 4,
  },
];

/* ─── Toast Component ─── */
function Toast({ type, message, onClose }: { type: 'success' | 'error'; message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl ${
        type === 'success'
          ? 'bg-[#0F172A]/95 border-cyan-400/30 text-[#E0F2FE]'
          : 'bg-[#0F172A]/95 border-red-500/30 text-[#FEE2E2]'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="h-5 w-5 text-[#22D3EE]" /> : <XCircle className="h-5 w-5 text-red-400" />}
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ─── Dashboard Component ─── */
export default function ClientDashboardPage() {
  return (
    <Suspense fallback={<div className="dashboard-shell min-h-screen text-[#F8FAFC] flex items-center justify-center"><DashboardLoader variant="page" label="Loading dashboard..." className="text-[#22D3EE]" /></div>}>
      <ClientDashboard />
    </Suspense>
  );
}

function ClientDashboard() {
  const hasPaidPlanAccess = (
    currentPlanId: string | null,
    fallbackPlanId: string,
    fallbackPlanText: string,
  ) => {
    return (
      currentPlanId === 'hourly' ||
      currentPlanId === 'growth' ||
      currentPlanId === 'scale' ||
      currentPlanId === 'custom' ||
      currentPlanId === 'silver' ||
      currentPlanId === 'gold' ||
      currentPlanId === 'premium' ||
      fallbackPlanId === 'hourly' ||
      fallbackPlanId === 'growth' ||
      fallbackPlanId === 'scale' ||
      fallbackPlanId === 'custom' ||
      fallbackPlanId === 'silver' ||
      fallbackPlanId === 'gold' ||
      fallbackPlanId === 'premium' ||
      fallbackPlanId === 'platinum' ||
      fallbackPlanText.includes('hourly') ||
      fallbackPlanText.includes('growth') ||
      fallbackPlanText.includes('scale') ||
      fallbackPlanText.includes('custom') ||
      fallbackPlanText.includes('starter care') ||
      fallbackPlanText.includes('growth pro') ||
      fallbackPlanText.includes('scale elite') ||
      fallbackPlanText === 'silver' ||
      fallbackPlanText === 'gold' ||
      fallbackPlanText === 'premium'
    );
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const CLIENT_VIEWS = ['overview', 'membership', 'analytics', 'patient-count', 'ai-chat', 'profile', 'settings', 'billing'] as const;
  type ClientView = typeof CLIENT_VIEWS[number];
  const [user, setUser] = useState<any>(null);
  const [myClinics, setMyClinics] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<ClientView>('overview');
  const [authLoading, setAuthLoading] = useState(true);
  const [clinicsLoading, setClinicsLoading] = useState(false);
  const [selectedGoogleClinicId, setSelectedGoogleClinicId] = useState('');
  const [selectedPlanForBilling, setSelectedPlanForBilling] = useState<{ id: string; name: string; price: number } | null>(null);

  // Subscription state
  const [subStatus, setSubStatus] = useState<any>(null);
  const [loadingSub, setLoadingSub] = useState(false);
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  // Toast notifications
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Analytics refresh trigger (via socket from admin)
  const [analyticsRefreshKey, setAnalyticsRefreshKey] = useState(0);

  // Manage Billing Modal
  const [manageBillingOpen, setManageBillingOpen] = useState(false);
  const [currentBillingData, setCurrentBillingData] = useState({
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  // User menu dropdown state
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const fetchSubscriptionStatus = useCallback(() => {
    setLoadingSub(true);
    fetch('/api/stripe/status')
      .then(res => res.json())
      .then(data => setSubStatus(data))
      .catch(console.error)
      .finally(() => setLoadingSub(false));
  }, []);

  // Read URL params for upgrade feedback and view
  useEffect(() => {
    const upgrade = searchParams.get('upgrade');
    const plan = searchParams.get('plan');
    const sessionId = searchParams.get('session_id');
    const view = searchParams.get('view');

    // Handle view parameter
    if (view && CLIENT_VIEWS.includes(view as ClientView)) {
      setActiveView(view as ClientView);
    }

    if (upgrade === 'success' && plan) {
      const finalizeUpgrade = async () => {
        try {
          await fetch('/api/stripe/confirm-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan, sessionId }),
          });
        } catch (error) {
          console.error('Failed to confirm Stripe checkout:', error);
        }

        setToast({ type: 'success', message: `Successfully upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)}!` });
        setActiveView('membership');
        window.history.replaceState({}, '', '/dashboard/client');
        fetchSubscriptionStatus();
      };

      finalizeUpgrade();
    } else if (upgrade === 'cancelled') {
      setToast({ type: 'error', message: 'Upgrade was cancelled.' });
      setActiveView('membership');
      window.history.replaceState({}, '', '/dashboard/client');
    }
  }, [searchParams, fetchSubscriptionStatus]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const current = new URL(window.location.href);
    const upgrade = current.searchParams.get('upgrade');
    const sessionId = current.searchParams.get('session_id');

    if (upgrade || sessionId) return;

    current.searchParams.set('view', activeView);
    window.history.replaceState({}, '', `${current.pathname}${current.search}`);
  }, [activeView]);

  useEffect(() => {
    // Check auth
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) {
          router.push('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        if (data.role !== 'client' && data.role !== 'admin') {
          router.push('/login');
        } else {
          setUser(data);
        }
      })
      .catch(() => {
        router.push('/login');
      })
      .finally(() => setAuthLoading(false));

    // Fetch subscription status
    fetchSubscriptionStatus();

    // Note: Socket.io is disabled for Vercel serverless deployment
    // Real-time updates are not available
  }, [router, fetchSubscriptionStatus]);

  // Fetch clinics assigned to this user
  useEffect(() => {
    if (!user) return;

    setClinicsLoading(true);
    fetch(`/api/client/clinics?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.clinics) {
          setMyClinics(data.clinics);
        }
      })
      .catch(err => console.error('Failed to fetch clinics:', err))
      .finally(() => setClinicsLoading(false));
  }, [user]);

  useEffect(() => {
    const currentPlanIdRaw = subStatus?.planId || null;
    const currentPlanId = currentPlanIdRaw === 'platinum' ? 'premium' : currentPlanIdRaw;
    const fallbackPlanId = String(user?.planId || '').toLowerCase();
    const fallbackPlanText = String(user?.plan || '').toLowerCase();
    const hasPaidPlan = hasPaidPlanAccess(currentPlanId, fallbackPlanId, fallbackPlanText);

    if (activeView === 'ai-chat' && !hasPaidPlan) {
      setActiveView('overview');
    }
  }, [activeView, subStatus?.planId, user?.planId, user?.plan]);

  // Auto-select first clinic for GA4/SC tabs
  useEffect(() => {
    if (myClinics.length > 0 && !selectedGoogleClinicId) {
      setSelectedGoogleClinicId(myClinics[0].id);
    }
  }, [myClinics, selectedGoogleClinicId]);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    setUserMenuOpen(false);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const handleUpgrade = async (planId: string) => {
    setUpgradingPlan(planId);
    try {
      // Find the selected plan details
      const selectedPlan = PLANS.find(p => p.id === planId);
      if (!selectedPlan) {
        setToast({ type: 'error', message: 'Invalid plan selected.' });
        return;
      }

      // Extract price as number
      const priceNum = parseInt(selectedPlan.price.replace(/[$,]/g, ''));
      
      setSelectedPlanForBilling({
        id: planId,
        name: selectedPlan.name,
        price: priceNum || 0,
      });
      
      setActiveView('billing');
    } catch (err) {
      console.error('Upgrade error:', err);
      setToast({ type: 'error', message: 'Failed to start upgrade. Please try again.' });
    } finally {
      setUpgradingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    setPortalLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Portal error:', err);
      setToast({ type: 'error', message: 'Failed to open billing portal.' });
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSaveBillingDetails = async (billingData: any) => {
    try {
      const res = await fetch('/api/billing/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billingData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save billing details');
      }

      const data = await res.json();
      setCurrentBillingData(billingData);
      return data;
    } catch (err: any) {
      console.error('Error saving billing details:', err);
      throw err;
    }
  };

  if (!user) return <div className="dashboard-shell min-h-screen text-[#F8FAFC] flex items-center justify-center"><DashboardLoader variant="page" label="Loading..." className="text-[#22D3EE]" /></div>;

  const currentPlanIdRaw = subStatus?.planId || null;
  const currentPlanId = currentPlanIdRaw === 'platinum' ? 'premium' : currentPlanIdRaw;
  const currentPlanTier = PLANS.find(p => p.id === currentPlanId)?.tier || 0;
  const fallbackPlanId = String(user?.planId || '').toLowerCase();
  const fallbackPlanText = String(user?.plan || '').toLowerCase();
  const hasPaidPlan = hasPaidPlanAccess(currentPlanId, fallbackPlanId, fallbackPlanText);
  const fallbackPlanLabel = (() => {
    if (fallbackPlanId === 'custom') return 'Custom';
    if (fallbackPlanId === 'scale' || fallbackPlanId === 'premium') return 'Scale';
    if (fallbackPlanId === 'growth' || fallbackPlanId === 'gold') return 'Growth';
    if (fallbackPlanId === 'hourly' || fallbackPlanId === 'silver') return 'Hourly';
    if (fallbackPlanText.includes('custom')) return 'Custom';
    if (fallbackPlanText.includes('scale') || fallbackPlanText === 'premium') return 'Scale';
    if (fallbackPlanText.includes('growth') || fallbackPlanText === 'gold') return 'Growth';
    if (fallbackPlanText.includes('hourly') || fallbackPlanText === 'silver') return 'Hourly';
    return 'Free';
  })();
  const accountTierLabel = currentPlanId ? subStatus?.plan ?? fallbackPlanLabel : fallbackPlanLabel;

  const dashboardTitle =
    activeView === 'overview'
      ? 'Growth Command Center'
      : activeView === 'membership'
        ? 'Plans & Billing'
        : activeView === 'patient-count'
          ? 'Performance Snapshot'
          : activeView === 'ai-chat'
            ? 'AI Analytics Assistant'
            : activeView === 'profile'
              ? 'Profile & Identity'
              : activeView === 'settings'
                ? 'Preferences & Access'
                : 'Analytics Workspace';

  const dashboardSubtitle =
    activeView === 'overview'
      ? `Welcome back, ${user.name}. Keep every account, report, and next move in one branded workspace.`
      : `Your ${dashboardTitle.toLowerCase()} is ready when you are.`;

  const showGlobalLoader =
    authLoading ||
    (activeView === 'overview' && clinicsLoading) ||
    (activeView === 'membership' && loadingSub);

  return (
    <>
    <LoadingScreen active={showGlobalLoader} durationMs={1000} />
    <Navbar />
    <div className="dashboard-scope dashboard-shell min-h-screen text-slate-100 flex pt-20">
      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      </AnimatePresence>

      {/* Manage Billing Modal */}
      <ManageBillingModal
        isOpen={manageBillingOpen}
        onClose={() => setManageBillingOpen(false)}
        billingData={currentBillingData}
        onSave={handleSaveBillingDetails}
        setToast={setToast}
      />

      {/* Sidebar */}
      <aside className="dashboard-sidebar dashboard-inner hidden w-72 shrink-0 lg:flex lg:flex-col rounded-[2rem] m-4 mr-0 px-4 py-5">
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/[0.03] to-transparent px-4 py-5 shadow-[0_20px_40px_-30px_rgba(34,211,238,0.45)]">
          <div className="dashboard-kicker mb-3">Client Portal</div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-white">Growth Control</h2>
              <p className="mt-2 text-sm text-[#94A3B8]">
                Track performance, billing, and next steps without leaving the brand system.
              </p>
            </div>
            <span className="dashboard-soft-pill inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold">
              {accountTierLabel}
            </span>
          </div>
        </div>

        <nav className="space-y-1 flex-grow mt-6">
          <NavItem icon={BarChart3} label="Overview" active={activeView === 'overview'} onClick={() => setActiveView('overview')} />
          <NavItem icon={TrendingUp} label="Analytics" active={activeView === 'analytics'} onClick={() => setActiveView('analytics')} />
          {hasPaidPlan && (
            <NavItem
              icon={MessageSquare}
              label="AI Analytics"
              active={activeView === 'ai-chat'}
              onClick={() => setActiveView('ai-chat')}
            />
          )}
          <NavItem icon={Calendar} label="Performance" active={activeView === 'patient-count'} onClick={() => setActiveView('patient-count')} />
          <NavItem
            icon={CreditCard}
            label="Membership"
            active={activeView === 'membership'}
            onClick={() => setActiveView('membership')}
            badge={currentPlanId ? (
              currentPlanId === 'custom' ? 'Custom' :
              currentPlanId === 'scale' || currentPlanId === 'premium' ? 'Scale' : 
              currentPlanId === 'growth' || currentPlanId === 'gold' ? 'Growth' : 
              'Hourly'
            ) : fallbackPlanLabel}
          />
          <NavItem icon={User} label="Profile" active={activeView === 'profile'} onClick={() => setActiveView('profile')} />
          <NavItem icon={Settings} label="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
          <NavItem icon={Users} label="Lead Tracking" badge="Coming Soon" onClick={() => {}} />
        </nav>

        <div className="rounded-[1.5rem] border border-cyan-400/10 bg-cyan-400/5 px-4 py-4">
          <div className="dashboard-kicker mb-2">Workspace status</div>
          <p className="text-sm font-semibold text-white">Everything you need is connected.</p>
          <p className="mt-2 text-sm text-[#94A3B8]">Use the analytics, billing, and performance tabs to move faster from insight to action.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-inner flex-grow p-4 lg:p-8 overflow-y-auto">
        <header className="dashboard-topbar mb-8 flex flex-col gap-5 rounded-[2rem] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="dashboard-kicker mb-2">Client dashboard</div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-1">{dashboardTitle}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{dashboardSubtitle}</p>
          </div>
          <div className="flex items-center gap-3 lg:justify-end">
            <div className="relative hidden md:block min-w-[16rem]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search your workspace..." 
                className="dashboard-input w-full rounded-2xl py-2.5 pl-10 pr-4 text-sm"
              />
            </div>
            <button className="dashboard-ghost-button relative rounded-2xl p-2.5">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#22D3EE] rounded-full ring-2 ring-[#0F172A]" />
            </button>
            
            {/* User Menu Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="dashboard-avatar h-10 w-10 rounded-2xl flex items-center justify-center font-bold text-sm uppercase transition-all active:scale-95"
              >
                {user.name.substring(0, 2)}
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="dashboard-panel absolute right-0 mt-2 w-64 rounded-2xl overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-white/8 bg-gradient-to-r from-[#7C3AED]/12 to-transparent">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setUserMenuOpen(false); setActiveView('profile'); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-white/6 transition-colors"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); setActiveView('settings'); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-white/6 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="border-t border-white/8">
                      <button
                        onClick={() => { setUserMenuOpen(false); setShowLogoutConfirm(true); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="dashboard-panel mb-6 flex gap-2 overflow-x-auto rounded-[1.5rem] p-2 lg:hidden">
          <button onClick={() => setActiveView('overview')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'overview' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>Overview</button>
          <button onClick={() => setActiveView('analytics')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'analytics' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>Analytics</button>
          <button onClick={() => setActiveView('patient-count')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'patient-count' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>Performance</button>
          <button onClick={() => setActiveView('membership')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'membership' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>Billing</button>
          {hasPaidPlan && (
            <button onClick={() => setActiveView('ai-chat')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'ai-chat' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>AI</button>
          )}
          <button onClick={() => setActiveView('profile')} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeView === 'profile' ? 'dashboard-primary-button' : 'dashboard-ghost-button'}`}>Profile</button>
        </div>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={() => setShowLogoutConfirm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="dashboard-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-[1.75rem] p-6 z-50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <LogOut className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Confirm Logout</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Are you sure you want to log out?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="dashboard-ghost-button flex-1 px-4 py-2.5 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="dashboard-danger-button flex-1 px-4 py-2.5 rounded-xl font-semibold transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {activeView === 'billing' && selectedPlanForBilling ? (
            <motion.div
              key="billing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <BillingView
                planId={selectedPlanForBilling.id}
                planName={selectedPlanForBilling.name}
                planPrice={selectedPlanForBilling.price}
                onBack={() => setActiveView('membership')}
                onPaymentSuccess={() => {
                  setSelectedPlanForBilling(null);
                  setActiveView('membership');
                  fetchSubscriptionStatus();
                }}
                setToast={setToast}
              />
            </motion.div>
          ) : activeView === 'membership' ? (
            <motion.div
              key="membership"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <MembershipView
                subStatus={subStatus}
                loadingSub={loadingSub}
                currentPlanId={currentPlanId}
                currentPlanTier={currentPlanTier}
                upgradingPlan={upgradingPlan}
                portalLoading={portalLoading}
                onUpgrade={handleUpgrade}
                onManage={handleManageSubscription}
                onEditBilling={() => setManageBillingOpen(true)}
              />
            </motion.div>
          ) : activeView === 'analytics' ? (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {myClinics.length > 1 && (
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-2.5 text-slate-500 dark:text-slate-400">
                    <Building2 className="h-3.5 w-3.5" /> Select Account
                  </label>
                  <div className="relative max-w-sm">
                    <select
                      value={selectedGoogleClinicId}
                      onChange={(e) => setSelectedGoogleClinicId(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-3 pl-4 pr-10 text-sm font-semibold text-slate-900 dark:text-slate-200 shadow-sm transition-all hover:shadow-md focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/10"
                    >
                      {myClinics.map((c: any) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              )}
              {selectedGoogleClinicId ? (
                <ClientErrorBoundary title="Search Console Error" description="Something went wrong loading Search Console data. Click below to try again.">
                  <SearchConsoleTab clinicId={selectedGoogleClinicId} />
                </ClientErrorBoundary>
              ) : myClinics.length === 0 ? (
                <div className="rounded-3xl p-10 border border-slate-200/60 dark:border-slate-700/60 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/20">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">No Accounts Found</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">You need to be assigned to an account to view Search Console data.</p>
                </div>
              ) : null}
            </motion.div>
          ) : activeView === 'patient-count' ? (
            <motion.div
              key="patient-count"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <OverviewView
                myClinics={myClinics}
                currentPlanId={currentPlanId}
                onUpgradeClick={() => setActiveView('membership')}
              />
            </motion.div>
          ) : activeView === 'ai-chat' ? (
            <motion.div
              key="ai-chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {hasPaidPlan ? (
                <PremiumAnalyticsChat defaultExpanded userName={user.name} clinicNames={myClinics.map((c: any) => c.name)} />
              ) : (
                <div className="rounded-3xl p-8 border border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-violet-50 dark:from-slate-900 dark:to-violet-950/30">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-violet-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-6 w-6 text-violet-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">Premium AI Analytics is available on Scale</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-3xl">
                        Get an AI assistant that uses your real dashboard data to answer performance questions, compare accounts, and recommend next actions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                          <div className="font-semibold mb-1">Real Data Answers</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Uses your actual weekly analytics records.</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                          <div className="font-semibold mb-1">Account-Level Insights</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Compare all accounts or drill into one location.</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                          <div className="font-semibold mb-1">Actionable Next Steps</div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Get clear recommendations tied to your numbers.</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveView('membership')}
                        className="rounded-xl bg-violet-500 px-5 py-3 text-white font-semibold hover:bg-violet-600 transition-colors"
                      >
                        Upgrade to Scale
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeView === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ProfileView user={user} setToast={setToast} />
            </motion.div>
          ) : activeView === 'settings' ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SettingsView role="client" setToast={setToast} />
            </motion.div>
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <OverviewView
                myClinics={myClinics}
                currentPlanId={currentPlanId}
                onUpgradeClick={() => setActiveView('membership')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
    <Footer />
    </>
  );
}

/* ─── Membership View ─── */
function MembershipView({
  subStatus,
  loadingSub,
  currentPlanId,
  currentPlanTier,
  upgradingPlan,
  portalLoading,
  onUpgrade,
  onManage,
  onEditBilling,
}: {
  subStatus: any;
  loadingSub: boolean;
  currentPlanId: string | null;
  currentPlanTier: number;
  upgradingPlan: string | null;
  portalLoading: boolean;
  onUpgrade: (plan: string) => void;
  onManage: () => void;
  onEditBilling: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Current Plan Banner */}
      <div className="dashboard-panel rounded-[2rem] p-8 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-64 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_70%)]" />
        <div className="absolute -top-12 right-10 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.24),transparent_68%)] blur-2xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="dashboard-kicker mb-2">Current Plan</div>
            <h2 className="text-3xl font-black mb-1">
              {loadingSub ? (
                <span className="flex items-center gap-2 text-slate-400"><DashboardLoader variant="inline" className="text-[#22D3EE]" /> Loading...</span>
              ) : currentPlanId ? (
                <span className="text-gradient-brand">{subStatus?.plan}</span>
              ) : (
                <span className="text-slate-400">No Active Plan</span>
              )}
            </h2>
            {subStatus?.subscriptionStatus && (
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                subStatus.subscriptionStatus === 'active'
                  ? 'bg-emerald-100 text-emerald-700'
                  : subStatus.subscriptionStatus === 'past_due'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                <div className={`h-1.5 w-1.5 rounded-full ${
                  subStatus.subscriptionStatus === 'active' ? 'bg-emerald-500' : subStatus.subscriptionStatus === 'past_due' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                {subStatus.subscriptionStatus.charAt(0).toUpperCase() + subStatus.subscriptionStatus.slice(1).replace('_', ' ')}
              </span>
            )}
            {!currentPlanId && !loadingSub && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Choose a plan below to unlock premium features and dedicated support.</p>
            )}
          </div>
          {currentPlanId && (
            <button
              onClick={onManage}
              disabled={portalLoading}
              className="dashboard-primary-button flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm disabled:opacity-50 shrink-0"
            >
              {portalLoading ? <DashboardLoader variant="inline" className="text-white" /> : <ExternalLink className="h-4 w-4" />}
              Manage Billing
            </button>
          )}
        </div>
      </div>

      {/* Plan Cards */}
      <div>
        <h3 className="text-xl font-bold mb-6">{currentPlanId ? 'Change Plan' : 'Choose a Plan'}</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {PLANS.map((plan) => {
            const isCurrentPlan = currentPlanId === plan.id;
            const isDowngrade = plan.tier < currentPlanTier;

            return (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                icon={plan.icon}
                variant={plan.variant}
                popular={plan.popular}
                isActive={isCurrentPlan}
                disabled={upgradingPlan === plan.id}
                loading={upgradingPlan === plan.id}
                cta={
                  isCurrentPlan 
                    ? 'Your Current Plan' 
                    : isDowngrade 
                    ? 'Downgrade' 
                    : 'Upgrade'
                }
                onCtaClick={() => onUpgrade(plan.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Billing Info */}
      {currentPlanId && (
        <div className="dashboard-panel rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Billing Details</h3>
            <button
              onClick={onEditBilling}
              className="dashboard-ghost-button px-4 py-2 font-semibold rounded-xl text-sm"
            >
              Edit Billing
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Subscription ID</span>
              <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-mono">{subStatus?.stripeSubscriptionId || '—'}</code>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Status</span>
              <span className="font-bold capitalize">{subStatus?.subscriptionStatus || 'Unknown'}</span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block mb-1">Plan</span>
              <span className="font-bold">{subStatus?.plan || '—'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Overview View ─── */
function OverviewView({
  myClinics,
  currentPlanId,
  onUpgradeClick,
}: {
  myClinics: any[];
  currentPlanId: string | null;
  onUpgradeClick: () => void;
}) {
  const CLINIC_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
  const MONTH_NAMES: Record<number, string> = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April',
    5: 'May', 6: 'June', 7: 'July', 8: 'August',
    9: 'September', 10: 'October', 11: 'November', 12: 'December',
  };

  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // Fetch real WeeklyAnalytics for all assigned clinics
  useEffect(() => {
    if (myClinics.length === 0) return;
    let cancelled = false;
    const fetchAll = async () => {
      setLoadingAnalytics(true);
      try {
        const all: any[] = [];
        for (const clinic of myClinics) {
          const res = await fetch(`/api/analytics/weekly?clinicId=${clinic.id}`);
          if (res.ok) {
            const data = await res.json();
            all.push(...(data.analytics || []));
          }
        }
        if (!cancelled) setAnalyticsData(all);
      } catch (err) {
        console.error('Failed to fetch overview analytics:', err);
      } finally {
        if (!cancelled) setLoadingAnalytics(false);
      }
    };
    fetchAll();
    return () => { cancelled = true; };
  }, [myClinics]);

  // ── Compute last two completed months ──
  // Current date-based: "last completed month" and "month before last"
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-indexed

  // Last completed month
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  // Month before last
  const prevMonth = lastMonth === 1 ? 12 : lastMonth - 1;
  const prevMonthYear = lastMonth === 1 ? lastMonthYear - 1 : lastMonthYear;

  const lastMonthLabel = `${MONTH_NAMES[lastMonth]} ${lastMonthYear}`;
  const prevMonthLabel = `${MONTH_NAMES[prevMonth]} ${prevMonthYear}`;

  // Filter analytics by month
  const lastMonthData = analyticsData.filter(a => a.year === lastMonthYear && a.month === lastMonth);
  const prevMonthData = analyticsData.filter(a => a.year === prevMonthYear && a.month === prevMonth);

  // ── Per-clinic aggregation for the last completed month ──
  const clinicStats = myClinics.map((clinic, idx) => {
    const lm = lastMonthData.filter(a => a.clinicId === clinic.id);
    const pm = prevMonthData.filter(a => a.clinicId === clinic.id);

    const lastPatients = lm.reduce((s: number, a: any) => s + (a.patientCount || 0), 0);
    const prevPatients = pm.reduce((s: number, a: any) => s + (a.patientCount || 0), 0);
    const lastTraffic = lm.reduce((s: number, a: any) => s + (a.totalTraffic || 0), 0);
    const prevTraffic = pm.reduce((s: number, a: any) => s + (a.totalTraffic || 0), 0);
    const lastCalls = lm.reduce((s: number, a: any) => s + (a.callsRequested || 0), 0);
    const prevCalls = pm.reduce((s: number, a: any) => s + (a.callsRequested || 0), 0);

    const pctChange = (curr: number, prev: number) =>
      prev > 0 ? ((curr - prev) / prev) * 100 : curr > 0 ? 100 : 0;

    return {
      id: clinic.id,
      name: clinic.name,
      location: clinic.location,
      type: clinic.type,
      lastPatients,
      prevPatients,
      patientGrowth: pctChange(lastPatients, prevPatients),
      lastTraffic,
      prevTraffic,
      trafficGrowth: pctChange(lastTraffic, prevTraffic),
      lastCalls,
      prevCalls,
      callsGrowth: pctChange(lastCalls, prevCalls),
      color: CLINIC_COLORS[idx % CLINIC_COLORS.length],
    };
  });

  // ── Totals across all clinics ──
  const totalPatients = clinicStats.reduce((s, c) => s + c.lastPatients, 0);
  const totalPrevPatients = clinicStats.reduce((s, c) => s + c.prevPatients, 0);
  const totalTraffic = clinicStats.reduce((s, c) => s + c.lastTraffic, 0);
  const totalPrevTraffic = clinicStats.reduce((s, c) => s + c.prevTraffic, 0);
  const totalCalls = clinicStats.reduce((s, c) => s + c.lastCalls, 0);
  const totalPrevCalls = clinicStats.reduce((s, c) => s + c.prevCalls, 0);

  const fmtChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? '+100%' : '0%';
    const pct = ((curr - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  // ── Chart data ──
  // Patient Count by Location (bar, sorted highest first)
  const patientBarData = [...clinicStats]
    .sort((a, b) => b.lastPatients - a.lastPatients)
    .map(c => ({
      name: c.name.length > 18 ? c.name.substring(0, 18) + '...' : c.name,
      patients: c.lastPatients,
      traffic: c.lastTraffic,
    }));

  // Patient Growth by Location (bar with % change)
  const growthBarData = clinicStats.map(c => ({
    name: c.name.length > 18 ? c.name.substring(0, 18) + '...' : c.name,
    growth: Number(c.patientGrowth.toFixed(1)),
    prev: c.prevPatients,
    current: c.lastPatients,
  }));

  // Patient Share by Location (pie chart for last month)
  const patientShareData = clinicStats
    .filter(c => c.lastPatients > 0)
    .map(c => ({
      name: c.name,
      value: c.lastPatients,
      color: c.color,
    }));

  return (
    <>
      {/* Upgrade CTA banner for free users */}
      {!currentPlanId && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-panel mb-8 rounded-[1.75rem] p-5 text-slate-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-[#22D3EE]" />
            <div>
              <span className="font-bold">Unlock premium features</span>
              <span className="text-slate-600 dark:text-slate-300 text-sm ml-2">— Choose a plan to get started with full marketing support</span>
            </div>
          </div>
          <button
            onClick={onUpgradeClick}
            className="dashboard-primary-button rounded-full px-6 py-2 font-semibold transition-all hover:scale-105 shrink-0"
          >
            View Plans
          </button>
        </motion.div>
      )}

      {myClinics.length === 0 ? (
        <div className="glass rounded-[2.5rem] p-12 border border-slate-200 dark:border-slate-700 text-center">
          <Building2 className="h-16 w-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" />
          <h2 className="text-2xl font-bold mb-4">No Accounts Assigned</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">Please contact your administrator to assign accounts to your dashboard.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Once assigned, you&apos;ll see live analytics and insights for each account.</p>
        </div>
      ) : loadingAnalytics ? (
        <div className="flex items-center justify-center py-24">
          <DashboardLoader variant="page" label="Loading analytics..." className="text-[#22D3EE]" />
        </div>
      ) : (
        <>
          {/* Comparison period label */}
          <div className="mb-4 text-sm text-slate-500 dark:text-slate-400">
            Comparing <span className="font-bold text-slate-700 dark:text-slate-200">{prevMonthLabel}</span> → <span className="font-bold text-slate-700 dark:text-slate-200">{lastMonthLabel}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard label="Lead Count" value={totalPatients.toLocaleString()} change={fmtChange(totalPatients, totalPrevPatients)} negative={totalPatients < totalPrevPatients} />
            <StatCard label="Total Traffic" value={totalTraffic.toLocaleString()} change={fmtChange(totalTraffic, totalPrevTraffic)} negative={totalTraffic < totalPrevTraffic} />
            <StatCard label="GMB Calls" value={totalCalls.toLocaleString()} change={fmtChange(totalCalls, totalPrevCalls)} negative={totalCalls < totalPrevCalls} />
            <StatCard label="Active Locations" value={myClinics.length.toString()} change="" />
          </div>

          <div className="mb-12">
            <WeeklyOngoingWork />
          </div>

          {/* Assigned Clinics Cards */}
          <div className="glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Your Assigned Accounts</h3>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">{lastMonthLabel} data</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clinicStats.map((clinic, idx) => (
                <motion.div
                  key={clinic.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full" style={{ backgroundColor: `${clinic.color}15` }} />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                      style={{ backgroundColor: clinic.color }}
                    >
                      {clinic.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg leading-tight">{clinic.name}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {clinic.location} &bull; {clinic.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-xs">Lead Count</span>
                      <span className="font-bold text-emerald-500 text-2xl">{clinic.lastPatients}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-xs">Traffic</span>
                      <span className="font-bold text-slate-900 dark:text-white text-2xl">{clinic.lastTraffic}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 block text-xs">Growth</span>
                      <span className={`font-bold text-2xl ${clinic.patientGrowth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        {clinic.patientGrowth >= 0 ? '+' : ''}{clinic.patientGrowth.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Patient Count by Location */}
            {patientBarData.length > 0 && (
              <div className="glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6">Lead Count by Location</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 -mt-4 mb-4">{lastMonthLabel}</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={patientBarData} layout={patientBarData.length > 3 ? 'vertical' : 'horizontal'}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    {patientBarData.length > 3 ? (
                      <>
                        <XAxis type="number" fontSize={12} />
                        <YAxis type="category" dataKey="name" fontSize={11} width={130} />
                      </>
                    ) : (
                      <>
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                      </>
                    )}
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                    <Legend />
                    <Bar dataKey="patients" fill="#10b981" name="Lead Count" radius={[4, 4, 4, 4]} />
                    <Bar dataKey="traffic" fill="#3b82f6" name="Traffic" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Patient Share Pie Chart */}
            {patientShareData.length > 0 && (
              <div className="glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-6">Lead Share by Location</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 -mt-4 mb-4">{lastMonthLabel}</p>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={patientShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={100}
                      labelLine={false}
                      label={({ name, value }: { name?: string; value?: number }) => `${(name || '').length > 12 ? (name || '').substring(0, 12) + '...' : name || ''}: ${value ?? 0}`}
                      dataKey="value"
                    >
                      {patientShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Patient Growth by Location */}
          {growthBarData.length > 0 && (
            <div className="glass rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-700 mb-12">
              <h3 className="text-xl font-bold mb-2">Lead Growth by Location</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">{prevMonthLabel} → {lastMonthLabel} (% change)</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={growthBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={12} tickFormatter={(v: number) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                    formatter={(value: any, name: any) => {
                      if (name === 'Growth %') return [`${value}%`, name];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="growth" fill="#8b5cf6" name="Growth %" radius={[4, 4, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </>
  );
}

/* ─── Helper Components ─── */
function NavItem({ icon: Icon, label, active = false, onClick, badge }: { icon: any; label: string; active?: boolean; onClick?: () => void; badge?: string }) {
  const getBadgeClasses = (badgeText?: string) => {
    if (!badgeText) return 'bg-white/10 text-white';
    if (badgeText === 'Coming Soon') return 'bg-white/6 text-[#94A3B8] border border-white/8';
    if (badgeText === 'Custom') return 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-200 border border-purple-400/20';
    if (badgeText === 'Scale') return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-200 border border-amber-400/20';
    if (badgeText === 'Growth') return 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-400/20';
    if (badgeText === 'Hourly') return 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 border border-violet-400/20';
    if (badgeText === 'Premium' || badgeText === 'Premium Only') return 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-200 border border-purple-400/20';
    return 'bg-white/10 text-white';
  };

  return (
    <button
      onClick={onClick}
      className={`group relative w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all text-left ${
        active
          ? 'bg-white/10 border border-cyan-400/18 text-white shadow-[0_18px_36px_-24px_rgba(34,211,238,0.6)] font-bold'
          : 'text-[#94A3B8] hover:text-white hover:bg-white/6 border border-transparent'
      }`}
    >
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-1 rounded-r-full bg-gradient-to-b from-[#7C3AED] to-[#22D3EE]" />}
      <div className={`flex items-center justify-center h-8 w-8 rounded-xl transition-colors ${
        active ? 'bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white shadow-[0_12px_24px_-16px_rgba(124,58,237,0.85)]' : 'text-current group-hover:bg-white/6'
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm flex-grow">{label}</span>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${getBadgeClasses(badge)}`}>{badge}</span>
      )}
    </button>
  );
}

function StatCard({ label, value, change, negative = false }: { label: string; value: string; change: string; negative?: boolean }) {
  return (
    <div className="dashboard-panel group relative overflow-hidden rounded-3xl p-6 hover:shadow-lg transition-all">
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity ${negative ? 'from-red-500/8 to-rose-500/8' : 'from-[#7C3AED]/8 to-[#22D3EE]/8'}`} />
      <div className="relative z-10">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium mb-2">{label}</div>
        <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{value}</div>
        <div className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${negative ? 'text-red-300 bg-red-500/10' : 'text-cyan-300 bg-cyan-500/10'}`}>
          {change} <span className="text-slate-500 dark:text-slate-400 font-normal ml-1">vs last month</span>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time }: { title: string; desc: string; time: string }) {
  return (
    <div className="flex gap-4">
      <div className="h-2 w-2 rounded-full bg-[#22D3EE] mt-2 shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
      <div>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{desc}</div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest">{time}</div>
      </div>
    </div>
  );
}

/* ─── Profile View ─── */
function ProfileView({ user, setToast }: { user: any; setToast: (toast: { type: 'success' | 'error'; message: string }) => void }) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    avatar: user.avatar || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar || '');

  // Track if form has been modified (dirty state)
  const isDirty = formData.name !== user.name || formData.avatar !== user.avatar || avatarFile !== null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({ type: 'error', message: 'File size must be less than 5MB' });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setToast({ type: 'error', message: 'File must be an image' });
      return;
    }

    setAvatarFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let avatarUrl = formData.avatar;

      // Upload avatar if file selected
      if (avatarFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', avatarFile);

        const uploadRes = await fetch('/api/upload/avatar', {
          method: 'POST',
          body: uploadFormData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          avatarUrl = uploadData.url;
        } else {
          throw new Error('Failed to upload avatar');
        }
      }

      // Update profile
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          avatar: avatarUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      setToast({ type: 'success', message: 'Profile updated successfully!' });
      
      // Reload page to reflect changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Profile update error:', error);
      setToast({ type: 'error', message: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center overflow-hidden border-4 border-white/30">
                  {avatarPreview ? (
                    <Image src={avatarPreview} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-white">{user.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-slate-800 border-2 border-emerald-500 cursor-pointer hover:scale-110 transition-transform">
                  <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <div className="text-white">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-emerald-100 flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4" />
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-8 space-y-6">
            {/* Email (Read-only) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Email cannot be changed</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <User className="inline h-4 w-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Camera className="inline h-4 w-4 mr-2" />
                Avatar URL (Optional)
              </label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="https://example.com/avatar.jpg"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Or use the camera icon above to upload an image
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isDirty}
              className={`w-full font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                isDirty && !isSubmitting
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/30'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <>
                  <DashboardLoader variant="inline" className="text-white" />
                  Saving...
                </>
              ) : !isDirty ? (
                <>
                  <Check className="h-5 w-5" />
                  No Changes
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
            {isDirty && !isSubmitting && (
              <p className="text-xs text-center text-amber-600 dark:text-amber-400 -mt-2">
                You have unsaved changes
              </p>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Profile Information</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your profile information is visible to administrators and is used for account management purposes. 
                Image uploads are securely stored and will persist across sessions.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function SettingsView({ role, setToast }: { role: 'client' | 'admin'; setToast: (toast: { type: 'success' | 'error'; message: string }) => void }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Password settings loaded (password is never sent to the client)
    fetch('/api/auth/password')
      .then((res) => res.json())
      .then(() => {
        // hasPassword field available if needed
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to load password settings.' });
      });
  }, [setToast]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Failed to update password');
      }

      setToast({ type: 'success', message: 'Password updated and saved successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      setToast({ type: 'error', message: error.message || 'Failed to update password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8">
        <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Manage your account password and security preferences.</p>

        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                minLength={6}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? <DashboardLoader variant="inline" className="text-white" /> : <Lock className="h-5 w-5" />}
            {isSubmitting ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-2xl p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{role === 'admin' ? 'Admin Settings' : 'Client Settings'}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {role === 'admin'
            ? 'Manage administrative account credentials and secure platform access.'
            : 'Manage your account credentials and keep your login secure.'}
        </p>
      </div>
    </div>
  );
}
