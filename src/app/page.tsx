import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar/TrustBar";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase/PortfolioShowcase";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { ResultsStrip } from "@/components/sections/ResultsStrip/ResultsStrip";
import { WhoThisIsForSection } from "@/components/sections/WhoThisIsFor/WhoThisIsForSection";
import { AboutPreview } from "@/components/sections/About/AboutPreview";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { CertificationsCarousel } from "@/components/sections/Certifications/CertificationsCarousel";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { SeoToolPromoSection } from "@/components/sections/SeoToolPromo/SeoToolPromoSection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, personSchema, websiteSearchActionSchema, professionalServiceSchema, speakableSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Dallas Digital Marketing Consultant & Product Manager | Shree Gauli",
  description:
    "Dallas-based Digital Marketing Consultant, Automation Strategist, and Product Manager. SEO, AEO/GEO, paid media, and automation for 15+ clients across the US.",
  path: "/",
  keywords: [
    "dallas digital marketing consultant",
    "dallas seo consultant",
    "automation strategist dallas",
    "product manager dallas",
    "paid media specialist",
    "SEO consultant dallas",
    "AEO GEO optimization",
    "marketing automation",
  ],
});

export default function Home() {
  const homepageFaqs = [
    { question: "What do you specialize in?", answer: "Digital marketing strategy, SEO/AEO/GEO, marketing automation (n8n), paid media, product management, and web development. I help businesses grow through data-driven campaigns and automation systems that save 20+ hours per week." },
    { question: "Do you build websites too?", answer: "Yes. I build websites with Next.js, WordPress, and Shopify. Every project ships with SEO, structured data, and performance optimization baked in from day one." },
    { question: "How does SEO/AEO/GEO work?", answer: "SEO targets traditional search. AEO (Answer Engine Optimization) ensures your content is cited by AI engines like ChatGPT and Perplexity. GEO targets local search visibility. Every engagement includes all three — structured data (JSON-LD), technical SEO, and AI-citation optimization." },
    { question: "What\'s your consulting process?", answer: "Discovery → Strategy → Execution → Reporting. I start with a deep dive into your goals, build a strategy roadmap, execute campaigns or systems, and report on measurable outcomes monthly." },
    { question: "How long does a project take?", answer: "A marketing strategy audit takes 1–2 weeks. Automation system builds take 2–4 weeks. SEO retainers run monthly with compounding results. Web projects ship in 1–6 weeks depending on scope." },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([])} />
      <JsonLd data={faqPageSchema(homepageFaqs)} />
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSearchActionSchema()} />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={speakableSchema(SITE_URL, ["h1", ".sg-hero-subtitle", ".sg-section-title"])} />
      {/* Navigation */}
      <Navbar />

      {/* Main content — all above z-0 background */}
      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust bar */}
        <TrustBar />

        {/* 3. Results Strip — proof immediately after hero */}
        <ResultsStrip />

        {/* 4. Who This Is For — filter visitors early */}
        <WhoThisIsForSection />

        {/* 5. Services */}
        <ServicesSection />

        {/* 6. Featured Work */}
        <FeaturedWorkSection />

        {/* 7. Portfolio — all 10 live websites */}
        <PortfolioShowcase />

        {/* 8. Testimonials */}
        <TestimonialsSection />

        {/* 9. Certifications */}
        <CertificationsCarousel />

        {/* 10. SEO Tool Promo */}
        <SeoToolPromoSection />

        {/* 9. About Preview */}
        <AboutPreview />

        {/* 10. Final CTA */}
        <FinalCTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
