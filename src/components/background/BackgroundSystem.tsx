"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ShaderBackground } from "./ShaderBackground";

/**
 * 5-layer background system:
 * Layer 1 — radial gradient wash (violet top-left, cyan bottom-right)
 * Layer 2 — subtle noise texture (SVG filter)
 * Layer 3 — dot matrix pattern
 * Layer 4 — floating blur orbs (animated)
 * Layer 5 — static radial spotlight (centered)
 *
 * All layers are fixed, pointer-events: none, z-0.
 */
export function BackgroundSystem() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Layer 1 — Shader canvas */}
      {!prefersReducedMotion ? (
        <ShaderBackground className="absolute inset-0 h-full w-full" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 0% 0%, rgba(124, 58, 237, 0.14) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 100% 100%, rgba(34, 211, 238, 0.12) 0%, transparent 60%),
              #070B14
            `,
          }}
        />
      )}

      {/* Layer 2 — Noise texture via SVG filter */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>

      {/* Layer 3 — Dot matrix */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Layer 4 — Floating orbs */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute rounded-full blur-3xl opacity-20 animate-orb-drift"
            style={{
              width: "600px",
              height: "600px",
              top: "-100px",
              left: "-100px",
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.36) 0%, transparent 70%)",
              animationDuration: "22s",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-15 animate-orb-drift animation-delay-4000"
            style={{
              width: "500px",
              height: "500px",
              bottom: "-80px",
              right: "-60px",
              background:
                "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
              animationDuration: "28s",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-10 animate-orb-drift animation-delay-2000"
            style={{
              width: "400px",
              height: "400px",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, transparent 70%)",
              animationDuration: "35s",
            }}
          />
        </>
      )}

      {/* Layer 5 — Hero spotlight (static radial) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
