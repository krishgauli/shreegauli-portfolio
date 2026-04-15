import type { NextConfig } from "next";

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
