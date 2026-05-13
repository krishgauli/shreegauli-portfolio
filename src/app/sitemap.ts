import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { caseStudies } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // revalidate every hour

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRouteConfigs: RouteConfig[] = [
  // Homepage
  { path: "",                           priority: 1.0, changeFrequency: "weekly" },

  // Core money pages — highest crawl priority
  { path: "/services",                  priority: 0.95, changeFrequency: "monthly" },
  { path: "/services/web-development",  priority: 0.9,  changeFrequency: "monthly" },
  { path: "/services/seo-aeo-geo",      priority: 0.9,  changeFrequency: "monthly" },
  { path: "/services/automation",       priority: 0.9,  changeFrequency: "monthly" },
  { path: "/services/wordpress",        priority: 0.85, changeFrequency: "monthly" },
  { path: "/services/shopify",          priority: 0.85, changeFrequency: "monthly" },
  { path: "/work",                      priority: 0.9,  changeFrequency: "weekly" },
  { path: "/results",                   priority: 0.85, changeFrequency: "monthly" },
  { path: "/about",                     priority: 0.85, changeFrequency: "monthly" },

  // Blog hub + categories
  { path: "/blogs",                     priority: 0.85, changeFrequency: "weekly" },
  { path: "/blogs/category/seo",        priority: 0.75, changeFrequency: "weekly" },
  { path: "/blogs/category/automation", priority: 0.75, changeFrequency: "weekly" },
  { path: "/blogs/category/aeo-geo",    priority: 0.75, changeFrequency: "weekly" },
  { path: "/blogs/category/paid-media", priority: 0.7,  changeFrequency: "weekly" },
  { path: "/blogs/category/healthcare-marketing", priority: 0.7, changeFrequency: "weekly" },

  // Lead capture + tools
  { path: "/book",                      priority: 0.8,  changeFrequency: "monthly" },
  { path: "/lp/book-a-call",            priority: 0.75, changeFrequency: "monthly" },
  { path: "/lp/free-seo-audit",         priority: 0.75, changeFrequency: "monthly" },
  { path: "/seo-tools",                 priority: 0.7,  changeFrequency: "monthly" },
  { path: "/seo-tools/site-audit",      priority: 0.65, changeFrequency: "monthly" },
  { path: "/pricing",                   priority: 0.7,  changeFrequency: "monthly" },
  { path: "/contact",                   priority: 0.75, changeFrequency: "monthly" },

  // Trust / engagement
  { path: "/testimonials",              priority: 0.7,  changeFrequency: "monthly" },
  { path: "/faq",                       priority: 0.65, changeFrequency: "monthly" },
  { path: "/newsletter",                priority: 0.6,  changeFrequency: "monthly" },
  { path: "/working-together",          priority: 0.6,  changeFrequency: "monthly" },

  // Legal / utility — low crawl priority
  { path: "/privacy",                   priority: 0.3,  changeFrequency: "yearly" },
  { path: "/terms",                     priority: 0.3,  changeFrequency: "yearly" },
  { path: "/cookie-policy",             priority: 0.3,  changeFrequency: "yearly" },
  { path: "/privacy-choices",           priority: 0.3,  changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRouteConfigs.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Dynamic blog posts (DB-backed, admin editable)
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await prisma.post.findMany({
      where: { publishedAt: { not: null } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });

    blogEntries = posts.map((post) => ({
      url: `${SITE_URL}/blogs/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Database may not be available during build — continue with static routes only
  }

  // Case study pages (admin-backed NewsArticle + legacy static pages)
  let caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/work/${study.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
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
      priority: 0.8,
    }));

    const seen = new Set(dynamicCaseStudies.map((entry) => entry.url));
    caseStudyEntries = [...dynamicCaseStudies, ...caseStudyEntries.filter((entry) => !seen.has(entry.url))];
  } catch {
    // Keep static entries when DB is unavailable
  }

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
