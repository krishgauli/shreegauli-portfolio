"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";

interface NewsletterSignupCardProps {
  title?: string;
  subtitle?: string;
  source?: string;
}

export function NewsletterSignupCard({
  title = "Get practical growth notes in your inbox",
  subtitle = "Short emails on SEO, paid media, automation, and conversion fixes worth acting on.",
  source = "newsletter-page",
}: NewsletterSignupCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }

      setStatus("success");
      setEmail("");
      setMessage("You are subscribed. Watch your inbox for the next issue.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-[#F8FAFC]">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#94A3B8]">{subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-email-${source}`}>
          Email address
        </label>
        <input
          id={`newsletter-email-${source}`}
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30 placeholder:text-[#64748B]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ArrowRight className="h-4 w-4" />
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-rose-300" : "text-emerald-300"}`}
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
