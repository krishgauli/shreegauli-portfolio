import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase/PortfolioShowcase";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio | Next.js, WordPress & Shopify Projects",
  description:
    "14+ live websites and web apps built with Next.js, WordPress, and Shopify — with SEO, automation, and measurable results for every project.",
  path: "/work",
  keywords: ["web development portfolio", "Next.js projects", "WordPress projects", "Shopify projects", "SEO case studies"],
});

export default function WorkPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Portfolio", path: "/work" }]),
          collectionPageSchema(
            "Web Development Portfolio",
            "14+ live websites and web apps built with Next.js, WordPress, and Shopify — with SEO, automation, and measurable results.",
            "/work",
            [
              { position: 1, name: "SEO Growth Case Study", url: "/work/seo-growth" },
              { position: 2, name: "Automation Case Study", url: "/work/automation" },
              { position: 3, name: "SEO Website Launch", url: "/work/seo-website-launch" },
              { position: 4, name: "AI Call Centre", url: "/work/ai-call-centre" },
            ],
          ),
        ]}
      />
      <FeaturedWorkSection />
      <PortfolioShowcase />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
