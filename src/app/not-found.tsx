import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found — Shree Krishna Gauli",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070B14] px-6">
      <div className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7C3AED] mb-4">
          404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">
          Page not found
        </h1>
        <p className="text-[#94A3B8] mb-8 leading-relaxed">
          This page doesn&apos;t exist or may have been moved. Here are some places
          you might be looking for:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] text-white hover:opacity-90 transition-opacity"
          >
            Go Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-white/[0.12] text-[#E2E8F0] hover:text-white hover:border-white/[0.2] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl border border-white/[0.12] text-[#E2E8F0] hover:text-white hover:border-white/[0.2] transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
