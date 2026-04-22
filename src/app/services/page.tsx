import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Dallas Web Development, SEO & Automation Services",
  description:
    "Dallas web development, SEO, Shopify, WordPress, and automation services from one hands-on builder handling strategy, design, code, and optimization.",
  path: "/services",
  keywords: ["dallas web development services", "Next.js developer", "WordPress developer dallas", "Shopify developer dallas", "SEO consultant dallas", "marketing automation dallas"],
});

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
          collectionPageSchema(
            "Web Development & SEO Services",
            "Custom websites, web apps, e-commerce stores, SEO, and automation from a full-stack developer who handles design, code, and optimization.",
            "/services",
            [
              { position: 1, name: "Web App Development", url: "/services/web-development" },
              { position: 2, name: "WordPress Development", url: "/services/wordpress" },
              { position: 3, name: "Shopify Development", url: "/services/shopify" },
              { position: 4, name: "SEO / AEO / GEO", url: "/services/seo-aeo-geo" },
              { position: 5, name: "Marketing Automation", url: "/services/automation" },
            ],
          ),
        ]}
      />
      <ServicesSection headingAs="h1" />
      <FinalCTASection />
    </PageShell>
  );
}
