import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Paintbrush, Code2, Rocket } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "How It Works | Working With a Full-Stack Developer",
  description:
    "See how discovery, design, development, and launch work when you hire Shree directly as your web developer and SEO consultant.",
  path: "/working-together",
  keywords: ["working with a web developer", "web development process", "project engagement model"],
});

const steps = [
  {
    icon: MessageSquare,
    title: "1. Discovery call",
    body: "We start with what you need: a new website, a redesign, an e-commerce store, or SEO for an existing site. I ask about your goals, timeline, and budget — then recommend the right approach.",
  },
  {
    icon: Paintbrush,
    title: "2. Design & scope",
    body: "I create wireframes and visual designs in Figma before writing code. You see the layout, give feedback, and approve it. A detailed proposal with fixed pricing is delivered before work begins.",
  },
  {
    icon: Code2,
    title: "3. Build & optimize",
    body: "I build the site with clean code, SEO baked in, and performance tuned. You get progress updates throughout. For automation projects, workflows are built and tested in staging first.",
  },
  {
    icon: Rocket,
    title: "4. Launch & grow",
    body: "Deploy to production, set up analytics, submit sitemaps, and verify everything works. Post-launch, I'm available for maintenance, SEO iteration, and new features as your business grows.",
  },
];

const fits = [
  "Business owners who want a website that actually drives leads and revenue",
  "Teams that need one developer who handles design, code, SEO, and automation",
  "Healthcare, finance, SaaS, or e-commerce businesses needing a professional site",
  "Founders who value direct communication over agency processes",
];

export default function WorkingTogetherPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Working Together", path: "/working-together" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Working Together"
            title="What a project actually looks like"
            as="h1"
            subtitle="Direct collaboration from design to launch. No account-manager layer, no inflated process. One developer handling everything."
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
