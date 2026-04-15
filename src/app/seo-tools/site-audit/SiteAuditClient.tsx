'use client';

import { PageShell } from '@/components/layout/PageShell';
import { SectionHeader } from '@/components/shared/SectionHeader';
import SiteAuditTab from '../SiteAuditTab';

export default function SiteAuditClient() {
  return (
    <PageShell>
      <section className="section-pad relative z-10 px-6">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Site Audit"
            title="Full Website SEO Audit"
            as="h1"
            subtitle="Crawl up to 50 pages and check 50+ SEO factors — crawlability, content, links, performance, schema, and social tags."
          />

          <div className="mt-10">
            <SiteAuditTab />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
