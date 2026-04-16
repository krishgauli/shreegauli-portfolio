import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Shree Gauli | Web Developer & SEO",
  description:
    "Get in touch for web development, SEO, or automation projects. Next.js, WordPress, Shopify, and SEO/AEO/GEO. Typical response within one business day.",
  path: "/contact",
  keywords: ["contact web developer", "hire SEO consultant", "web development inquiry"],
});

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something that performs"
            as="h1"
            subtitle="Tell me what you're trying to grow and where the bottleneck is. I typically respond within one business day."
          />

          <ContactForm />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="text-base font-semibold text-[#F8FAFC]">Projects I take on</h2>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                Custom websites and web apps built with Next.js, WordPress, or Shopify. Technical SEO audits and ongoing optimization.
                Marketing automation with n8n, CRM integration, and AI-powered follow-up systems.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="text-base font-semibold text-[#F8FAFC]">Response time</h2>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                Most inquiries get a reply within one business day. If your project has a hard deadline or urgent technical issue,
                mention it in the message and I will prioritize accordingly.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="text-base font-semibold text-[#F8FAFC]">What happens next</h2>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                After reviewing your message, I will reply with initial thoughts and whether a short call would help clarify scope.
                No commitment required — the goal is to figure out if I am the right fit before any project starts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
