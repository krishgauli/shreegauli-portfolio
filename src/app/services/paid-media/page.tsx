import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Paid Media Services — Shree Krishna Gauli",
  description:
    "Meta and Google campaign builds, audience testing, creative strategy, and ROAS-focused optimization for brands serious about growth.",
  path: "/services/paid-media",
  keywords: [
    "paid media specialist",
    "Google Ads management",
    "Meta Ads specialist",
    "PPC management",
    "ROAS optimization",
    "paid advertising Dallas",
  ],
});

const process = [
  {
    step: "01",
    title: "Account Audit",
    description:
      "Deep-dive into current campaign structure, audiences, creatives, and tracking setup. Identify wasted spend and missed opportunities.",
  },
  {
    step: "02",
    title: "Strategy & Architecture",
    description:
      "Build campaign structure aligned with business goals — awareness, consideration, and conversion layers with clear KPIs.",
  },
  {
    step: "03",
    title: "Tracking & Attribution",
    description:
      "Set up server-side tracking, conversion APIs, UTM frameworks, and attribution models so every dollar is accounted for.",
  },
  {
    step: "04",
    title: "Creative Strategy",
    description:
      "Develop ad creative frameworks, copy variations, and testing matrices. Iterate based on performance data, not guesswork.",
  },
  {
    step: "05",
    title: "Launch & Optimize",
    description:
      "Launch campaigns with controlled budgets, then scale winners and cut losers fast. Weekly optimization cycles.",
  },
  {
    step: "06",
    title: "Reporting & Scaling",
    description:
      "Transparent reporting on ROAS, CPA, and pipeline contribution. Clear recommendations on where to scale next.",
  },
];

const deliverables = [
  "Full account audit with actionable recommendations",
  "Campaign architecture document",
  "Pixel / CAPI / conversion tracking setup",
  "Ad creative briefs and copy variations",
  "Weekly optimization and bid management",
  "Monthly ROAS and performance report",
];

const faqs = [
  {
    q: "What platforms do you manage?",
    a: "Primarily Meta (Facebook/Instagram) and Google (Search, Display, YouTube). I can also manage LinkedIn and TikTok campaigns depending on your audience.",
  },
  {
    q: "What budget do I need to start?",
    a: "I typically recommend a minimum of $3K/month in ad spend to generate enough data for meaningful optimization. Below that, the learning phase takes too long.",
  },
  {
    q: "How quickly can you improve my ROAS?",
    a: "Most clients see measurable improvements within the first 2-4 weeks after restructuring. Significant gains usually happen in month 2-3 as we accumulate data and refine audiences.",
  },
  {
    q: "Do you create the ad creatives?",
    a: "I provide creative direction, copy, and briefs. For graphic design and video production, I work with trusted partners or your in-house team.",
  },
];

export default function PaidMediaServicePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Paid Media"
            title="Turn ad spend into measurable revenue"
            subtitle="Campaign builds, audience testing, and ROAS-focused optimization for Meta and Google — structured for profitable scaling."
          />
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full">
                  <span className="text-xs font-bold text-[#7C3AED]">{item.step}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">What you get</h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <CheckCircle2 className="h-4 w-4 text-[#7C3AED] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ModuleShell>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Frequently asked questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <ModuleShell key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-[#F8FAFC]">{faq.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{faq.a}</p>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
