"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { Award, ShieldCheck, X, ZoomIn } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Certificate data — Accredible API images                           */
/* ------------------------------------------------------------------ */

const certificates = [
  {
    id: "cert-1",
    imageUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/133025251",
    verifyUrl:
      "https://www.credential.net/2e879ad2-f032-49be-ab7e-0b3ffc7bccf2",
    focus: "SEO / AEO / GEO",
  },
  {
    id: "cert-2",
    imageUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/144155015",
    verifyUrl:
      "https://www.credential.net/c08e06c8-70b3-4c28-8a0f-f093dade3825",
    focus: "Web Dev & SEO",
  },
  {
    id: "cert-3",
    imageUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/156510197",
    verifyUrl:
      "https://www.credential.net/9a2798ac-21ca-4b83-aee9-e7486d82dfb9",
    focus: "Website Building",
  },
  {
    id: "cert-4",
    imageUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/179582523",
    verifyUrl:
      "https://www.credential.net/75e9638b-1006-42bd-8512-14bd8916692a",
    focus: "Web App Consulting",
  },
  {
    id: "cert-5",
    imageUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/179580597",
    badgeUrl:
      "https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/179580597",
    verifyUrl:
      "https://www.credential.net/671c71b9-f3fb-4c4e-a0b7-6d3d5188b45d",
    focus: "SEO & Marketing",
  },
];

const SPEED = 35; // seconds for one full marquee cycle

/* ------------------------------------------------------------------ */
/*  Infinite marquee + Lightbox zoom                                   */
/* ------------------------------------------------------------------ */

export function CertificationsCarousel() {
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const lightboxCert = lightbox
    ? certificates.find((c) => c.id === lightbox)
    : null;

  /* ── Lightbox keyboard + body lock ────────────────────────────── */
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  /* Duplicate items for seamless loop */
  const doubled = [...certificates, ...certificates];

  return (
    <>
      <section className="relative z-10 pb-20" aria-label="Certifications">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-3">
            Verified Certifications
          </h2>

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
        </div>

        {/* ── Marquee track (full-bleed) ──────────────────────────── */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-[#070B14] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-[#070B14] to-transparent" />

          <div
            className="flex gap-4 w-max"
            style={{
              animation: `marquee ${SPEED}s linear infinite`,
              animationPlayState: paused || lightbox ? "paused" : "running",
            }}
          >
            {doubled.map((cert, i) => (
              <button
                key={`${cert.id}-${i}`}
                onClick={() => setLightbox(cert.id)}
                className="w-[360px] shrink-0 text-left group/cert cursor-zoom-in"
              >
                <ModuleShell className="overflow-hidden h-full" enableHoverLift>
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={cert.imageUrl}
                      alt={`Certificate — ${cert.focus}`}
                      fill
                      className="object-contain transition-transform duration-500 group-hover/cert:scale-110"
                      sizes="360px"
                    />
                    {/* Zoom hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover/cert:bg-black/30 transition-colors duration-300">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover/cert:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="px-4 py-3 border-t border-white/[0.06]">
                    <p className="text-xs font-medium text-[#F8FAFC] group-hover/cert:text-[#C4B5FD] transition-colors">
                      {cert.focus}
                    </p>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">
                      Click to zoom &amp; read
                    </p>
                  </div>
                </ModuleShell>
              </button>
            ))}
          </div>
        </div>

        {/* Other certifications */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
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
      </section>

      {/* ── Lightbox modal (click-to-zoom) ────────────────────────── */}
      {lightboxCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fade-in_200ms_ease-out]"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate — ${lightboxCert.focus}`}
        >
          <div
            className="relative max-w-4xl w-full animate-[zoom-in_300ms_cubic-bezier(0.22,1,0.36,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <span className="hidden sm:inline">ESC</span>
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A] shadow-2xl shadow-[#7C3AED]/10">
              <Image
                src={lightboxCert.imageUrl}
                alt={`Certificate — ${lightboxCert.focus}`}
                width={1200}
                height={900}
                className="w-full h-auto"
                priority
              />
              <div className="px-6 py-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-[#F8FAFC]">
                    {lightboxCert.focus}
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Acadium Apprenticeship Completion
                  </p>
                </div>
                <a
                  href={lightboxCert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#C4B5FD] hover:text-[#7C3AED] transition-colors hover:underline whitespace-nowrap"
                >
                  Verify on Credential.net →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}