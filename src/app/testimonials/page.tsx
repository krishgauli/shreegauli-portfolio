import type { Metadata } from "next";
import Link from "next/link";
import { Stethoscope, ShoppingCart, Building2, BarChart3 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, aggregateRatingSchema } from "@/lib/schema";
import { testimonials } from "@/lib/data";

const industryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  healthcare: Stethoscope,
  ecommerce: ShoppingCart,
  services: Building2,
};

export const metadata: Metadata = createPageMetadata({
  title: "Client Testimonials | Web Development & SEO Reviews",
  description:
    "Verified reviews from business owners who hired Shree for web development, SEO, and automation projects. 4.9 average rating.",
  path: "/testimonials",
  keywords: ["web developer testimonials", "SEO consultant reviews", "client reviews web development"],
});

export default function TestimonialsPage() {
  const reviewData = testimonials.map((t) => ({
    author: t.name,
    reviewBody: t.quote,
    ratingValue: 5,
  }));

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Testimonials", path: "/testimonials" }])} />
      <JsonLd data={aggregateRatingSchema(reviewData)} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Testimonials"
            title="What clients say after the work starts moving"
            as="h1"
            subtitle="Feedback is most useful when it reflects how the work felt, how communication worked, and what changed after implementation."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => {
              const IndustryIcon = (testimonial.industry && industryIcons[testimonial.industry]) || BarChart3;
              return (
                <ScrollReveal key={testimonial.id} delay={index * 0.08}>
                  <ModuleShell className="h-full p-6">
                    {testimonial.result && (
                      <div className="flex items-center mb-4">
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94A3B8]">
                          {testimonial.result}
                        </span>
                      </div>
                    )}
                    <p className="text-sm leading-7 text-[#CBD5E1]">&quot;{testimonial.quote}&quot;</p>
                    <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: testimonial.avatarColor + "33", border: `1px solid ${testimonial.avatarColor}40` }}
                      >
                        <IndustryIcon className="h-4 w-4" style={{ color: testimonial.avatarColor }} />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-[#F8FAFC]">{testimonial.name}</p>
                        <p className="mt-0.5 text-sm text-[#94A3B8]">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </ModuleShell>
                </ScrollReveal>
              );
            })}
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
