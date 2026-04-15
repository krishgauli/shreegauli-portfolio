"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/* Show 3 cards at a time, sliding as a group */
const VISIBLE = 3;

export function TestimonialsSection() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / VISIBLE);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setPage((prev) => (prev + 1) % totalPages);
      }
    }, 6000);
  }, [totalPages]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (dir: "left" | "right") => {
    setPage((prev) =>
      dir === "right"
        ? (prev + 1) % totalPages
        : (prev - 1 + totalPages) % totalPages
    );
    startTimer();
  };

  /* Slice visible cards for current page */
  const start = page * VISIBLE;
  const visible = testimonials.slice(start, start + VISIBLE);

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

        {/* 3-card grid — key forces re-mount for fade-in animation */}
        <div
          key={`testimonial-page-${page}`}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up"
        >
          {visible.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              className="min-h-[320px]"
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go("left")}
            aria-label="Previous reviews"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i); startTimer(); }}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 bg-[#7C3AED]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go("right")}
            aria-label="Next reviews"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
