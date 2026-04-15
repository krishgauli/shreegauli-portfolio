"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { apprenticeships } from "@/lib/credentials";
import {
  Award,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Carousel                                                           */
/* ------------------------------------------------------------------ */

export function CertificationsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 320;
    el.scrollBy({ left: direction === "left" ? -cardWidth - 16 : cardWidth + 16, behavior: "smooth" });
  };

  return (
    <section className="relative z-10 pb-20 px-6" aria-label="Certifications">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#F8FAFC]">
            Verified Certifications
          </h2>
          {/* Carousel arrows — desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors disabled:opacity-30 disabled:cursor-default"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary badge */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
            <Award className="w-3.5 h-3.5" />
            5 Acadium Apprenticeships
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#67E8F9]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Blockchain Verified
          </span>
          <span className="text-xs text-[#94A3B8]">
            15 months of mentored, hands-on client work
          </span>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4 no-scrollbar"
          role="list"
          aria-label="Certificate cards"
        >
          {apprenticeships.map((cert, i) => (
            <ScrollReveal key={cert.id} delay={i * 80}>
              <div
                className="snap-start shrink-0 w-[280px] sm:w-[300px]"
                role="listitem"
              >
                <ModuleShell className="p-6 h-full flex flex-col" enableHoverLift>
                  {/* Top badge row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#C4B5FD]">
                      <Award className="w-3 h-3" />
                      {cert.issuer}
                    </span>
                    <span className="text-[10px] text-[#94A3B8]/60">
                      {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-[#F8FAFC] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#22D3EE] font-medium mt-1">
                    {cert.focus}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-medium border border-white/[0.06] bg-white/[0.03] text-[#94A3B8]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-5">
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#34D399]/80">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[#7C3AED] hover:text-[#C4B5FD] transition-colors"
                    >
                      Verify
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </ModuleShell>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Other certifications */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-[#F8FAFC] mb-3">
            Other Certifications
          </h3>
          <ModuleShell className="p-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Google Analytics Certified",
                "Google Ads Search Certified",
                "Google Ads Display Certified",
                "HubSpot Inbound Marketing",
              ].map((cert) => (
                <span
                  key={cert}
                  className="flex items-center gap-2 text-xs text-[#94A3B8]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                  {cert}
                </span>
              ))}
            </div>
          </ModuleShell>
        </div>
      </div>
    </section>
  );
}


