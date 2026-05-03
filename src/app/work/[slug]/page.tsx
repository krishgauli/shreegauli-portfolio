import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import prisma from "@/lib/prisma";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CaseStudyBody } from "./CaseStudyBody";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug },
      select: {
        title: true,
        seoTitle: true,
        metaDesc: true,
        excerpt: true,
        slug: true,
      },
    });

    if (article) {
      const seoTitle = article.seoTitle || article.title;
      const suffix = " | Case Study";
      const title = seoTitle.length + suffix.length <= 60 ? `${seoTitle}${suffix}` : seoTitle;

      return createPageMetadata({
        title,
        description: article.metaDesc || article.excerpt || "",
        path: `/work/${article.slug}`,
        keywords: [],
      });
    }
  } catch {
    // fall through to static fallback
  }

  const study = caseStudies.find((cs) => cs.id === slug);
  if (!study) return {};

  return createPageMetadata({
    title: `${study.result.length > 47 ? study.result.slice(0, 44) + '...' : study.result} | Case Study`,
    description: `${study.problem} See how ${study.result.toLowerCase()} was achieved through focused ${study.tags.join(", ").toLowerCase()} work.`,
    path: `/work/${study.id}`,
    keywords: study.tags,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await prisma.newsArticle
    .findUnique({
      where: { slug },
      select: {
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        coverImageAlt: true,
        source: true,
        publishedAt: true,
      },
    })
    .catch(() => null);

  if (article) {
    return (
      <PageShell>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Work", path: "/work" },
            { name: article.title, path: `/work/${article.slug}` },
          ])}
        />

        <article className="mx-auto max-w-5xl py-10 px-4 sm:px-6 lg:px-8">
          {article.coverImage && (
            <Image
              src={article.coverImage}
              alt={article.coverImageAlt || article.title}
              width={1600}
              height={900}
              className="w-full h-auto max-h-120 object-cover rounded-2xl border border-slate-700 mb-8"
            />
          )}

          {article.source && (
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3">{article.source}</p>
          )}

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-3">{article.title}</h1>

          {article.publishedAt && (
            <p className="text-sm text-slate-400 mb-8">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}

          {article.excerpt && (
            <p className="text-lg text-slate-300 leading-relaxed mb-8 border-l-4 border-cyan-500 pl-5 italic">
              {article.excerpt}
            </p>
          )}

          <div
            className="prose prose-slate prose-lg max-w-none dark:prose-invert prose-headings:text-slate-100 prose-p:text-slate-300 prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </PageShell>
    );
  }

  const study = caseStudies.find((cs) => cs.id === slug);

  if (!study) notFound();

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: "Work", path: "/work" },
        { name: study.title, path: `/work/${study.id}` },
      ])} />
      <CaseStudyBody study={study} />
    </PageShell>
  );
}
