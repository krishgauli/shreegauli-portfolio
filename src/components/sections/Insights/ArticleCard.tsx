import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <ModuleShell
      as="article"
      className="overflow-hidden flex flex-col"
      enableHoverLift
    >
      {/* Gradient header */}
      <div
        className={cn(
          "h-24 bg-gradient-to-br flex items-end p-4",
          article.gradient
        )}
      >
        <span className="px-2 py-0.5 rounded-md bg-[#070B14]/80 text-xs font-semibold text-[#22D3EE]">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="text-base font-bold text-[#F8FAFC] leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed flex-1">
          {article.excerpt}
        </p>

        {/* Meta + link */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
          <Link
            href={article.href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-[#F8FAFC] transition-colors group"
            {...(article.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            Read
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </ModuleShell>
  );
}
