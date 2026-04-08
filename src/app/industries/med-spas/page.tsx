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
  title: "Med Spa Marketing | SEO, Google Ads & Patient Acquisition",
  description:
    "Marketing consultant for med spas and aesthetic practices — SEO, Google Ads, lead follow-up automation, and patient acquisition systems. Fill your treatment calendar with qualified patients.",
  path: "/industries/med-spas",
  keywords: [
    "med spa marketing",
    "medspa SEO",
    "med spa Google Ads",
    "aesthetic practice marketing",
    "med spa lead generation",
  ],
});

const challenges = [
  {
    title: "High-value procedures compete on price",
    description:
      "Botox, fillers, and body contouring are commoditized online. Groupon deals and discount clinics drive a race to the bottom. You need positioning that attracts patients willing to pay for quality — not bargain hunters who ghost after one session.",
  },
  {
    title: "Seasonal demand swings",
    description:
      "Bookings surge before summer and holidays, then crater in Q1. Without a proactive marketing strategy that accounts for seasonality, you're either overbooked or scrambling — and your cash flow suffers either way.",
  },
  {
    title: "Patient retention and treatment upsells",
    description:
      "Acquiring a new patient costs 5–10x more than retaining one. Most med spas have no automated re-engagement system — no follow-up sequences, no birthday offers, no post-treatment upsell workflows to drive repeat visits.",
  },
  {
    title: "Leads come in but don't convert",
    description:
      "Your ads generate inquiries, but response time is slow, follow-up is inconsistent, and 60% of leads never book a consultation. The problem isn't lead volume — it's the gap between inquiry and appointment.",
  },
];

const services = [
  {
    title: "SEO for Med Spas",
    description:
      "Rank for high-intent searches like 'Botox near me,' 'lip filler [city],' and 'med spa consultations.' Technical SEO, local search optimization, and treatment-specific content that builds E-E-A-T authority.",
    href: "/services/seo",
    tags: ["Local SEO", "Treatment Pages", "E-E-A-T"],
  },
  {
    title: "Google Ads for Aesthetics",
    description:
      "Campaign architecture built around treatment lines — not generic med spa queries. Proper conversion tracking, call tracking, and landing pages optimized for consultation bookings.",
    href: "/services/paid-media",
    tags: ["Google Ads", "Call Tracking", "Landing Pages"],
  },
  {
    title: "Lead Conversion Systems",
    description:
      "Speed-to-lead automation that responds within 60 seconds. AI-powered follow-up, CRM workflows, and appointment booking systems that turn inquiries into consultations before competitors even call back.",
    href: "/services/lead-conversion",
    tags: ["AI Follow-Up", "CRM", "Booking Automation"],
  },
  {
    title: "Patient Retention Automation",
    description:
      "Post-treatment follow-up sequences, review requests, re-booking reminders, and loyalty workflows. Turn one-time Botox patients into recurring revenue across your full treatment menu.",
    href: "/services/lead-conversion",
    tags: ["Email Sequences", "SMS", "Loyalty"],
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
    title: "AI call agent books 10–12 new clients/month",
    result: "10–12 new leads/month via AI",
    description:
      "Built an AI call centre agent that follows up within 60 seconds, qualifies leads, and books consultations automatically.",
    href: "/work/ai-call-centre",
  },
  {
    title: "New practice: 0 to 9.41K impressions in 60 days",
    result: "9.41K impressions, 252 organic clicks",
    description:
      "One-day website build with SEO from day one. Ranked for local treatment terms within weeks of launch.",
    href: "/work/seo-website-launch",
  },
];

const faqs = [
  {
    q: "Do you specialize in med spa marketing specifically?",
    a: "I work extensively with med spas, aesthetic practices, and wellness clinics. The patient acquisition funnel for aesthetics has unique dynamics — high-consideration purchases, seasonal demand, and treatment-specific search behavior — that require a different approach than general healthcare marketing.",
  },
  {
    q: "How do you help med spas compete against discount clinics?",
    a: "By positioning on expertise and outcomes instead of price. I build content that showcases your credentials, before/after results, and patient experience. SEO targets patients searching for quality providers — not coupon hunters. Your ads pre-qualify on value, not cost.",
  },
  {
    q: "What kind of ROI can I expect from med spa marketing?",
    a: "A single Botox patient is worth $1,200–$2,400/year in recurring revenue — more if they cross-buy fillers, facials, or body treatments. Most med spas I work with see 4–8x return on marketing spend within 90 days once tracking, follow-up, and retention systems are in place.",
  },
  {
    q: "Can you help with patient retention, not just acquisition?",
    a: "Absolutely — retention is where the real profit is. I build automated post-treatment sequences, re-booking reminders, birthday and loyalty offers, and review collection workflows. Most med spas are leaving 40–60% of their lifetime patient value on the table by not having these systems.",
  },
];

export default function MedSpasIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "Med Spas", path: "/industries/med-spas" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Med Spa Marketing"
            title="Marketing that fills your treatment calendar — not just your inbox"
            subtitle="I help med spas and aesthetic practices fix the gap between online inquiries and booked consultations. SEO, Google Ads, and follow-up automation designed for practices that are tired of paying for leads that never convert."
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

      {/* Services for med spas */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            How I help med spas grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four connected layers — from getting found online to maximizing
            patient lifetime value. Each one is built specifically for how
            aesthetic patients search, evaluate, and book treatments.
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
            Results from real aesthetic clients
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
                "Treatment-specific SEO and content strategy",
                "Google Ads campaigns optimized for consultations",
                "Speed-to-lead automation and AI follow-up",
                "Patient retention and re-booking workflows",
                "Monthly dashboards tied to bookings and revenue",
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
              { title: "SEO Services", href: "/services/seo" },
              { title: "Lead Conversion", href: "/services/lead-conversion" },
              { title: "Healthcare Marketing", href: "/industries/healthcare" },
              { title: "Dallas Marketing", href: "/dallas/marketing-consultant" },
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
