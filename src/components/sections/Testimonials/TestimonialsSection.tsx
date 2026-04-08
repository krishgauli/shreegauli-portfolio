import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

/* Static grid — one testimonial per service area: SEO (t1), Ads (t6), Automation (t3) */
const featuredIds = ["t1", "t6", "t3"];
const featured = featuredIds
  .map((id) => testimonials.find((t) => t.id === id))
  .filter(Boolean) as typeof testimonials;

export function TestimonialsSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Client Experience"
          title="What it's actually like to work together"
          subtitle="The metrics are in the case studies. These are about the experience — how communication worked, how fast things moved, and what changed."
        />

        <ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                className="min-h-[360px]"
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
