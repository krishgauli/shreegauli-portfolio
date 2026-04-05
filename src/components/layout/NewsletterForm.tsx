"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleNewsletter} className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">
        Newsletter
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#7C3AED] transition"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-lg bg-[#7C3AED] px-3 py-2 text-sm font-semibold text-white hover:bg-[#8B5CF6] transition disabled:opacity-50"
          aria-label="Subscribe"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {status === "success" && (
        <p className="text-xs text-emerald-400 mt-1.5">Subscribed!</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 mt-1.5">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
