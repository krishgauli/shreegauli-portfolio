import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import SeoToolsClient from './SeoToolsClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Free SEO Audit Tool | Check Titles, H1s, Speed, Schema',
  description:
    'Audit any page for titles, meta descriptions, H1s, schema, canonical tags, and other SEO issues in minutes.',
  path: '/seo-tools',
  keywords: [
    'free SEO audit tool',
    'SEO checker online',
    'meta tag analyzer',
    'page speed SEO',
    'on-page SEO analysis',
  ],
});

export default function SeoToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "SEO Tools", path: "/seo-tools" }])} />
      <SeoToolsClient />

      {/* Server-rendered SEO content — visible to crawlers, below the interactive tool */}
      <section className="relative z-10 px-6 pb-20">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#F8FAFC] mb-3">How the free SEO audit tool works</h2>
            <p className="text-sm leading-7 text-[#94A3B8]">
              Enter any URL above to run a comprehensive on-page SEO analysis. The tool fetches your page in real time, parses the HTML,
              and checks over 30 technical SEO factors including title tags, meta descriptions, heading hierarchy, canonical URLs,
              structured data markup, Open Graph tags, image alt attributes, internal links, page speed indicators, and more.
              Results are grouped by severity — critical failures, warnings, and passed checks — so you know exactly what to fix first.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#94A3B8]">
              Use the keyword tab to explore Google Search Console data and find ranking opportunities, low-CTR queries worth optimizing,
              and buried keywords sitting on page two. The backlink tab shows domain authority signals and linking domains.
              Export everything as a printable report with one click.
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-lg font-semibold text-[#F8FAFC] mb-3">What this tool checks</h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm text-[#94A3B8]">
              <li>• Title tag length and keyword placement</li>
              <li>• Meta description presence and length</li>
              <li>• H1, H2, H3 heading structure</li>
              <li>• Canonical URL configuration</li>
              <li>• Open Graph and Twitter Card tags</li>
              <li>• JSON-LD structured data validation</li>
              <li>• Image alt text coverage</li>
              <li>• Internal and external link analysis</li>
              <li>• Page load speed (TTFB)</li>
              <li>• Mobile viewport configuration</li>
              <li>• HTTPS and security headers</li>
              <li>• Robots directives and indexability</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
