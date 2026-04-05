import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Services | SEO, Google Ads, Automation",
  description:
    "Get SEO, Google Ads, social media, and automation services from a consultant who ships strategy and execution directly.",
  path: "/services",
  keywords: ["digital marketing services", "SEO services", "Google Ads management", "marketing automation services"],
});

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
          collectionPageSchema(
            "Digital Marketing Services",
            "SEO, Google Ads, social media, and automation services from a consultant who ships strategy and execution directly.",
            "/services",
            [
              { position: 1, name: "SEO & Content Services", url: "/services/seo" },
              { position: 2, name: "Paid Media Services", url: "/services/paid-media" },
              { position: 3, name: "Social Media Marketing", url: "/services/social-media" },
              { position: 4, name: "Reporting & Automation", url: "/services/automation" },
            ],
          ),
        ]}
      />
      <ServicesSection />
      <FinalCTASection />
    </PageShell>
  );
}
