"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const chartBars = [78, 126, 92, 158, 118, 176, 142];
const floatingMetrics = [
  { label: "CTR", value: "+28%", top: "18%", left: "10%", color: "#22D3EE", delay: 0.2 },
  { label: "ROAS", value: "4.8x", top: "24%", left: "42%", color: "#7C3AED", delay: 0.6 },
  { label: "CPL", value: "-37%", top: "68%", left: "38%", color: "#F59E0B", delay: 0.9 },
  { label: "SQL", value: "+340%", top: "56%", left: "72%", color: "#22D3EE", delay: 0.4 },
];

const funnelSteps = [
  { label: "Traffic", color: "#22D3EE" },
  { label: "Clicks", color: "#7C3AED" },
  { label: "Leads", color: "#F59E0B" },
  { label: "Pipeline", color: "#22D3EE" },
];

export function HeroMarketingBackdrop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.08),transparent_26%),radial-gradient(circle_at_74%_26%,rgba(124,58,237,0.11),transparent_30%),radial-gradient(circle_at_42%_88%,rgba(245,158,11,0.08),transparent_26%)]" />

      <div className="absolute inset-x-[6%] top-[45%] hidden lg:block">
        <motion.div
          className="relative h-px w-[38vw] max-w-[620px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.4, 0.9, 0.4] }
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="absolute -top-[5px] h-3 w-3 rounded-full bg-[#F8FAFC] shadow-[0_0_16px_rgba(248,250,252,0.95)]"
            animate={
              prefersReducedMotion
                ? undefined
                : { x: ["0%", "92%", "0%"] }
            }
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          className="relative mt-9 ml-[8%] h-px w-[32vw] max-w-[520px] bg-gradient-to-r from-transparent via-[#22D3EE]/40 to-transparent"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.25, 0.75, 0.25] }
          }
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <motion.span
            className="absolute -top-[4px] h-2.5 w-2.5 rounded-full bg-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,0.85)]"
            animate={
              prefersReducedMotion
                ? undefined
                : { x: ["88%", "0%", "88%"] }
            }
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
        </motion.div>
      </div>

      <div className="absolute left-[8%] bottom-[12%] hidden lg:flex items-end gap-3 opacity-70">
        {chartBars.map((height, index) => (
          <motion.span
            key={index}
            className="w-3 rounded-t-full bg-gradient-to-t from-[#7C3AED]/15 via-[#22D3EE]/35 to-[#F59E0B]/95 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
            style={{ height }}
            animate={
              prefersReducedMotion
                ? undefined
                : { height: [Math.max(48, height - 22), height, Math.max(54, height - 12)] }
            }
            transition={{
              duration: 3.6 + index * 0.22,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: index * 0.12,
            }}
          />
        ))}
      </div>

      <div className="absolute right-[8%] top-[18%] hidden xl:flex items-center gap-4 rounded-full border border-white/10 bg-[#0F172A]/55 px-5 py-3 backdrop-blur-xl">
        {funnelSteps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: step.color,
                  boxShadow: `0 0 14px ${step.color}`,
                }}
              />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#CBD5E1]">
                {step.label}
              </span>
            </div>
            {index < funnelSteps.length - 1 && (
              <span className="h-px w-8 bg-gradient-to-r from-white/25 to-transparent" />
            )}
          </div>
        ))}
      </div>

      {floatingMetrics.map((metric) => (
        <motion.div
          key={metric.label}
          className="absolute hidden md:block rounded-2xl border border-white/10 bg-[#0F172A]/55 px-4 py-3 backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(2,6,23,0.9)]"
          style={{ top: metric.top, left: metric.left }}
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -8, 0], opacity: [0.65, 1, 0.65] }
          }
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: metric.delay,
          }}
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">
            {metric.label}
          </div>
          <div className="mt-1 text-sm font-bold" style={{ color: metric.color }}>
            {metric.value}
          </div>
        </motion.div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070B14] via-[#070B14]/40 to-transparent" />
    </div>
  );
}
