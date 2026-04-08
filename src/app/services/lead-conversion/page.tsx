import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title:
    "Lead Conversion Optimization | Fix the Gap Between Leads and Revenue",
  description:
    "Most businesses don't have a traffic problem — they have a conversion problem. I audit your full funnel and fix the follow-up, tracking, and process gaps that kill lead-to-revenue rates.",
  path: "/services/lead-conversion",
  keywords: [
    "lead conversion optimization",
    "lead follow-up system",
    "conversion rate optimization",
    "lead management consultant",
    "lead-to-revenue optimization",
    "marketing funnel audit",
  ],
});

const process = [
  {
    step: "01",
    title: "Full-Funnel Audit",
    description:
      "Map every step from ad click to closed deal. Identify where leads are dropping off — slow follow-up, broken tracking, missing CRM stages, or manual processes.",
  },
  {
    step: "02",
    title: "Follow-Up System Design",
    description:
      "Build a structured follow-up cadence with call scripts, SMS sequences, and email drips so no lead waits more than 5 minutes for first contact.",
  },
  {
    step: "03",
    title: "CRM & Pipeline Setup",
    description:
      "Configure your CRM to track every lead through defined stages with automatic alerts, task assignments, and stage-based follow-up triggers.",
  },
  {
    step: "04",
    title: "Tracking & Attribution",
    description:
      "Implement server-side conversion tracking, UTM discipline, and offline conversion imports so you know exactly which channels drive revenue.",
  },
  {
    step: "05",
    title: "AI-Powered Follow-Up",
    description:
      "Deploy AI call agents and chatbots that respond to new leads within 60 seconds — qualifying, scheduling, and logging every interaction automatically.",
  },
  {
    step: "06",
    title: "Revenue Reporting",
    description:
      "Build dashboards that connect ad spend to actual revenue, not just leads. Track cost-per-acquisition, conversion rate by channel, and lifetime value.",
  },
];

const deliverables = [
  "Complete lead-to-revenue funnel audit report",
  "Follow-up cadence design with call scripts and templates",
  "CRM pipeline configuration and automation setup",
  "Server-side conversion tracking implementation",
  "AI follow-up agent deployment (where applicable)",
  "Monthly conversion rate and revenue attribution reporting",
];

const faqs = [
  {
    q: "How is this different from CRO?",
    a: "Traditional CRO focuses on landing page elements — button colors, form fields, headline tests. Lead conversion optimization goes deeper. It covers everything after the click: follow-up speed, call quality, CRM workflows, and process gaps. Most revenue leaks happen after the form fill, not on the form itself.",
  },
  {
    q: "My ads are working fine — do I really need this?",
    a: "If you're generating leads but they're not converting to revenue, your ads aren't the problem. I've seen businesses spending $6K/month on ads with a 0.1% conversion rate — not because the ads were bad, but because follow-up took 48 hours. Fix the back end first, then scale the front end.",
  },
  {
    q: "How fast can I expect results?",
    a: "Most clients see measurable conversion improvements within 2-4 weeks of implementing follow-up and process changes. The infrastructure (CRM, tracking, AI agents) typically takes 4-6 weeks to fully deploy.",
  },
  {
    q: "Do I need to change my existing ad campaigns?",
    a: "Usually not at first. The whole point is to get more revenue from the leads you're already generating. Once follow-up and conversion systems are in place, we optimize campaigns based on actual revenue data rather than lead volume.",
  },
];

export default function LeadConversionPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Lead Conversion", path: "/services/lead-conversion" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "Lead Conversion Optimization",
            description:
              "Full-funnel lead-to-revenue optimization including follow-up systems, CRM automation, AI agents, and revenue attribution.",
            path: "/services/lead-conversion",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Lead Conversion"
            title="Fix the gap between your leads and your revenue"
            subtitle="You're spending money on ads. Leads are coming in. But they're not converting — because follow-up is slow, tracking is broken, and nobody owns the process. I fix that."
          />
        </div>
      </section>

      {/* Proof callout */}
      <section className="relative z-10 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <ModuleShell className="p-6 md:p-8 border-[#7C3AED]/20">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
                Case Study
              </p>
              <p className="text-lg font-bold text-[#F8FAFC]">
                100x conversion lift for a multi-location clinic
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                A clinic spending $6K/month on ads had a 0.1% conversion rate. The
                ads weren&apos;t the problem — follow-up took 48 hours and there was no
                structured process. After a full-funnel audit and follow-up system
                rebuild, conversion jumped to 10% in one month with zero ad spend
                increase.
              </p>
              <Link
                href="/work/lead-conversion-fix"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors mt-4"
              >
                Read the full case study →
              </Link>
            </ModuleShell>
          </ScrollReveal>
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
                  <span className="text-xs font-bold text-[#7C3AED]">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">
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

      {/* Deliverables */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            What you get
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#94A3B8]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#7C3AED] mt-0.5 shrink-0" />
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
