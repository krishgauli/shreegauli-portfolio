import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className,
  align = "center",
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <ScrollReveal
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] leading-tight">
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </ScrollReveal>
  );
}
