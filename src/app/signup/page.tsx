'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Chrome, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength
  const pwStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const pwMedium = password.length >= 6 && !pwStrong;

  // Listen for OAuth popup success
  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'OAUTH_AUTH_SUCCESS') {
        router.push('/dashboard/client');
      } else if (e.data?.type === 'OAUTH_AUTH_ERROR') {
        setGoogleLoading(false);
        setError(e.data?.error || 'Google sign-in failed');
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      router.push('/dashboard/client');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/url');
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error || 'Google sign-in unavailable');
        setGoogleLoading(false);
        return;
      }

      const popup = window.open(data.url, 'google-oauth', 'width=500,height=650,scrollbars=yes');
      if (!popup) {
        setError('Popup was blocked. Please allow popups for this site.');
        setGoogleLoading(false);
      }
    } catch {
      setError('Failed to start Google sign-in');
      setGoogleLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-white tracking-tight">
              Shree<span className="text-[#7C3AED]">.</span>
            </span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-white">Create your account</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Start tracking your growth today</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8">
          {error && (
            <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Chrome className="w-4 h-4 text-[#EA4335]" />
            )}
            Sign up with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-xs text-[#64748B]">or</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Signup form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Full name</label>
              <input
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
                Email address
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 py-3 pr-11 text-sm text-white placeholder:text-[#475569] focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 1 ? (pwStrong ? 'bg-emerald-500' : pwMedium ? 'bg-amber-400' : 'bg-red-400') : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors ${password.length >= 6 ? (pwStrong ? 'bg-emerald-500' : 'bg-amber-400') : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors ${pwStrong ? 'bg-emerald-500' : 'bg-white/10'}`} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#64748B]">
                    {pwStrong ? (
                      <><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Strong password</>
                    ) : pwMedium ? (
                      'Medium — add uppercase & numbers for stronger'
                    ) : (
                      'Too short — minimum 6 characters'
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create account
            </button>
          </form>

          <p className="mt-5 text-xs text-center text-[#475569]">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-[#7C3AED] hover:underline">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-[#7C3AED] hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#7C3AED] hover:text-[#9B5CF6] font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
