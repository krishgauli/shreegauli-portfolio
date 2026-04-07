"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Bug,
  Layers,
  Unlink,
  Wrench,
  FileText,
  Network,
  CircleDollarSign,
  BarChart3,
  Target,
  LayoutGrid,
  Paintbrush,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  Workflow,
  Database,
  LayoutDashboard,
  TrendingUp,
  KeyRound,
  Timer,
  Zap,
  DollarSign,
  Gauge,
  PhoneMissed,
  Users,
  TrendingDown,
  Search,
  UserPlus,
  Phone,
  Globe,
  MapPin,
  Code,
  Eye,
  MousePointerClick,
  Bot,
  Repeat,
  UserX,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import type { CaseStudy } from "@/types";

/* ── Icon Registry ─────────────────────────────────────────────── */
const iconMap: Record<string, LucideIcon> = {
  bug: Bug,
  layers: Layers,
  unlink: Unlink,
  wrench: Wrench,
  "file-text": FileText,
  network: Network,
  "circle-dollar-sign": CircleDollarSign,
  "bar-chart-3": BarChart3,
  target: Target,
  "layout-grid": LayoutGrid,
  paintbrush: Paintbrush,
  clock: Clock,
  "alert-triangle": AlertTriangle,
  "file-spreadsheet": FileSpreadsheet,
  workflow: Workflow,
  database: Database,
  "layout-dashboard": LayoutDashboard,
  "trending-up": TrendingUp,
  "key-round": KeyRound,
  timer: Timer,
  zap: Zap,
  "dollar-sign": DollarSign,
  gauge: Gauge,
  "phone-missed": PhoneMissed,
  users: Users,
  "trending-down": TrendingDown,
  search: Search,
  "user-plus": UserPlus,
  phone: Phone,
  globe: Globe,
  "map-pin": MapPin,
  code: Code,
  eye: Eye,
  "mouse-pointer-click": MousePointerClick,
  bot: Bot,
  repeat: Repeat,
  "user-x": UserX,
  lightbulb: Lightbulb,
};

function LIcon({ name, className }: { name: string; className?: string }) {
  const C = iconMap[name] ?? Bug;
  return <C className={className} />;
}

/* ── Accent Color System ───────────────────────────────────────── */
const accents = {
  violet: {
    badge: "bg-[#7C3AED]/10 text-[#C4B5FD] border border-[#7C3AED]/25",
    dot: "bg-[#7C3AED]",
    titleSpan: "text-[#7C3AED]",
    metricColors: ["text-[#C4B5FD]", "text-[#22D3EE]", "text-[#F8FAFC]"],
    ctaBtn:
      "bg-[#7C3AED] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]",
    hex: "#7C3AED",
    glow1: "rgba(124,58,237,0.08)",
    glow2: "rgba(34,211,238,0.05)",
  },
  cyan: {
    badge: "bg-[#22D3EE]/10 text-[#A5F3FC] border border-[#22D3EE]/25",
    dot: "bg-[#22D3EE]",
    titleSpan: "text-[#22D3EE]",
    metricColors: ["text-[#A5F3FC]", "text-[#C4B5FD]", "text-[#F8FAFC]"],
    ctaBtn:
      "bg-[#22D3EE] text-[#070B14] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]",
    hex: "#22D3EE",
    glow1: "rgba(34,211,238,0.08)",
    glow2: "rgba(124,58,237,0.05)",
  },
  amber: {
    badge: "bg-[#F59E0B]/10 text-[#FDE68A] border border-[#F59E0B]/25",
    dot: "bg-[#F59E0B]",
    titleSpan: "text-[#F59E0B]",
    metricColors: ["text-[#FDE68A]", "text-[#C4B5FD]", "text-[#F8FAFC]"],
    ctaBtn:
      "bg-[#F59E0B] text-[#070B14] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]",
    hex: "#F59E0B",
    glow1: "rgba(245,158,11,0.08)",
    glow2: "rgba(124,58,237,0.05)",
  },
};

/* ── Strategy card color map ───────────────────────────────────── */
const strategyColor: Record<string, string> = {
  violet: "bg-[#7C3AED]/15 text-[#7C3AED]",
  cyan: "bg-[#22D3EE]/15 text-[#22D3EE]",
  amber: "bg-[#F59E0B]/15 text-[#F59E0B]",
};

/* ── Animation helpers ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
const ease = [0.22, 1, 0.36, 1] as const;

/* ── Main Component ────────────────────────────────────────────── */
export function CaseStudyBody({ study }: { study: CaseStudy }) {
  const a = accents[study.accentColor ?? "violet"];
  const hasDetail = !!(
    study.challengeItems?.length && study.strategyItems?.length
  );

  return (
    <article className="relative overflow-hidden">
      {/* Background glow orbs */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: a.glow1 }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: a.glow2 }}
      />

      <div className="max-w-5xl mx-auto px-6 py-20 md:py-32 relative z-10">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          All Case Studies
        </Link>

        {/* ─── 1. HERO ────────────────────────────────── */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-24 md:mb-32"
        >
          <div
            className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full ${a.badge}`}
          >
            <span className={`w-2 h-2 rounded-full ${a.dot} animate-pulse`} />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              {study.client} Case Study
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#F8FAFC] tracking-tight leading-[1.08] mb-6">
            {study.title}
          </h1>

          {study.subtitle && (
            <p className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              {study.subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs font-medium text-[#94A3B8]"
              >
                {tag}
              </span>
            ))}
            {study.duration && (
              <span
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold ${a.badge}`}
              >
                {study.duration}
              </span>
            )}
          </div>
        </motion.header>

        {/* ─── 2. THE CHALLENGE ───────────────────────── */}
        {hasDetail && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24 md:mb-40 items-start"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-bold uppercase tracking-[0.16em]">
                The Challenge
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight leading-tight">
                {study.challengeHeading ?? study.problem}
              </h2>
              <div className="space-y-4 text-lg text-[#94A3B8] leading-relaxed">
                {study.challengeDescription?.map((p, i) => (
                  <p key={i}>{p}</p>
                )) ?? <p>{study.problem}</p>}
              </div>
            </div>

            <div className="glass p-6 md:p-8 rounded-2xl space-y-8" style={{ borderColor: "rgba(244,63,94,0.12)" }}>
              {study.challengeItems?.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <LIcon
                    name={item.icon}
                    className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"
                  />
                  <div>
                    <h4 className="font-bold text-[#F8FAFC] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#94A3B8]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ─── 3. THE STRATEGY ────────────────────────── */}
        {hasDetail && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mb-24 md:mb-40"
          >
            <div className="text-center mb-16">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${a.badge} text-xs font-bold uppercase tracking-[0.16em] mb-6`}
              >
                The Strategy
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight">
                {study.strategyHeading ?? "A precision approach to growth."}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {study.strategyItems?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.1 * i }}
                  className="glass p-6 md:p-8 rounded-2xl hover:-translate-y-2 transition-all duration-500 group"
                  style={{
                    background: "rgba(15,23,42,0.75)",
                    backdropFilter: "blur(24px)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${strategyColor[item.color ?? "violet"]} flex items-center justify-center mb-6`}
                  >
                    <LIcon name={item.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Quote Banner */}
            {study.quote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.2 }}
                className="mt-12 md:mt-16 glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
                style={{ borderLeftWidth: "4px", borderLeftColor: `${a.hex}60` }}
              >
                {/* Subtle background image overlay */}
                {study.thumbnail && (
                  <div className="absolute inset-0 opacity-[0.04]">
                    <img
                      src={study.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="relative z-10">
                  <p className="text-xl md:text-2xl font-medium text-[#F8FAFC] leading-relaxed italic max-w-3xl mx-auto text-center">
                    &ldquo;{study.quote.text}&rdquo;
                  </p>
                  <p
                    className={`mt-4 text-center text-xs font-bold uppercase tracking-[0.16em] ${a.titleSpan}`}
                  >
                    — {study.quote.author}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* ─── 3b. PROOF IMAGE ─────────────────────────── */}
        {study.proofImage && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="mb-24 md:mb-40"
          >
            <div className="text-center mb-10">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-md ${a.badge} text-xs font-bold uppercase tracking-[0.16em] mb-6`}
              >
                Real Proof
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight">
                Don&apos;t take our word for it — see the data.
              </h2>
            </div>
            <div className="glass rounded-3xl overflow-hidden p-2">
              <Image
                src={study.proofImage.src}
                alt={study.proofImage.alt}
                width={1200}
                height={630}
                className="w-full h-auto rounded-2xl"
                quality={90}
              />
            </div>
            {study.proofImage.caption && (
              <p className="text-center text-sm text-[#94A3B8] mt-4 font-medium">
                {study.proofImage.caption}
              </p>
            )}
          </motion.section>
        )}

        {/* ─── 4. THE IMPACT ──────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mb-24 md:mb-40"
        >
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-[0.16em] mb-6">
              The Impact
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight">
              Measurable results that speak for themselves.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {study.metrics.map((m, i) => {
              const colorClass = a.metricColors[i % 3];
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.12 * i }}
                  className="glass p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:bg-white/[0.06] transition-all duration-500 shadow-xl"
                >
                  {/* Watermark icon */}
                  {m.icon && (
                    <div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.12] transition-opacity duration-500">
                      <LIcon name={m.icon} className="w-20 h-20" />
                    </div>
                  )}

                  <p className="text-[#94A3B8] text-sm font-medium uppercase tracking-[0.16em] mb-4">
                    {m.label}
                  </p>
                  <h3
                    className={`text-5xl md:text-7xl font-black tracking-tighter mb-3 ${colorClass}`}
                  >
                    {m.value}
                  </h3>
                  {m.description && (
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {m.description}
                    </p>
                  )}

                  <div
                    className={`mt-6 pt-6 border-t border-white/5 flex items-center gap-2 ${a.titleSpan} font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  >
                    <span>View Details</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── 5. KEY TAKEAWAY ──────────────────────────── */}
        {study.takeaway && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
            className="mb-24 md:mb-40"
          >
            <div
              className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
              style={{ borderLeftWidth: "4px", borderLeftColor: `${a.hex}80` }}
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${strategyColor[study.accentColor ?? "violet"]}`}
                >
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#94A3B8] mb-3">
                    Key Takeaway
                  </h3>
                  <p className="text-xl md:text-2xl font-medium text-[#F8FAFC] leading-relaxed">
                    {study.takeaway}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* ─── 6. CTA ─────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.25 }}
          className="relative py-16 md:py-24 px-6 md:px-8 rounded-[2rem] overflow-hidden border border-white/10 text-center"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #070B14 100%)",
          }}
        >
          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${a.hex} 0.5px, transparent 0.5px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-[#F8FAFC] leading-tight">
              Ready to scale your{" "}
              <span className={`${a.titleSpan} italic`}>
                organic visibility?
              </span>
            </h2>
            <p className="text-[#94A3B8] text-lg md:text-xl mb-10 leading-relaxed">
              See how a data-driven strategy can transform your digital
              presence. Let&apos;s build something measurable together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 ${a.ctaBtn}`}
              >
                Start a conversation
                <Send className="h-4 w-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 glass rounded-2xl font-bold text-[#F8FAFC] hover:bg-white/[0.06] transition-all duration-300 active:scale-95"
              >
                View all Case Studies
              </Link>
            </div>
            <p className="mt-10 text-slate-500 text-sm font-medium tracking-wide">
              Trusted by 14+ brands across 5 industries
            </p>
          </div>
        </motion.section>
      </div>
    </article>
  );
}
