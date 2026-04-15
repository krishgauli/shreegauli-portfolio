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
            eyebrow="Free • No Signup • No Limits"
            title="Full-Site SEO Audit"
            as="h1"
            subtitle="Crawl every page of any website and run 50+ SEO checks — crawlability, content, links, performance, schema, and social tags. No paywall. No page cap. Better than paid tools."
          />

          <div className="mt-10">
            <SiteAuditTab />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
