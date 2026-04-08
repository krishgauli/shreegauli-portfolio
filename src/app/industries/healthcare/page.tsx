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
  title: "Digital Marketing for Healthcare Practices | SEO, Ads & Automation",
  description:
    "Marketing consultant specializing in healthcare practices — SEO, Google Ads, lead follow-up automation, and patient acquisition systems. Real results from real clinics.",
  path: "/industries/healthcare",
  keywords: [
    "healthcare marketing consultant",
    "medical practice marketing",
    "healthcare SEO",
    "dental marketing",
    "patient acquisition",
    "healthcare lead generation",
    "clinic marketing Dallas",
  ],
});

const challenges = [
  {
    title: "Leads come in but never convert",
    description:
      "You're spending on ads and getting form fills, but your conversion rate is dismal. The problem isn't the ads — it's follow-up speed, call handling, and process gaps that let qualified patients slip away.",
  },
  {
    title: "You can't tell what's actually working",
    description:
      "Between Google Ads, SEO, referrals, and directory listings, you have no idea which channel is driving actual appointments. Attribution is broken, and reporting is manual guesswork.",
  },
  {
    title: "Agencies promise results but deliver reports",
    description:
      "You've worked with agencies that send monthly PDFs full of impressions and click-through rates. But none of it ties back to patient bookings or revenue growth.",
  },
  {
    title: "Your online presence doesn't reflect your practice",
    description:
      "Your website was built years ago, your Google Business profile is half-done, and competitors are outranking you for the exact services you specialize in.",
  },
];

const services = [
  {
    title: "SEO for Healthcare",
    description:
      "Technical audits, keyword strategy targeting high-intent patient searches, and content that builds E-E-A-T authority in healthcare.",
    href: "/services/seo",
    tags: ["Technical SEO", "Local SEO", "Content"],
  },
  {
    title: "Google Ads for Clinics",
    description:
      "Campaign architecture built for patient acquisition, not vanity ROAS. Proper conversion tracking, call tracking, and budget allocation by service line.",
    href: "/services/paid-media",
    tags: ["Google Ads", "Call Tracking", "Attribution"],
  },
  {
    title: "Lead Conversion Systems",
    description:
      "Follow-up automation, CRM workflows, and AI call agents that ensure every lead gets a response within minutes — not hours.",
    href: "/services/lead-conversion",
    tags: ["CRM", "AI Follow-Up", "Process"],
  },
  {
    title: "Reporting & Dashboards",
    description:
      "Dashboards that connect ad spend to booked appointments and revenue. Know exactly which campaigns produce paying patients.",
    href: "/services/automation",
    tags: ["GA4", "Looker Studio", "ROI Tracking"],
  },
];

const caseStudies = [
  {
    title: "100x conversion lift for a multi-location clinic",
    result: "0.1% → 10% conversion rate",
    description:
      "Follow-up took 48 hours. After a full-funnel audit and process rebuild, conversion jumped to 10% with zero ad spend increase.",
    href: "/work/lead-conversion-fix",
  },
  {
    title: "New clinic: 0 to 9.41K impressions in 60 days",
    result: "9.41K impressions, 252 organic clicks",
    description:
      "One-day website build with SEO from day one. Ranked for local healthcare terms within weeks of launch.",
    href: "/work/seo-website-launch",
  },
  {
    title: "AI call agent books 10–12 new clients/month",
    result: "10–12 new leads/month via AI",
    description:
      "Built an AI call centre agent that follows up within 60 seconds, qualifies leads, and books appointments automatically.",
    href: "/work/ai-call-centre",
  },
];

const faqs = [
  {
    q: "Do you specialize in any specific healthcare verticals?",
    a: "I work with medical clinics, dental practices, med spas, physical therapy offices, and multi-location healthcare groups. The systems I build work across specialties because the core challenge is the same: turn patients searching online into booked appointments.",
  },
  {
    q: "How do you handle HIPAA compliance in marketing?",
    a: "All lead data is handled through HIPAA-aware workflows. I do not store PHI (Protected Health Information) in marketing tools. CRM and automation systems are configured to capture only marketing-relevant data (name, contact info, service interest) — never clinical information.",
  },
  {
    q: "I already have a marketing agency. Why would I switch?",
    a: "Most healthcare marketing agencies optimize for impressions and clicks. I optimize for booked appointments and revenue. If your current agency can't tell you the cost-per-acquisition by service line or your lead-to-patient conversion rate, the reporting isn't actionable.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "It starts with a diagnostic call to understand your patient acquisition funnel. From there, I identify the biggest bottleneck — usually follow-up speed, tracking gaps, or SEO — and fix it first. Most engagements are ongoing monthly retainers with a defined scope and measurable targets.",
  },
];

export default function HealthcareIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "Healthcare", path: "/industries/healthcare" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Healthcare Marketing"
            title="Marketing that fills your schedule — not just your dashboard"
            subtitle="I help healthcare practices fix the gap between online leads and booked patients. SEO, Google Ads, and follow-up systems designed for clinics that are tired of paying for leads that never convert."
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

      {/* Services for healthcare */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            How I help healthcare practices grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four connected layers — from getting found to measuring revenue.
            Each one is built specifically for how patients search, evaluate,
            and book healthcare services.
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

      {/* Case Studies */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Results from real healthcare clients
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full flex flex-col">
                  <p className="text-xs font-bold text-[#22D3EE] mb-2">
                    {cs.result}
                  </p>
                  <h3 className="text-base font-bold text-[#F8FAFC]">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2 flex-1">
                    {cs.description}
                  </p>
                  <Link
                    href={cs.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors mt-4 group"
                  >
                    Read case study
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
                "Full patient acquisition funnel audit",
                "SEO strategy targeting high-intent healthcare searches",
                "Google Ads campaigns optimized for booked appointments",
                "CRM and follow-up automation setup",
                "AI-powered lead response (where applicable)",
                "Monthly dashboards tied to patient bookings and revenue",
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
