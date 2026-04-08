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
  title: "AEO & GEO Services | Get Cited by AI Search Engines",
  description:
    "Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) services. Get your brand cited in ChatGPT, Perplexity, Google AI Overviews, and other AI-powered search results.",
  path: "/services/aeo-geo",
  keywords: [
    "AEO services",
    "answer engine optimization",
    "GEO",
    "generative engine optimization",
    "AI search optimization",
    "ChatGPT citations",
  ],
});

const process = [
  {
    step: "01",
    title: "AI Visibility Audit",
    description:
      "Analyze how your brand currently appears (or doesn't) in ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot. Benchmark against competitors in AI-generated answers.",
  },
  {
    step: "02",
    title: "Structured Data & Entity Building",
    description:
      "Implement comprehensive schema markup, build your entity graph, and establish knowledge panel signals so AI models can confidently identify and cite your brand.",
  },
  {
    step: "03",
    title: "AI-Ready Content Formatting",
    description:
      "Restructure existing content and create new assets formatted for extraction — concise answers, clear definitions, data tables, and FAQ blocks that LLMs prefer to cite.",
  },
  {
    step: "04",
    title: "Authority Signal Amplification",
    description:
      "Build topical authority through strategic content clusters, expert authorship signals, and high-quality mentions on sources that AI models trust as training data.",
  },
  {
    step: "05",
    title: "Monitoring & Iteration",
    description:
      "Track your brand mentions across AI platforms weekly. Identify new citation opportunities, monitor competitor movements, and adjust content strategy based on what's being surfaced.",
  },
];

const deliverables = [
  "AI visibility audit across ChatGPT, Perplexity, Google AI Overviews",
  "Full schema markup implementation (Organization, FAQ, HowTo, Article)",
  "Entity graph strategy with knowledge panel optimization",
  "AI-optimized content rewrites for top 20 pages",
  "Monthly AI citation monitoring report",
  "Competitor AI visibility benchmarking dashboard",
];

const faqs = [
  {
    q: "What's the difference between AEO and GEO?",
    a: "AEO (Answer Engine Optimization) focuses on getting your content featured as direct answers in search — featured snippets, People Also Ask, and voice search results. GEO (Generative Engine Optimization) targets AI-generated responses from ChatGPT, Perplexity, and Google AI Overviews. Both require structured, authoritative content — but GEO places more emphasis on entity recognition and training-data-level authority signals.",
  },
  {
    q: "Can you guarantee my brand will be cited in ChatGPT?",
    a: "No one can guarantee specific AI citations — anyone who promises that is lying. What I can do is systematically improve every signal that AI models use to decide what to cite: structured data, content clarity, entity authority, and topical depth. Clients typically see measurable improvements in AI visibility within 60-90 days.",
  },
  {
    q: "Does AEO/GEO replace traditional SEO?",
    a: "No — it builds on top of it. Strong traditional SEO is the foundation. AI models pull from indexed web content, so if your pages aren't well-optimized for search engines, they won't be cited by AI either. I integrate AEO/GEO into your existing SEO strategy rather than treating it as a separate channel.",
  },
  {
    q: "How do you track AI citations?",
    a: "I use a combination of manual monitoring, API-based queries to AI platforms, and third-party tools that track brand mentions in AI-generated responses. You get a monthly report showing where your brand appeared, what queries triggered citations, and how that compares to competitors.",
  },
];

export default function AeoGeoServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "AEO/GEO", path: "/services/aeo-geo" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="AEO & GEO"
            title="Get cited when AI answers your customer's question"
            subtitle="ChatGPT, Perplexity, and Google AI Overviews are changing how people find businesses. Answer Engine Optimization and Generative Engine Optimization ensure your brand is the one being cited — not your competitor."
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

      {/* Why it matters */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">
            Why AEO/GEO matters now
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            AI-powered search is already cannibalizing traditional clicks. Brands that optimize for AI citations today will own the next decade of search traffic.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Traditional SEO alone isn't enough",
                description:
                  "Google AI Overviews are reducing click-through rates on traditional results. If your content isn't structured for AI extraction, you lose visibility even when you rank #1.",
                href: "/services/seo",
                label: "SEO services",
              },
              {
                title: "Local businesses need AI presence",
                description:
                  "When someone asks ChatGPT 'best dentist near me,' the answer comes from entity data and authoritative mentions. Local SEO and AEO work together to capture these queries.",
                href: "/services/local-seo",
                label: "Local SEO",
              },
              {
                title: "First-mover advantage is real",
                description:
                  "Most businesses haven't started optimizing for AI search. The ones that move now will establish authority signals that are expensive for competitors to replicate later.",
                href: "/dallas/marketing-consultant",
                label: "Work with me",
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
