import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Search, FileText, BarChart3 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Free SEO Audit | Spot High-Impact Issues Fast",
  description:
    "Run a free SEO audit, spot high-impact issues fast, and book a review if you want help prioritizing the fixes.",
  path: "/lp/free-seo-audit",
  keywords: ["free SEO audit", "SEO audit tool", "website SEO checker", "on-page SEO analysis"],
});

export default function FreeSeoAuditLandingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Free SEO Audit", path: "/lp/free-seo-audit" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Landing Page"
            title="Run a free SEO audit and see what needs fixing first"
            as="h1"
            subtitle="Use the tool to surface on-page issues, weak metadata, and quick technical wins before you commit to a deeper project."
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ModuleShell className="p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Search className="h-5 w-5 text-[#22D3EE]" />
                  <p className="mt-4 text-lg font-semibold text-[#F8FAFC]">Audit any URL</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <FileText className="h-5 w-5 text-[#C4B5FD]" />
                  <p className="mt-4 text-lg font-semibold text-[#F8FAFC]">See what to fix</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="mt-4 text-lg font-semibold text-[#F8FAFC]">Request a review</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-[#CBD5E1]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Check titles, descriptions, H1s, canonical tags, internal links, and image alt signals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Connect Search Console to unlock ranking, CTR, and buried keyword opportunities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Send the result directly for review if you want help prioritizing the fixes.</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/seo-tools"
                  className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                >
                  Open the audit tool
                </Link>
                <Link
                  href="/book"
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
                >
                  Book a review instead
                </Link>
              </div>
            </ModuleShell>

            <ModuleShell className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-[#F8FAFC]">When this is the right first step</h2>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                This page is ideal when you know something on the site is off but
                do not want to jump straight into a full engagement. It gives you a
                clear first pass before deciding whether the next step is a deeper
                audit, a content fix, or a technical cleanup sprint.
              </p>
              <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                If the site already has traffic but not enough qualified leads, use
                the audit first. If the bottleneck is broader than on-page SEO, book
                a strategy call and we can scope the problem properly.
              </p>
            </ModuleShell>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
