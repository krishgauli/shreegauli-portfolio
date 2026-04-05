import { Star } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <ModuleShell
      className={cn("h-full p-8 flex flex-col gap-6", className)}
      enableHoverLift
      glowColor="violet"
    >
      {/* Stars */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-1">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
            />
          ))}
        </div>
        {testimonial.result && (
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
            {testimonial.result}
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote className="text-[#F8FAFC] text-base md:text-[1.05rem] leading-[1.8]">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: testimonial.avatarColor + "33", border: `1px solid ${testimonial.avatarColor}40` }}
        >
          <span style={{ color: testimonial.avatarColor }}>{testimonial.avatarInitials}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#F8FAFC]">{testimonial.name}</p>
          <p className="text-xs text-[#94A3B8]">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </ModuleShell>
  );
}
