import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { BarChart2, Target, Users, Zap, Search } from "lucide-react";

const proofChips = [
  { icon: Search, label: "SEO" },
  { icon: Target, label: "Google Ads" },
  { icon: Zap, label: "Marketing Automation" },
  { icon: BarChart2, label: "Lead Conversion" },
  { icon: Users, label: "AI Follow-Up" },
];

export function HeroText() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {/* Eyebrow */}
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/[0.08] text-[#22D3EE] text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse-glow" />
          Digital Marketing Consultant — Dallas, TX
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#F8FAFC]">
        You&apos;re generating leads.{" "}
        <span className="text-gradient-brand">You&apos;re losing revenue.</span>
      </h1>

      {/* Sub */}
      <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
        I build the system between your ad spend and your closed deals — SEO,
        Google Ads, and automation designed so every lead gets followed up,
        tracked, and converted. For healthcare practices, service businesses,
        and growth-stage teams.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <GlowButton href="/work">See How It Works</GlowButton>
        <GlassButton href="/book">
          Book a Strategy Call
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
        Based in Dallas. Working with healthcare, local services, and SaaS teams across the US.
      </p>
    </div>
  );
}
