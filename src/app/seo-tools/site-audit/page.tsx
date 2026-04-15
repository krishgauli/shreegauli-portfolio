import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import SiteAuditClient from './SiteAuditClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Free Site Audit Tool | Crawl & Check 50+ SEO Factors',
  description:
    'Crawl any website and audit 50+ SEO factors — titles, meta descriptions, broken links, schema, performance, and more. SEMrush-level depth, completely free.',
  path: '/seo-tools/site-audit',
  keywords: [
    'free site audit tool',
    'SEO site crawler',
    'website SEO checker',
    'technical SEO audit',
    'site health score',
    'broken link checker',
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
