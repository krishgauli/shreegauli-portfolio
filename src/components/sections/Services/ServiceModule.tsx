import { Search, TrendingUp, Users, Zap } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Search,
  TrendingUp,
  Users,
  Zap,
};

const colorMap: Record<string, string> = {
  seo: "#22D3EE",
  paid: "#7C3AED",
  social: "#F59E0B",
  automation: "#34D399",
};

export function ServiceModule({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] ?? Zap;
  const color = colorMap[service.id] ?? "#7C3AED";

  return (
    <ModuleShell
      as="article"
      className="p-6 flex flex-col gap-5 h-full"
      enableHoverLift
      enableTilt
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="text-base font-bold text-[#F8FAFC]">{service.title}</h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">{service.description}</p>

        {/* Outcomes */}
        <ul className="flex flex-col gap-1.5 mt-1">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex items-start gap-2 text-xs text-[#94A3B8]">
              <span
                className="w-1 h-1 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: color }}
              />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded-md text-xs font-medium"
            style={{
              backgroundColor: `${color}10`,
              border: `1px solid ${color}20`,
              color: color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </ModuleShell>
  );
}
