import prisma from "@/lib/prisma";
import {
  featuredArticleCards,
  resolveBlogImage,
  resolveBlogImageAlt,
} from "@/lib/blogs";
import { ArticleCard } from "./ArticleCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const gradients = [
  "from-violet-900/40 to-purple-900/20",
  "from-cyan-900/40 to-teal-900/20",
  "from-amber-900/40 to-orange-900/20",
];

async function getFeaturedArticles() {
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
      take: 3,
    });

    if (posts.length === 0) return featuredArticleCards;

    const dbArticles = posts.map((post, index) => ({
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
      gradient: gradients[index % gradients.length],
      image: resolveBlogImage(post.coverImage, post.slug),
      imageAlt: resolveBlogImageAlt(post.coverImageAlt, post.title),
    }));

    if (dbArticles.length >= 3) return dbArticles;

    const seen = new Set(dbArticles.map((article) => article.href));
    const supplemental = featuredArticleCards.filter((article) => !seen.has(article.href));
    return [...dbArticles, ...supplemental].slice(0, 3);
  } catch {
    return featuredArticleCards;
  }
}

export async function InsightsSection() {
  const articles = await getFeaturedArticles();

  return (
    <section id="blogs" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Blog"
          title="What I write about"
          subtitle="Practical takes on SEO, paid media, and marketing systems."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 0.1}>
              <ArticleCard article={article} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
