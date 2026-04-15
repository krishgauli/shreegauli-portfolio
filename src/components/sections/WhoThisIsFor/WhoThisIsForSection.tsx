import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const goodFit = [
  "You need a custom website or web app built with modern technology",
  "You want SEO, AEO, and performance baked in from day one — not bolted on later",
  "You need a WordPress or Shopify site built by a developer, not a page builder",
  "You want one person who builds, optimizes, and maintains — no agency layers",
  "You're in healthcare, finance, SaaS, or e-commerce and need a web presence that works",
];

const notFit = [
  "You need only logo design, branding, or video production",
  "You want a cheap template site with no custom development",
  "You need a 20-person agency team with project managers and account reps",
  "You're looking for enterprise Java, .NET, or legacy system development",
  "You need mobile app development (iOS/Android native)",
];

export function WhoThisIsForSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Best Fit"
          title="Built for businesses that need a website that works — not just looks good"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Good fit */}
          <ScrollReveal direction="left">
            <div className="module-panel p-6 md:p-8 h-full">
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">
                You&apos;re a good fit if&hellip;
              </h3>
              <ul className="space-y-4">
                {goodFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-[#94A3B8] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Not fit */}
          <ScrollReveal direction="right">
            <div className="module-panel p-6 md:p-8 h-full">
              <h3 className="text-lg font-semibold text-[#F8FAFC] mb-6">
                This isn&apos;t the right fit if&hellip;
              </h3>
              <ul className="space-y-4">
                {notFit.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-rose-400/70 mt-0.5 shrink-0" />
                    <span className="text-sm text-[#94A3B8] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
