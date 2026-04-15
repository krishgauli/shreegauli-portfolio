"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Config                                                              */
/* ------------------------------------------------------------------ */
const VISIBLE = 3;
const AUTOPLAY_MS = 6000;

export function TestimonialsSection() {
  const totalPages = Math.ceil(testimonials.length / VISIBLE);
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  /* ── Autoplay: chained setTimeout (drift-free, clean pause) ───── */
  const scheduleNext = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setPage((p) => (p + 1) % totalPages),
      AUTOPLAY_MS,
    );
  }, [totalPages]);

  /* Re-schedule after every page change (skip when paused / hidden) */
  useEffect(() => {
    if (!isPaused && !document.hidden) scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [page, isPaused, scheduleNext]);

  /* Pause when browser tab is hidden, resume when visible */
  useEffect(() => {
    const h = () => {
      if (document.hidden) clearTimeout(timerRef.current);
      else if (!isPaused) scheduleNext();
    };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, [isPaused, scheduleNext]);

  const pause = () => {
    setIsPaused(true);
    clearTimeout(timerRef.current);
  };
  const resume = () => setIsPaused(false); // state change triggers effect → scheduleNext

  const next = () => setPage((p) => (p + 1) % totalPages);
  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);

  /* ── Touch swipe ──────────────────────────────────────────────── */
  const touchRef = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = e.touches[0].clientX;
    pause();
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    resume();
  };

  /* ── Pre-compute page groups ──────────────────────────────────── */
  const pages = Array.from({ length: totalPages }, (_, i) =>
    testimonials.slice(i * VISIBLE, (i + 1) * VISIBLE),
  );

  return (
    <section
      className="relative z-10 section-pad px-6"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
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

        {/* Crossfade + directional slide carousel */}
        <div className="grid" style={{ gridTemplateRows: "1fr" }}>
          {pages.map((items, i) => (
            <div
              key={i}
              aria-hidden={i !== page}
              style={{ gridArea: "1 / 1" }}
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-out ${
                i === page
                  ? "opacity-100 translate-x-0 z-10"
                  : i < page
                  ? "opacity-0 -translate-x-8 z-0 pointer-events-none"
                  : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }`}
            >
              {items.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  className="min-h-[320px]"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Navigation with progress-fill dots */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous reviews"
            className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`relative h-2 rounded-full transition-all duration-300 overflow-hidden ${
                  i === page
                    ? "w-8 bg-[#7C3AED]/30"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              >
                {i === page && (
                  <span
                    key={`pf-${page}`}
                    className="absolute inset-0 rounded-full bg-[#7C3AED] origin-left"
                    style={{
                      animation: `progress-fill ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState: isPaused ? "paused" : "running",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={next}
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
