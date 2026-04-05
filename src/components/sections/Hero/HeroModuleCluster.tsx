"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";
import { floatAnimation, fadeInVariants, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function ProfileCard() {
  return (
    <div className="module p-5 flex items-center gap-4">
      {/* Avatar */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,#B3873F_0%,#A97B31_100%)]">
        <Image
          src="/shree-gauli.png"
          alt="Shree Krishna Gauli"
          fill
          sizes="64px"
          className="object-cover object-[center_12%] scale-[1.06]"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-[#F8FAFC]">Shree Krishna Gauli</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">Digital Marketing Specialist</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span className="text-xs text-green-400 font-medium">Open to work</span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  value,
  label,
  color,
  className,
}: {
  icon: typeof TrendingUp;
  value: string;
  label: string;
  color: string;
  className?: string;
}) {
  return (
    <div className={cn("module p-4 flex items-center gap-3 min-w-[160px]", className)}>
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <div>
        <p className="text-lg font-bold text-[#F8FAFC] leading-none">{value}</p>
        <p className="text-xs text-[#94A3B8] mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function SkillBadgeCard() {
  const skills = ["SEO", "Meta Ads", "n8n", "Google Analytics", "Content"];
  return (
    <div className="module p-4">
      <p className="text-xs font-semibold text-[#94A3B8] mb-3 uppercase tracking-wider">
        Core Skills
      </p>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-xs text-[#7C3AED] font-medium"
          >
            <CheckCircle2 className="h-2.5 w-2.5" />
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroModuleCluster() {
  const prefersReducedMotion = useReducedMotion();

  const floatProps = prefersReducedMotion
    ? {}
    : { animate: floatAnimation };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative flex flex-col gap-3 max-w-sm w-full mx-auto lg:mx-0"
    >
      {/* Glow behind cluster */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
        }}
      />

      {/* Floating wrapper */}
      <motion.div
        {...floatProps}
        className="flex flex-col gap-3"
      >
        {/* Profile card */}
        <motion.div variants={fadeInVariants}>
          <ProfileCard />
        </motion.div>

        {/* Two metric cards side by side */}
        <motion.div variants={fadeInVariants} className="grid grid-cols-2 gap-3">
          <MetricCard
            icon={TrendingUp}
            value="+340%"
            label="Organic Growth"
            color="#22D3EE"
          />
          <MetricCard
            icon={Users}
            value="4.8x"
            label="Peak ROAS"
            color="#7C3AED"
          />
        </motion.div>

        {/* Skill badge card */}
        <motion.div variants={fadeInVariants}>
          <SkillBadgeCard />
        </motion.div>

        {/* Bottom metric */}
        <motion.div variants={fadeInVariants}>
          <MetricCard
            icon={Zap}
            value="20+ hrs"
            label="Saved / week via automation"
            color="#F59E0B"
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
