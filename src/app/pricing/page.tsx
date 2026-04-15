import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Rocket,
  CheckCircle2,
  Sparkles,
  Code2,
  Globe,
  Search,
  ShoppingCart,
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
  title: "Pricing | Web Development, SEO & Automation — Project-Based",
  description:
    "Transparent, project-based pricing for custom websites, web apps, e-commerce stores, SEO, and automation. No retainer lock-ins. No agency overhead.",
  path: "/pricing",
  keywords: [
    "web development pricing",
    "Next.js developer cost",
    "WordPress website cost",
    "Shopify development pricing",
    "SEO consultant pricing",
  ],
});

/* ── Project-based pricing ────────────────────────────────────── */
const projectTypes = [
  {
    icon: Code2,
    label: "Custom Website / Web App",
    price: "From $3,000",
    tagline: "Next.js, React, TypeScript",
    description:
      "Custom-designed, SEO-optimized websites and web applications built with Next.js, React, Tailwind CSS, and Prisma/Supabase. Ideal for SaaS, healthcare, and professional services.",
    features: [
      "Custom design in Figma → code",
      "Responsive, mobile-first layout",
      "SEO & structured data built in",
      "CMS or admin dashboard (if needed)",
      "Hosting setup on Vercel",
      "Post-launch support included",
    ],
    cta: "Get a quote",
    popular: true,
  },
  {
    icon: Globe,
    label: "WordPress Website",
    price: "From $1,500",
    tagline: "Custom theme or page builder",
    description:
      "Professional WordPress sites with custom themes, speed optimization, and SEO. Perfect for clinics, local businesses, and content-heavy sites that need easy self-management.",
    features: [
      "Custom theme or Elementor build",
      "Mobile-responsive design",
      "On-page SEO & schema markup",
      "Contact forms & CRM integration",
      "Speed & security optimization",
      "Training for self-management",
    ],
    cta: "Get a quote",
    popular: false,
  },
  {
    icon: ShoppingCart,
    label: "Shopify Store",
    price: "From $2,000",
    tagline: "Custom theme + e-commerce SEO",
    description:
      "Shopify stores with custom theme design, product SEO, and conversion-optimized layouts. Built for brands that want a store that ranks and sells.",
    features: [
      "Custom Shopify theme design",
      "Product & collection page SEO",
      "Payment & shipping setup",
      "App integrations & reviews",
      "Speed optimization",
      "Post-launch training",
    ],
    cta: "Get a quote",
    popular: false,
  },
];

const addOns = [
  {
    icon: Search,
    label: "SEO / AEO / GEO Retainer",
    price: "From $750/mo",
    description: "Ongoing technical SEO, content strategy, AI search optimization, and local SEO with monthly reporting.",
  },
  {
    icon: Zap,
    label: "Automation Setup",
    price: "From $1,500",
    description: "n8n workflows, AI chatbots, appointment reminders, review collection, and CRM integration — one-time build.",
  },
  {
    icon: Rocket,
    label: "Maintenance & Growth",
    price: "From $500/mo",
    description: "Ongoing updates, performance monitoring, content changes, and iterative SEO improvements post-launch.",
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
            title="Transparent, project-based pricing"
            as="h1"
            subtitle="One developer. Design, code, SEO, and automation. No agency layers, no hourly surprises. Every project is scoped and quoted before work begins."
          />

          {/* ── Project cards ───────────────────────────────────── */}
          <div className="grid gap-6 md:grid-cols-3">
            {projectTypes.map((project, index) => {
              const Icon = project.icon;
              return (
                <ScrollReveal key={project.label} delay={index * 0.08}>
                  <ModuleShell
                    className={`relative h-full p-6 ${
                      project.popular
                        ? "border-[#7C3AED]/50 ring-1 ring-[#7C3AED]/20"
                        : ""
                    }`}
                  >
                    {project.popular && (
                      <span className="absolute -top-3 left-6 rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-semibold text-white">
                        Most popular
                      </span>
                    )}

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#C4B5FD]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#94A3B8]">
                      {project.label}
                    </p>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#F8FAFC]">{project.price}</span>
                    </div>

                    <p className="mt-1 text-sm font-medium text-[#C4B5FD]">{project.tagline}</p>
                    <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{project.description}</p>

                    <ul className="mt-5 space-y-2.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-[#CBD5E1]">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`mt-6 flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                        project.popular
                          ? "bg-[#7C3AED] text-white hover:bg-[#8B5CF6]"
                          : "border border-white/10 text-[#E2E8F0] hover:border-white/20"
                      }`}
                    >
                      {project.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </ModuleShell>
                </ScrollReveal>
              );
            })}
          </div>

          {/* ── Add-ons ──────────────────────────────────────── */}
          <div className="mt-16">
            <SectionHeader
              eyebrow="Add-ons"
              title="Ongoing services & add-ons"
              subtitle="Layer these onto any project — or start with them standalone."
            />

            <div className="grid gap-6 sm:grid-cols-3">
              {addOns.map((addon, i) => {
                const Icon = addon.icon;
                return (
                  <ScrollReveal key={addon.label} delay={i * 0.06}>
                    <ModuleShell className="h-full p-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#C4B5FD]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-[#F8FAFC]">{addon.label}</h3>
                      <p className="mt-1 text-lg font-bold text-[#22D3EE]">{addon.price}</p>
                      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{addon.description}</p>
                    </ModuleShell>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* ── How it works + CTA ───────────────────────────── */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <ScrollReveal>
              <ModuleShell className="h-full p-6">
                <h2 className="text-xl font-semibold text-[#F8FAFC]">How pricing works</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-[#94A3B8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    Every project starts with a discovery call to define scope
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    You receive a detailed proposal with fixed pricing — no surprises
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    50% deposit to start, 50% on delivery
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    All fees quoted in USD
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#7C3AED]/60" />
                    All source code and assets are yours upon delivery
                  </li>
                </ul>
              </ModuleShell>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <ModuleShell className="flex h-full flex-col justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#F8FAFC]">Ready to start?</h2>
                  <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
                    If you already know what you need, book a call and we&apos;ll scope it
                    together. If you&apos;re exploring options, send a message with your
                    project details and I&apos;ll recommend the right approach.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                    Most websites ship in 2–4 weeks. Web apps and complex builds are
                    scoped individually — always with a clear timeline up front.
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
                    See how projects work
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
