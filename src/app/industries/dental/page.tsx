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
  title: "Dental Practice Marketing | SEO, Google Ads & Patient Acquisition",
  description:
    "Marketing consultant for dental practices — SEO, Google Ads, lead follow-up automation, and patient acquisition systems that fill chairs. Proven results from real dental offices.",
  path: "/industries/dental",
  keywords: [
    "dental marketing consultant",
    "dental practice marketing",
    "dental SEO",
    "dental Google Ads",
    "patient acquisition dental",
    "dentist marketing",
  ],
});

const challenges = [
  {
    title: "Patient no-shows drain revenue",
    description:
      "You're booking appointments, but 15-20% don't show up. Without automated reminders, confirmation sequences, and a waitlist system, empty chairs cost you thousands every month.",
  },
  {
    title: "Insurance verification slows everything down",
    description:
      "Your front desk spends hours on the phone verifying insurance before appointments. Patients get frustrated with long waits, and your team can't focus on converting new leads.",
  },
  {
    title: "High-value cases go to competitors",
    description:
      "Patients searching for implants, Invisalign, or cosmetic dentistry choose the practice with better reviews, faster response times, and more professional online presence. You're losing $5K-$30K cases to visibility gaps.",
  },
  {
    title: "Multi-location management is chaotic",
    description:
      "Each location has different Google profiles, inconsistent branding, separate review management, and no unified reporting. You can't tell which office is performing or where to invest.",
  },
];

const services = [
  {
    title: "Dental SEO & Local Search",
    description:
      "Rank for high-value dental searches — implants, cosmetic dentistry, emergency dental. Technical SEO, Google Business Profile optimization, and geo-targeted content for every service area.",
    href: "/services/local-seo",
    tags: ["Local SEO", "GBP Optimization", "Dental Content"],
  },
  {
    title: "Google Ads for Dental Practices",
    description:
      "Campaign architecture built around dental service lines — separate campaigns for implants, general dentistry, cosmetic, and emergency. Call tracking tied to actual patient bookings.",
    href: "/services/paid-media",
    tags: ["Google Ads", "Call Tracking", "Service-Line ROI"],
  },
  {
    title: "Lead Follow-Up & Patient Conversion",
    description:
      "Automated follow-up within 60 seconds of form submission. SMS sequences, AI-assisted call handling, and CRM workflows that convert online leads into seated patients.",
    href: "/services/lead-conversion",
    tags: ["AI Follow-Up", "SMS Sequences", "CRM"],
  },
  {
    title: "Reputation & Review Management",
    description:
      "Systematic review generation after every appointment. Automated review requests, response templates for negative reviews, and monitoring across Google, Yelp, and Healthgrades.",
    href: "/services/automation",
    tags: ["Review Generation", "Reputation", "Monitoring"],
  },
];

const caseStudyStats = [
  { metric: "0.1% → 10%", label: "Conversion rate lift for a multi-location clinic" },
  { metric: "60 sec", label: "Average lead response time with AI follow-up" },
  { metric: "9.41K", label: "Impressions in 60 days for a new practice website" },
  { metric: "10-12/mo", label: "New patients booked via AI call agent" },
];

const faqs = [
  {
    q: "How is dental marketing different from general healthcare marketing?",
    a: "Dental has unique dynamics: high-value elective procedures (implants, cosmetics) with long decision cycles, insurance-driven general dentistry with low margins, and intense local competition. The marketing strategy needs separate funnels for each service type, with different messaging, landing pages, and follow-up sequences.",
  },
  {
    q: "What kind of budget do I need for dental Google Ads?",
    a: "For a single-location practice, $2,000-$5,000/month in ad spend is a realistic starting point. Implant and cosmetic campaigns need more budget because CPCs are higher, but the case value justifies it. I'll build a budget model based on your service mix and target case volume before spending a dollar.",
  },
  {
    q: "Can you help reduce patient no-shows?",
    a: "Yes. I implement multi-step appointment reminder sequences (SMS + email) with confirmation tracking. Practices I work with typically reduce no-show rates by 30-50%. I can also build waitlist automation that fills cancelled slots from a standby list automatically.",
  },
  {
    q: "Do you work with DSOs and multi-location groups?",
    a: "Yes. I manage marketing for multi-location dental groups with unified reporting, location-specific GBP optimization, and centralized lead routing. Each location gets its own performance dashboard so you can see cost-per-patient-acquisition by office and service line.",
  },
];

export default function DentalIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "Dental", path: "/industries/dental" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Dental Marketing"
            title="Fill chairs, not dashboards — marketing built for dental practices"
            subtitle="SEO, Google Ads, and lead conversion systems designed specifically for dental offices. From high-value implant cases to general dentistry, every campaign is tied to patients in seats."
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
            How I help dental practices grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four connected systems — from getting found online to converting leads into seated patients. Each one is built for how dental patients search, compare, and book.
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

      {/* Case Study Stats */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Results from real dental & healthcare clients
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {caseStudyStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.06}>
                <ModuleShell className="p-6 text-center">
                  <p className="text-2xl font-bold text-[#22D3EE]">{stat.metric}</p>
                  <p className="text-sm text-[#94A3B8] mt-2">{stat.label}</p>
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
                "Dental-specific SEO strategy by service line",
                "Google Ads campaigns optimized for case value",
                "Automated lead follow-up and appointment booking",
                "Review generation and reputation management",
                "Monthly dashboards tied to patients and revenue",
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
