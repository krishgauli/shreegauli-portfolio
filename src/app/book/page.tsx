import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BookingClient } from "./BookingClient";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Free Strategy Call | 30-Minute Consultation",
  description:
    "Schedule a free 30-minute strategy call with Shree. Available Monday, Thursday, Friday, Saturday, and Sunday mornings 9 AM–1 PM CT.",
  path: "/book",
  keywords: [
    "book web development consultation",
    "free strategy call",
    "schedule website consultation",
  ],
});

export default function BookPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Book", path: "/book" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Book a Call"
            title="Pick a time that works"
            as="h1"
            subtitle="30-minute strategy call — no pitch, no pressure. We'll talk about what you're trying to grow and whether I can help."
          />

          <BookingClient />

          <div className="mt-12 space-y-6">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-[#F8FAFC]">What to expect on the call</h2>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                We will spend the first few minutes understanding your current website, tech stack, and business goals. Then I will share
                initial observations — whether that means quick SEO wins, architectural improvements, or automation opportunities.
                You will leave with a clear picture of what the highest-leverage next step is, even if it turns out you do not need my help.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-base font-semibold text-[#F8FAFC]">Who this call is for</h2>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">
                Business owners, founders, and marketing teams who need a custom website, want to improve their search rankings,
                or are looking to automate manual processes like lead follow-up, appointment reminders, or reporting.
                Whether you need a full build or a focused sprint, the call helps us figure out the right scope together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
