import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { NewsletterSignupCard } from "@/components/forms/NewsletterSignupCard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Newsletter — Shree Krishna Gauli",
  description:
    "Subscribe for practical notes on SEO, paid media, automation, and conversion work.",
  path: "/newsletter",
  keywords: ["marketing newsletter", "SEO newsletter", "paid media insights"],
});

export default function NewsletterPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Newsletter"
            title="Short notes for people building real growth systems"
            subtitle="No giant digest and no recycled trend summary. Just practical lessons from SEO, paid media, automation, and conversion work."
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
                Founders, operators, and lean marketing teams who want clearer
                thinking about organic growth, paid efficiency, and automation.
              </p>
            </ModuleShell>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
