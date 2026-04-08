import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  professionalServiceSchema,
} from "@/lib/schema";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Marketing Consultant in Dallas, TX | SEO, Google Ads & Lead Conversion",
  description:
    "Dallas-based marketing consultant specializing in SEO, Google Ads, and lead conversion systems. I help healthcare practices and local service businesses turn online traffic into booked appointments and revenue.",
  path: "/dallas/marketing-consultant",
  keywords: [
    "marketing consultant Dallas",
    "digital marketing consultant Dallas TX",
    "SEO consultant Dallas",
    "Google Ads consultant Dallas",
    "Dallas marketing expert",
    "local marketing Dallas",
  ],
});

const whyLocal = [
  {
    title: "I know the Dallas market",
    description:
      "I live here. I understand the competitive landscape for healthcare, home services, legal, and local businesses across DFW — not just the national playbook.",
  },
  {
    title: "You work directly with me",
    description:
      "No agency layers, no account managers, no junior handoffs. Strategy and execution come from the same person. You get my cell number, not a support ticket.",
  },
  {
    title: "I focus on revenue, not vanity metrics",
    description:
      "I don't report on impressions and clicks. I track which channels drive booked appointments, signed clients, and revenue. If it doesn't move the business, it doesn't make the report.",
  },
  {
    title: "Proven results with Dallas-area businesses",
    description:
      "I've helped multi-location clinics, service businesses, and local startups in the DFW area fix their marketing funnels and grow revenue consistently.",
  },
];

const serviceAreas = [
  {
    title: "SEO & Local SEO",
    description:
      "Get found when Dallas customers search for your services. Technical SEO, Google Business Profile optimization, and content strategy for local intent keywords.",
    href: "/services/seo",
  },
  {
    title: "Google Ads Management",
    description:
      "Campaign architecture built for the Dallas market — geo-targeting, call tracking, and conversion optimization tied to real appointments and revenue.",
    href: "/services/paid-media",
  },
  {
    title: "Lead Conversion Optimization",
    description:
      "Fix the follow-up gap. CRM workflows, AI call agents, and structured processes that turn online leads into paying clients within minutes.",
    href: "/services/lead-conversion",
  },
  {
    title: "Reporting & Automation",
    description:
      "Live dashboards and n8n automations that eliminate manual work, connect your data sources, and show you exactly what's producing ROI.",
    href: "/services/automation",
  },
];

const industries = [
  "Healthcare practices & clinics",
  "Dental offices",
  "Med spas & aesthetics",
  "Home services (HVAC, plumbing, roofing)",
  "Legal firms",
  "Local SaaS & tech companies",
];

const faqs = [
  {
    q: "Do you only work with Dallas businesses?",
    a: "Dallas is my home base, but I work with clients across the US and selectively internationally. Local businesses get the added benefit of in-person meetings, local market knowledge, and Google Business Profile work specific to DFW.",
  },
  {
    q: "How much do your services cost?",
    a: "Most engagements start at $1,499/month for ongoing consulting and execution. Project-based work is scoped individually. I don't charge hourly — you get defined deliverables and measurable outcomes for a flat monthly fee.",
  },
  {
    q: "What makes you different from Dallas marketing agencies?",
    a: "Three things: (1) you work directly with me — no junior team; (2) I specialize in the full funnel from SEO to follow-up automation, not just one channel; and (3) I measure success by revenue impact, not deliverable volume.",
  },
  {
    q: "How quickly can we get started?",
    a: "Most engagements start within one week of the initial diagnostic call. The first deliverable is usually a full-funnel audit within the first 7 days, followed by implementation in priority order.",
  },
];

export default function DallasMarketingConsultantPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Dallas", path: "/dallas" },
            {
              name: "Marketing Consultant",
              path: "/dallas/marketing-consultant",
            },
          ]),
          professionalServiceSchema(),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Dallas, TX"
            title="A marketing consultant who actually lives here"
            subtitle="I'm a Dallas-based digital marketing consultant specializing in SEO, Google Ads, and lead conversion systems. I help healthcare practices and local service businesses turn online traffic into revenue — not just reports."
          />
        </div>
      </section>

      {/* Why local */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Why a Dallas-based consultant
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyLocal.map((item, i) => (
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
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Services for Dallas businesses
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {serviceAreas.map((svc, i) => (
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

      {/* Industries served */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Industries I work with in Dallas
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {industries.map((item) => (
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
