import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { caseStudies } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static routes
  const staticRoutes = [
    "",
    "/book",
    "/work",
    "/services",
    "/services/web-development",
    "/services/wordpress",
    "/services/shopify",
    "/services/seo-aeo-geo",
    "/services/automation",
    "/about",
    "/blogs",
    "/seo-tools",
    "/seo-tools/site-audit",
    "/contact",
    "/pricing",
    "/results",
    "/working-together",
    "/faq",
    "/newsletter",
    "/testimonials",
    "/privacy",
    "/terms",
    "/lp/free-seo-audit",
    "/lp/book-a-call",
    "/cookie-policy",
    "/privacy-choices",
    "/blogs/category/seo",
    "/blogs/category/automation",
    "/blogs/category/aeo-geo",
    "/blogs/category/paid-media",
    "/blogs/category/healthcare-marketing",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic blog posts (DB-backed, admin editable)
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const dynamicEntries = posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    blogEntries = dynamicEntries;
  } catch {
    // Database may not be available during build — continue with static routes only
  }

  // Case study pages (admin-backed NewsArticle + legacy static pages)
  let caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/work/${study.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  try {
    const articles = await prisma.newsArticle.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    const dynamicCaseStudies = articles.map((article) => ({
      url: `${SITE_URL}/work/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const seen = new Set(dynamicCaseStudies.map((entry) => entry.url));
    caseStudyEntries = [...dynamicCaseStudies, ...caseStudyEntries.filter((entry) => !seen.has(entry.url))];
  } catch {
    // Keep static entries when DB is unavailable
  }

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
