"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // For now, always show the success message to prevent email enumeration
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-[#F8FAFC] mb-2">
            Reset your password
          </h1>

          {submitted ? (
            <div className="mt-4">
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                If an account exists with that email, you will receive a
                password reset link shortly. Please check your inbox and spam
                folder.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center mt-6 text-sm font-semibold text-[#7C3AED] hover:text-[#8B5CF6] transition-colors"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-[#94A3B8] mb-6">
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="grid gap-2 text-sm text-[#E2E8F0]">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 placeholder:text-[#64748B]"
                    placeholder="you@company.com"
                  />
                </label>
                <button
                  type="submit"
                  className="rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                >
                  Send reset link
                </button>
              </form>
              <Link
                href="/login"
                className="inline-flex items-center mt-6 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              >
                Back to login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
