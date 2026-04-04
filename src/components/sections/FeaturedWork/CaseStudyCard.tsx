import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

const gradients = [
  "from-violet-900/40 to-purple-900/20",
  "from-cyan-900/40 to-teal-900/20",
  "from-amber-900/30 to-orange-900/20",
];

export function CaseStudyCard({
  cs,
  index,
}: {
  cs: CaseStudy;
  index: number;
}) {
  return (
    <ModuleShell
      as="article"
      className="overflow-hidden flex flex-col md:flex-row"
      enableHoverLift
      glowColor={index % 2 === 0 ? "violet" : "cyan"}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative shrink-0 md:w-56 h-40 md:h-auto bg-gradient-to-br overflow-hidden",
          gradients[index % gradients.length]
        )}
      >
        <img
          src={cs.thumbnail}
          alt={cs.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:opacity-100 hover:mix-blend-normal transition-all duration-500"
        />
        {/* Result badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-lg bg-[#070B14]/80 backdrop-blur-sm border border-white/[0.1] text-xs font-bold text-[#22D3EE]">
            {cs.metrics[0]?.value}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        {/* Client + tags */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">
            {cs.client}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {cs.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xs text-[#7C3AED] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#F8FAFC] leading-snug">
          {cs.title}
        </h3>

        {/* Metrics row */}
        <div className="flex flex-wrap gap-4">
          {cs.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-base font-bold text-gradient-brand">
                {m.value}
              </span>
              <span className="text-xs text-[#94A3B8] mt-0.5">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="mt-auto">
          <Link
            href={cs.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#22D3EE] hover:text-[#F8FAFC] transition-colors group"
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </ModuleShell>
  );
}
