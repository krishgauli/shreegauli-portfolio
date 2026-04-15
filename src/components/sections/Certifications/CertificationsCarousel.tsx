"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import {
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Embed URLs for all 5 Acadium certificates                          */
/* ------------------------------------------------------------------ */

const certificates = [
  { id: "cert-1", embedUrl: "https://www.credential.net/embed/2e879ad2-f032-49be-ab7e-0b3ffc7bccf2", focus: "SEO / AEO / GEO" },
  { id: "cert-2", embedUrl: "https://www.credential.net/embed/c08e06c8-70b3-4c28-8a0f-f093dade3825", focus: "Web Dev & SEO" },
  { id: "cert-3", embedUrl: "https://www.credential.net/embed/9a2798ac-21ca-4b83-aee9-e7486d82dfb9", focus: "Website Building" },
  { id: "cert-4", embedUrl: "https://www.credential.net/embed/75e9638b-1006-42bd-8512-14bd8916692a", focus: "Web App Consulting" },
  { id: "cert-5", embedUrl: "https://www.credential.net/embed/671c71b9-f3fb-4c4e-a0b7-6d3d5188b45d", focus: "SEO & Marketing" },
];

const VISIBLE = 3;

/* ------------------------------------------------------------------ */
/*  Carousel — 3 embedded certificate iframes at a time                */
/* ------------------------------------------------------------------ */

export function CertificationsCarousel() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(certificates.length / VISIBLE);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setPage((prev) => (prev + 1) % totalPages);
      }
    }, 8000);
  }, [totalPages]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const go = (direction: "left" | "right") => {
    setPage((prev) =>
      direction === "right"
        ? (prev + 1) % totalPages
        : (prev - 1 + totalPages) % totalPages
    );
    startTimer();
  };

  const start = page * VISIBLE;
  const visible = certificates.slice(start, start + VISIBLE);

  return (
    <section
      className="relative z-10 pb-20 px-6"
      aria-label="Certifications"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-[#F8FAFC]">
            Verified Certifications
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go("left")}
              aria-label="Previous certificates"
              className="p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => go("right")}
              aria-label="Next certificates"
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

        {/* 3-card iframe grid — key forces re-mount for fade-in animation */}
        <div
          key={`cert-page-${page}`}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up"
        >
          {visible.map((cert) => (
            <div key={cert.id}>
              <ModuleShell className="overflow-hidden" enableHoverLift>
                <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                  <iframe
                    src={cert.embedUrl}
                    title={`Certificate — ${cert.focus}`}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </ModuleShell>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
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