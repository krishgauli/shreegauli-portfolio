"use client";

import { useRef, useState } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Star } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Infinite marquee — smooth continuous scroll, pause on hover        */
/* ------------------------------------------------------------------ */
const SPEED = 40; // seconds for one full cycle (lower = faster)

export function TestimonialsSection() {
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-10 section-pad">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Client Reviews"
          title="What real clients say"
          subtitle="Verified reviews from business owners I've worked with — 4.9 average across 5 reviews."
        />

        {/* Aggregate rating badge */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-lg font-bold text-[#F8FAFC]">4.9</span>
          <span className="text-sm text-[#94A3B8]">· 5 Reviews</span>
        </div>
      </div>

      {/* ── Marquee track (full-bleed, no horizontal overflow) ────── */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade masks on left/right edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#070B14] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#070B14] to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-6 w-max testimonial-marquee-track"
          style={{
            animationName: "marquee",
            animationDuration: `${SPEED}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {/* Render items twice for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={`${t.id}-${i}`} className="w-[380px] shrink-0">
              <TestimonialCard testimonial={t} className="min-h-[320px] h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
