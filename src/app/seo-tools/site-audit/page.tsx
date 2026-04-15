import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import SiteAuditClient from './SiteAuditClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Free Full-Site SEO Audit + Core Web Vitals — No Limits | Shree Gauli',
  description:
    'The only free SEO audit tool that crawls your entire site — 100, 500, or 1,000+ pages. 50+ checks per page, real Core Web Vitals from Google PageSpeed Insights, JS rendering detection, Lighthouse scores. No signup. No paywall. Better than paid tools.',
  path: '/seo-tools/site-audit',
  keywords: [
    'free site audit tool',
    'free SEO crawler',
    'full site SEO audit',
    'SEMrush alternative free',
    'Ahrefs alternative free',
    'website SEO checker',
    'technical SEO audit tool',
    'site health score',
    'broken link checker',
    'crawl entire website free',
    'core web vitals checker free',
    'page speed test free',
    'lighthouse score checker',
  ],
});

export default function SiteAuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'SEO Tools', path: '/seo-tools' },
          { name: 'Site Audit', path: '/seo-tools/site-audit' },
        ])}
      />
      <SiteAuditClient />
    </>
  );
}
