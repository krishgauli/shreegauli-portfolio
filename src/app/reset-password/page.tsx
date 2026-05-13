'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, ArrowLeft, Lock } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDFAF5]" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Password strength
  const pwStrong = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  const pwMedium = password.length >= 6 && !pwStrong;

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      router.replace('/forgot-password');
    }
  }, [token, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to reset password');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!token) return null;

  return (
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Shree<span className="text-[#7C3AED]">.</span>
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-black/[0.08] bg-black/[0.04] backdrop-blur-sm p-8">
          {success ? (
            <div className="text-center py-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              </div>
              <h1 className="text-xl font-bold text-[#1A1A1A] mb-2">Password reset!</h1>
              <p className="text-sm text-[#6B7280] mb-6">
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
              >
                Sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mb-4">
                  <Lock className="w-7 h-7 text-[#7C3AED]" />
                </div>
                <h1 className="text-xl font-bold text-[#1A1A1A] mb-1">Choose a new password</h1>
                <p className="text-sm text-[#6B7280]">
                  Enter your new password below.
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400 flex items-start gap-2">
                  <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1.5">
                    New password
                  </label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full rounded-xl border border-black/[0.10] bg-black/[0.04] px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6B7280] transition-colors"
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        <div className={`h-1 flex-1 rounded-full transition ${password.length >= 1 ? (pwStrong ? 'bg-emerald-500' : pwMedium ? 'bg-amber-500' : 'bg-red-500') : 'bg-black/5'}`} />
                        <div className={`h-1 flex-1 rounded-full transition ${pwMedium || pwStrong ? (pwStrong ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-black/5'}`} />
                        <div className={`h-1 flex-1 rounded-full transition ${pwStrong ? 'bg-emerald-500' : 'bg-black/5'}`} />
                      </div>
                      <p className={`text-xs ${pwStrong ? 'text-emerald-400' : pwMedium ? 'text-amber-400' : 'text-red-400'}`}>
                        {pwStrong ? 'Strong' : pwMedium ? 'Medium — add uppercase & numbers' : 'Too short'}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1.5">
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPw ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full rounded-xl border border-black/[0.10] bg-black/[0.04] px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-[#7C3AED]/60 focus:ring-1 focus:ring-[#7C3AED]/30 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPw(!showConfirmPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#6B7280] transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && password !== confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-400">Passwords do not match</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || password.length < 6 || password !== confirmPassword}
                  className="w-full rounded-xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6D28D9] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Reset password
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
