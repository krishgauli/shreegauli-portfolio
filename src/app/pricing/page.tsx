import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
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

export const metadata: Metadata = createPageMetadata({
  title: "Pricing — Shree Krishna Gauli",
  description:
    "Transparent pricing: $50/hour or monthly retainers starting at $1,499. Full-stack digital marketing — SEO, social media, content, design, and web maintenance.",
  path: "/pricing",
  keywords: [
    "marketing consultant pricing",
    "SEO consultant pricing",
    "digital marketing retainer",
    "freelance marketing hourly rate",
    "social media management pricing",
  ],
});

/* ── Plan data ────────────────────────────────────────────────── */
const plans = [
  {
    icon: Clock,
    label: "Hourly",
    price: "$50",
    unit: "per hour",
    tagline: "Pay only for the hours you use",
    description:
      "Best when you need targeted help on a specific channel or project without committing to a monthly scope.",
    features: [
      "Billed monthly on actual hours worked",
      "No minimum commitment",
      "Full access to all five service areas",
      "Monthly timesheet included with invoice",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    icon: Zap,
    label: "Growth",
    price: "$1,499",
    unit: "/month",
    tagline: "30 hours of execution per month",
    description:
      "The most popular option for businesses that need consistent marketing execution across SEO, social, content, and web.",
    features: [
      "Up to 30 hours per month",
      "All five service disciplines included",
      "Monthly analytics report",
      "Weekly implementation rhythm",
      "Additional hours at $50/hr",
      "14-day invoice terms",
    ],
    cta: "Start growing",
    popular: true,
  },
  {
    icon: Rocket,
    label: "Scale",
    price: "$2,500",
    unit: "/month",
    tagline: "50 hours of execution per month",
    description:
      "For teams that need deeper execution: multi-channel campaigns, aggressive SEO builds, automation projects, and faster turnaround.",
    features: [
      "Up to 50 hours per month",
      "All five service disciplines included",
      "Priority scheduling & faster turnaround",
      "Monthly analytics report",
      "Weekly syncs and decision support",
      "Additional hours at $50/hr",
    ],
    cta: "Scale up",
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
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="One operator. Five disciplines. No agency layers. Pick the model that fits your workload — scale up or down anytime with 30 days' notice."
          />

          {/* ── Plan cards ───────────────────────────────────── */}
          <div className="grid gap-6 lg:grid-cols-3">
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
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-6 py-4 text-left font-medium text-[#94A3B8]">Compare plans</th>
                    <th className="px-6 py-4 text-center font-medium text-[#94A3B8]">Hourly</th>
                    <th className="px-6 py-4 text-center font-medium text-[#C4B5FD]">Growth</th>
                    <th className="px-6 py-4 text-center font-medium text-[#94A3B8]">Scale</th>
                  </tr>
                </thead>
                <tbody className="text-[#CBD5E1]">
                  {[
                    ["Monthly price", "$50/hr", "$1,499", "$2,500"],
                    ["Included hours", "Pay-as-you-go", "30 hrs", "50 hrs"],
                    ["Overage rate", "—", "$50/hr", "$50/hr"],
                    ["Service disciplines", "All 5", "All 5", "All 5"],
                    ["Monthly analytics report", "Add-on", "✓", "✓"],
                    ["Weekly syncs", "—", "—", "✓"],
                    ["Priority scheduling", "—", "—", "✓"],
                    ["Minimum commitment", "None", "Month-to-month", "Month-to-month"],
                    ["Cancellation notice", "—", "30 days", "30 days"],
                  ].map(([feature, hourly, growth, scale]) => (
                    <tr key={feature} className="border-b border-white/[0.04] last:border-0">
                      <td className="px-6 py-3 text-[#94A3B8]">{feature}</td>
                      <td className="px-6 py-3 text-center">{hourly}</td>
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
              title="Five disciplines, one operator"
              subtitle="Every plan covers the same service areas. The only difference is how many hours of execution you get each month."
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
