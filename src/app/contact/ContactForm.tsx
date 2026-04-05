"use client";

import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Calendar, Linkedin, Github, Send, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "seo", label: "SEO & Content" },
  { value: "paid-media", label: "Paid Media (Google / Meta Ads)" },
  { value: "social-media", label: "Social Media Marketing" },
  { value: "automation", label: "Marketing Automation" },
  { value: "not-sure", label: "Not sure yet" },
];

const budgetOptions = [
  { value: "", label: "Approximate budget..." },
  { value: "under-2k", label: "Under $2,000/month" },
  { value: "2k-5k", label: "$2,000 – $5,000/month" },
  { value: "5k-10k", label: "$5,000 – $10,000/month" },
  { value: "10k-plus", label: "$10,000+/month" },
  { value: "project", label: "One-time project" },
];

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 placeholder:text-[#64748B]";

const selectClass =
  "w-full rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 appearance-none";

type Step = "form" | "otp" | "submitting";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    budget: "",
    message: "",
  });
  const [step, setStep] = useState<Step>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // OTP state
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (otpCountdown <= 0) return;
    const timer = setTimeout(() => setOtpCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [otpCountdown]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Step 1: Send OTP when user clicks "Verify & Send"
  async function handleSendOtp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOtpError("");
    setOtpSending(true);

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      setStep("otp");
      setOtpDigits(["", "", "", "", "", ""]);
      setOtpCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err) {
      setFeedbackMessage(err instanceof Error ? err.message : "Failed to send verification code.");
      setSubmitState("error");
    } finally {
      setOtpSending(false);
    }
  }

  // Handle OTP digit input
  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits entered
    if (value && index === 5 && newDigits.every((d) => d)) {
      verifyOtp(newDigits.join(""));
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (text.length === 6) {
      const digits = text.split("");
      setOtpDigits(digits);
      inputRefs.current[5]?.focus();
      verifyOtp(text);
    }
  }

  // Step 2: Verify OTP then auto-submit form
  async function verifyOtp(code: string) {
    setOtpError("");
    setOtpVerifying(true);

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed.");

      // OTP verified — now submit the form
      setStep("submitting");
      await submitContactForm();
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Verification failed.");
      setOtpDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setOtpVerifying(false);
    }
  }

  // Step 3: Submit contact form after OTP verification
  async function submitContactForm() {
    setIsSubmitting(true);
    setSubmitState("idle");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "contact-page", emailVerified: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit.");

      setFormData({ name: "", email: "", phone: "", businessType: "", budget: "", message: "" });
      setStep("form");
      setSubmitState("success");
      setFeedbackMessage(
        data.emailStatus === "sent"
          ? "Thanks! Your message is in and a confirmation email is on its way."
          : "Thanks! Your message is in. I'll follow up as soon as possible."
      );
    } catch (err) {
      setStep("form");
      setSubmitState("error");
      setFeedbackMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    if (otpCountdown > 0) return;
    setOtpError("");
    setOtpSending(true);

    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, name: formData.name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend code.");

      setOtpDigits(["", "", "", "", "", ""]);
      setOtpCountdown(60);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Failed to resend code.");
    } finally {
      setOtpSending(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      {/* Left column — form / OTP */}
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        {/* ────── OTP Verification Step ────── */}
        {step === "otp" && (
          <div className="grid gap-6 text-center">
            <button
              type="button"
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors self-start"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C3AED]/20">
                <ShieldCheck className="h-8 w-8 text-[#C4B5FD]" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#F8FAFC]">Verify your email</h3>
              <p className="mt-1 text-sm text-[#94A3B8]">
                We sent a 6-digit code to <span className="text-[#C4B5FD] font-medium">{formData.email}</span>
              </p>
            </div>

            <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  disabled={otpVerifying}
                  className="h-12 w-12 rounded-xl border border-white/10 bg-[#020617]/70 text-center text-lg font-bold text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 disabled:opacity-50"
                />
              ))}
            </div>

            {otpVerifying && (
              <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
              </div>
            )}

            {otpError && (
              <p className="text-sm text-rose-300">{otpError}</p>
            )}

            <div className="text-sm text-[#64748B]">
              {otpCountdown > 0 ? (
                <span>Resend code in {otpCountdown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={otpSending}
                  className="text-[#7C3AED] hover:text-[#8B5CF6] transition-colors font-medium"
                >
                  {otpSending ? "Sending..." : "Resend code"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ────── Submitting Step ────── */}
        {step === "submitting" && (
          <div className="grid gap-6 py-12 text-center">
            <div className="flex justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#7C3AED]" />
            </div>
            <p className="text-sm text-[#94A3B8]">Email verified! Sending your message...</p>
          </div>
        )}

        {/* ────── Form Step ────── */}
        {step === "form" && (
          <form onSubmit={handleSendOtp} className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#E2E8F0]">
                Name *
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-[#E2E8F0]">
                Email *
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm text-[#E2E8F0]">
              Phone
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                className={inputClass}
                placeholder="+1 (555) 123-4567"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#E2E8F0]">
                Service interest
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0F172A]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm text-[#E2E8F0]">
                Budget range
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={selectClass}
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0F172A]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm text-[#E2E8F0]">
              Project details *
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className={inputClass}
                placeholder="What are you trying to grow, fix, or launch?"
              />
            </label>

            <button
              type="submit"
              disabled={otpSending || isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {otpSending ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending code...</>
              ) : (
                <><ShieldCheck className="h-4 w-4" /> Verify &amp; Send</>
              )}
            </button>

            <p className="text-xs text-[#64748B]">
              We&apos;ll send a verification code to your email before submitting.
            </p>

            {feedbackMessage && (
              <p
                aria-live="polite"
                className={
                  submitState === "error"
                    ? "text-sm text-rose-300"
                    : "text-sm text-emerald-300"
                }
              >
                {feedbackMessage}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Right column — info & quick actions */}
      <div className="flex flex-col gap-6">
        {/* What happens next */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7C3AED] mb-4">
            What happens next
          </h3>
          <ol className="space-y-3 text-sm text-[#94A3B8]">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-bold text-[#C4B5FD]">1</span>
              <span>Fill out the form and verify your email with a one-time code.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-bold text-[#C4B5FD]">2</span>
              <span>I respond within one business day with initial thoughts.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-bold text-[#C4B5FD]">3</span>
              <span>We schedule a free 30-minute discovery call.</span>
            </li>
          </ol>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7C3AED] mb-4">
            Prefer a direct approach?
          </h3>
          <div className="grid gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
            >
              <Calendar className="h-4 w-4 text-[#22D3EE]" />
              Book a call
            </Link>
            <Link
              href="https://linkedin.com/in/shreegauli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-[#22D3EE]" />
              Connect on LinkedIn
            </Link>
            <Link
              href="https://github.com/shreegauli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
            >
              <Github className="h-4 w-4 text-[#22D3EE]" />
              GitHub
            </Link>
          </div>
        </div>

        {/* Location */}
        <p className="text-xs text-[#94A3B8]/60 text-center lg:text-left">
          Based in Dallas, TX (CST). Available for remote work nationwide.
        </p>
      </div>
    </div>
  );
}
