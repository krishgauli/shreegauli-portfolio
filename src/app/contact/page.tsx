import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Shree Krishna Gauli | Digital Marketing Consultant",
  description:
    "Get in touch for SEO, paid media, social growth, or marketing automation projects. Typical response within one business day.",
  path: "/contact",
  keywords: ["contact marketing consultant", "hire SEO consultant", "digital marketing inquiry"],
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
            subtitle="Tell me what you're trying to grow and where the bottleneck is. I typically respond within one business day."
          />

          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
