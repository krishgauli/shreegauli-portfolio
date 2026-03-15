import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { InsightsSection } from "@/components/sections/Insights/InsightsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Writing — Shree Krishna Gauli",
  description:
    "Practical writing on SEO, paid media, marketing operations, and automation systems.",
  path: "/writing",
  keywords: ["marketing articles", "SEO blog", "paid media insights", "automation writing"],
});

export default function WritingPage() {
  return (
    <PageShell>
      <InsightsSection />
      <FinalCTASection />
    </PageShell>
  );
}
