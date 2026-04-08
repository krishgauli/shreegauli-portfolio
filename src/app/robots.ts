import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/login",
          "/signup",
          "/forgot-password",
          "/reset-password",
          "/api/",
          "/_next/",
          "/.next/",
        ],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
    ],
    sitemap: "https://shreegauli.com/sitemap.xml",
  };
}
