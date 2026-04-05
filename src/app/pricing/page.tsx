import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, Gauge, Layers3 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing — Shree Krishna Gauli",
  description:
    "Transparent starting ranges for strategy sprints, monthly growth support, and automation builds.",
  path: "/pricing",
  keywords: ["marketing consultant pricing", "SEO consultant pricing", "automation project pricing"],
});

const offers = [
  {
    icon: DollarSign,
    title: "Strategy and audit sprints",
    price: "$750 - $2,500",
    description:
      "Best for diagnostic work: SEO audits, ad account reviews, messaging review, funnel teardown, or channel planning.",
    items: [
      "1-2 week scope",
      "Written findings and priorities",
      "Clear action plan with quick wins",
    ],
  },
  {
    icon: Gauge,
    title: "Monthly growth support",
    price: "$2,000 - $5,000/mo",
    description:
      "Best for ongoing execution across SEO, paid media, reporting, or conversion-focused marketing operations.",
    items: [
      "Weekly implementation rhythm",
      "Monthly reporting and decision support",
      "Direct communication with the operator doing the work",
    ],
  },
  {
    icon: Layers3,
    title: "Builds and automation projects",
    price: "$3,000 - $10,000+",
    description:
      "Best for workflow automation, CRM routing, reporting dashboards, and larger multi-system projects.",
    items: [
      "Defined build scope and milestones",
      "Documentation and handoff",
      "Optional retainers after launch",
    ],
  },
];

export default function PricingPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Pricing"
            title="Straightforward pricing ranges"
            subtitle="These are starting points so you can self-qualify quickly. Final pricing depends on scope, urgency, and how much implementation support you need."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {offers.map((offer, index) => {
              const Icon = offer.icon;
              return (
                <ScrollReveal key={offer.title} delay={index * 0.08}>
                  <ModuleShell className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#94A3B8]">
                      {offer.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-[#F8FAFC]">{offer.price}</p>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{offer.description}</p>
                    <ul className="mt-5 space-y-2 text-sm text-[#CBD5E1]">
                      {offer.items.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </ModuleShell>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <ModuleShell className="p-6">
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">What affects scope</h2>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                Pricing moves up when the work spans multiple channels, requires
                implementation across several tools, or needs faster turnaround. It
                also changes when reporting, coordination, and experimentation are
                part of the engagement instead of a one-time audit or build.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                If the problem is still fuzzy, start with a strategy sprint. That is
                usually the fastest way to get clarity before committing to a larger
                monthly scope.
              </p>
            </ModuleShell>

            <ModuleShell className="p-6">
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">Best next step</h2>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                If you already know the bottleneck, book a call. If you need help
                defining the right scope first, send a note with the context and I
                will recommend the simplest useful starting point.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                >
                  Book a call
                </Link>
                <Link
                  href="/working-together"
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
                >
                  See how engagements work
                </Link>
              </div>
            </ModuleShell>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
