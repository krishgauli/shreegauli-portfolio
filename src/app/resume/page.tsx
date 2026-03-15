import type { Metadata } from "next";
import { Download, Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Resume — Shree Krishna Gauli",
  description:
    "Resume and professional summary of Shree Krishna Gauli, focused on SEO, paid media, social growth, and marketing automation.",
  path: "/resume",
  keywords: ["digital marketing resume", "SEO specialist resume", "paid media resume"],
});

const skills = [
  "SEO Strategy",
  "Google Ads & Meta Ads",
  "Social Media Growth",
  "Analytics & Reporting",
  "n8n Workflow Automation",
  "CRM Integrations",
];

export default function ResumePage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Resume"
            title="Experience focused on measurable growth"
            subtitle="Digital marketing execution across SEO, paid acquisition, social strategy, and automation systems."
          />

          <ModuleShell className="p-8 md:p-10 flex flex-col gap-8" glowColor="cyan">
            <div className="space-y-3 text-content-muted leading-relaxed">
              <p>
                I help brands turn fragmented marketing activity into predictable growth systems.
                My work combines strategic planning, campaign execution, and automation to improve
                visibility, efficiency, and revenue outcomes.
              </p>
              <p>
                I’ve supported healthcare, SaaS, e-commerce, and local service teams with end-to-end
                implementation across organic search, paid media, content systems, and operational reporting.
              </p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-content-muted">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-content-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <GlowButton href="/resume.pdf" external className="gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </GlowButton>
              <GlassButton href="mailto:hello@shreegauli.com" external className="gap-2">
                <Mail className="h-4 w-4" />
                Contact Me
              </GlassButton>
            </div>
          </ModuleShell>
        </div>
      </section>
    </PageShell>
  );
}
