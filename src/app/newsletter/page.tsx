import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { NewsletterSignupCard } from "@/components/forms/NewsletterSignupCard";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Dev & SEO Newsletter | Web Dev & Automation Notes",
  description:
    "Subscribe for practical notes on web development, SEO, automation, and technical strategy from a working full-stack developer.",
  path: "/newsletter",
  keywords: ["web development newsletter", "SEO newsletter", "developer newsletter", "automation newsletter"],
});

export default function NewsletterPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Newsletter", path: "/newsletter" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Newsletter"
            title="Short notes for people building real growth systems"
            as="h1"
            subtitle="No giant digest and no recycled trend summary. Just practical lessons from web development, SEO, and automation."
          />

          <NewsletterSignupCard source="newsletter-page" />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">What you get</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Practical audits, breakdowns of what changed, and examples of what
                strong execution looks like when channels and systems work together.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">What you do not get</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                No filler &quot;10 tips&quot; emails, no daily noise, and no constant
                pitching. If an issue is not worth acting on, it does not get sent.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Who it is for</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Founders, operators, and small teams who want clearer
                thinking about web development, SEO, and automation.
              </p>
            </ModuleShell>
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#F8FAFC] mb-3">Topics you will see</h2>
            <p className="text-sm leading-7 text-[#94A3B8]">
              Recent issues have covered technical SEO patterns that move rankings without new content,
              n8n automation workflows for lead follow-up and appointment reminders, Next.js performance
              tuning for Core Web Vitals, structured data strategies for AI search engines, and
              real-world case breakdowns showing exactly what changed and what the outcome was.
              Each send focuses on one idea you can act on the same week.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
