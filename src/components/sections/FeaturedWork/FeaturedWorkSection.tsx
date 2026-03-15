import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "./CaseStudyCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function FeaturedWorkSection() {
  return (
    <section id="work" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Selected Work"
          title="Work that moves numbers"
          subtitle="Not projects. Proof."
        />

        <div className="flex flex-col gap-6">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <CaseStudyCard cs={cs} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
