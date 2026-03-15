import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const skills = [
  "SEO Strategy",
  "Google Analytics",
  "Meta Ads",
  "Content Systems",
  "n8n Automation",
  "Project Management",
  "CRM Workflows",
  "WordPress",
];

export function AboutPreview() {
  return (
    <section id="about" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="About"
          title="A quick intro"
          align="left"
          className="mb-10"
        />

        <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Portrait card */}
          <ScrollReveal direction="left">
            <ModuleShell className="overflow-hidden" enableHoverLift>
              {/* Avatar area */}
              <div
                className="h-48 flex items-center justify-center"
                style={{ background: "var(--gradient-brand)" }}
              >
                <span className="text-5xl font-bold text-white">SK</span>
              </div>
              <div className="p-5">
                <p className="text-base font-bold text-[#F8FAFC]">Shree Krishna Gauli</p>
                <p className="text-sm text-[#94A3B8] mt-0.5">Digital Marketing Specialist</p>
                <p className="text-xs text-[#94A3B8]/60 mt-1">Dallas, TX · Working globally</p>
                <div className="flex gap-3 mt-4">
                  <Link
                    href="https://linkedin.com/in/shreegauli"
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
            <div className="flex flex-col gap-6">
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
                  When I&apos;m not building campaigns or automation workflows, you&apos;ll
                  find me hiking, working on open source projects, or learning
                  whatever the next useful thing is (currently: React, ML pipelines,
                  and DevOps fundamentals).
                </p>
              </div>

              {/* Skills */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
                  Core Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-[#F8FAFC] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors group"
              >
                Let&apos;s work together
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
