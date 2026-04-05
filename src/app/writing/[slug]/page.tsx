import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
import { getStaticWritingPostBySlug, staticWritingPosts } from "@/lib/writing";
import { BlogPostBody } from "./BlogPostBody";

interface Params {
  slug: string;
}

/* ---------- BlogPosting schema ---------- */
function BlogPostingSchema({ post }: { post: { title: string; slug: string; excerpt: string | null; createdAt: Date; updatedAt: Date; featuredImage: string | null; author: { name: string } | null } }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    url: `https://shreegauli.com/writing/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    ...(post.featuredImage && { image: post.featuredImage }),
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

    return createPageMetadata({
      title: staticPost.title,
      description: staticPost.excerpt,
      path: `/writing/${staticPost.slug}`,
      keywords: staticPost.keywords,
    });
  }

  return createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDesc || post.excerpt || "",
    path: `/writing/${post.slug}`,
    keywords: [],
  });
}

export function generateStaticParams() {
  return staticWritingPosts.map((post) => ({ slug: post.slug }));
}

/* ---------- page ---------- */
export default async function WritingPostPage({
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
        featuredImage: dbPost.coverImage,
        author: dbPost.author ? { name: dbPost.author.name } : null,
      };

      pagePost = {
        title: dbPost.title,
        content: dbPost.content,
        excerpt: dbPost.excerpt,
        coverImage: dbPost.coverImage,
        coverImageAlt: dbPost.coverImageAlt,
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
      featuredImage: null,
      author: { name: "Shree Krishna Gauli" },
    };

    pagePost = {
      title: staticPost.title,
      content: staticPost.content,
      excerpt: staticPost.excerpt,
      coverImage: null,
      coverImageAlt: null,
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

  return (
    <PageShell>
      <BlogPostingSchema post={post} />
      <BlogPostBody post={pagePost} />
    </PageShell>
  );
}
