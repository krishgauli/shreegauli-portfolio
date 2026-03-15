import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function TestimonialsSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Social Proof"
          title="What clients say"
          subtitle="Results first. Relationships second. That's the order that works."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.1}>
              <TestimonialCard testimonial={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
