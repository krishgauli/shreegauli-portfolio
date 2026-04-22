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
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Dallas Web Developer & SEO Consultant | Shree Gauli",
  description:
    "Dallas web developer and SEO consultant building custom websites, web apps, and ecommerce stores with Next.js, WordPress, and Shopify. SEO, AEO, GEO, and performance are built in from day one.",
  path: "/",
  keywords: [
    "dallas web developer",
    "dallas seo consultant",
    "full-stack web developer dallas",
    "Next.js developer",
    "WordPress developer dallas",
    "Shopify developer",
    "SEO consultant dallas",
    "web app development",
    "AEO GEO optimization",
  ],
});

export default function Home() {
  const homepageFaqs = [
    { question: "What tech stack do you use?", answer: "I primarily build with Next.js (React, TypeScript, Tailwind CSS) for custom websites and web apps, WordPress for content-driven business sites, and Shopify for e-commerce stores. Backend work uses Prisma, Supabase, and PostgreSQL." },
    { question: "Do you build WordPress and Shopify sites too?", answer: "Yes. I\'ve built 4+ WordPress healthcare sites and a Shopify e-commerce store. WordPress is great for content-heavy businesses that need CMS flexibility. Shopify is ideal for product-based businesses that need optimized e-commerce infrastructure." },
    { question: "How does SEO/AEO/GEO work with web development?", answer: "Every site I build has SEO baked in from day one — semantic HTML, structured data (JSON-LD), dynamic sitemaps, meta tags, Core Web Vitals optimization, and schema markup. AEO (Answer Engine Optimization) ensures your site gets cited by AI search engines like ChatGPT and Perplexity. GEO targets local search visibility." },
    { question: "What\'s your development process?", answer: "Discovery → Design → Development → Launch & Optimize. I start with a deep dive into your business goals, build a wireframe plan, develop with modern tools, and launch with SEO, performance, and analytics in place. Most projects ship in 2–6 weeks." },
    { question: "How long does a project take?", answer: "A standard website takes 1–3 weeks. A full-stack web app with auth, dashboards, and APIs takes 3–6 weeks. SEO retainers run monthly with measurable progress each month. Shopify and WordPress builds typically ship in 1–2 weeks." },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([])} />
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
