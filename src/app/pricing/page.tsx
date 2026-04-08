import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Rocket,
  CheckCircle2,
  Sparkles,
  BarChart3,
  PenTool,
  Search,
  Globe,
  Shield,
  FileText,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Investment | Growth & Scale Retainers",
  description:
    "Investment tiers built for measurable growth: monthly retainers from $1,499 covering SEO, paid media, automation, and reporting. No agency layers.",
  path: "/pricing",
  keywords: [
    "marketing consultant pricing",
    "SEO consultant retainer",
    "digital marketing retainer",
    "marketing consultant dallas pricing",
    "healthcare marketing pricing",
  ],
});

/* ── Plan data ────────────────────────────────────────────────── */
const plans = [
  {
    icon: Zap,
    label: "Growth",
    price: "$1,499",
    unit: "/month",
    tagline: "Consistent marketing execution",
    description:
      "For businesses that need a reliable marketing operator across SEO, paid media, content, and automation — without the agency overhead.",
    features: [
      "SEO, paid media, content & automation",
      "Monthly analytics & performance report",
      "Weekly implementation rhythm",
      "Direct access — no account managers",
      "Month-to-month, cancel anytime",
    ],
    cta: "Start growing",
    popular: true,
  },
  {
    icon: Rocket,
    label: "Scale",
    price: "$2,500",
    unit: "/month",
    tagline: "Deeper execution, faster results",
    description:
      "For teams running multi-channel campaigns, aggressive SEO builds, or automation projects that need faster turnaround and strategic support.",
    features: [
      "Everything in Growth",
      "Priority scheduling & faster turnaround",
      "Weekly strategy syncs",
      "Advanced automation & integrations",
      "Multi-channel campaign management",
    ],
    cta: "Scale up",
    popular: false,
  },
  {
    icon: Sparkles,
    label: "Custom",
    price: "Custom",
    unit: "",
    tagline: "Tailored to your business needs",
    description:
      "For organizations with unique requirements — custom scope, dedicated resources, and bespoke integrations built around your goals.",
    features: [
      "Tailored scope and deliverables",
      "Dedicated resources",
      "Custom integrations and APIs",
      "Multi-channel strategy",
      "Executive reporting and BI dashboards",
      "Enterprise SLA and support",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

/* ── Service areas ────────────────────────────────────────────── */
const serviceAreas = [
  {
    icon: Sparkles,
    title: "Social Media",
    items: [
      "Strategy, scheduling, and publishing across LinkedIn, Instagram, Facebook, and X",
      "Up to 20 posts per month with captions and hashtags",
      "Community management — comments, DMs, and engagement",
    ],
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    items: [
      "Branded visual assets ­and post graphics",
      "Carousel templates and infographics",
      "Promotional materials consistent with your brand guidelines",
    ],
  },
  {
    icon: FileText,
    title: "Content Creation",
    items: [
      "Up to 2 long-form articles per month (800–1,200 words)",
      "Monthly content calendar and copywriting",
      "Newsletter copy — subject line, body, and CTA",
      "Content refreshes and rewrites for existing pages",
    ],
  },
  {
    icon: Search,
    title: "SEO",
    items: [
      "Keyword research and monthly targeting plan",
      "On-page optimisation — meta tags, headings, internal linking",
      "Backlink building from relevant industry publications",
      "Technical SEO monitoring — Core Web Vitals, crawl errors, structured data",
    ],
  },
  {
    icon: Globe,
    title: "Website Maintenance",
    items: [
      "Content, image, and layout updates",
      "Performance and security checks",
      "Plugin/theme updates and uptime monitoring",
      "Up to 8 hours of site updates per month",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting",
    items: [
      "Monthly consolidated analytics report",
      "Social reach, engagement, and follower growth",
      "SEO rankings, organic traffic, and backlink profile",
      "Clear recommendations tied to business outcomes",
    ],
  },
];

/* ── Component ────────────────────────────────────────────────── */
export default function PricingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Pricing", path: "/pricing" }])} />
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Investment"
            title="Marketing that pays for itself"
            subtitle="One operator. Full-stack execution. No agency layers. Pick the tier that fits your growth stage — scale up or down anytime with 30 days’ notice."
          />

          {/* ── Plan cards ───────────────────────────────────────── */}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <ScrollReveal key={plan.label} delay={index * 0.08}>
                  <ModuleShell
                    className={`relative h-full p-6 ${
                      plan.popular
                        ? "border-[#7C3AED]/50 ring-1 ring-[#7C3AED]/20"
                        : ""
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-6 rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-semibold text-white">
                        Most popular
                      </span>
                    )}

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#94A3B8]">
                      {plan.label}
                    </p>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#F8FAFC]">{plan.price}</span>
                      <span className="text-sm text-[#64748B]">{plan.unit}</span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-[#C4B5FD]">{plan.tagline}</p>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{plan.description}</p>

                    <ul className="mt-5 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`mt-6 flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                        plan.popular
                          ? "bg-[#7C3AED] text-white hover:bg-[#8B5CF6]"
                          : "border border-white/10 text-[#E2E8F0] hover:border-white/20"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </ModuleShell>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ── Comparison strip ─────────────────────────────── */}
          <ScrollReveal delay={0.15}>
            <ModuleShell className="mt-10 overflow-x-auto p-0">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Compare plans</th>
                    <th className="px-6 py-4 text-center font-medium text-[#C4B5FD]">Growth</th>
                    <th className="px-6 py-4 text-center font-medium text-[#94A3B8]">Scale</th>
                  </tr>
                </thead>
                <tbody className="text-[#CBD5E1]">
                  {[
                    ["Monthly investment", "$1,499", "$2,500"],
                    ["SEO & content", "✓", "✓"],
                    ["Paid media management", "✓", "✓"],
                    ["Marketing automation", "✓", "✓"],
                    ["Monthly analytics report", "✓", "✓"],
                    ["Weekly strategy syncs", "—", "✓"],
                    ["Priority scheduling", "—", "✓"],
                    ["Advanced integrations", "—", "✓"],
                    ["Minimum commitment", "Month-to-month", "Month-to-month"],
                    ["Cancellation notice", "30 days", "30 days"],
                  ].map(([feature, growth, scale]) => (
                    <tr key={feature} className="border-b border-white/[0.04] last:border-0">
                      <td className="px-6 py-3 text-[#94A3B8]">{feature}</td>
                      <td className="px-6 py-3 text-center">{growth}</td>
                      <td className="px-6 py-3 text-center">{scale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ModuleShell>
          </ScrollReveal>

          {/* ── What's included ──────────────────────────────── */}
          <div className="mt-16">
            <SectionHeader
              eyebrow="What you get"
              title="Full-stack execution, one operator"
              subtitle="Every retainer covers the same service areas. The tier determines depth of execution and strategic support."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {serviceAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <ScrollReveal key={area.title} delay={i * 0.06}>
                    <ModuleShell className="h-full p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#C4B5FD]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#F8FAFC]">{area.title}</h3>
                      <ul className="mt-3 space-y-2">
                        {area.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#94A3B8]">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#7C3AED]/60" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </ModuleShell>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* ── Payment & terms ──────────────────────────────── */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <ModuleShell className="h-full p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#C4B5FD]">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[#F8FAFC]">Payment terms</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    Invoices issued on the first business day of each month
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    Payment due within 14 days of invoice
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    All fees quoted in USD
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    Month-to-month — cancel with 30 days&apos; notice
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    All completed work and assets delivered upon termination
                  </li>
                </ul>
              </ModuleShell>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <ModuleShell className="flex h-full flex-col justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#F8FAFC]">Ready to start?</h2>
                  <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                    If you already know the bottleneck, book a call. If you need help 
                    defining the right scope first, send a note with the context and I&apos;ll 
                    recommend the simplest useful starting point.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                    Not sure which plan fits? Most clients start with the Growth retainer. 
                    You can always scale up or switch to hourly as needs change.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
                  >
                    Get in touch
                  </Link>
                  <Link
                    href="/working-together"
                    className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
                  >
                    See how engagements work
                  </Link>
                </div>
              </ModuleShell>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
