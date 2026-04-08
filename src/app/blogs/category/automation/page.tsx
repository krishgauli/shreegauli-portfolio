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
  title: "Marketing Automation Guide | n8n, CRM & Workflow Articles",
  description:
    "Practical articles on marketing automation, n8n workflows, CRM setup, and operational systems that save time and prevent lead leakage.",
  path: "/blogs/category/automation",
  keywords: [
    "marketing automation guide",
    "n8n workflows",
    "CRM automation",
    "lead routing automation",
  ],
});

const featuredPosts = [
  {
    title: "Why Most n8n Workflows Break in Production (And How to Fix Them)",
    slug: "n8n-workflows-production",
    excerpt:
      "A workflow that runs once in staging is not the same as one that survives real traffic, bad inputs, and retries. Production reliability comes from operating rules.",
  },
  {
    title: "Why CRM Automation Should Happen Before You Scale Ad Spend",
    slug: "crm-automation-before-scaling-ad-spend",
    excerpt:
      "More leads only help when routing, follow-up, and ownership are already working. Otherwise extra spend amplifies leakage instead of revenue.",
  },
];

const relatedServices = [
  { title: "Marketing Automation", href: "/services/automation", description: "n8n workflows, CRM pipelines, and notification systems that run without babysitting." },
  { title: "AI Follow-Up", href: "/services/ai-follow-up", description: "Automated lead response and nurture sequences powered by AI." },
  { title: "Lead Conversion", href: "/services/lead-conversion", description: "Close the gap between inbound leads and booked revenue." },
];

export default function AutomationCategoryPage() {
  return (
    <PageShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blogs" },
          { name: "Automation", path: "/blogs/category/automation" },
        ])}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Automation Articles"
            title="n8n workflows, CRM systems & marketing ops"
            subtitle="Field-tested guides on building automation that survives production — lead routing, follow-up triggers, CRM pipelines, and operational systems that prevent leakage."
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
