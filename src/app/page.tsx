import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar/TrustBar";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { ResultsStrip } from "@/components/sections/ResultsStrip/ResultsStrip";
import { AboutPreview } from "@/components/sections/About/AboutPreview";
import { InsightsSection } from "@/components/sections/Insights/InsightsSection";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Shree Krishna Gauli — Digital Marketing Specialist",
  description:
    "SEO, paid media, social media, and automation systems for brands that want clear growth. Based in Dallas. Working globally.",
  path: "/",
  keywords: [
    "digital marketing specialist",
    "SEO",
    "paid media",
    "social media marketing",
    "n8n automation",
    "Shree Krishna Gauli",
    "Dallas",
  ],
});

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main content — all above z-0 background */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust bar */}
        <TrustBar />

        {/* 3. Featured Work */}
        <FeaturedWorkSection />

        {/* 4. Services */}
        <ServicesSection />

        {/* 5. Results Strip */}
        <ResultsStrip />

        {/* 6. About Preview */}
        <AboutPreview />

        {/* 7. Writing / Insights */}
        <InsightsSection />

        {/* 8. Testimonials */}
        <TestimonialsSection />

        {/* 9. Final CTA */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
