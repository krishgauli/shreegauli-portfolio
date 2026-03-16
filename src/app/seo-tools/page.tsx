import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import SeoToolsClient from './SeoToolsClient';

export const metadata: Metadata = createPageMetadata({
  title: 'Free SEO Audit Tool — Shree Krishna Gauli',
  description:
    'Instantly audit any URL for title tags, meta descriptions, H1 headings, page speed, Open Graph, schema markup, canonical tags, and more.',
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
  return <SeoToolsClient />;
}
