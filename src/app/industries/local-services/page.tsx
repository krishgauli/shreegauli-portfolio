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
  title: "Marketing for Local Service Businesses | SEO, Ads & Lead Systems",
  description:
    "Digital marketing for home services, legal, financial, and local businesses. SEO, Google Ads, and lead conversion systems that turn online searches into booked jobs and signed clients.",
  path: "/industries/local-services",
  keywords: [
    "local service business marketing",
    "home services marketing",
    "plumber marketing",
    "HVAC marketing",
    "local business lead generation",
  ],
});

const challenges = [
  {
    title: "Seasonality kills cash flow",
    description:
      "HVAC spikes in summer and winter, roofing drops in the off-season, landscaping disappears in winter. Without a year-round pipeline strategy, you're either overwhelmed or empty — never steady.",
  },
  {
    title: "Competition is ruthless on Google",
    description:
      "Every plumber, electrician, and contractor in your area is running ads and chasing the same map pack spots. Without a differentiated strategy and aggressive local signals, you blend in and lose clicks.",
  },
  {
    title: "Lead quality is inconsistent",
    description:
      "You're paying for leads that are price-shopping, outside your service area, or looking for services you don't offer. Bad targeting and no pre-qualification waste ad spend and technician time.",
  },
  {
    title: "You can't track what drove the call",
    description:
      "A customer calls and books a $5,000 job. Did it come from Google Ads, organic search, a referral, or your truck wrap? Without proper attribution, you're guessing where to put your budget.",
  },
];

const services = [
  {
    title: "Local SEO & Map Pack Domination",
    description:
      "Google Business Profile optimization, citation building, review strategy, and geo-targeted content for every city and zip code you serve. Built to own the map pack in your service area.",
    href: "/services/local-seo",
    tags: ["Local SEO", "GBP", "Citations"],
  },
  {
    title: "Google Ads for Service Businesses",
    description:
      "Campaign architecture by service type — separate budgets for high-value emergency calls vs. scheduled maintenance. Call tracking with source attribution on every lead.",
    href: "/services/paid-media",
    tags: ["Google Ads", "LSA", "Call Tracking"],
  },
  {
    title: "Lead Conversion & Follow-Up",
    description:
      "Speed-to-lead automation that responds to form fills in under 60 seconds. SMS follow-up, missed-call text-back, and CRM workflows that stop leads from going cold.",
    href: "/services/lead-conversion",
    tags: ["AI Follow-Up", "SMS", "CRM"],
  },
  {
    title: "Reporting & Attribution",
    description:
      "Dashboards that connect ad spend and SEO to booked jobs and revenue. Know exactly which channel, campaign, and keyword is driving profitable work — not just clicks.",
    href: "/services/automation",
    tags: ["GA4", "Call Attribution", "ROI Dashboards"],
  },
];

const faqs = [
  {
    q: "What types of local service businesses do you work with?",
    a: "HVAC, plumbing, electrical, roofing, landscaping, pest control, legal firms, financial advisors, and other service-area businesses. The marketing systems I build work across industries because the core problem is the same: turning local searches into booked jobs with clear attribution.",
  },
  {
    q: "How do you handle seasonality in marketing?",
    a: "I build campaigns that shift budget and messaging by season. In peak months, we maximize lead volume on your highest-margin services. In off-season, we shift to maintenance agreements, secondary services, and brand-building content that keeps the pipeline warm year-round.",
  },
  {
    q: "What's a realistic budget for Google Ads?",
    a: "For most service-area businesses, $1,500-$4,000/month in ad spend is a productive starting range. High-value services like HVAC installation or roofing can justify more. I'll model expected lead volume and cost-per-lead before you spend anything, so the budget is based on math — not guessing.",
  },
  {
    q: "Do you also handle Google Local Service Ads (LSAs)?",
    a: "Yes. LSAs are a key channel for home services because they generate call-only leads with a Google Guaranteed badge. I set up, optimize, and manage LSA campaigns alongside traditional search ads so you're capturing demand at every level of the results page.",
  },
];

export default function LocalServicesIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "Local Services", path: "/industries/local-services" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Local Service Businesses"
            title="Turn local searches into booked jobs — not wasted clicks"
            subtitle="SEO, Google Ads, and lead conversion systems built for home services, legal, financial, and service-area businesses. Every dollar tracked from first click to completed job."
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
            How I help service businesses grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four systems that cover the full pipeline — from showing up in local search to tracking revenue by channel. Built for businesses where a single job can be worth thousands.
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
                  <div className="flex flex-wrap gap-2 mt-4">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
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

      {/* What you get */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            What working together looks like
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Full lead-to-job funnel audit",
                "Local SEO strategy with map pack targeting",
                "Google Ads and LSA campaign management",
                "Speed-to-lead automation and CRM setup",
                "Review generation and reputation management",
                "Monthly dashboards tied to booked jobs and revenue",
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
