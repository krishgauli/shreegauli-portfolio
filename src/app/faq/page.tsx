import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "FAQ | Web Development & SEO Questions Answered",
  description:
    "Answers to common questions about web development, SEO services, timelines, pricing, tech stack, and how projects work.",
  path: "/faq",
  keywords: ["web development FAQ", "SEO consultant questions", "Next.js developer FAQ", "website development questions"],
});

const faqs = [
  {
    question: "What technologies do you use?",
    answer:
      "For custom websites and web apps: Next.js, React, TypeScript, Tailwind CSS, Prisma, and Supabase. For CMS sites: WordPress with custom themes. For e-commerce: Shopify with custom theme design. For automation: n8n, OpenAI, Twilio, and various CRM integrations.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "Most standard websites ship in 2–4 weeks. Web applications with complex features take 4–8 weeks. Shopify stores typically take 2–3 weeks. I provide a clear timeline during the scoping call — no guesswork.",
  },
  {
    question: "Do I need a custom Next.js site or will WordPress work?",
    answer:
      "If you need speed, SEO performance, custom interactivity, or a web application — Next.js. If you need a content-heavy site that non-technical team members will update frequently — WordPress. I recommend the right tool based on your actual needs, not what's trendy.",
  },
  {
    question: "Is SEO included with every website?",
    answer:
      "Yes. Every site I build ships with technical SEO foundations: structured data (JSON-LD schema), proper heading hierarchy, meta tags, sitemap, robots.txt, Core Web Vitals optimization, and mobile-first responsive design. Ongoing SEO strategy and content is available as an add-on.",
  },
  {
    question: "What is AEO and why does it matter?",
    answer:
      "AEO (Answer Engine Optimization) is optimizing your content to be cited by AI search engines like ChatGPT, Perplexity, and Gemini. It involves structured data, entity optimization, and formatting that AI models can parse. It matters because more people are searching with AI tools.",
  },
  {
    question: "How much does a website cost?",
    answer:
      "Custom Next.js sites start from $3,000. WordPress sites from $1,500. Shopify stores from $2,000. Exact pricing depends on scope, features, and complexity — every project gets a detailed proposal with fixed pricing before work begins.",
  },
  {
    question: "Do you offer ongoing maintenance?",
    answer:
      "Yes. Maintenance retainers start at $500/month covering updates, performance monitoring, content changes, and iterative SEO improvements. Most clients who need regular updates find this more cost-effective than ad-hoc requests.",
  },
  {
    question: "Do you work with businesses outside Dallas?",
    answer:
      "Yes. All work is remote-friendly. I've shipped projects for businesses across the US — healthcare, finance, SaaS, and e-commerce. Communication runs through async threads, video calls, and project boards.",
  },
  {
    question: "Will I own the code and assets?",
    answer:
      "Yes. All source code, design files, and assets are yours upon project delivery. You get full ownership. I can also set up the repository on your GitHub account from the start.",
  },
  {
    question: "Do you guarantee rankings?",
    answer:
      "No. Anyone who guarantees specific rankings is either lying or gaming the system short-term. What I do guarantee is technically sound SEO implementation, data-driven strategy, and measurable improvements in the variables we can influence.",
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
      <JsonLd data={breadcrumbSchema([{ name: "FAQ", path: "/faq" }])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions that usually come up before we start"
            as="h1"
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
