import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Social Media Consultant | LinkedIn, Content Systems, Growth",
  description:
    "Platform strategies, content calendars, and community systems that grow engaged audiences on Instagram, LinkedIn, and beyond.",
  path: "/services/social-media",
  keywords: [
    "social media consultant",
    "Instagram growth strategy",
    "LinkedIn marketing",
    "social media management",
    "content calendar",
    "community management",
  ],
});

const process = [
  {
    step: "01",
    title: "Platform Audit",
    description:
      "Review current profiles, content performance, audience demographics, and competitor positioning across all active platforms.",
  },
  {
    step: "02",
    title: "Strategy Development",
    description:
      "Define content pillars, posting cadence, voice and tone guidelines, and platform-specific growth tactics.",
  },
  {
    step: "03",
    title: "Content Calendar",
    description:
      "Build a 30-day rolling content calendar with post concepts, captions, hashtag strategies, and publishing schedules.",
  },
  {
    step: "04",
    title: "Community Engagement",
    description:
      "Systems for responding to comments, DMs, and mentions. Build real relationships instead of broadcasting into the void.",
  },
  {
    step: "05",
    title: "Analytics & Iteration",
    description:
      "Track engagement rates, follower growth, reach, and conversions. Use data to refine what works and drop what doesn\u2019t.",
  },
  {
    step: "06",
    title: "Monthly Review",
    description:
      "Performance review with clear metrics, content winners analysis, and strategy adjustments for the next month.",
  },
];

const deliverables = [
  "Platform audit and competitor analysis",
  "Content pillar strategy document",
  "Monthly content calendar with 20-30 post concepts",
  "Hashtag and keyword research per platform",
  "Engagement and community management guidelines",
  "Monthly analytics report with growth metrics",
];

const faqs = [
  {
    q: "Which platforms do you work with?",
    a: "Primarily Instagram, LinkedIn, and X (Twitter). I can also advise on TikTok and YouTube Shorts if they fit your audience. The key is focusing where your customers actually are.",
  },
  {
    q: "Do you post for me or just create the strategy?",
    a: "Both options available. I can provide the full calendar and briefs for your team to execute, or handle end-to-end posting and engagement. Most clients prefer the full-service approach.",
  },
  {
    q: "How do you measure social media success?",
    a: "Beyond vanity metrics. I track engagement rate, profile visits, link clicks, DM conversations, and ultimately leads or sales tied to social. Followers are nice but revenue is the goal.",
  },
  {
    q: "How long before I see meaningful growth?",
    a: "With consistent posting and engagement, most accounts see noticeable improvement in 4-6 weeks. Compounding audience growth typically kicks in around month 3.",
  },
];

export default function SocialMediaServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Social Media", path: "/services/social-media" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "Social Media Marketing Services",
            description: "Platform strategies, content calendars, and community systems that grow engaged audiences on Instagram, LinkedIn, and beyond.",
            path: "/services/social-media",
          }),
        ]}
      />
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Social Media Growth"
            title="Build audiences that actually engage"
            subtitle="Platform strategies, content systems, and community management designed to turn followers into customers."
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
                  <span className="text-xs font-bold text-[#F59E0B]">{item.step}</span>
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
                  <CheckCircle2 className="h-4 w-4 text-[#F59E0B] mt-0.5 shrink-0" />
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
