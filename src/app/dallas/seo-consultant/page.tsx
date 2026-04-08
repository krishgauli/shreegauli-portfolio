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
  title: "SEO Consultant in Dallas, TX | Local & National SEO Services",
  description:
    "Dallas-based SEO consultant helping healthcare practices, local businesses, and SaaS companies rank higher, get more traffic, and convert visitors into customers.",
  path: "/dallas/seo-consultant",
  keywords: [
    "SEO consultant Dallas",
    "Dallas SEO expert",
    "SEO services Dallas TX",
    "local SEO Dallas",
    "SEO specialist Dallas",
  ],
});

const whyLocal = [
  {
    title: "Dallas market expertise",
    description:
      "I understand the competitive dynamics in DFW — which industries are saturated, where the ranking gaps are, and how local search behavior differs across neighborhoods and suburbs.",
  },
  {
    title: "In-person strategy sessions",
    description:
      "SEO isn't just a deliverable — it's a conversation about your business goals. Being local means we can meet face-to-face to align on strategy, review results, and adjust priorities.",
  },
  {
    title: "Google Business Profile mastery",
    description:
      "Local SEO in Dallas requires GBP optimization that goes beyond filling in fields. I manage categories, attributes, posts, Q&A, and review strategy for competitive local pack rankings.",
  },
  {
    title: "Proven results with Dallas businesses",
    description:
      "I've helped clinics, service businesses, and local companies across DFW improve their organic visibility, rank for high-intent local keywords, and turn search traffic into revenue.",
  },
];

const serviceAreas = [
  {
    title: "Technical SEO",
    description:
      "Site architecture, Core Web Vitals, crawl efficiency, and indexation fixes. The foundation that determines whether Google can find, crawl, and rank your pages properly.",
    href: "/services/seo",
  },
  {
    title: "Local SEO",
    description:
      "Google Business Profile optimization, local citation management, review strategy, and geo-targeted content. Rank in the local pack for the services you actually provide in Dallas.",
    href: "/services/local-seo",
  },
  {
    title: "Content Strategy",
    description:
      "Keyword research, topic clustering, and content production systems that target high-intent searches. Every piece is built to rank, convert, and support your overall domain authority.",
    href: "/services/seo",
  },
  {
    title: "AEO & GEO",
    description:
      "Answer Engine Optimization and Generative Engine Optimization. As AI tools increasingly answer search queries, your content needs to be structured for citation and inclusion in AI responses.",
    href: "/services/aeo-geo",
  },
];

const faqs = [
  {
    q: "How long does SEO take to produce results in Dallas?",
    a: "For local SEO targeting Dallas-specific keywords, you can see ranking improvements within 4–8 weeks if the technical foundation is solid. Competitive national keywords take 3–6 months. I always pair SEO with quick-win optimizations (GBP, technical fixes, existing content updates) so you see movement early while the longer-term strategy compounds.",
  },
  {
    q: "How much does SEO consulting cost in Dallas?",
    a: "Most ongoing SEO engagements start at $1,499/month and include technical audits, content strategy, implementation oversight, and monthly reporting. One-time SEO audits are scoped individually based on site complexity. You get a defined scope and measurable outcomes — not hourly billing.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No — and anyone who does is either lying or planning to rank you for keywords nobody searches. What I guarantee is a transparent process, measurable progress, and reporting tied to business outcomes (traffic, leads, revenue) rather than vanity position tracking.",
  },
  {
    q: "Can you help with SEO for a new website?",
    a: "Yes — and this is actually the best time to invest in SEO. Building SEO into a new site from day one (site architecture, URL structure, schema, content strategy) is dramatically more efficient than retrofitting a site that was built without search in mind. I've launched sites that ranked for local terms within weeks.",
  },
];

export default function DallasSEOConsultantPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Dallas", path: "/dallas" },
            { name: "SEO Consultant", path: "/dallas/seo-consultant" },
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
            title="A Dallas SEO consultant who measures results in revenue"
            subtitle="I help healthcare practices, local service businesses, and SaaS companies in Dallas rank higher, get more qualified traffic, and convert that traffic into customers. SEO strategy and execution from a consultant who lives here."
          />
        </div>
      </section>

      {/* Why local */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Why choose a Dallas-based SEO consultant
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
            SEO services for Dallas businesses
          </h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Four pillars of SEO — from technical infrastructure to future-proofing
            your visibility in AI search. Each one is tailored to the Dallas
            market and your specific industry.
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

      {/* Industries served */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Industries I specialize in
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {[
                { text: "Healthcare practices & clinics", href: "/industries/healthcare" },
                { text: "Dental offices", href: "/industries/healthcare" },
                { text: "Local service businesses", href: "/dallas/marketing-consultant" },
                { text: "SaaS & technology companies", href: "/industries/saas" },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-sm text-[#94A3B8]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#22D3EE] mt-0.5 shrink-0" />
                  <Link
                    href={item.href}
                    className="hover:text-[#F8FAFC] transition-colors"
                  >
                    {item.text}
                  </Link>
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
              { title: "Local SEO", href: "/services/local-seo" },
              { title: "AEO & GEO", href: "/services/aeo-geo" },
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
