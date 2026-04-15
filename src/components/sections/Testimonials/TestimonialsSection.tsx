"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, 5000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (dir: "left" | "right") => {
    setActive((prev) =>
      dir === "right" ? (prev + 1) % total : (prev - 1 + total) % total
    );
    startTimer();
  };

  return (
    <section
      className="relative z-10 section-pad px-6"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="max-w-6xl mx-auto">
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

        {/* Carousel card */}
        <div className="relative max-w-2xl mx-auto min-h-[320px]">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active
                  ? "translateX(0) scale(1)"
                  : i < active
                  ? "translateX(-60px) scale(0.95)"
                  : "translateX(60px) scale(0.95)",
                pointerEvents: i === active ? "auto" : "none",
              }}
              aria-hidden={i !== active}
            >
              <TestimonialCard
                testimonial={t}
                className="min-h-[320px]"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go("left")}
            aria-label="Previous review"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => { setActive(i); startTimer(); }}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-[#7C3AED]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go("right")}
            aria-label="Next review"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
