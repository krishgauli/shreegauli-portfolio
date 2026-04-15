import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Shree Krishna Gauli | Full-Stack Web Developer & SEO Consultant",
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
        </div>
      </section>
    </PageShell>
  );
}
