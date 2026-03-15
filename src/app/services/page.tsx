import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { ResultsStrip } from "@/components/sections/ResultsStrip/ResultsStrip";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services — Shree Krishna Gauli",
  description:
    "SEO, paid media, social growth, and automation services designed for clear, measurable business growth.",
  path: "/services",
  keywords: ["SEO services", "paid media specialist", "social media growth", "marketing automation"],
});

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesSection />
      <ResultsStrip />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
