import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase/PortfolioShowcase";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio | Next.js, WordPress & Shopify Projects",
  description:
    "14+ live websites and web apps built with Next.js, WordPress, and Shopify — with SEO, automation, and measurable results for every project.",
  path: "/work",
  keywords: ["web development portfolio", "Next.js projects", "WordPress projects", "Shopify projects", "SEO case studies"],
});

async function getCaseStudies() {
  try {
    return await prisma.newsArticle.findMany({
      where: { publishedAt: { not: null } },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        source: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 12,
    });
  } catch {
    return [];
  }
}

export default async function WorkPage() {
  const caseStudies = await getCaseStudies();

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Portfolio", path: "/work" }]),
          collectionPageSchema(
            "Web Development Portfolio",
            "14+ live websites and web apps built with Next.js, WordPress, and Shopify — with SEO, automation, and measurable results.",
            "/work",
            caseStudies.map((item, index) => ({
              position: index + 1,
              name: item.title,
              url: `/work/${item.slug}`,
            })),
          ),
        ]}
      />

      <section id="work" className="relative z-10 section-pad px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">Case Studies</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-3">Work that moved real numbers</h1>
            <p className="text-slate-400">Published case studies from the same content source you manage in Admin.</p>
          </div>

          {caseStudies.length === 0 ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-slate-400">
              No case studies are published yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((item) => (
                <article key={item.id} className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/70 hover:border-cyan-500/40 transition-colors">
                  <Link href={`/work/${item.slug}`}>
                    <img
                      src={item.coverImage || "/4.png"}
                      alt={item.title}
                      className="w-full h-44 object-cover"
                    />
                  </Link>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wide text-cyan-400 mb-2">{item.source || "Case Study"}</p>
                    <Link href={`/work/${item.slug}`}>
                      <h2 className="text-lg font-bold text-slate-100 line-clamp-2 hover:text-cyan-300 transition-colors">{item.title}</h2>
                    </Link>
                    {item.excerpt && <p className="text-sm text-slate-400 mt-2 line-clamp-3">{item.excerpt}</p>}
                    <p className="text-xs text-slate-500 mt-3">{new Date(item.publishedAt || new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <PortfolioShowcase />
      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
