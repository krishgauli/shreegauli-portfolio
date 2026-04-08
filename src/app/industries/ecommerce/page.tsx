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
  title:
    "E-Commerce Marketing Consultant | SEO, Google Ads & Conversion",
  description:
    "Marketing consultant for e-commerce brands — SEO, Google Shopping, Meta Ads, and conversion rate optimization. Focus on profitable growth, not vanity ROAS.",
  path: "/industries/ecommerce",
  keywords: [
    "ecommerce marketing consultant",
    "ecommerce SEO",
    "Google Shopping management",
    "ecommerce conversion optimization",
    "online store marketing",
  ],
});

const challenges = [
  {
    title: "Rising CPAs across every channel",
    description:
      "Meta CPMs are up 30%+ year-over-year. Google Shopping is more competitive than ever. Without an organic acquisition layer, you're in a bidding war with no leverage.",
  },
  {
    title: "Attribution is broken post-iOS14",
    description:
      "Your ad platform says one thing, GA4 says another, and Shopify shows a different number entirely. You're making spend decisions on conflicting data and hoping for the best.",
  },
  {
    title: "Content that ranks but doesn't convert",
    description:
      "Your blog gets traffic but none of it turns into purchases. There's no bridge between informational content and product pages — visitors read and leave.",
  },
  {
    title: "Scaling without margin erosion",
    description:
      "You can grow revenue by throwing more money at ads, but profit margins shrink with every dollar. Sustainable growth requires channels that compound, not just channels that spend.",
  },
];

const services = [
  {
    title: "E-Commerce SEO",
    description:
      "Technical SEO for product and category pages, schema markup for rich results, and content strategy targeting buyer-intent keywords that drive purchases — not just page views.",
    href: "/services/seo",
  },
  {
    title: "Google Shopping & Paid Search",
    description:
      "Feed optimization, campaign segmentation by margin tier, and conversion tracking that ties ad spend to actual profit. Built for POAS (profit on ad spend), not vanity ROAS.",
    href: "/services/lead-conversion",
  },
  {
    title: "Conversion Rate Optimization",
    description:
      "PDP optimization, checkout flow analysis, and A/B testing grounded in data. Increase revenue per session before increasing traffic — the most efficient growth lever you have.",
    href: "/services/lead-conversion",
  },
  {
    title: "AEO/GEO for Product Discovery",
    description:
      "Optimize product content for AI answer engines and generative search. As more shoppers discover products through AI-powered recommendations, your catalog needs to be in the training data.",
    href: "/services/aeo-geo",
  },
];

const faqs = [
  {
    q: "What e-commerce platforms do you work with?",
    a: "Shopify and WooCommerce primarily, but the strategies apply to any platform. SEO, feed optimization, and conversion principles are platform-agnostic. The implementation layer differs, but the strategic framework is the same.",
  },
  {
    q: "How do you handle attribution with iOS privacy changes?",
    a: "Server-side conversion tracking via the Conversions API (Meta) and enhanced conversions (Google), combined with UTM discipline and a first-party data strategy. I also implement post-purchase attribution surveys as a triangulation layer. No single source of truth — but three sources that agree directionally.",
  },
  {
    q: "What kind of ROAS should I expect?",
    a: "It depends entirely on your margins, AOV, and LTV. A 3x ROAS means nothing if your margins are 20% — you're breaking even. I focus on contribution margin and POAS (profit on ad spend) instead. The target is profitable growth, not impressive-looking ROAS numbers in a dashboard.",
  },
  {
    q: "Do you manage Meta Ads and Google Ads?",
    a: "Yes, both — plus Google Shopping / Performance Max campaigns. I manage campaign strategy, creative direction, audience structure, and reporting. For creative production (video, photography), I work with your existing team or recommend vetted partners.",
  },
];

export default function EcommerceIndustryPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: "E-Commerce", path: "/industries/ecommerce" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="E-Commerce Marketing"
            title="Profitable growth — not vanity ROAS"
            subtitle="I help e-commerce brands build marketing systems that drive profit, not just revenue. SEO for organic acquisition, paid media with real attribution, and conversion optimization that increases revenue per session."
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
            How I help e-commerce brands grow
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four connected layers — from getting found to maximizing revenue
            per visitor. Each one is built for how online shoppers search,
            compare, and buy.
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

      {/* Key focus areas */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            What I optimize for
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                "Profit on ad spend (POAS), not vanity ROAS",
                "Revenue per session across all channels",
                "Organic traffic share vs. paid dependency",
                "Customer acquisition cost by channel",
                "Lifetime value and repeat purchase rate",
                "Conversion rate by device and traffic source",
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
