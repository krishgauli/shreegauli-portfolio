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
  title: "Shopify Store Development | Custom Themes, Products & SEO",
  description:
    "Shopify e-commerce stores with custom themes, optimized product pages, conversion-focused checkout, and SEO built in. From setup to launch.",
  path: "/services/shopify",
  keywords: [
    "Shopify developer",
    "Shopify store development",
    "custom Shopify theme",
    "Shopify SEO",
    "e-commerce development",
    "Shopify expert",
  ],
});

const process = [
  {
    step: "01",
    title: "Store Planning",
    description:
      "Define your product catalog, collections, brand identity, and business goals. Map the store structure and customer journey.",
  },
  {
    step: "02",
    title: "Custom Theme Design",
    description:
      "Design a Shopify theme that matches your brand — eye-catching product pages, optimized collections, and a smooth checkout experience.",
  },
  {
    step: "03",
    title: "Product Setup",
    description:
      "Configure products, variants, inventory tracking, pricing, and collection pages. Professional product photography display and descriptions.",
  },
  {
    step: "04",
    title: "Checkout & Payments",
    description:
      "Optimize the checkout flow, configure payment gateways, shipping rates, tax settings, and abandoned cart recovery.",
  },
  {
    step: "05",
    title: "E-Commerce SEO",
    description:
      "Product schema markup, meta descriptions, alt text, collection page optimization, and site speed tuning for organic discovery.",
  },
  {
    step: "06",
    title: "Launch & Training",
    description:
      "Go live, test every flow, and train your team on Shopify admin. Post-launch support for adjustments and optimization.",
  },
];

const deliverables = [
  "Custom Shopify theme (not a default template)",
  "Mobile-optimized product & collection pages",
  "Product catalog setup with variants & inventory",
  "Optimized checkout flow & payment integration",
  "E-commerce SEO (product schema, meta tags, alt text)",
  "Abandoned cart recovery email setup",
  "Shopify admin training for your team",
  "Post-launch support & optimization period",
];

const faqs = [
  {
    q: "Why Shopify instead of WooCommerce or custom e-commerce?",
    a: "Shopify handles infrastructure (hosting, security, payments, PCI compliance) so you can focus on selling. For most product-based businesses, it's the fastest and most reliable way to sell online. I recommend custom Next.js builds for more complex e-commerce that needs custom logic beyond what Shopify offers.",
  },
  {
    q: "Do you use pre-built Shopify themes?",
    a: "No. I build custom themes tailored to your brand and products. Pre-built themes are generic and limit your ability to stand out. Custom themes are faster, cleaner, and designed for your specific products.",
  },
  {
    q: "How long does a Shopify store take to build?",
    a: "Most Shopify stores ship in 1–2 weeks, including product setup and design. Larger catalogs or custom functionality may take 2–3 weeks.",
  },
  {
    q: "Can you help optimize an existing Shopify store?",
    a: "Yes. Common requests include speed optimization, SEO improvements, custom theme edits, checkout optimization, and conversion rate improvements.",
  },
];

export default function ShopifyServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Shopify", path: "/services/shopify" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "Shopify Store Development",
            description: "Shopify e-commerce stores with custom themes, optimized product pages, and SEO built in.",
            path: "/services/shopify",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Shopify Development"
            title="E-commerce stores that sell — not just display"
            subtitle="Custom Shopify themes, optimized product pages, and conversion-focused checkout. Built to look great, load fast, and rank on Google."
          />
        </div>
      </section>

      {/* Featured Project */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Featured Shopify build</h2>
          <a href="https://oliviastanghulu.com/" target="_blank" rel="noopener noreferrer">
            <ModuleShell className="p-6" enableHoverLift>
              <h3 className="text-base font-semibold text-[#F8FAFC]">Olivia&apos;s Tanghulu</h3>
              <p className="text-sm text-[#94A3B8] mt-2">
                Custom Shopify store for a growing tanghulu brand — vibrant product showcase, mobile-optimized design, and e-commerce SEO that drives organic discovery.
              </p>
              <p className="text-xs text-[#22D3EE] mt-3">oliviastanghulu.com →</p>
            </ModuleShell>
          </a>
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
              { title: "Web App Development", description: "Custom Next.js websites and full-stack applications.", href: "/services/web-development" },
              { title: "WordPress Development", description: "Professional WordPress sites for content-driven businesses.", href: "/services/wordpress" },
              { title: "SEO / AEO / GEO", description: "Technical SEO and AI search optimization.", href: "/services/seo-aeo-geo" },
              { title: "Marketing Automation", description: "n8n workflows, CRM, and AI follow-up.", href: "/services/automation" },
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
