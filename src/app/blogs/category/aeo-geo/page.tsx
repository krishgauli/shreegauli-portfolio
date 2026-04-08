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
  title: "AEO & GEO Guide | Answer Engine & Generative Engine Optimization",
  description:
    "Articles on Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and how to get your brand cited by AI search engines like ChatGPT and Perplexity.",
  path: "/blogs/category/aeo-geo",
  keywords: [
    "AEO guide",
    "answer engine optimization",
    "GEO guide",
    "generative engine optimization",
    "AI search",
  ],
});

const featuredPosts = [
  {
    title: "Technical SEO Audit Checklist for Service Business Websites",
    slug: "technical-seo-audit-checklist-service-businesses",
    excerpt:
      "A strong technical foundation is the first step toward being surfaced by both traditional and AI-powered search engines.",
  },
  {
    title: "What Your Free SEO Audit Results Actually Mean",
    slug: "free-seo-audit-results-explained",
    excerpt:
      "Understanding audit signals helps you prioritize the structural fixes that matter for both Google and generative search visibility.",
  },
  {
    title: "SEO vs Google Ads: What to Fix First When Growth Stalls",
    slug: "seo-vs-google-ads-what-to-fix-first",
    excerpt:
      "Modern search strategy includes AI engines. This article covers how to sequence organic and paid in a landscape that is changing fast.",
  },
];

const relatedServices = [
  { title: "AEO / GEO", href: "/services/aeo-geo", description: "Get cited by ChatGPT, Perplexity, and other AI search engines." },
  { title: "SEO & Content Strategy", href: "/services/seo", description: "The structured content foundation that feeds both traditional and AI search." },
];

export default function AeoGeoCategoryPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blogs" },
          { name: "AEO & GEO", path: "/blogs/category/aeo-geo" },
        ])}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="AEO & GEO Articles"
            title="Answer engines, generative search & AI visibility"
            subtitle="How to structure your content and technical SEO so your brand gets cited by AI search tools like ChatGPT, Perplexity, and Google AI Overviews — not just ranked on page one."
          />
        </div>
      </section>

      {/* Featured Articles */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
          <p className="text-sm text-[#94A3B8] mt-8 text-center">
            More dedicated AEO and GEO content is coming soon. Subscribe to get notified when new articles publish.
          </p>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Related Services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
