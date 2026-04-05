import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ — Shree Krishna Gauli",
  description:
    "Answers to common questions about services, timelines, pricing, communication, and who the work is best suited for.",
  path: "/faq",
  keywords: ["marketing consultant FAQ", "SEO consultant questions", "digital marketing services FAQ"],
});

const faqs = [
  {
    question: "What kinds of projects do you take on?",
    answer:
      "Most work falls into SEO and content systems, Google Ads and paid media cleanup, reporting and automation builds, or diagnostic strategy sprints that clarify what to fix first.",
  },
  {
    question: "Do you work like an agency or like a consultant?",
    answer:
      "This is consultant-led work. You work directly with the same person handling diagnosis, implementation, and reporting rather than a layer of account managers.",
  },
  {
    question: "What happens on the first call?",
    answer:
      "We clarify the current bottleneck, review what has already been tried, and decide whether a strategy sprint, ongoing support, or a one-time project makes sense.",
  },
  {
    question: "Do you offer one-off audits?",
    answer:
      "Yes. SEO audits, Google Ads reviews, messaging reviews, and funnel teardowns are often the best first step when the issue is still unclear.",
  },
  {
    question: "How quickly do you respond?",
    answer:
      "Most inquiries receive a response within one business day. Urgent build timelines can be discussed during scoping.",
  },
  {
    question: "Do you work with businesses outside Dallas?",
    answer:
      "Yes. The work is remote-friendly and structured for founder-led teams and lean marketing departments across the US and beyond.",
  },
  {
    question: "Do you write the content too?",
    answer:
      "Yes when it is part of the engagement. Strategy, page structure, briefs, and conversion-oriented rewrites can all be included depending on scope.",
  },
  {
    question: "Can you manage both SEO and paid media together?",
    answer:
      "Yes, especially when both channels need to share the same landing pages, messaging, and reporting system. Sometimes the better answer is sequencing them instead of doing both at once.",
  },
  {
    question: "Do you build automation inside existing tools?",
    answer:
      "Yes. Most automation work connects existing forms, CRMs, spreadsheets, dashboards, and notification systems rather than forcing a full stack replacement.",
  },
  {
    question: "Do you guarantee rankings or ROAS?",
    answer:
      "No. Good operators do not guarantee outcomes they cannot control. The work focuses on stronger foundations, better decision-making, and measurable improvements in the variables we can influence.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions that usually come up before we start"
            subtitle="If you are deciding whether this is the right fit, these are the answers most buyers want before booking a call."
          />

          <div className="grid gap-5">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 0.04}>
                <ModuleShell className="p-6">
                  <h2 className="text-xl font-semibold text-[#F8FAFC]">{faq.question}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#94A3B8]">{faq.answer}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/working-together"
              className="rounded-2xl bg-[#7C3AED] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
            >
              See how engagements work
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-white/20"
            >
              Ask a specific question
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
