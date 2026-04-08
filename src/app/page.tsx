import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/Hero/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar/TrustBar";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWork/FeaturedWorkSection";
import { ServicesSection } from "@/components/sections/Services/ServicesSection";
import { ResultsStrip } from "@/components/sections/ResultsStrip/ResultsStrip";
import { WhoThisIsForSection } from "@/components/sections/WhoThisIsFor/WhoThisIsForSection";
import { AboutPreview } from "@/components/sections/About/AboutPreview";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { SeoToolPromoSection } from "@/components/sections/SeoToolPromo/SeoToolPromoSection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, personSchema, professionalServiceSchema, websiteSearchActionSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Consultant Dallas | SEO, Google Ads & Lead Conversion",
  description:
    "Dallas-based marketing consultant specializing in SEO, Google Ads, and lead conversion systems for healthcare practices and service businesses. No agency layers. Strategy and execution from the same person.",
  path: "/",
  keywords: [
    "digital marketing consultant dallas",
    "SEO consultant dallas",
    "Google Ads consultant",
    "lead conversion optimization",
    "healthcare marketing consultant",
  ],
});

export default function Home() {
  const homepageFaqs = [
    { question: "What industries do you specialize in?", answer: "I primarily work with healthcare practices, dental clinics, med spas, and local service businesses. My systems are built for businesses that depend on local lead flow and patient acquisition." },
    { question: "How is working with a consultant different from an agency?", answer: "You work directly with me — no account managers, no layers. I diagnose the problem, build the strategy, and execute the fix. That means faster turnaround, clearer communication, and no wasted retainer spend." },
    { question: "What does a typical engagement look like?", answer: "Most engagements start with a diagnostic — a full audit of your SEO, ads, and lead flow. From there we prioritize the highest-impact fix first and build out a 90-day roadmap. No long-term contracts required." },
    { question: "Do you only work with businesses in Dallas?", answer: "I'm based in Dallas, TX, but I work with clients across the US. Local SEO and Google Business Profile optimization are a core part of my work, but the systems I build work for any geography." },
    { question: "What results can I expect and how fast?", answer: "Timelines vary, but most clients see measurable improvements within 30–60 days. SEO takes longer (3–6 months for compounding gains), while paid media and automation fixes often show results in the first 2–4 weeks." },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([])} />
      <JsonLd data={personSchema()} />
      <JsonLd data={professionalServiceSchema()} />
      <JsonLd data={websiteSearchActionSchema()} />
      <JsonLd data={faqPageSchema(homepageFaqs)} />
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

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. SEO Tool Promo */}
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
