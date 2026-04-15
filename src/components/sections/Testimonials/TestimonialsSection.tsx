import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { Star } from "lucide-react";

/* Show all 5 real client testimonials */
const featured = testimonials;

export function TestimonialsSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Client Reviews"
          title="What real clients say"
          subtitle="Verified reviews from business owners I've worked with — 4.9 average across 5 reviews."
        />

        {/* Aggregate rating badge */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-lg font-bold text-[#F8FAFC]">4.9</span>
          <span className="text-sm text-[#94A3B8]">· 5 Reviews</span>
        </div>

        <ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                className="min-h-[320px]"
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
