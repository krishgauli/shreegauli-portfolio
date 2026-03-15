import { stats } from "@/lib/data";
import { StatTile } from "./StatTile";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function ResultsStrip() {
  return (
    <section className="relative z-10 py-2">
      <div
        className="max-w-5xl mx-auto px-6"
      >
        <ScrollReveal>
          <div className="module-panel grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
            {stats.map((stat) => (
              <StatTile key={stat.label} stat={stat} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
