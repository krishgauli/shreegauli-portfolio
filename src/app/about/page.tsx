import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { AboutPreview } from "@/components/sections/About/AboutPreview";
import { TrustBar } from "@/components/sections/TrustBar/TrustBar";
import { ResultsStrip } from "@/components/sections/ResultsStrip/ResultsStrip";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About — Shree Krishna Gauli",
  description:
    "Learn about Shree Krishna Gauli, a digital marketing specialist focused on measurable outcomes across SEO, paid media, and automation.",
  path: "/about",
  keywords: ["about shree gauli", "digital marketer dallas", "SEO specialist profile"],
});

export default function AboutPage() {
  return (
    <PageShell>
      <AboutPreview />
      <TrustBar />
      <ResultsStrip />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
