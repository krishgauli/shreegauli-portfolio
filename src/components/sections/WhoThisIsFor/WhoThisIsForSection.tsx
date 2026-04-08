import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const goodFit = [
  "You're spending $3K–$10K+/mo on ads and leads aren't converting",
  "Your follow-up process is manual, slow, or nonexistent",
  "You've hired agencies before and the reporting was useless",
  "You need one person who diagnoses and fixes across SEO, ads, and operations",
  "You're in healthcare, local services, or growth-stage SaaS",
];

const notFit = [
  "You need a social media manager to post daily content",
  "You need brand identity, logo design, or video production",
  "You want a 20-person agency team with dedicated account managers",
  "You're pre-revenue and need general business advice",
  "You need enterprise programmatic advertising",
];

export function WhoThisIsForSection() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Best Fit"
          title="Built for teams with a revenue leak — not a traffic problem"
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
