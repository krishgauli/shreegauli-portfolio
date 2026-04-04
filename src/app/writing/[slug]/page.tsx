import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
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
  const post = await prisma.post.findUnique({
    where: { slug },
    select: { title: true, seoTitle: true, metaDesc: true, excerpt: true, slug: true },
  });

  if (!post) return {};

  return createPageMetadata({
    title: post.seoTitle || post.title,
    description: post.metaDesc || post.excerpt || "",
    path: `/writing/${post.slug}`,
    keywords: [],
  });
}

/* ---------- page ---------- */
export default async function WritingPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, categories: true, tags: true },
  });

  if (!post) notFound();

  return (
    <PageShell>
      <BlogPostingSchema post={post} />
      <BlogPostBody post={post} />
    </PageShell>
  );
}
