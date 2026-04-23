import type { NextConfig } from "next";

const legacyPageRedirects = [
  {
    source: "/contact-us/:path*",
    destination: "/contact",
    permanent: true,
  },
  {
    source: "/portfolio/:path*",
    destination: "/work",
    permanent: true,
  },
];

const legacyBlogRedirects = [
  {
    source: "/15-questions-to-ask-before-hiring-a-digital-marketing-agency",
    destination: "/blogs/15-questions-hiring-marketing-agency",
    permanent: true,
  },
  {
    source: "/technical-seo-audit-checklist-for-service-business-websites",
    destination: "/blogs/technical-seo-audit-checklist-service-businesses",
    permanent: true,
  },
  {
    source: "/what-your-free-seo-audit-results-actually-mean",
    destination: "/blogs/free-seo-audit-results-explained",
    permanent: true,
  },
  {
    source: "/local-seo-priorities-for-service-businesses-that-need-more-calls",
    destination: "/blogs/local-seo-priorities-service-businesses",
    permanent: true,
  },
  {
    source: "/seo-vs-google-ads-what-to-fix-first-when-growth-stalls",
    destination: "/blogs/seo-vs-google-ads-what-to-fix-first",
    permanent: true,
  },
  {
    source: "/what-is-aeo-answer-engine-optimization",
    destination: "/blogs/what-is-aeo",
    permanent: true,
  },
  {
    source: "/how-to-optimize-your-website-for-ai-search",
    destination: "/blogs/optimize-website-ai-search",
    permanent: true,
  },
  {
    source: "/why-your-leads-arent-converting",
    destination: "/blogs/why-leads-arent-converting",
    permanent: true,
  },
  {
    source: "/seo-services-cost-in-2025",
    destination: "/blogs/seo-services-cost-2025",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      // Canonical host: apex → www. Vercel usually handles this at the edge,
      // but keep a Next-level fallback so split indexing can't regress.
      {
        source: "/:path*",
        has: [{ type: "host", value: "shreegauli.com" }],
        destination: "https://www.shreegauli.com/:path*",
        permanent: true,
      },
      ...legacyPageRedirects,
      ...legacyBlogRedirects,
      {
        source: "/writing",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/writing/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
      {
        source: "/case-studies",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/book-a-demo",
        destination: "/lp/book-a-call",
        permanent: true,
      },
      // Old service pages → new equivalents
      {
        source: "/services/seo",
        destination: "/services/seo-aeo-geo",
        permanent: true,
      },
      {
        source: "/services/local-seo",
        destination: "/services/seo-aeo-geo",
        permanent: true,
      },
      {
        source: "/services/aeo-geo",
        destination: "/services/seo-aeo-geo",
        permanent: true,
      },
      {
        source: "/services/paid-media",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/social-media",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/lead-conversion",
        destination: "/services/automation",
        permanent: true,
      },
      {
        source: "/services/ai-follow-up",
        destination: "/services/automation",
        permanent: true,
      },
      // Old industry pages → portfolio
      {
        source: "/industries/:slug",
        destination: "/work",
        permanent: true,
      },
      // Old Dallas geo pages → homepage
      {
        source: "/dallas/:slug",
        destination: "/",
        permanent: true,
      },
      // Old landing page
      {
        source: "/lp/marketing-services",
        destination: "/services",
        permanent: true,
      },
      // Old case study slugs that no longer exist
      {
        source: "/work/paid-media",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/work/lead-conversion-fix",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
