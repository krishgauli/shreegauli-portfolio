import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ArticleCard } from "@/components/sections/Insights/ArticleCard";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { articles as staticArticles } from "@/lib/data";
import prisma from "@/lib/prisma";
import type { Article } from "@/types";

export const metadata: Metadata = createPageMetadata({
  title: "Writing — Shree Krishna Gauli",
  description:
    "Practical writing on SEO, paid media, marketing operations, and automation systems.",
  path: "/writing",
  keywords: ["marketing articles", "SEO blog", "paid media insights", "automation writing"],
});

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
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        createdAt: true,
        categories: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });

    if (posts.length === 0) return staticArticles;

    return posts.map((post, i) => ({
      id: post.id.toString(),
      title: post.title,
      excerpt: post.excerpt || "",
      href: `/writing/${post.slug}`,
      category: post.categories[0]?.name || "Marketing",
      date: post.createdAt.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      readTime: `${Math.max(3, Math.ceil((post.excerpt?.length || 100) / 50))} min read`,
      gradient: gradients[i % gradients.length],
    }));
  } catch {
    // Database may not be available — fall back to static data
    return staticArticles;
  }
}

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Writing"
            title="What I write about"
            subtitle="Practical takes on SEO, paid media, and marketing systems."
          />

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
