import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "SaaS Marketing Consultant | SEO, Paid Media & Growth Systems",
  description:
    "Marketing consultant for SaaS companies — SEO for product-led growth, paid acquisition, content systems, and marketing automation. Focus on MRR growth and CAC reduction.",
  path: "/industries/saas",
  keywords: [
    "SaaS marketing consultant",
    "SaaS SEO",
    "SaaS growth marketing",
    "B2B SaaS marketing",
    "SaaS lead generation",
  ],
});

const challenges = [
  {
    title: "CAC keeps climbing",
    description:
      "Paid channels get more expensive every quarter. Without a compounding organic engine, you're stuck on the paid acquisition treadmill — spending more to maintain the same growth rate.",
  },
  {
    title: "Attribution is a mess",
    description:
      "Multi-touch journeys across content, ads, product trials, and sales calls make it nearly impossible to know what's actually driving pipeline. You're making budget decisions on incomplete data.",
  },
  {
    title: "Content doesn't connect to pipeline",
    description:
      "Your blog gets traffic but doesn't generate signups or demos. There's no system connecting content topics to buyer intent stages, and no tracking from first touch to closed deal.",
  },
  {
    title: "You can't scale beyond founder-led sales",
    description:
      "The founders are still the primary sales channel. Marketing generates leads, but there's no repeatable system to qualify, nurture, and hand off prospects without founder involvement.",
  },
];

const services = [
  {
    title: "SEO for Product-Led Growth",
    description:
      "Keyword strategy targeting bottom-of-funnel searches — comparison pages, alternative pages, and problem-aware queries that drive signups and demo requests, not just blog traffic.",
    href: "/services/seo",
  },
  {
    title: "Paid Acquisition & CAC Optimization",
    description:
      "Campaign architecture designed to reduce CAC over time — proper conversion tracking, audience segmentation, and budget allocation based on pipeline value, not click volume.",
    href: "/services/lead-conversion",
  },
  {
    title: "Content Systems & AEO/GEO",
    description:
      "Programmatic content frameworks that scale production without sacrificing quality. Optimized for both traditional search and AI answer engines that increasingly drive SaaS discovery.",
    href: "/services/aeo-geo",
  },
  {
    title: "Marketing Automation & Lead Scoring",
    description:
      "n8n-powered workflows that score leads based on product usage signals, content engagement, and firmographic data — so sales only talks to prospects ready to buy.",
    href: "/services/lead-conversion",
  },
];

const faqs = [
  {
    q: "Do you work with early-stage or enterprise SaaS?",
    a: "Both, but the approach differs. Early-stage companies need a lean, high-impact system — usually SEO + content + basic automation. Growth-stage and enterprise SaaS need attribution fixes, CAC optimization across channels, and scalable content operations. I scope engagements based on your stage and budget.",
  },
  {
    q: "How do you measure success for SaaS marketing?",
    a: "MRR growth, CAC by channel, pipeline velocity, and content-to-signup conversion rate. I don't report on vanity metrics like page views or social impressions unless they demonstrably connect to revenue. Every dashboard is built around the metrics your board actually cares about.",
  },
  {
    q: "Can you work alongside our in-house team?",
    a: "That's the most common setup. I typically own strategy, SEO, and automation while collaborating with your content writers, designers, and product marketing team. I plug into your existing tools — Slack, Notion, Linear, whatever you use — and operate like a fractional CMO.",
  },
  {
    q: "How long before we see results from SEO?",
    a: "Bottom-of-funnel pages (comparisons, alternatives, use cases) can rank and drive signups within 6–8 weeks if your domain has existing authority. A full content engine takes 3–6 months to compound. I always pair SEO with paid channels in the early months so you're not waiting on organic alone.",
  },
];

export default function SaaSIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "SaaS", path: "/industries/saas" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="SaaS Marketing"
            title="Grow MRR without burning through your runway"
            subtitle="I help SaaS companies build marketing systems that compound — SEO that drives signups, paid channels with real attribution, and automation that moves leads to pipeline without founder involvement."
          />
        </div>
      </section>

      {/* Challenges */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Sound familiar?
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {challenges.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full">
                  <h3 className="text-base font-bold text-[#F8FAFC]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            How I help SaaS companies grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four connected systems — from organic acquisition to pipeline
            automation. Each one is built for how SaaS buyers research,
            evaluate, and purchase software.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full flex flex-col">
                  <h3 className="text-base font-bold text-[#F8FAFC]">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2 flex-1">
                    {svc.description}
                  </p>
                  <Link
                    href={svc.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors mt-4 group"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key metrics callout */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Metrics that matter
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Customer acquisition cost (CAC) by channel",
                "Monthly recurring revenue (MRR) growth rate",
                "Content-to-signup conversion rate",
                "Pipeline velocity and sales cycle length",
                "Trial-to-paid conversion rate",
                "LTV:CAC ratio by acquisition source",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#94A3B8]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#22D3EE] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ModuleShell>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Frequently asked questions
          </h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <ModuleShell key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-[#F8FAFC]">{faq.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                  {faq.a}
                </p>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
