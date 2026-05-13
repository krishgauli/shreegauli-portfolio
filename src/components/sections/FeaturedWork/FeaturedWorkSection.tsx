import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "./CaseStudyCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* Show the 3 strongest, most-differentiated case studies on the homepage */
const featuredIds = ["healthcare-booking-system-stripe-google-calendar-sync", "tacklers-consulting", "seo-website-launch"];
const featured = featuredIds
  .map((id) => caseStudies.find((cs) => cs.id === id))
  .filter(Boolean) as typeof caseStudies;

export function FeaturedWorkSection({ headingAs }: { headingAs?: "h1" | "h2" }) {
  return (
    <section id="work" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Proof"
          title="Work that moved the numbers"
          as={headingAs}
          subtitle="Not portfolios. Each includes the problem, what was fixed, and the before-and-after metrics."
        />

        <div className="flex flex-col gap-6">
          {featured.map((cs, i) => (
            <ScrollReveal key={cs.id} delay={i * 0.1}>
              <CaseStudyCard cs={cs} index={i} />
            </ScrollReveal>
          ))}
        </div>

        {/* View More button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-[#D4CFC8] bg-[#F5F0E8] px-7 py-3.5 text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:border-[#7C3AED]/40 hover:bg-[#FDFAF5] hover:text-[#7C3AED] hover:shadow-[0_8px_30px_-10px_rgba(124,58,237,0.25)]"
          >
            View all case studies
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
