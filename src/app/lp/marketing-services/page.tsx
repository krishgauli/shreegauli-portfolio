import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { createPageMetadata } from "@/lib/seo";
import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = createPageMetadata({
  title: "Marketing Services Landing Page — Shree Krishna Gauli",
  description:
    "A focused entry point for SEO, paid media, and automation support built around bottlenecks, not bloated retainers.",
  path: "/lp/marketing-services",
  keywords: ["digital marketing services", "seo consultant", "marketing automation consultant"],
});

export default function MarketingServicesLandingPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Landing Page"
            title="Marketing support built around the real bottleneck"
            subtitle="Choose this path when you need direct help with SEO, paid media, reporting, or automation and you want the same person diagnosing and shipping the work."
          />

          <div className="mb-10 grid gap-6 lg:grid-cols-3">
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">SEO and content systems</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Technical audits, service-page strategy, internal linking, and
                content planning that improve both rankings and lead quality.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Google Ads and paid media</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Account cleanup, search term control, landing-page alignment, and
                reporting that focuses on qualified demand rather than vanity ROAS.
              </p>
            </ModuleShell>
            <ModuleShell className="p-6">
              <h2 className="text-xl font-semibold text-[#F8FAFC]">Automation and reporting</h2>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                Lead routing, CRM workflows, dashboards, and operational fixes that
                stop demand generation from breaking after the form fill.
              </p>
            </ModuleShell>
          </div>

          <ContactForm />
        </div>
      </section>
    </PageShell>
  );
}
