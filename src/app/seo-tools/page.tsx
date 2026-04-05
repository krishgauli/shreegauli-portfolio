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
    </>
  );
}
