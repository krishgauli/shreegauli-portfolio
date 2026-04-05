import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Case Studies | SEO, Ads, Automation",
  description:
    "See measurable results across SEO, paid media, and automation projects with strategy, execution details, and outcomes.",
  path: "/work",
  keywords: ["marketing case studies", "SEO results", "paid media case study", "automation case study"],
});

export default function WorkPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Work", path: "/work" }]),
          collectionPageSchema(
            "Digital Marketing Case Studies",
            "Measurable results across SEO, paid media, and automation projects with strategy, execution details, and outcomes.",
            "/work",
            [
              { position: 1, name: "SEO Growth Case Study", url: "/work/seo-growth" },
              { position: 2, name: "Paid Media Case Study", url: "/work/paid-media" },
              { position: 3, name: "Automation Case Study", url: "/work/automation" },
            ],
          ),
        ]}
      />
      <FeaturedWorkSection />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
