import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import {
  getStaticArticleCards,
  getStaticWritingPostBySlug,
  resolveBlogImage,
  resolveBlogImageAlt,
  staticWritingPosts,
} from "@/lib/blogs";
import { BlogPostBody } from "./BlogPostBody";
import type { Article } from "@/types";

interface Params {
  slug: string;
}

const gradients = [
  "from-violet-900/40 to-purple-900/20",
  "from-cyan-900/40 to-teal-900/20",
  "from-amber-900/40 to-orange-900/20",
  "from-emerald-900/40 to-green-900/20",
  "from-rose-900/40 to-pink-900/20",
  "from-blue-900/40 to-indigo-900/20",
];

/* ---------- BlogPosting schema ---------- */
function BlogPostingSchema({
  post,
  categories,
  tags,
  content,
}: {
  post: { title: string; slug: string; excerpt: string | null; createdAt: Date; updatedAt: Date; featuredImage: string | null; author: { name: string } | null };
  categories?: { name: string }[];
  tags?: { name: string }[];
  content?: string;
}) {
  const wordCount = content ? content.split(/\s+/).length : undefined;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://shreegauli.com/blogs/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt || "",
    url: `https://shreegauli.com/blogs/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    ...(post.featuredImage && { image: post.featuredImage }),
    ...(wordCount && { wordCount }),
    ...(categories?.length && { articleSection: categories.map((c) => c.name).join(", ") }),
    ...(tags?.length && { keywords: tags.map((t) => t.name).join(", ") }),
    author: {
      "@type": "Person",
      name: post.author?.name || "Shree Krishna Gauli",
      url: "https://shreegauli.com",
    },
    publisher: {
      "@type": "Person",
      name: "Shree Krishna Gauli",
      url: "https://shreegauli.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ---------- metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  let post:
    | { title: string; seoTitle: string | null; metaDesc: string | null; excerpt: string | null; slug: string }
    | null = null;

  try {
    post = await prisma.post.findUnique({
      where: { slug },
      select: { title: true, seoTitle: true, metaDesc: true, excerpt: true, slug: true },
    });
  } catch {
    post = null;
  }

  if (!post) {
    const staticPost = getStaticWritingPostBySlug(slug);
    if (!staticPost) return {};

    const suffix = ' | Shree Gauli';
    const staticTitle = staticPost.title.length + suffix.length <= 60
      ? `${staticPost.title}${suffix}`
      : staticPost.title;

    return createPageMetadata({
      title: staticTitle,
      description: staticPost.excerpt,
      path: `/blogs/${staticPost.slug}`,
      keywords: staticPost.keywords,
    });
  }

  const blogTitle = post.seoTitle || post.title;
  const suffix = ' | Shree Gauli';
  const fullTitle = blogTitle.length + suffix.length <= 60
    ? `${blogTitle}${suffix}`
    : blogTitle;

  return createPageMetadata({
    title: fullTitle,
    description: post.metaDesc || post.excerpt || "",
    path: `/blogs/${post.slug}`,
    keywords: [],
  });
}

/* ISR: cache rendered page for 1 hour, revalidate in background */
export const revalidate = 3600;

export async function generateStaticParams() {
  /* Pre-render static markdown posts */
  const staticParams = staticWritingPosts.map((post) => ({ slug: post.slug }));

  /* Also pre-render DB posts at build time */
  try {
    const dbPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    const dbParams = dbPosts.map((p) => ({ slug: p.slug }));
    return [...staticParams, ...dbParams];
  } catch {
    return staticParams;
  }
}

/* ---------- page ---------- */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  let post:
    | {
        title: string;
        slug: string;
        excerpt: string | null;
        createdAt: Date;
        updatedAt: Date;
        featuredImage: string | null;
        author: { name: string } | null;
      }
    | null = null;
  let pagePost:
    | {
        slug: string;
        title: string;
        content: string;
        excerpt: string | null;
        coverImage: string | null;
        coverImageAlt: string | null;
        publishedAt: Date | null;
        updatedAt: Date;
        author: { name: string; avatar: string | null } | null;
        categories: { id: number; name: string }[];
        tags: { id: number; name: string }[];
      }
    | null = null;

  try {
    const dbPost = await prisma.post.findUnique({
      where: { slug },
      include: { author: true, categories: true, tags: true },
    });

    if (dbPost) {
      post = {
        title: dbPost.title,
        slug: dbPost.slug,
        excerpt: dbPost.excerpt,
        createdAt: dbPost.publishedAt || dbPost.updatedAt,
        updatedAt: dbPost.updatedAt,
        featuredImage: resolveBlogImage(dbPost.coverImage, dbPost.slug),
        author: dbPost.author ? { name: dbPost.author.name } : null,
      };

      pagePost = {
        slug: dbPost.slug,
        title: dbPost.title,
        content: dbPost.content,
        excerpt: dbPost.excerpt,
        coverImage: resolveBlogImage(dbPost.coverImage, dbPost.slug),
        coverImageAlt: resolveBlogImageAlt(dbPost.coverImageAlt, dbPost.title),
        publishedAt: dbPost.publishedAt,
        updatedAt: dbPost.updatedAt,
        author: dbPost.author
          ? {
              name: dbPost.author.name,
              avatar: dbPost.author.avatar,
            }
          : null,
        categories: dbPost.categories,
        tags: dbPost.tags,
      };
    }
  } catch {
    post = null;
    pagePost = null;
  }

  if (!post || !pagePost) {
    const staticPost = getStaticWritingPostBySlug(slug);
    if (!staticPost) notFound();

    const publishedAt = new Date(staticPost.publishedAt);
    const updatedAt = new Date(staticPost.updatedAt);

    post = {
      title: staticPost.title,
      slug: staticPost.slug,
      excerpt: staticPost.excerpt,
      createdAt: publishedAt,
      updatedAt,
      featuredImage: staticPost.coverImage || null,
      author: { name: "Shree Krishna Gauli" },
    };

    pagePost = {
      slug: staticPost.slug,
      title: staticPost.title,
      content: staticPost.content,
      excerpt: staticPost.excerpt,
      coverImage: staticPost.coverImage || null,
      coverImageAlt: staticPost.coverImageAlt || staticPost.title,
      publishedAt,
      updatedAt,
      author: { name: "Shree Krishna Gauli", avatar: null },
      categories: [{ id: 1, name: staticPost.category }],
      tags: staticPost.keywords.map((keyword, index) => ({
        id: index + 1,
        name: keyword,
      })),
    };
  }

  let relatedPosts: Article[] = getStaticArticleCards()
    .filter((article) => article.href !== `/blogs/${slug}`)
    .slice(0, 3);

  try {
    const posts = await prisma.post.findMany({
      where: {
        publishedAt: { not: null },
        slug: { not: slug },
      },
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

    const dynamicRelated = posts.map((relatedPost, index) => ({
      id: relatedPost.id.toString(),
      title: relatedPost.title,
      excerpt: relatedPost.excerpt || "",
      href: `/blogs/${relatedPost.slug}`,
      category: relatedPost.categories[0]?.name || "Marketing",
      date: (relatedPost.publishedAt || new Date()).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
      readTime: `${Math.max(3, Math.ceil((relatedPost.excerpt?.length || 120) / 50))} min read`,
      gradient: gradients[index % gradients.length],
      image: resolveBlogImage(relatedPost.coverImage, relatedPost.slug),
      imageAlt: resolveBlogImageAlt(relatedPost.coverImageAlt, relatedPost.title),
    }));

    if (dynamicRelated.length > 0) {
      const seen = new Set(dynamicRelated.map((article) => article.href));
      relatedPosts = [
        ...dynamicRelated,
        ...relatedPosts.filter((article) => !seen.has(article.href)),
      ].slice(0, 3);
    }
  } catch {
    // Fall back to static related posts when the database is unavailable
  }

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: "Blog", path: "/blogs" },
        { name: post.title, path: `/blogs/${post.slug}` },
      ])} />
      <BlogPostingSchema
        post={post}
        categories={pagePost.categories}
        tags={pagePost.tags}
        content={pagePost.content}
      />
      <BlogPostBody post={pagePost} relatedPosts={relatedPosts} />
    </PageShell>
  );
}
