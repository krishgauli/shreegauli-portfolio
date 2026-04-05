import Link from "next/link";
import { CheckCircle2, Search, BarChart3, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";

const checks = [
  "Titles, meta descriptions, canonical tags, headings, and indexability",
  "Internal link counts, image alt issues, and page-weight signals",
  "Keyword opportunity buckets when Search Console data is connected",
  "A printable report you can use in-house or bring into a strategy call",
];

export function SeoToolPromoSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          eyebrow="Free Tool"
          title="Run a free SEO audit before you book anything"
          subtitle="Use the tool to spot obvious issues, surface ranking opportunities, and decide whether you need a deeper audit or hands-on help."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <ScrollReveal>
            <ModuleShell className="h-full p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#94A3B8]">Best first step</p>
                  <h3 className="mt-1 text-2xl font-semibold text-[#F8FAFC]">See the issues before you pay for the fix</h3>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-[#CBD5E1]">
                {checks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/seo-tools"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                >
                  Run the audit
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/lp/free-seo-audit"
                  className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
                >
                  See the landing page version
                </Link>
              </div>
            </ModuleShell>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ModuleShell className="h-full p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <BarChart3 className="h-5 w-5 text-[#22D3EE]" />
                  <p className="mt-4 text-lg font-semibold text-[#F8FAFC]">Fast signal</p>
                  <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                    Useful for deciding what deserves attention first instead of guessing where the site is underperforming.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <Search className="h-5 w-5 text-[#C4B5FD]" />
                  <p className="mt-4 text-lg font-semibold text-[#F8FAFC]">Real next step</p>
                  <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                    If the tool surfaces deeper structural issues, it flows naturally into a technical audit or strategy call.
                  </p>
                </div>
                <div className="sm:col-span-2 rounded-2xl border border-[#22D3EE]/20 bg-[#22D3EE]/5 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#22D3EE]">Best fit</p>
                  <p className="mt-3 text-sm leading-7 text-[#CBD5E1]">
                    The tool is most useful for service businesses, lean marketing teams, and founders who need a quick read on on-page issues before deciding how deep the work should go.
                  </p>
                </div>
              </div>
            </ModuleShell>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
