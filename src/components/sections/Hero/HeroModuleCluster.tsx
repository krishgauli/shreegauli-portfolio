import Image from "next/image";
import { TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";
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
        <p className="text-xs text-[#94A3B8] mt-0.5">Full-Stack Web Developer & SEO Consultant</p>
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
  return (
    <div className="relative flex flex-col gap-3 max-w-sm w-full mx-auto lg:mx-0">
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
      <div className="flex flex-col gap-3">
        {/* Profile card */}
        <div>
          <ProfileCard />
        </div>

        {/* Two metric cards side by side */}
        <div className="grid grid-cols-2 gap-3">
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
        </div>

        {/* Skill badge card */}
        <div>
          <SkillBadgeCard />
        </div>

        {/* Bottom metric */}
        <div>
          <MetricCard
            icon={Zap}
            value="20+ hrs"
            label="Saved / week via automation"
            color="#F59E0B"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
