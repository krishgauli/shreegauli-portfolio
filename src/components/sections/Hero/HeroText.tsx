import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { Code, Globe, ShoppingCart, Search, Zap } from "lucide-react";

const proofChips = [
  { icon: Code, label: "Next.js" },
  { icon: Globe, label: "WordPress" },
  { icon: ShoppingCart, label: "Shopify" },
  { icon: Search, label: "SEO / AEO / GEO" },
  { icon: Zap, label: "Automation" },
];

export function HeroText() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {/* Eyebrow */}
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/[0.08] text-[#22D3EE] text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse-glow" />
          Full-Stack Web Developer & SEO Consultant — Dallas, TX
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#F8FAFC]">
        I build websites that{" "}
        <span className="text-gradient-brand">rank, convert, and scale.</span>
      </h1>

      {/* Sub */}
      <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
        Custom websites, full-stack web apps, and e-commerce stores — built with
        Next.js, WordPress, and Shopify. Every project ships with SEO, AEO, and
        performance baked in from day one. 14+ projects delivered across
        healthcare, finance, SaaS, and e-commerce.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <GlowButton href="/work">View My Work</GlowButton>
        <GlassButton href="/book">
          Book a Free Call
        </GlassButton>
      </div>

      {/* Proof chips */}
      <div className="flex flex-wrap gap-2 pt-2">
        {proofChips.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-[#94A3B8] font-medium"
          >
            <Icon className="h-3 w-3 text-[#7C3AED]" />
            {label}
          </span>
        ))}
      </div>

      {/* Social proof micro-line */}
      <p className="text-xs text-[#94A3B8]/60">
        Based in Dallas, TX. Building for healthcare, finance, SaaS, and e-commerce teams across the US.
      </p>
    </div>
  );
}
