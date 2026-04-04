"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types";

export function CaseStudyBody({ study }: { study: CaseStudy }) {
  return (
    <article className="relative z-10 section-pad px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All work
        </Link>

        {/* Thumbnail */}
        {study.thumbnail && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
            <img
              src={study.thumbnail}
              alt={study.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED] mb-3 block">
            {study.client}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">
            {study.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-[#7C3AED]/15 px-3 py-1 text-xs font-medium text-[#C4B5FD]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Metrics strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {study.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-xl"
            >
              <p
                className={`text-2xl font-extrabold ${
                  m.positive ? "text-emerald-400" : "text-[#F8FAFC]"
                }`}
              >
                {m.value}
              </p>
              <p className="text-xs text-[#94A3B8] mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Problem / Solution */}
        <section className="space-y-8 mb-12">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-400 mb-3">
              The Problem
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed">{study.problem}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-400 mb-3">
              The Result
            </h2>
            <p className="text-[#CBD5E1] leading-relaxed flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              {study.result}
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
          <p className="text-sm text-[#94A3B8] mb-4">
            Want results like these for your business?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
