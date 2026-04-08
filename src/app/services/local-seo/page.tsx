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
  title: "Local SEO Services | Get Found in Google Maps & Local Search",
  description:
    "Dominate local search results with technical SEO, Google Business Profile optimization, citation building, and review strategy. Built for healthcare, home services, and local businesses.",
  path: "/services/local-seo",
  keywords: [
    "local SEO services",
    "Google Business Profile optimization",
    "local search ranking",
    "local SEO consultant",
    "near me SEO",
  ],
});

const process = [
  {
    step: "01",
    title: "Local SEO Audit",
    description:
      "Full audit of your Google Business Profile, local citations, NAP consistency, on-page local signals, and competitor positioning in map pack results.",
  },
  {
    step: "02",
    title: "GBP Optimization & Citation Building",
    description:
      "Optimize every field in your Google Business Profile — categories, attributes, services, photos, Q&A. Build and clean citations across 50+ directories.",
  },
  {
    step: "03",
    title: "Review Strategy & Reputation",
    description:
      "Implement a review acquisition system that generates consistent 5-star reviews on Google and industry-specific platforms without violating guidelines.",
  },
  {
    step: "04",
    title: "Local Content & Ongoing Optimization",
    description:
      "Publish geo-targeted content, optimize local landing pages, and run monthly GBP posts. Track rankings across zip codes and adjust strategy based on data.",
  },
];

const deliverables = [
  "Complete local SEO audit with competitor benchmarks",
  "Google Business Profile optimization (all fields, categories, photos)",
  "Citation audit and cleanup across 50+ directories",
  "Review generation system with automated follow-up",
  "Geo-targeted landing pages for service areas",
  "Monthly local rank tracking report by zip code",
];

const faqs = [
  {
    q: "How long does it take to rank in the Google Map Pack?",
    a: "Most businesses see noticeable improvement in map pack visibility within 8-12 weeks. The timeline depends on your starting point, competition density, and review velocity. Businesses with an established GBP and some existing reviews move faster.",
  },
  {
    q: "Do I need a physical office to rank in local search?",
    a: "You need a legitimate business address to have a Google Business Profile. Service-area businesses (plumbers, HVAC, mobile services) can hide their address and still rank — but the GBP setup and optimization strategy is different. I handle both models.",
  },
  {
    q: "What's the difference between local SEO and regular SEO?",
    a: "Local SEO focuses on map pack rankings, Google Business Profile, citations, and geo-targeted content. Regular SEO targets organic blue-link results with broader keyword strategies. Most local businesses need both — I typically start with local SEO because it drives calls and bookings faster.",
  },
  {
    q: "Can you help with multiple locations?",
    a: "Yes. I build location-specific GBP profiles, individual landing pages per location, and separate citation profiles. Each location gets its own tracking so you can see which offices are performing and where to invest more.",
  },
];

export default function LocalSeoServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Local SEO", path: "/services/local-seo" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Local SEO"
            title="Show up when local customers search — not your competitors"
            subtitle="Google Business Profile optimization, citation building, review strategy, and geo-targeted content. Everything you need to dominate the map pack and local organic results in your service area."
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">How it works</h2>
          <div className="grid sm:grid-cols-2 gap-5">
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

      {/* Why Local SEO Matters */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            What local SEO actually solves
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Your next customer is searching right now. These are the gaps between their search and your phone ringing.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Invisible in map results",
                description:
                  "Your GBP is incomplete, your categories are wrong, and competitors with fewer reviews are outranking you. A fully optimized profile with the right signals changes that.",
                href: "/services/seo",
                label: "SEO services",
              },
              {
                title: "Inconsistent business listings",
                description:
                  "Your name, address, and phone number are different across directories. Google doesn't trust inconsistent data. Citation cleanup fixes the foundation.",
                href: "/industries/healthcare",
                label: "Healthcare marketing",
              },
              {
                title: "No review strategy",
                description:
                  "You have 12 reviews and your competitor has 200. Review velocity is a direct ranking factor. A systematic approach generates reviews without being pushy.",
                href: "/services/lead-conversion",
                label: "Lead conversion",
              },
              {
                title: "No local content",
                description:
                  "You're trying to rank in 15 cities but have one generic homepage. Geo-targeted pages with real local content are how you win searchers across your service area.",
                href: "/dallas/marketing-consultant",
                label: "Dallas marketing",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full flex flex-col">
                  <h3 className="text-base font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2 flex-1">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors mt-4 group"
                  >
                    {item.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
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
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Frequently asked questions
          </h2>
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
