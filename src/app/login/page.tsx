'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, Chrome } from 'lucide-react';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070B14]" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [oauthError, setOauthError] = useState('');

  useEffect(() => {
    const err = searchParams.get('oauthError');
    if (err) setOauthError(decodeURIComponent(err));
  }, [searchParams]);

  // Listen for OAuth popup success
  useEffect(() => {
    async function handleMessage(e: MessageEvent) {
      if (e.data?.type === 'OAUTH_AUTH_SUCCESS') {
        if (e.data?.token) {
          await fetch('/api/auth/token-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: e.data.token }),
          });
        }
        const role = e.data?.user?.role;
        router.push(role === 'admin' || role === 'super_admin' ? '/dashboard/admin' : '/dashboard/client');
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
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      const role = data.user?.role;
      router.push(role === 'admin' || role === 'super_admin' ? '/dashboard/admin' : '/dashboard/client');
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
        window.location.assign(data.url);
        return;
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
          <h1 className="mt-6 text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-[#94A3B8]">Sign in to your dashboard</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8">
          {/* Error banners */}
          {(error || oauthError) && (
            <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error || oauthError}
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
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-xs text-[#64748B]">or</span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Email/password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-[#94A3B8]">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#7C3AED] hover:text-[#9B5CF6] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
            </div>

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign in
            </button>
          </form>
        </div>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-[#64748B]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#7C3AED] hover:text-[#9B5CF6] font-medium transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
