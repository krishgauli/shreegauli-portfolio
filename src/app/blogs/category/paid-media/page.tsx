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
  title: "Google Ads & Paid Media Guide | PPC Strategy Articles",
  description:
    "Articles on Google Ads optimization, paid media attribution, and ad spend strategy for businesses that need real revenue, not vanity ROAS.",
  path: "/blogs/category/paid-media",
  keywords: [
    "Google Ads strategy",
    "paid media guide",
    "PPC optimization",
    "ad attribution",
  ],
});

const featuredPosts = [
  {
    title: "The Attribution Problem Nobody Talks About in Small Business Ads",
    slug: "attribution-problem-small-business-ads",
    excerpt:
      "Most small businesses are not measuring ad performance. They are comparing platform claims, partial CRM data, and delayed sales feedback.",
  },
  {
    title: "What a Google Ads Audit Should Find in Week One",
    slug: "google-ads-audit-week-one",
    excerpt:
      "A useful audit surfaces budget waste, bad query matching, landing-page friction, and broken tracking fast enough to change decisions.",
  },
  {
    title: "SEO vs Google Ads: What to Fix First When Growth Stalls",
    slug: "seo-vs-google-ads-what-to-fix-first",
    excerpt:
      "Start with the constraint costing you the most momentum right now, then use the other channel to support it.",
  },
];

const relatedServices = [
  { title: "Paid Media & Google Ads", href: "/services/paid-media", description: "Campaign builds, query sculpting, and conversion tracking that ties to revenue." },
  { title: "Lead Conversion", href: "/services/lead-conversion", description: "Fix the gap between ad clicks and actual booked calls." },
];

export default function PaidMediaCategoryPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blogs" },
          { name: "Paid Media", path: "/blogs/category/paid-media" },
        ])}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Paid Media Articles"
            title="Google Ads, attribution & ad spend strategy"
            subtitle="Honest breakdowns on PPC optimization, conversion tracking, and paid media economics — focused on businesses that need qualified leads, not inflated ROAS dashboards."
          />
        </div>
      </section>

      {/* Featured Articles */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Featured Articles</h2>
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
