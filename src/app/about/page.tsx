import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "About — Shree Krishna Gauli",
  description:
    "Learn about Shree Krishna Gauli, a digital marketing specialist focused on measurable outcomes across SEO, paid media, and automation.",
  path: "/about",
  keywords: ["about shree gauli", "digital marketer dallas", "SEO specialist profile"],
});

const timeline = [
  {
    period: "2024 — Present",
    role: "Independent Digital Marketing Specialist",
    description:
      "Working directly with brands on SEO, paid media, social growth, and automation. Building systems that deliver measurable growth without the agency overhead.",
  },
  {
    period: "2022 — 2024",
    role: "Marketing Operations & SEO",
    description:
      "Managed organic and paid channels for healthcare SaaS and e-commerce brands. Built reporting dashboards and automated lead-routing workflows that saved teams 20+ hours weekly.",
  },
  {
    period: "2020 — 2022",
    role: "Digital Marketing Foundations",
    description:
      "Developed core skills in SEO, Google Analytics, advertising platforms, and CRM management. Earned Google Ads and Analytics certifications while working on real campaigns.",
  },
];

const tools = [
  { name: "Ahrefs", category: "SEO" },
  { name: "Screaming Frog", category: "SEO" },
  { name: "Google Search Console", category: "SEO" },
  { name: "GA4", category: "Analytics" },
  { name: "Looker Studio", category: "Analytics" },
  { name: "Meta Ads Manager", category: "Paid" },
  { name: "Google Ads", category: "Paid" },
  { name: "n8n", category: "Automation" },
  { name: "Make", category: "Automation" },
  { name: "HubSpot", category: "CRM" },
  { name: "WordPress", category: "CMS" },
  { name: "Next.js", category: "Dev" },
];

const certifications = [
  "Google Analytics Certified",
  "Google Ads Search Certified",
  "Google Ads Display Certified",
  "HubSpot Inbound Marketing",
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
            {/* Portrait */}
            <ScrollReveal direction="left">
              <ModuleShell className="overflow-hidden" enableHoverLift>
                <div className="h-56 overflow-hidden">
                  <Image
                    src="/shree-gauli.png"
                    alt="Shree Krishna Gauli"
                    width={240}
                    height={224}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-base font-bold text-[#F8FAFC]">Shree Krishna Gauli</p>
                  <p className="text-sm text-[#94A3B8] mt-0.5">Digital Marketing Specialist</p>
                  <p className="text-xs text-[#94A3B8]/60 mt-1">Dallas, TX · Working globally</p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="https://www.linkedin.com/in/gauli/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://github.com/shreegauli"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </ModuleShell>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="right">
              <div>
                <SectionHeader
                  eyebrow="About"
                  title="The short version"
                  align="left"
                  className="mb-6"
                />
                <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                  <p>
                    I&apos;m a digital marketing specialist focused on the work that
                    actually moves the needle — SEO, paid media, social media
                    strategy, and the automation systems that make all of it more
                    consistent and measurable.
                  </p>
                  <p>
                    I&apos;ve worked with brands in healthcare, SaaS, e-commerce, and
                    local services across the US and internationally. My north star
                    is outcomes that matter to the business — not vanity metrics.
                  </p>
                  <p>
                    I work directly with founders and marketing leads. No account
                    managers, no junior handoffs, no multi-week approval chains.
                    You get strategy and execution from the same person — which
                    means faster iteration and better results.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">How I work</h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Every engagement follows the same core methodology, adapted to what the brand actually needs.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Audit First",
                body: "Before any strategy, I audit what exists. Data, channels, content, tracking — everything gets reviewed so we start from facts, not assumptions.",
                color: "#22D3EE",
              },
              {
                title: "Build Systems",
                body: "I don\u2019t just run campaigns — I build the systems around them. Reporting, automation, and processes that keep working after I\u2019m done.",
                color: "#7C3AED",
              },
              {
                title: "Measure Everything",
                body: "Every initiative ties back to a metric. If we can\u2019t measure it, we don\u2019t do it. Monthly reports are clear, actionable, and honest.",
                color: "#34D399",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <ModuleShell className="p-6 h-full">
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="text-base font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.body}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Experience</h2>
          <div className="grid gap-4">
            {timeline.map((item) => (
              <ScrollReveal key={item.period}>
                <ModuleShell className="p-6">
                  <span className="text-xs font-bold text-[#7C3AED]">{item.period}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-1">{item.role}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.description}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Certifications */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Tools */}
          <div>
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Tools</h2>
            <ModuleShell className="p-6">
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool.name}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.08] bg-white/[0.03] text-[#94A3B8]"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </ModuleShell>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Certifications</h2>
            <ModuleShell className="p-6">
              <ul className="flex flex-col gap-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </ModuleShell>
          </div>
        </div>
      </section>

      {/* Personal */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Outside of work</h2>
          <ModuleShell className="p-6">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              When I&apos;m not building campaigns or automation workflows, you&apos;ll
              find me hiking, working on open-source projects, or learning
              whatever the next useful thing is — currently: React, ML pipelines,
              and DevOps fundamentals. I believe the best marketers are the ones
              who never stop learning how things actually work under the hood.
            </p>
          </ModuleShell>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
