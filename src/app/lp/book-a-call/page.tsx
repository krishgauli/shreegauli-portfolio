import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BookingClient } from "@/app/book/BookingClient";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Free Strategy Call | Web Development & SEO Consultation",
  description:
    "Book a 30-minute strategy call to review your website, tech stack, and SEO — and map out the next highest-leverage move.",
  path: "/lp/book-a-call",
  keywords: ["book web development call", "free strategy call", "SEO consultation", "website consultation"],
});

export default function BookCallLandingPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "Book a Call", path: "/lp/book-a-call" }])} />
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Landing Page"
            title="Book a focused strategy call"
            subtitle="Use this when you already know you want to talk through your website, tech stack, SEO, or automation needs."
          />

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">30 minutes</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">Enough time to diagnose the constraint without turning the call into a vague intro chat.</p>
            </ModuleShell>
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">No pitch deck</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">We focus on your current website, SEO performance, and tech requirements instead of a generic presentation.</p>
            </ModuleShell>
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">Clear next step</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">You leave knowing whether the right move is a new build, an SEO sprint, automation setup, or no project at all yet.</p>
            </ModuleShell>
          </div>

          <BookingClient />
        </div>
      </section>
    </PageShell>
  );
}
