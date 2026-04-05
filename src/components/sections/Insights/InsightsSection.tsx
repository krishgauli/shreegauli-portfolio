import prisma from "@/lib/prisma";
import { featuredArticleCards } from "@/lib/writing";
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
        categories: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    if (posts.length === 0) return featuredArticleCards;

    return posts.map((post, index) => ({
      id: post.id.toString(),
      title: post.title,
      excerpt: post.excerpt || "",
      href: `/writing/${post.slug}`,
      category: post.categories[0]?.name || "Marketing",
      date: (post.publishedAt || new Date()).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      readTime: `${Math.max(3, Math.ceil((post.excerpt?.length || 100) / 50))} min read`,
      gradient: gradients[index % gradients.length],
    }));
  } catch {
    return featuredArticleCards;
  }
}

export async function InsightsSection() {
  const articles = await getFeaturedArticles();

  return (
    <section id="writing" className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Writing"
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
