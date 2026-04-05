import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Search, Wrench, LineChart } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "How It Works | Hiring a Digital Marketing Consultant",
  description:
    "See how discovery, strategy, execution, and reporting work when you hire Shree directly as your marketing consultant.",
  path: "/working-together",
  keywords: ["working with a marketing consultant", "digital marketing process", "consultant engagement model"],
});

const steps = [
  {
    icon: MessageSquare,
    title: "1. Clarify the bottleneck",
    body: "We start with what is actually blocking growth: weak demand capture, poor conversion flow, unclear attribution, or too much manual work.",
  },
  {
    icon: Search,
    title: "2. Audit before action",
    body: "I review the current stack, traffic quality, page experience, campaign structure, tracking, and workflow gaps before recommending a plan.",
  },
  {
    icon: Wrench,
    title: "3. Ship the highest-leverage work",
    body: "The first work usually focuses on the clearest constraint: fixing service pages, cleaning campaigns, improving reporting, or building automation.",
  },
  {
    icon: LineChart,
    title: "4. Report and iterate",
    body: "Reporting is tied to decisions. We look at what changed, what it means, and what should happen next instead of dumping dashboards without context.",
  },
];

const fits = [
  "Founder-led businesses that want direct operator access",
  "Lean marketing teams that need senior execution without agency layers",
  "Teams with channel activity already happening but weak measurement or coordination",
  "Businesses willing to fix site and process issues, not just buy more traffic",
];

export default function WorkingTogetherPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Working Together", path: "/working-together" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Working Together"
            title="What an engagement actually looks like"
            subtitle="Direct collaboration, practical diagnosis, and work tied to measurable movement. No account-manager layer and no inflated process for its own sake."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={step.title} delay={index * 0.08}>
                  <ModuleShell className="h-full p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold text-[#F8FAFC]">{step.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{step.body}</p>
                  </ModuleShell>
                </ScrollReveal>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <ModuleShell className="p-6">
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">Who this tends to fit</h2>
              <ul className="mt-5 space-y-3 text-sm text-[#CBD5E1]">
                {fits.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </ModuleShell>

            <ModuleShell className="p-6">
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">How communication works</h2>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                Most projects run with one main async thread, one standing weekly
                check-in, and focused reviews when decisions matter. That keeps the
                work moving without turning a small engagement into a meeting-heavy
                process.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                Response time is usually under one business day. If a project needs
                more stakeholder coordination or a higher-volume sprint cadence, that
                gets scoped up front instead of being discovered halfway through.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                >
                  See pricing ranges
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20 hover:text-white"
                >
                  Start the conversation
                </Link>
              </div>
            </ModuleShell>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
