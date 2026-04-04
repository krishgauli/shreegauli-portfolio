"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Calendar, Linkedin, Github, Send } from "lucide-react";
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

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "contact-page" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit.");
      }

      setFormData({ name: "", email: "", phone: "", businessType: "", budget: "", message: "" });
      setSubmitState("success");
      setFeedbackMessage(
        data.emailStatus === "sent"
          ? "Thanks! Your message is in and a confirmation email is on its way."
          : "Thanks! Your message is in. I'll follow up as soon as possible."
      );
    } catch (err) {
      setSubmitState("error");
      setFeedbackMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      {/* Left column — form */}
      <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="grid gap-4">
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
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Sending..." : "Send message"}
          </button>

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
              <span>You fill out the form with your project details.</span>
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
              href="mailto:hello@shreegauli.com"
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
            >
              <Mail className="h-4 w-4 text-[#22D3EE]" />
              hello@shreegauli.com
            </Link>
            <Link
              href="https://calendly.com/shreegauli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] hover:text-[#F8FAFC] hover:border-white/20 transition-colors"
            >
              <Calendar className="h-4 w-4 text-[#22D3EE]" />
              Book a call on Calendly
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
