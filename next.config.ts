import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
