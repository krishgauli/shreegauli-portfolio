import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { BookingClient } from "./BookingClient";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Call — Shree Krishna Gauli",
  description:
    "Schedule a free 30-minute strategy call with Shree. Available Monday, Thursday, Friday, Saturday, and Sunday mornings 9 AM–1 PM CT.",
  path: "/book",
  keywords: [
    "book marketing consultation",
    "free SEO strategy call",
    "schedule digital marketing call",
  ],
});

export default function BookPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Book a Call"
            title="Pick a time that works"
            subtitle="30-minute strategy call — no pitch, no pressure. We'll talk about what you're trying to grow and whether I can help."
          />

          <BookingClient />
        </div>
      </section>
    </PageShell>
  );
}
