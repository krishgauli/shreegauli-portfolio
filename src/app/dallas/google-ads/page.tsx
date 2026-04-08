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
  title: "Google Ads Management in Dallas, TX | PPC Consultant",
  description:
    "Dallas-based Google Ads consultant managing campaigns for healthcare practices, local service businesses, and e-commerce brands. Real attribution, conversion tracking, and revenue-focused optimization.",
  path: "/dallas/google-ads",
  keywords: [
    "Google Ads consultant Dallas",
    "PPC management Dallas TX",
    "Google Ads Dallas",
    "Dallas paid search",
  ],
});

const whyLocal = [
  {
    title: "Dallas-Fort Worth market knowledge",
    description:
      "I know which zip codes convert, which industries are over-bidding, and where the cost-per-click gaps are in DFW. That local intelligence translates directly into lower CPAs and higher ROAS for your campaigns.",
  },
  {
    title: "Face-to-face campaign reviews",
    description:
      "PPC isn't set-it-and-forget-it. Being in Dallas means we can sit down together, walk through the data, and make strategic decisions about budget allocation, landing pages, and campaign structure in real time.",
  },
  {
    title: "Full-funnel conversion tracking",
    description:
      "Most PPC accounts track clicks and form fills. I track revenue — connecting Google Ads data to CRM outcomes so you know exactly which keywords and campaigns produce paying customers, not just leads.",
  },
  {
    title: "Proven results with Dallas businesses",
    description:
      "I've managed ad spend for clinics, home services companies, and e-commerce brands across DFW — delivering measurable ROAS improvements by fixing tracking, restructuring campaigns, and eliminating wasted spend.",
  },
];

const serviceAreas = [
  {
    title: "Search Campaigns",
    description:
      "High-intent keyword targeting with tight ad groups, proper negative keyword management, and ad copy that qualifies clicks before they cost you money. Built for lead generation and direct response.",
    href: "/services/paid-media",
  },
  {
    title: "Shopping & Performance Max",
    description:
      "Product feed optimization, campaign segmentation by margin and performance, and bidding strategies that prioritize profit over volume. For e-commerce brands that need real ROAS, not inflated numbers.",
    href: "/services/paid-media",
  },
  {
    title: "Display & YouTube",
    description:
      "Brand awareness and remarketing campaigns that keep your business visible throughout the buyer journey. Audience targeting, creative strategy, and frequency management to maximize reach without wasting impressions.",
    href: "/services/paid-media",
  },
  {
    title: "Remarketing & Retargeting",
    description:
      "Custom audience segments based on site behavior, engagement depth, and funnel stage. Bring back visitors who didn't convert with messaging tailored to where they dropped off.",
    href: "/services/lead-conversion",
  },
];

const faqs = [
  {
    q: "How much should I spend on Google Ads in Dallas?",
    a: "It depends on your industry and goals, but most local service businesses see meaningful results starting at $2,000–$5,000/month in ad spend. Healthcare and legal verticals in DFW are more competitive — $5K–$15K is typical for consistent lead flow. I'll give you a realistic budget recommendation based on your market before you spend a dollar.",
  },
  {
    q: "How quickly will I see results from Google Ads?",
    a: "Search campaigns can generate leads within the first week. However, the first 2–4 weeks are a learning phase where I'm gathering conversion data, refining audiences, and eliminating waste. Expect measurable, optimized performance by month two — with clear metrics tied to revenue, not just clicks.",
  },
  {
    q: "Do you manage the full funnel or just the ads?",
    a: "I manage the full funnel. Ads are only as good as what happens after the click — the landing page, the follow-up speed, the CRM workflow. I connect Google Ads data to downstream outcomes so we're optimizing for patients booked or deals closed, not just cost-per-click.",
  },
  {
    q: "Can you audit my existing Google Ads account?",
    a: "Yes — I offer standalone PPC audits that identify wasted spend, tracking gaps, campaign structure issues, and quick wins. Most accounts I audit have 20–40% of budget going to irrelevant searches, broken conversion tracking, or poorly structured campaigns. The audit pays for itself.",
  },
];

export default function DallasGoogleAdsPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Dallas", path: "/dallas" },
            { name: "Google Ads", path: "/dallas/google-ads" },
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
            title="A Dallas Google Ads consultant who optimizes for revenue — not clicks"
            subtitle="I manage PPC campaigns for healthcare practices, local service businesses, and e-commerce brands in Dallas. Every dollar is tracked from click to closed deal with real attribution and conversion tracking."
          />
        </div>
      </section>

      {/* Why local */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Why choose a Dallas-based PPC consultant
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

      {/* Service Areas */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            Google Ads services for Dallas businesses
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four campaign types — from high-intent search to full-funnel
            remarketing. Each is structured for the Dallas market and your
            specific revenue goals.
          </p>
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

      {/* Local market expertise */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Dallas PPC market expertise
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Geo-targeting by DFW zip code and neighborhood",
                "Competitive CPC analysis for Dallas verticals",
                "Landing page optimization for local conversions",
                "Call tracking with revenue attribution",
                "Google Business Profile ad extensions",
                "Seasonal bid adjustments for Dallas demand cycles",
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

      {/* Internal links */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Related services
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Paid Media", href: "/services/paid-media" },
              { title: "Lead Conversion", href: "/services/lead-conversion" },
              { title: "Dallas Marketing", href: "/dallas/marketing-consultant" },
              { title: "Dallas SEO", href: "/dallas/seo-consultant" },
            ].map((link) => (
              <ModuleShell key={link.href} className="p-5">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors group"
                >
                  {link.title}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </ModuleShell>
            ))}
          </div>
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
