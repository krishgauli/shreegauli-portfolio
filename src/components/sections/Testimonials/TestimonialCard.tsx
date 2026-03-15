import { Star } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <ModuleShell className="p-8 flex flex-col gap-6" enableHoverLift glowColor="violet">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-[#F8FAFC] text-sm md:text-base leading-relaxed">
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
