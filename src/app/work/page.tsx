import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { TestimonialsSection } from "@/components/sections/Testimonials/TestimonialsSection";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/schema";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio | Next.js, WordPress & Shopify Projects",
  description:
    "Portfolio of digital marketing strategy, automation systems, SEO campaigns, and web projects for 15+ clients. Results-driven work across healthcare, finance, SaaS, and e-commerce.",
  path: "/work",
  keywords: ["web development portfolio", "Next.js projects", "WordPress projects", "Shopify projects", "SEO case studies"],
});

const accentClasses: Record<string, { badge: string; border: string; valueTxt: string }> = {
  violet: {
    badge: "bg-[#7C3AED]/10 text-[#6D28D9] border border-[#7C3AED]/20",
    border: "hover:border-[#7C3AED]/35 hover:shadow-[0_0_0_1px_rgba(124,58,237,0.12),0_20px_60px_-20px_rgba(124,58,237,0.22)]",
    valueTxt: "text-[#6D28D9]",
  },
  cyan: {
    badge: "bg-[#22D3EE]/10 text-[#0E7490] border border-[#22D3EE]/20",
    border: "hover:border-[#22D3EE]/35 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_20px_60px_-20px_rgba(34,211,238,0.18)]",
    valueTxt: "text-[#0E7490]",
  },
  amber: {
    badge: "bg-[#F59E0B]/10 text-[#B45309] border border-[#F59E0B]/20",
    border: "hover:border-[#F59E0B]/35 hover:shadow-[0_0_0_1px_rgba(245,158,11,0.10),0_20px_60px_-20px_rgba(245,158,11,0.15)]",
    valueTxt: "text-[#B45309]",
  },
};

export default function WorkPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "Portfolio", path: "/work" }]),
          collectionPageSchema(
            "Web Development Portfolio",
            "Digital Marketing & Web Portfolio — 15+ clients served across healthcare, finance, SaaS, and e-commerce with SEO, automation, and measurable results.",
            "/work",
            caseStudies.map((item, index) => ({
              position: index + 1,
              name: item.title,
              url: `/work/${item.id}`,
            })),
          ),
        ]}
      />

      <section className="relative z-10 section-pad px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Portfolio"
            title="Work that moved real numbers"
            subtitle="Every project includes the problem, the fix, and the before‑and‑after results."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {caseStudies.map((cs) => {
              const accent = accentClasses[cs.accentColor ?? "violet"];
              return (
                <Link
                  key={cs.id}
                  href={`/work/${cs.id}`}
                  className={`group flex flex-col rounded-3xl overflow-hidden border border-[#D4CFC8] bg-[#FDFAF5] transition-all duration-300 hover:-translate-y-1 ${accent.border}`}
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#EDE8DF] to-[#F5F0E8]">
                    <Image
                      src={cs.thumbnail}
                      alt={cs.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-black/55 backdrop-blur-md text-white border border-white/20 shadow-sm">
                        {cs.client}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-3 p-5 flex-1">
                    <h2 className="text-[15px] font-bold text-[#1A1A1A] leading-snug line-clamp-2 group-hover:text-[#374151] transition-colors">
                      {cs.title}
                    </h2>

                    <div className="flex flex-wrap gap-1.5">
                      {cs.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#EDE8DF] border border-black/[0.08] text-[11px] text-[#6B7280] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {cs.metrics[0] && (
                      <div className="mt-auto pt-3 border-t border-black/[0.07] flex items-center justify-between">
                        <div>
                          <span className={`text-2xl font-black tracking-tight ${accent.valueTxt}`}>
                            {cs.metrics[0].value}
                          </span>
                          <p className="text-[11px] text-[#6B7280] mt-0.5 leading-tight">{cs.metrics[0].label}</p>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-semibold text-[#6B7280] group-hover:text-[#1A1A1A] transition-colors">
                          View case study
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <FinalCTASection />
    </PageShell>
  );
}
