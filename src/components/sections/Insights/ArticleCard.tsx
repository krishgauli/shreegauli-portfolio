import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { Article } from "@/types";
import { cn } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <ModuleShell
      as="article"
      className="group overflow-hidden flex flex-col"
      enableHoverLift
    >
      {article.image ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={article.image}
            alt={article.imageAlt || article.title}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFAF5]/60 via-[#FDFAF5]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <span className="px-2 py-0.5 rounded-md bg-[#FDFAF5]/80 text-xs font-semibold text-[#22D3EE]">
              {article.category}
            </span>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "h-24 bg-gradient-to-br flex items-end p-4",
            article.gradient
          )}
        >
          <span className="px-2 py-0.5 rounded-md bg-[#FDFAF5]/80 text-xs font-semibold text-[#22D3EE]">
            {article.category}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="text-base font-bold text-[#1A1A1A] leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-[#6B7280] leading-relaxed flex-1">
          {article.excerpt}
        </p>

        {/* Meta + link */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/[0.06]">
          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
            <span>{article.date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
          <Link
            href={article.href}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-[#1A1A1A] transition-colors group"
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
