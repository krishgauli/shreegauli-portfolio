import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Work — Shree Krishna Gauli",
  description:
    "Case studies and measurable growth outcomes across SEO, paid media, and automation systems.",
  path: "/work",
  keywords: ["marketing case studies", "SEO results", "paid media results", "automation case study"],
});

export default function WorkPage() {
  return (
    <PageShell>
      <FeaturedWorkSection />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
