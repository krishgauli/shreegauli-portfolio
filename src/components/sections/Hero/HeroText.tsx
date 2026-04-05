"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassButton } from "@/components/shared/GlassButton";
import { heroStagger, fadeUpVariants } from "@/lib/animations";
import { BarChart2, Target, Users, Zap, Search } from "lucide-react";

const proofChips = [
  { icon: Search, label: "SEO" },
  { icon: Target, label: "Paid Media" },
  { icon: Users, label: "Social Growth" },
  { icon: BarChart2, label: "Growth Strategy" },
  { icon: Zap, label: "Automation" },
];

export function HeroText() {
  return (
    <motion.div
      variants={heroStagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 max-w-xl"
    >
      {/* Eyebrow */}
      <motion.div variants={fadeUpVariants}>
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/[0.08] text-[#22D3EE] text-xs font-semibold tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse-glow" />
          Digital Marketing Consultant
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={fadeUpVariants}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[#F8FAFC]"
      >
        Growth systems for brands that need more{" "}
        <span className="text-gradient-brand">qualified demand</span>.
      </motion.h1>

      {/* Sub */}
      <motion.p
        variants={fadeUpVariants}
        className="text-base sm:text-lg text-[#94A3B8] leading-relaxed"
      >
        SEO, Google Ads, social growth, and automation for founders and lean
        teams that want a clearer path from traffic to pipeline.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-3">
        <GlowButton href="/work">See Results</GlowButton>
        <GlassButton href="/book">
          Book a Call
        </GlassButton>
      </motion.div>

      {/* Proof chips */}
      <motion.div
        variants={fadeUpVariants}
        className="flex flex-wrap gap-2 pt-2"
      >
        {proofChips.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-[#94A3B8] font-medium"
          >
            <Icon className="h-3 w-3 text-[#7C3AED]" />
            {label}
          </span>
        ))}
      </motion.div>

      {/* Social proof micro-line */}
      <motion.p
        variants={fadeUpVariants}
        className="text-xs text-[#94A3B8]/60"
      >
        Recent work across healthcare, SaaS, e-commerce, and local services.
      </motion.p>
    </motion.div>
  );
}
