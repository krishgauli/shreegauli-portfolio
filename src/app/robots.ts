import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/login", "/signup", "/forgot-password", "/reset-password", "/api/"],
      },
    ],
    sitemap: "https://shreegauli.com/sitemap.xml",
    host: "https://shreegauli.com",
  };
}
