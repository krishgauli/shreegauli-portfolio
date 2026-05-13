import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import type { Stat } from "@/types";

export function StatTile({ stat }: { stat: Stat }) {
  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      <p className="text-4xl md:text-5xl font-bold text-[#1A1A1A] leading-none tabular-nums">
        {stat.prefix && (
          <span className="text-gradient-brand">{stat.prefix}</span>
        )}
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          className="text-gradient-brand"
        />
      </p>
      <p className="mt-3 text-sm font-semibold text-[#1A1A1A]">{stat.label}</p>
      {stat.sublabel && (
        <p className="mt-1 text-xs text-[#6B7280]">{stat.sublabel}</p>
      )}
    </div>
  );
}
