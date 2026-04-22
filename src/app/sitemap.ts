import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { staticWritingPosts } from "@/lib/blogs";
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

  // Dynamic blog posts
  let blogEntries: MetadataRoute.Sitemap = staticWritingPosts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
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

    const seen = new Set(dynamicEntries.map((entry) => entry.url));
    blogEntries = [...dynamicEntries, ...blogEntries.filter((entry) => !seen.has(entry.url))];
  } catch {
    // Database may not be available during build — continue with static routes only
  }

  // Case study pages
  const caseStudyEntries: MetadataRoute.Sitemap = [
    "tacklers-consulting",
    "focus-your-finance",
    "get-focus-health",
    "focus-data",
    "naperville-hwc",
    "erof-white-rock",
    "erof-lufkin",
    "erof-irving",
    "irving-wellness",
    "olivia-tanghulu",
    "seo-growth",
    "automation",
    "seo-website-launch",
    "ai-call-centre",
  ].map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...caseStudyEntries];
}
