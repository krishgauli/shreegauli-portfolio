import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Github, Linkedin, Mail } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact — Shree Krishna Gauli",
  description:
    "Get in touch for SEO, paid media, social growth, or marketing automation projects. Typical response within one business day.",
  path: "/contact",
  keywords: ["contact marketing specialist", "hire SEO specialist", "digital marketing consultant"],
});

export default function ContactPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Contact"
            title="Let’s build something that performs"
            subtitle="Tell me what you're trying to grow and where the bottleneck is."
          />

          <ModuleShell className="p-8 md:p-10 flex flex-col gap-8" glowColor="violet">
            <div className="grid gap-4 md:grid-cols-2">
              <GlowButton href="mailto:hello@shreegauli.com" external className="justify-center gap-2">
                <Mail className="h-4 w-4" />
                hello@shreegauli.com
              </GlowButton>
              <GlassButton href="https://calendly.com/shreegauli" external className="justify-center gap-2">
                <Calendar className="h-4 w-4" />
                Book a Call
              </GlassButton>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="https://linkedin.com/in/shreegauli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-content-muted hover:text-content-primary transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/shreegauli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-content-muted hover:text-content-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>

            <p className="text-xs text-content-muted/70 text-center">
              Typical response time: less than 24 hours on business days.
            </p>
          </ModuleShell>
        </div>
      </section>
      <FinalCTASection />
    </PageShell>
  );
}
