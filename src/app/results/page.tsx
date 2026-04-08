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
import { ArrowRight, TrendingUp, Zap, Clock, Target, BarChart3, Users } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Results & Case Studies | Proven Marketing Outcomes",
  description:
    "Real results from real businesses: 100x conversion lifts, 340% organic growth, 4.8x ROAS, and 20+ hours saved weekly. See the proof behind every claim.",
  path: "/results",
  keywords: [
    "digital marketing results",
    "marketing case studies",
    "SEO results",
    "conversion rate improvement",
    "marketing ROI proof",
    "lead conversion case study",
  ],
});

/* ── Headline metrics ─────────────────────────────────────────── */
const headlineStats = [
  {
    icon: TrendingUp,
    value: "100x",
    label: "Conversion Lift",
    detail: "0.1% → 10% for a multi-location clinic — without changing a single ad.",
    color: "#7C3AED",
  },
  {
    icon: BarChart3,
    value: "340%",
    label: "Organic Growth",
    detail: "From near-zero to consistent top-10 rankings in 8 months.",
    color: "#22D3EE",
  },
  {
    icon: Target,
    value: "4.8x",
    label: "Peak ROAS",
    detail: "On a $30K/month ad budget — rebuilt from 1.2x in one quarter.",
    color: "#7C3AED",
  },
  {
    icon: Clock,
    value: "20+",
    label: "Hours Saved / Week",
    detail: "Via n8n automation systems replacing manual reporting and lead routing.",
    color: "#F59E0B",
  },
  {
    icon: Zap,
    value: "<1 min",
    label: "Lead Response Time",
    detail: "AI call agent responding to every new lead within 60 seconds.",
    color: "#22D3EE",
  },
  {
    icon: Users,
    value: "10–12",
    label: "New Clients / Month",
    detail: "Generated entirely by AI-powered follow-up — no additional ad spend.",
    color: "#F59E0B",
  },
];

/* ── Case studies ─────────────────────────────────────────────── */
const caseStudies = [
  {
    title: "From 0.1% to 10% conversion rate — without changing a single ad",
    client: "Multi-Location Clinic",
    industry: "Healthcare",
    result: "100x conversion lift in 30 days",
    description:
      "The client was spending $6K/month on ads, generating 300 leads, but converting at 0.1%. We audited the full funnel and found the problem was follow-up — not the ads. With a dedicated follow-up hire, structured call scripts, and CRM-based sequences, conversion jumped to 10% in one month.",
    tags: ["Lead Conversion", "Google Ads", "Process Fix"],
    href: "/work/lead-conversion-fix",
  },
  {
    title: "Organic search rebuilt from near-zero to consistent top-10 rankings",
    client: "Healthcare SaaS",
    industry: "Healthcare",
    result: "340% organic growth in 8 months",
    description:
      "No SEO foundation, thin content, zero domain presence. We re-engineered the site architecture, deployed 50+ deep-dive clinical articles, and built a backlink profile from Tier-1 medical publications. Indexing coverage went from 18% to 99%.",
    tags: ["SEO", "Content", "Technical Audit"],
    href: "/work/seo-growth",
  },
  {
    title: "Paid media overhaul: from 1.2x ROAS to 4.8x in one quarter",
    client: "E-Commerce Brand",
    industry: "E-Commerce",
    result: "4.8x ROAS on $30K/month budget",
    description:
      "The brand was spending $30K/month with no attribution model and overlapping campaigns. We implemented server-side tracking, consolidated 12 campaigns to 4 pillars, and built a systematic creative testing framework. CAC dropped 42%.",
    tags: ["Meta Ads", "Google Ads", "Attribution"],
    href: "/work/paid-media",
  },
  {
    title: "AI call centre agent turns missed leads into 10–12 new clients per month",
    client: "Service-Based Business",
    industry: "Local Services",
    result: "10–12 new clients/month via AI follow-up",
    description:
      "Inconsistent manual follow-up meant leads waited 2–3 days for a callback. We built a conversational AI agent that calls or texts every new lead within 60 seconds, qualifying and scheduling automatically. Over 40 hours/month reclaimed.",
    tags: ["AI Automation", "Lead Follow-Up", "CRM"],
    href: "/work/ai-call-centre",
  },
  {
    title: "From zero to 9.41K impressions in 60 days with a one-day website build",
    client: "New Clinic Launch",
    industry: "Healthcare",
    result: "9.41K impressions, 252 clicks in 60 days",
    description:
      "Brand-new clinic, no website, no domain authority. We built a fully SEO-optimized site in one day, submitted the sitemap, set up Google Business Profile, and built local citations. Within 60 days: 9,410 impressions and 252 organic clicks.",
    tags: ["SEO", "Web Development", "Local SEO"],
    href: "/work/seo-website-launch",
  },
  {
    title: "Automated reporting and lead pipeline saving 20+ hours per week",
    client: "Local Services Group",
    industry: "Local Services",
    result: "20+ hours saved weekly",
    description:
      "The team was drowning in manual processes — copying data between tools, manually generating reports, chasing leads. We built 7 interconnected n8n workflows, unified 5 data sources into one CRM, and replaced manual reporting with live dashboards.",
    tags: ["n8n", "CRM", "Automation"],
    href: "/work/automation",
  },
];

/* ── Industries served ────────────────────────────────────────── */
const industries = [
  { name: "Healthcare & Dental", href: "/industries/healthcare" },
  { name: "Local Service Businesses", href: "/industries/local-services" },
  { name: "E-Commerce", href: "/industries/ecommerce" },
  { name: "SaaS", href: "/industries/saas" },
];

/* ── Component ────────────────────────────────────────────────── */
export default function ResultsPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Results", path: "/results" }])} />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Proof"
            title="Results that speak for themselves"
            subtitle="Every number on this page comes from a real engagement with a real business. No hypothetical projections. No vanity metrics. Just outcomes that moved revenue."
          />
        </div>
      </section>

      {/* Headline stats grid */}
      <section className="relative z-10 pb-20 px-6">
        <div className="mx-auto max-w-5xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {headlineStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal key={stat.label} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full" enableHoverLift>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl border bg-white/[0.04]"
                    style={{ borderColor: stat.color + "40", color: stat.color }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-[#F8FAFC]">{stat.value}</p>
                  <p className="text-sm font-medium text-[#C4B5FD] mt-1">{stat.label}</p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{stat.detail}</p>
                </ModuleShell>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Case studies */}
      <section className="relative z-10 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2">Case Studies</h2>
          <p className="text-sm text-[#94A3B8] mb-10 max-w-2xl">
            Detailed breakdowns of real engagements — what was broken, what we fixed, and the measurable impact.
          </p>

          <div className="grid gap-6">
            {caseStudies.map((study, i) => (
              <ScrollReveal key={study.title} delay={i * 0.06}>
                <ModuleShell className="p-6" enableHoverLift>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
                      {study.industry}
                    </span>
                    <span className="text-xs text-[#94A3B8]/60">·</span>
                    <span className="text-xs text-[#94A3B8]">{study.client}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F8FAFC] leading-tight">
                    {study.title}
                  </h3>

                  <p className="inline-flex items-center mt-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#22D3EE]">
                    {study.result}
                  </p>

                  <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                    {study.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-[#94A3B8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#C4B5FD] hover:text-[#7C3AED] transition-colors"
                  >
                    Read full case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="relative z-10 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Industries I work with</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <ScrollReveal key={ind.name}>
                <Link href={ind.href}>
                  <ModuleShell className="p-5 text-center" enableHoverLift>
                    <p className="text-sm font-semibold text-[#F8FAFC]">{ind.name}</p>
                  </ModuleShell>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
