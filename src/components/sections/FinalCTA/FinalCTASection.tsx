"use client";

import Link from "next/link";
import { Mail, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#7C3AED]/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
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
      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">
            Let&apos;s Work Together
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] leading-tight mb-6">
            Ready to build something that{" "}
            <span className="text-gradient-brand">actually moves</span>?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-[#94A3B8] leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you need growth support, a cleaner marketing system, or a
            stronger digital presence — let&apos;s talk. I usually respond within one
            business day.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlowButton href="mailto:hello@shreegauli.com" external className="gap-2">
              <Mail className="h-4 w-4" />
              Email Me
            </GlowButton>
            <GlassButton href="https://calendly.com/shreegauli" external className="gap-2">
              <Calendar className="h-4 w-4" />
              Book a Call
            </GlassButton>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              View Resume
            </Link>
          </div>
        </ScrollReveal>

        {/* Response time note */}
        <ScrollReveal delay={0.4}>
          <p className="mt-8 text-xs text-[#94A3B8]/60">
            Typical response time: &lt;24 hours on business days.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
