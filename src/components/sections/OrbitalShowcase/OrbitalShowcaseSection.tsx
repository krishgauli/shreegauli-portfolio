"use client";

import {
  Search,
  Globe,
  Zap,
  BarChart3,
  ShoppingCart,
  Code2,
  Bot,
  Target,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const servicesData = [
  {
    id: 1,
    title: "SEO / AEO / GEO",
    date: "Core Service",
    content:
      "Rank on Google and get cited by AI engines like ChatGPT & Perplexity. Technical SEO, content clusters, and structured data that drive organic growth.",
    category: "Search",
    icon: Search,
    relatedIds: [2, 5],
    status: "completed" as const,
    energy: 97,
  },
  {
    id: 2,
    title: "Web Development",
    date: "Core Service",
    content:
      "Custom Next.js websites and full-stack web apps built with React, TypeScript, Tailwind CSS, Prisma, and Supabase. Fast, scalable, and built to convert.",
    category: "Development",
    icon: Code2,
    relatedIds: [1, 3, 6],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "Paid Media",
    date: "Core Service",
    content:
      "Meta Ads and Google Ads campaigns engineered for ROI. Patient acquisition, lead gen, and ecommerce growth for healthcare, SaaS, and retail brands.",
    category: "Advertising",
    icon: Target,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 4,
    title: "Automation",
    date: "Core Service",
    content:
      "n8n workflows, AI chatbots, and CRM integrations that eliminate repetitive tasks. Appointment reminders, lead capture, and data pipelines — all automated.",
    category: "Automation",
    icon: Bot,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 88,
  },
  {
    id: 5,
    title: "Product Strategy",
    date: "Core Service",
    content:
      "Product roadmaps, analytics dashboards, and KPI frameworks for 15+ clients across healthcare, finance, SaaS, and ecommerce — turning data into decisions.",
    category: "Strategy",
    icon: BarChart3,
    relatedIds: [1, 4, 6],
    status: "completed" as const,
    energy: 92,
  },
  {
    id: 6,
    title: "eCommerce / CRO",
    date: "Core Service",
    content:
      "Shopify & WooCommerce optimization. Conversion rate audits, checkout UX improvements, and A/B testing strategies that increase revenue per visitor.",
    category: "eCommerce",
    icon: ShoppingCart,
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 82,
  },
  {
    id: 7,
    title: "WordPress / CMS",
    date: "Core Service",
    content:
      "Custom WordPress themes, plugin integrations, and headless CMS builds. Speed-optimized, SEO-ready, and easy for clients to manage.",
    category: "CMS",
    icon: Globe,
    relatedIds: [2, 1],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 8,
    title: "AI Integrations",
    date: "Emerging",
    content:
      "OpenAI, Claude, and LLM integrations embedded into your product or workflow. From AI customer service to content generation pipelines.",
    category: "AI",
    icon: Zap,
    relatedIds: [4, 5],
    status: "in-progress" as const,
    energy: 80,
  },
];

export function OrbitalShowcaseSection() {
  return (
    <section className="relative z-10 overflow-hidden bg-bg-base py-0">
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-125 w-125 rounded-full bg-brand-violet/6 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 h-100 w-100 rounded-full bg-brand-cyan/5 blur-[120px]" />
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center pt-20 pb-6 px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-violet mb-3">
          What I Do
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-content-primary mb-4">
          Services in Orbit
        </h2>
        <p className="text-content-muted text-sm max-w-md mx-auto">
          Click any node to explore the service — every discipline connects to
          drive results.
        </p>
      </div>

      {/* Orbital timeline — fixed height container */}
      <div className="relative w-full h-150">
        <RadialOrbitalTimeline timelineData={servicesData} />
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-bg-base to-transparent pointer-events-none" />
    </section>
  );
}
