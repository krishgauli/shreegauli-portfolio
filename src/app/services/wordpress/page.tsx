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
  title: "WordPress Development | Custom Themes, SEO & Performance",
  description:
    "Professional WordPress websites with custom themes, performance optimization, mobile-responsive design, and SEO built in. Healthcare, business, and service industry sites delivered fast.",
  path: "/services/wordpress",
  keywords: [
    "WordPress developer",
    "custom WordPress theme",
    "WordPress website development",
    "WordPress SEO",
    "WordPress healthcare website",
    "WordPress developer Dallas",
  ],
});

const process = [
  {
    step: "01",
    title: "Requirements & Planning",
    description:
      "Understand your business goals, content needs, and design preferences. Define the site map, page structure, and feature requirements.",
  },
  {
    step: "02",
    title: "Custom Theme Design",
    description:
      "Design a custom WordPress theme tailored to your brand — clean, professional, and mobile-first. No bloated page builders.",
  },
  {
    step: "03",
    title: "Development & Integration",
    description:
      "Build the theme with clean PHP, optimized queries, and proper WordPress conventions. Integrate booking systems, forms, and third-party tools as needed.",
  },
  {
    step: "04",
    title: "SEO & Performance",
    description:
      "On-page SEO optimization, schema markup, image compression, caching, and Core Web Vitals tuning for fast load times.",
  },
  {
    step: "05",
    title: "Content & Training",
    description:
      "Populate the site with your content, then train your team on the WordPress admin so you can manage updates independently.",
  },
  {
    step: "06",
    title: "Launch & Support",
    description:
      "Go live with SSL, security hardening, backup systems, and monitoring. Post-launch support for fixes and updates.",
  },
];

const deliverables = [
  "Custom WordPress theme (no page builder bloat)",
  "Mobile-responsive design across all devices",
  "On-page SEO optimization for every page",
  "Schema markup & Google Business Profile integration",
  "Contact forms, booking, or lead capture integration",
  "Performance optimization (caching, image compression)",
  "Security hardening & SSL configuration",
  "CMS training for your team",
];

const projects = [
  { name: "EROF White Rock", url: "https://erofwhiterock.com/", desc: "Healthcare clinic — custom WordPress build" },
  { name: "EROF Lufkin", url: "http://eroflufkin.com/", desc: "Healthcare clinic — branded WordPress site" },
  { name: "EROF Irving", url: "https://erofirving.com/", desc: "Healthcare clinic — local SEO optimized" },
  { name: "Irving Wellness Clinic", url: "https://irvingwellnessclinic.com/", desc: "Wellness clinic — booking system integrated" },
];

const faqs = [
  {
    q: "Why WordPress instead of a custom-coded site?",
    a: "WordPress is ideal for content-driven businesses that need to update their own site regularly. It's the most widely used CMS in the world, easy to manage, and has a massive ecosystem of plugins. For businesses that need a blog, service pages, and basic lead capture — WordPress is cost-effective and proven.",
  },
  {
    q: "Do you use page builders like Elementor or Divi?",
    a: "No. I build custom themes with clean PHP code. Page builders add bloat, slow down your site, and create maintenance headaches. My WordPress builds are lightweight, fast, and easy to maintain.",
  },
  {
    q: "How long does a WordPress site take to build?",
    a: "Most WordPress sites ship in 1–2 weeks. Complex sites with custom functionality may take 2–3 weeks. I'll provide a clear timeline during our initial call.",
  },
  {
    q: "Can you help with an existing WordPress site?",
    a: "Yes. I can optimize, redesign, or fix existing WordPress sites. Common requests include speed optimization, SEO improvements, security fixes, and design refreshes.",
  },
];

export default function WordPressServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "WordPress", path: "/services/wordpress" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "WordPress Development",
            description: "Professional WordPress websites with custom themes, performance optimization, and SEO built in.",
            path: "/services/wordpress",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="WordPress Development"
            title="Professional WordPress sites — fast, clean, and built to rank"
            subtitle="Custom themes, mobile-responsive design, and SEO optimization. No page builders, no bloat. Just clean WordPress that works for your business."
          />
        </div>
      </section>

      {/* Projects Built */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">WordPress sites I&apos;ve built</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
                <ModuleShell className="p-5 h-full" enableHoverLift>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{p.name}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{p.desc}</p>
                  <p className="text-xs text-[#22D3EE] mt-2">{p.url.replace(/https?:\/\//, '').replace(/\/$/, '')} →</p>
                </ModuleShell>
              </a>
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
              { title: "Web App Development", description: "Custom Next.js websites and full-stack applications.", href: "/services/web-development" },
              { title: "Shopify Development", description: "E-commerce stores with custom themes and SEO.", href: "/services/shopify" },
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
