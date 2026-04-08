"use client";

import { MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Deterministic seeded random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: `${(seededRandom(i * 4 + 1) * 3 + 1).toFixed(4)}px`,
        x: `${(seededRandom(i * 4 + 2) * 100).toFixed(4)}%`,
        y: `${(seededRandom(i * 4 + 3) * 100).toFixed(4)}%`,
        duration: seededRandom(i * 4 + 4) * 8 + 6,
        delay: seededRandom(i * 4 + 5) * 4,
      })),
    []
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#7C3AED]/40"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function FinalCTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "final-cta-section",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit the form.");
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitState("success");
      setFeedbackMessage(
        data.emailStatus === "sent"
          ? "Thanks. Your message is in, and a confirmation email is already on its way."
          : "Thanks. Your message is in, and I will follow up as soon as possible."
      );
    } catch (error) {
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="relative z-10 py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(7, 11, 20, 0.62) 0%, transparent 72%)",
        }}
      />

      <FloatingParticles />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">
              Let&apos;s Work Together
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] leading-tight mb-6">
              Ready to fix the{" "}
              <span className="text-gradient-brand">bottleneck</span>?
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-xl mx-auto">
              Tell me what you&apos;re trying to grow, what&apos;s blocking progress,
              and what kind of help you need. I&apos;ll review it and follow up
              within one business day.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlowButton href="/contact" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Send a Message
            </GlowButton>
            <GlassButton href="/book" className="gap-2">
              <Calendar className="h-4 w-4" />
              Book a Call Instead
            </GlassButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-14 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7C3AED]">
                  Start Here
                </p>
                <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-[#F8FAFC]">
                  Send a quick note and I&apos;ll get back to you.
                </h3>
                <p className="mt-4 max-w-md text-sm md:text-base leading-7 text-[#94A3B8]">
                  Share what you&apos;re trying to grow, what&apos;s blocking progress, and
                  what kind of help you need. I&apos;ll review it and follow up within one
                  business day.
                </p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[#94A3B8]/70">
                  Typical response time: under 24 hours on business days.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm text-[#E2E8F0]">
                    Name
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFieldChange}
                      required
                      autoComplete="name"
                      className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="grid gap-2 text-sm text-[#E2E8F0]">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFieldChange}
                      required
                      autoComplete="email"
                      className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
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
                    onChange={handleFieldChange}
                    autoComplete="tel"
                    className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                    placeholder="+1 (555) 123-4567"
                  />
                </label>

                <label className="grid gap-2 text-sm text-[#E2E8F0]">
                  Project details
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFieldChange}
                    rows={5}
                    required
                    className="rounded-2xl border border-white/10 bg-[#020617]/70 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/30"
                    placeholder="What are you trying to grow, fix, or launch?"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#7C3AED] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8B5CF6] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>

                {feedbackMessage ? (
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
                ) : null}
              </form>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.5}>
          <p className="mt-8 text-center text-xs text-[#94A3B8]/60">
            Most engagements start with a 30-minute diagnostic call.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
