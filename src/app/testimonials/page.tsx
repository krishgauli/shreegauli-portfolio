import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = createPageMetadata({
  title: "Client Testimonials | SEO, Paid Media, Automation Results",
  description:
    "Read feedback from clients across SEO, paid media, and automation engagements with measurable outcomes.",
  path: "/testimonials",
  keywords: ["marketing consultant testimonials", "SEO consultant reviews", "client results feedback"],
});

export default function TestimonialsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Testimonials", path: "/testimonials" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Testimonials"
            title="What clients say after the work starts moving"
            subtitle="Feedback is most useful when it reflects how the work felt, how communication worked, and what changed after implementation."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={testimonial.id} delay={index * 0.08}>
                <ModuleShell className="h-full p-6">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                      <Star key={`${testimonial.id}-${starIndex}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[#CBD5E1]">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-base font-semibold text-[#F8FAFC]">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-[#94A3B8]">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-[#F8FAFC]">Looking for proof beyond quotes?</h2>
            <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
              The strongest proof is usually the work itself: what changed, how it
              changed, and what the numbers looked like before and after. Use the
              case studies to see the implementation layer behind the outcome.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
              >
                View case studies
              </Link>
              <Link
                href="/contact"
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
              >
                Start a conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
