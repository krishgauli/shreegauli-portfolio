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
          Next.js, WordPress, Shopify, SEO / AEO / GEO
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#1A1A1A]">
        Dallas Web Developer{" "}
        <span className="text-gradient-brand">& SEO Consultant</span>
      </h1>

      <p className="text-lg sm:text-xl text-[#1A1A1A]/85 leading-relaxed">
        Websites that rank, convert, and scale.
      </p>

      {/* Sub */}
      <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
        Digital Marketing Consultant and Automation Strategist helping businesses grow through SEO, AEO/GEO, paid media, and automation. Product Manager with 15+ clients across healthcare, finance, SaaS, and e-commerce.
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
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs text-[#6B7280] font-medium"
          >
            <Icon className="h-3 w-3 text-[#7C3AED]" />
            {label}
          </span>
        ))}
      </div>

      {/* Social proof micro-line */}
      <p className="text-xs text-[#6B7280]/60">
        Based in Dallas, TX. Building for healthcare, finance, SaaS, and ecommerce teams across the US.
      </p>
    </div>
  );
}
