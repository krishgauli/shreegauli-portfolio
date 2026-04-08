import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Healthcare & Local Business Marketing Services | SEO, Ads, Automation",
  description:
    "Marketing services built for healthcare practices, dental clinics, and local service businesses — SEO, Google Ads, and lead conversion systems that turn traffic into booked appointments.",
  path: "/lp/marketing-services",
  keywords: ["healthcare marketing services", "local business SEO", "dental marketing consultant", "Google Ads for clinics", "lead conversion for healthcare"],
});

export default function MarketingServicesLandingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Marketing Services", path: "/lp/marketing-services" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="For Healthcare & Local Service Businesses"
            title="Marketing that turns traffic into booked appointments"
            subtitle="You don't need more tactics — you need a system that connects your SEO, ads, and follow-up so leads actually convert. Built specifically for clinics, practices, and local service teams."
          />

          <div className="mb-10 grid gap-6 lg:grid-cols-3">
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">SEO for healthcare & local businesses</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Technical audits, local pack optimization, service-page strategy,
                and content systems built to rank for &quot;near me&quot; and
                high-intent treatment searches.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Google Ads for patient acquisition</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Campaign structure, search term control, landing page alignment,
                and conversion tracking tied to actual appointments booked — not
                vanity clicks.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Lead follow-up & automation</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                CRM workflows, AI call agents, and automated follow-up sequences
                that close the gap between a form fill and a booked consultation.
              </p>
            </ModuleShell>
          </div>

          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
