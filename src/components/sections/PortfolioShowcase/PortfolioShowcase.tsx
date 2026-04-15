"use client";

import { ExternalLink, Code, Globe, ShoppingCart } from "lucide-react";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const projects = [
  {
    name: "Tacklers Consulting",
    url: "https://www.tacklersconsulting.com",
    platform: "Next.js",
    type: "Full-Stack Web App",
    icon: Code,
    color: "#7C3AED",
  },
  {
    name: "Focus Your Finance",
    url: "https://focusyourfinance.com",
    platform: "Next.js",
    type: "Finance Platform",
    icon: Code,
    color: "#22D3EE",
  },
  {
    name: "Get Focus Health",
    url: "https://getfocushealth.com",
    platform: "Next.js",
    type: "Health & Wellness Platform",
    icon: Code,
    color: "#7C3AED",
  },
  {
    name: "Focus Data",
    url: "https://focusdata.io",
    platform: "Next.js",
    type: "Data Analytics Platform",
    icon: Code,
    color: "#22D3EE",
  },
  {
    name: "Naperville HWC",
    url: "https://napervillehwclinic.com",
    platform: "Next.js",
    type: "Healthcare Clinic Website",
    icon: Code,
    color: "#7C3AED",
  },
  {
    name: "ERoF White Rock",
    url: "https://erofwhiterock.com",
    platform: "WordPress",
    type: "Healthcare Website",
    icon: Globe,
    color: "#34D399",
  },
  {
    name: "ERoF Lufkin",
    url: "https://eroflufkin.com",
    platform: "WordPress",
    type: "Healthcare Website",
    icon: Globe,
    color: "#34D399",
  },
  {
    name: "ERoF Irving",
    url: "https://erofirving.com",
    platform: "WordPress",
    type: "Healthcare Website",
    icon: Globe,
    color: "#34D399",
  },
  {
    name: "Irving Wellness Clinic",
    url: "https://irvingwellnessclinic.com",
    platform: "WordPress",
    type: "Wellness Clinic Website",
    icon: Globe,
    color: "#34D399",
  },
  {
    name: "Olivia\u2019s Tanghulu",
    url: "https://oliviastanghulu.com",
    platform: "Shopify",
    type: "E-Commerce Store",
    icon: ShoppingCart,
    color: "#F59E0B",
  },
];

export function PortfolioShowcase() {
  return (
    <section className="relative z-10 section-pad px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Portfolio"
          title="10 live websites I built"
          subtitle="Every site is live, in production, and generating results for real businesses. Click to visit."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <ScrollReveal key={project.url} delay={i * 0.05}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full group"
                >
                  <ModuleShell
                    className="p-5 flex flex-col gap-3 h-full transition-all"
                    enableHoverLift
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${project.color}18`,
                          border: `1px solid ${project.color}30`,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: project.color }}
                        />
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#F8FAFC] transition-colors" />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-[#F8FAFC] group-hover:text-white transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-[#94A3B8] mt-0.5">
                        {project.type}
                      </p>
                    </div>

                    <span
                      className="inline-flex self-start items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${project.color}12`,
                        border: `1px solid ${project.color}25`,
                        color: project.color,
                      }}
                    >
                      {project.platform}
                    </span>
                  </ModuleShell>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
