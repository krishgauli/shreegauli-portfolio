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
  title: "SEO Strategy Guide | Technical & Local SEO Tips",
  description:
    "In-depth articles on technical SEO, local SEO, content strategy, and search optimization for healthcare practices and service businesses.",
  path: "/blogs/category/seo",
  keywords: [
    "SEO strategy",
    "technical SEO guide",
    "local SEO tips",
    "SEO for small business",
  ],
});

const featuredPosts = [
  {
    title: "Technical SEO Audit Checklist for Service Business Websites",
    slug: "technical-seo-audit-checklist-service-businesses",
    excerpt:
      "A technical audit should tell you what is blocking rankings, not dump a random spreadsheet of warnings.",
  },
  {
    title: "What Your Free SEO Audit Results Actually Mean",
    slug: "free-seo-audit-results-explained",
    excerpt:
      "A low score does not mean the site is hopeless. Here is how to interpret failures, warnings, and quick wins.",
  },
  {
    title: "Local SEO Priorities for Service Businesses That Need More Calls",
    slug: "local-seo-priorities-service-businesses",
    excerpt:
      "Local SEO is not just about map rankings. It is about making the right signals work together when people are ready to act.",
  },
  {
    title: "SEO vs Google Ads: What to Fix First When Growth Stalls",
    slug: "seo-vs-google-ads-what-to-fix-first",
    excerpt:
      "Start with the constraint that is costing you the most momentum right now, then use the other channel to support it.",
  },
];

const relatedServices = [
  { title: "SEO & Content Strategy", href: "/services/seo", description: "Technical audits, keyword mapping, and content systems." },
  { title: "Local SEO", href: "/services/local-seo", description: "Google Business Profile, local landing pages, and review strategy." },
  { title: "AEO / GEO", href: "/services/aeo-geo", description: "Get cited by AI search engines like ChatGPT and Perplexity." },
];

export default function SeoCategoryPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blogs" },
          { name: "SEO", path: "/blogs/category/seo" },
        ])}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="SEO Articles"
            title="Technical SEO, local search & content strategy"
            subtitle="Practical breakdowns on what actually moves rankings for service businesses — audits, local signals, content systems, and search optimization that compounds over time."
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
      <section className="relative z-10 pb-20 px-6">
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

      <FinalCTASection />
    </PageShell>
  );
}
