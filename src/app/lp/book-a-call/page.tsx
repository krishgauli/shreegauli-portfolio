import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { createPageMetadata } from "@/lib/seo";
import { BookingClient } from "@/app/book/BookingClient";

export const metadata: Metadata = createPageMetadata({
  title: "Book a Call Landing Page — Shree Krishna Gauli",
  description:
    "Book a strategy call to review the bottleneck, current channels, and the next highest-leverage fix.",
  path: "/lp/book-a-call",
  keywords: ["book marketing call", "strategy call", "seo consultation"],
});

export default function BookCallLandingPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            eyebrow="Landing Page"
            title="Book a focused strategy call"
            subtitle="Use this when you already know you want to talk through the bottleneck, the current stack, and the next best move."
          />

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">30 minutes</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">Enough time to diagnose the constraint without turning the call into a vague intro chat.</p>
            </ModuleShell>
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">No pitch deck</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">We focus on your current traffic, offers, tracking, and handoff issues instead of a generic presentation.</p>
            </ModuleShell>
            <ModuleShell className="p-5">
              <p className="text-lg font-semibold text-[#F8FAFC]">Clear next step</p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">You should leave knowing whether the right move is an audit, an execution sprint, or no project at all yet.</p>
            </ModuleShell>
          </div>

          <BookingClient />
        </div>
      </section>
    </PageShell>
  );
}
