"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
/*  Certifications Carousel — auto-advance with infinite loop          */
/* ------------------------------------------------------------------ */

export function CertificationsCarousel() {
  const [active, setActive] = useState(0);
  const total = apprenticeships.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  /* Auto-advance every 4 s */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, 4000);
  }, [total]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (direction: "left" | "right") => {
    setActive((prev) =>
      direction === "right" ? (prev + 1) % total : (prev - 1 + total) % total
    );
    startTimer(); // reset timer on manual nav
  };

  return (
    <section
      className="relative z-10 pb-20 px-6"
      aria-label="Certifications"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#F8FAFC]">
            Verified Certifications
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go("left")}
              aria-label="Previous certificate"
              className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go("right")}
              aria-label="Next certificate"
              className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary badges */}
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

        {/* Card area — fade transition between cards */}
        <div className="relative min-h-[240px]">
          {apprenticeships.map((cert, i) => (
            <div
              key={cert.id}
              className="absolute inset-0 transition-all duration-500 ease-in-out"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateX(0)" : i < active ? "translateX(-40px)" : "translateX(40px)",
                pointerEvents: i === active ? "auto" : "none",
              }}
              aria-hidden={i !== active}
            >
              <ModuleShell className="p-8 flex flex-col sm:flex-row gap-6" enableHoverLift>
                {/* Left column */}
                <div className="flex-1 flex flex-col">
                  {/* Badge row */}
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
                  <h3 className="text-lg font-bold text-[#F8FAFC] leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#22D3EE] font-medium mt-1">
                    {cert.focus}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-medium border border-white/[0.08] bg-white/[0.04] text-[#94A3B8]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#34D399]/80">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Blockchain Verified
                    </span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7C3AED] hover:text-[#C4B5FD] transition-colors"
                    >
                      Verify Credential
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </ModuleShell>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {apprenticeships.map((cert, i) => (
            <button
              key={cert.id}
              onClick={() => { setActive(i); startTimer(); }}
              aria-label={`Go to certificate ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-[#7C3AED]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Other certifications */}
        <div className="mt-10">
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
              ].map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-2 text-xs text-[#94A3B8]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                  {c}
                </span>
              ))}
            </div>
          </ModuleShell>
        </div>
      </div>
    </section>
  );
}