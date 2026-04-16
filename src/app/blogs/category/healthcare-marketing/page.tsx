import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Healthcare Marketing Blog | SEO & Patient Growth",
  description:
    "Marketing articles for healthcare practices, clinics, and medical businesses — covering SEO, Google Ads, patient acquisition, and lead conversion.",
  path: "/blogs/category/healthcare-marketing",
  keywords: [
    "healthcare marketing blog",
    "medical practice marketing",
    "dental marketing tips",
    "clinic marketing strategy",
  ],
});

const featuredPosts = [
  {
    title: "Local SEO Priorities for Service Businesses That Need More Calls",
    slug: "local-seo-priorities-service-businesses",
    excerpt:
      "Clinics and healthcare practices depend on local visibility. This covers Google Business Profile, review strategy, and local landing pages.",
  },
  {
    title: "What Your Free SEO Audit Results Actually Mean",
    slug: "free-seo-audit-results-explained",
    excerpt:
      "Healthcare sites often have structural SEO gaps that suppress visibility. Learn how to interpret audit signals and prioritize fixes.",
  },
  {
    title: "Why CRM Automation Should Happen Before You Scale Ad Spend",
    slug: "crm-automation-before-scaling-ad-spend",
    excerpt:
      "Patient intake and follow-up automation prevents the lead leakage that plagues growing healthcare practices running Google Ads.",
  },
  {
    title: "15 Questions to Ask Before Hiring a Digital Marketing Agency",
    slug: "15-questions-hiring-marketing-agency",
    excerpt:
      "Healthcare businesses evaluating agencies need questions that reveal operational competence — not just polished sales decks.",
  },
];

const relatedServices = [
  { title: "SEO & Content Strategy", href: "/services/seo", description: "Technical audits and content systems for healthcare websites." },
  { title: "Lead Conversion", href: "/services/lead-conversion", description: "Turn patient inquiries into booked appointments." },
  { title: "Local SEO", href: "/services/local-seo", description: "Google Maps, local pack, and review management for clinics." },
];

const relatedIndustries = [
  { title: "Healthcare", href: "/industries/healthcare", description: "Marketing strategy for hospitals, clinics, and health systems." },
  { title: "Dental", href: "/industries/dental", description: "SEO, ads, and patient acquisition for dental practices." },
  { title: "Med Spas", href: "/industries/med-spas", description: "Growth marketing for medical spas and aesthetic clinics." },
];

export default function HealthcareMarketingCategoryPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blogs" },
          { name: "Healthcare Marketing", path: "/blogs/category/healthcare-marketing" },
        ])}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Healthcare Marketing"
            title="SEO, ads & patient acquisition for healthcare"
            subtitle="Actionable marketing guides for clinics, dental practices, med spas, and healthcare businesses — covering the SEO, paid media, and automation strategies that drive real patient volume."
          />
        </div>
      </section>

      {/* Featured Articles */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Featured Articles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {featuredPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.06}>
                <Link href={`/blogs/${post.slug}`}>
                  <ModuleShell className="p-6 h-full" enableHoverLift>
                    <h3 className="text-base font-bold text-[#F8FAFC]">{post.title}</h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{post.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#7C3AED] mt-4">
                      Read article <ArrowRight className="h-3 w-3" />
                    </span>
                  </ModuleShell>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative z-10 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Related Services</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedServices.map((svc) => (
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

      {/* Related Industries */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Industries We Serve</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedIndustries.map((ind) => (
              <Link key={ind.title} href={ind.href}>
                <ModuleShell className="p-5 h-full" enableHoverLift>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{ind.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{ind.description}</p>
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
