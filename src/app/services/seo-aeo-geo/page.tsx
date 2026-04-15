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
  title: "SEO, AEO & GEO Services | Rank on Google and AI Search Engines",
  description:
    "Technical SEO audits, AI search optimization (AEO), and geo-targeted search strategies (GEO). Get found on Google, ChatGPT, Perplexity, and every search engine that matters.",
  path: "/services/seo-aeo-geo",
  keywords: [
    "SEO consultant",
    "AEO optimization",
    "GEO search optimization",
    "technical SEO audit",
    "AI search optimization",
    "local SEO services",
    "structured data schema markup",
    "SEO consultant Dallas",
  ],
});

const process = [
  {
    step: "01",
    title: "Technical SEO Audit",
    description:
      "Crawl-based audit covering Core Web Vitals, indexability, schema markup, canonical tags, site architecture, and crawl-budget issues.",
  },
  {
    step: "02",
    title: "Keyword Research & Mapping",
    description:
      "Identify high-intent keywords and map them to pages. Group by topic clusters for maximum topical authority and internal linking.",
  },
  {
    step: "03",
    title: "On-Page SEO",
    description:
      "Title tags, meta descriptions, heading structure, internal linking, image optimization, and content gap analysis — page by page.",
  },
  {
    step: "04",
    title: "AEO (Answer Engine Optimization)",
    description:
      "Structured data, entity optimization, FAQ schema, and content formatting designed to get cited by ChatGPT, Perplexity, Gemini, and other AI engines.",
  },
  {
    step: "05",
    title: "GEO (Geo-Targeted SEO)",
    description:
      "Google Business Profile optimization, local citations, NAP consistency, geo-targeted content, and local pack strategy for area-specific visibility.",
  },
  {
    step: "06",
    title: "Monthly Reporting & Iteration",
    description:
      "Clear monthly reports showing keyword movement, organic traffic, AI citation tracking, and next-step action items.",
  },
];

const deliverables = [
  "Full technical SEO audit report with prioritized fixes",
  "Keyword strategy with topic cluster mapping",
  "On-page optimization across all key pages",
  "Structured data (JSON-LD) implementation",
  "AEO optimization for AI search citation",
  "Google Business Profile setup & optimization",
  "Local citation building & NAP consistency",
  "Monthly performance reports with action items",
  "Content briefs for SEO-driven blog posts",
  "Google Search Console & GA4 configuration",
];

const faqs = [
  {
    q: "What is AEO (Answer Engine Optimization)?",
    a: "AEO is the practice of optimizing your website to be cited by AI search engines — ChatGPT, Perplexity, Gemini, and others. This involves structured data, entity-based content, FAQ schemas, and formatting that AI models can parse and reference when generating answers.",
  },
  {
    q: "What is GEO (Geo-Targeted SEO)?",
    a: "GEO focuses on local search visibility — ranking in Google Maps, the local pack, and location-specific searches. This includes Google Business Profile optimization, local citations, NAP consistency, and geo-targeted content for your service areas.",
  },
  {
    q: "How long until I see SEO results?",
    a: "Technical fixes often show impact in 2–4 weeks. Keyword ranking improvements typically appear in 2–3 months. Significant organic growth compounds over 6–12 months. AEO results (AI citations) can appear faster as AI engines update their sources frequently.",
  },
  {
    q: "Do I need SEO if I already have a website?",
    a: "A website without SEO is like a store with no address. Most sites have significant SEO issues that limit their search visibility. Even well-designed sites often lack technical SEO, structured data, and content strategy needed to rank.",
  },
  {
    q: "How is this different from an SEO agency?",
    a: "You work directly with me — no account managers, no junior handoffs. I handle the audit, strategy, and implementation myself. That means faster iteration, better communication, and no wasted retainer spend.",
  },
];

export default function SeoAeoGeoServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "SEO / AEO / GEO", path: "/services/seo-aeo-geo" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "SEO, AEO & GEO Services",
            description: "Technical SEO, AI search optimization (AEO), and geo-targeted search strategies (GEO) to rank on Google and get cited by AI search engines.",
            path: "/services/seo-aeo-geo",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="SEO / AEO / GEO"
            title="Rank on Google. Get cited by AI. Dominate local search."
            as="h1"
            subtitle="Technical SEO, AI answer engine optimization, and geo-targeted search strategies — built to get your business found on every search platform that matters, from Google to ChatGPT."
          />
        </div>
      </section>

      {/* Three Pillars */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Three pillars of modern search</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "SEO", sub: "Search Engine Optimization", desc: "Technical audits, keyword strategy, content systems, and link building to rank on Google for the terms your buyers search." },
              { title: "AEO", sub: "Answer Engine Optimization", desc: "Structured data, entity optimization, and AI-ready content formatting to get cited by ChatGPT, Perplexity, and Gemini." },
              { title: "GEO", sub: "Geo-Targeted SEO", desc: "Google Business Profile, local citations, and geo-targeted pages to dominate local search and the map pack." },
            ].map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.08}>
                <ModuleShell className="p-6 h-full">
                  <span className="text-xs font-bold text-[#22D3EE]">{pillar.sub}</span>
                  <h3 className="text-lg font-bold text-[#F8FAFC] mt-1">{pillar.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{pillar.desc}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
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
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.description}</p>
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

      {/* Related Services */}
      <section className="relative z-10 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Related services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Web App Development", description: "Custom Next.js sites built with SEO from day one.", href: "/services/web-development" },
              { title: "WordPress Development", description: "WordPress sites optimized for search performance.", href: "/services/wordpress" },
              { title: "Shopify Development", description: "E-commerce SEO for Shopify stores.", href: "/services/shopify" },
              { title: "Marketing Automation", description: "n8n workflows and AI-powered follow-up systems.", href: "/services/automation" },
            ].map((svc) => (
              <Link key={svc.title} href={svc.href}>
                <ModuleShell className="p-5 h-full" enableHoverLift>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{svc.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{svc.description}</p>
                </ModuleShell>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
