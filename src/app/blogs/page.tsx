import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArticleCard } from "@/components/sections/Insights/ArticleCard";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { NewsletterSignupCard } from "@/components/forms/NewsletterSignupCard";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import {
  getStaticArticleCards,
  resolveBlogImage,
  resolveBlogImageAlt,
} from "@/lib/blogs";
import prisma from "@/lib/prisma";
import type { Article } from "@/types";

export const metadata: Metadata = createPageMetadata({
  title: "Digital Marketing Blog | SEO, Ads, Automation Insights",
  description:
    "Practical articles on SEO, paid media, marketing operations, and automation systems from a working consultant.",
  path: "/blogs",
  keywords: ["digital marketing blog", "SEO articles", "paid media insights", "automation blog"],
});

const fallbackArticles = getStaticArticleCards();
const gradients = [
  "from-violet-900/40 to-purple-900/20",
  "from-cyan-900/40 to-teal-900/20",
  "from-amber-900/40 to-orange-900/20",
  "from-emerald-900/40 to-green-900/20",
  "from-rose-900/40 to-pink-900/20",
  "from-blue-900/40 to-indigo-900/20",
];

async function getArticles(): Promise<Article[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { publishedAt: { not: null } },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        coverImage: true,
        coverImageAlt: true,
        categories: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 30,
    });

    const dbArticles = posts.map((post, i) => ({
      id: post.id.toString(),
      title: post.title,
      excerpt: post.excerpt || "",
      href: `/blogs/${post.slug}`,
      category: post.categories[0]?.name || "Marketing",
      date: (post.publishedAt || new Date()).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      readTime: `${Math.max(3, Math.ceil((post.excerpt?.length || 100) / 50))} min read`,
      gradient: gradients[i % gradients.length],
      image: resolveBlogImage(post.coverImage, post.slug),
      imageAlt: resolveBlogImageAlt(post.coverImageAlt, post.title),
    }));

    if (dbArticles.length >= 9) return dbArticles;

    const seen = new Set(dbArticles.map((article) => article.href));
    const supplemental = fallbackArticles.filter((article) => !seen.has(article.href));
    return [...dbArticles, ...supplemental].slice(0, 12);
  } catch {
    // Database may not be available — fall back to static data
    return fallbackArticles;
  }
}

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Blog", path: "/blogs" }]),
          collectionPageSchema(
            "Digital Marketing Blog",
            "Practical articles on SEO, paid media, marketing operations, and automation systems from a working consultant.",
            "/blogs",
            articles.map((a, i) => ({
              position: i + 1,
              name: a.title,
              url: a.href,
            })),
          ),
        ]}
      />
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Blog"
            title="What I write about"
            subtitle="Practical takes on SEO, paid media, and marketing systems."
          />

          <div className="mb-10">
            <NewsletterSignupCard
              source="blog-index"
              title="Get new essays and field notes first"
              subtitle="Useful breakdowns on SEO, paid media, automation, and conversion work without the agency fluff."
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <ScrollReveal key={article.id} delay={i * 0.06}>
                <ArticleCard article={article} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
