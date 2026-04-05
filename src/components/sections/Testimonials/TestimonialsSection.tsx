"use client";

import { testimonials } from "@/lib/data";
import { TestimonialCard } from "./TestimonialCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function TestimonialsSection() {
  const prefersReducedMotion = useReducedMotion();
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Social Proof"
          title="What clients say"
          subtitle="Results first. Relationships second. That's the order that works."
        />

        <ScrollReveal>
          {prefersReducedMotion ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  className="min-h-[360px]"
                />
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#070B14] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#070B14] to-transparent" />

              <div className="marquee-container overflow-hidden py-2">
                <div
                  className="flex w-max gap-6 animate-marquee hover:[animation-play-state:paused]"
                  style={{ animationDuration: "42s" }}
                >
                  {loopedTestimonials.map((testimonial, index) => (
                    <div
                      key={`${testimonial.id}-${index}`}
                      className="w-[320px] sm:w-[360px] lg:w-[390px] shrink-0"
                    >
                      <TestimonialCard
                        testimonial={testimonial}
                        className="min-h-[360px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
