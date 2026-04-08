import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "./CaseStudyCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* Show only the 3 strongest, most-differentiated case studies on the homepage */
const featuredIds = ["lead-conversion-fix", "seo-website-launch", "ai-call-centre"];
const featured = featuredIds
  .map((id) => caseStudies.find((cs) => cs.id === id))
  .filter(Boolean) as typeof caseStudies;

export function FeaturedWorkSection() {
  return (
    <section id="work" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Proof"
          title="Work that moved the numbers"
          subtitle="Not portfolios. Each includes the problem, what was fixed, and the before-and-after metrics."
        />

        <div className="flex flex-col gap-6">
          {featured.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <CaseStudyCard cs={cs} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
