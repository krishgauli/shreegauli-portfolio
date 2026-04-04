import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "SEO & Content Services — Shree Krishna Gauli",
  description:
    "Technical audits, keyword strategy, link building, and content systems that build lasting organic presence. Based in Dallas, working globally.",
  path: "/services/seo",
  keywords: [
    "SEO services",
    "technical SEO audit",
    "keyword strategy",
    "content marketing",
    "link building",
    "SEO specialist Dallas",
  ],
});

const process = [
  {
    step: "01",
    title: "Technical Audit",
    description:
      "Crawl-based audit covering site speed, Core Web Vitals, indexability, schema markup, canonical tags, and crawl-budget issues.",
  },
  {
    step: "02",
    title: "Keyword Research & Mapping",
    description:
      "Identify high-intent keywords and map them to existing and planned content, grouped by topic clusters.",
  },
  {
    step: "03",
    title: "On-Page Optimization",
    description:
      "Title tags, meta descriptions, heading structure, internal linking, and content gaps — page by page.",
  },
  {
    step: "04",
    title: "Content Systems",
    description:
      "Build a repeatable content calendar with briefs, publishing workflows, and performance tracking.",
  },
  {
    step: "05",
    title: "Link Building & Authority",
    description:
      "Outreach-based link acquisition, broken-link reclamation, and digital PR to build domain authority.",
  },
  {
    step: "06",
    title: "Monthly Reporting",
    description:
      "Clear reports showing keyword movement, organic traffic growth, conversions, and next-step recommendations.",
  },
];

const deliverables = [
  "Full technical SEO audit report",
  "Keyword strategy document with cluster mapping",
  "Monthly content briefs (titles, outlines, target keywords)",
  "On-page optimization across your top pages",
  "Google Search Console & GA4 setup / configuration",
  "Monthly performance report with action items",
];

const faqs = [
  {
    q: "How long until I see results from SEO?",
    a: "Most clients see measurable improvements in 3-4 months. Significant organic growth typically happens in the 6-8 month range. SEO is a compounding investment — early wins build on each other.",
  },
  {
    q: "Do you write the content or just the strategy?",
    a: "Both. I can provide full content briefs for your team, or handle the writing end-to-end. Most clients prefer the full-service option so every piece is optimized from day one.",
  },
  {
    q: "What tools do you use?",
    a: "Ahrefs, Screaming Frog, Google Search Console, GA4, Surfer SEO, and custom reporting dashboards. I pick the right tool for each job rather than locking into one platform.",
  },
  {
    q: "How is this different from an SEO agency?",
    a: "You work directly with me — no account managers, no junior handoffs. Strategy and execution come from the same person, which means faster iteration and better results.",
  },
];

export default function SeoServicePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="SEO & Content"
            title="Build an organic presence that compounds"
            subtitle="Technical audits, keyword strategy, and content systems designed for sustainable growth — not quick fixes that collapse in the next algorithm update."
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full">
                  <span className="text-xs font-bold text-[#22D3EE]">{item.step}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">What you get</h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
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
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Frequently asked questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <ModuleShell key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-[#F8FAFC]">{faq.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{faq.a}</p>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
