import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema, serviceSchema } from "@/lib/schema";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Website & Web App Development | Next.js, React, TypeScript",
  description:
    "Custom Next.js websites and full-stack web applications built with React, TypeScript, Tailwind CSS, Prisma, and Supabase. SEO-optimized, performant, and production-ready.",
  path: "/services/web-development",
  keywords: [
    "Next.js developer",
    "web app development",
    "React developer",
    "TypeScript developer",
    "full-stack developer",
    "custom website development",
    "Prisma Supabase developer",
  ],
});

const process = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "Deep dive into your business goals, user needs, and technical requirements. Define the architecture, tech stack, and project roadmap.",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description:
      "Wireframes and UI design tailored to your brand — responsive, accessible, and optimized for conversion. Review and iterate before a line of code is written.",
  },
  {
    step: "03",
    title: "Full-Stack Development",
    description:
      "Build with Next.js App Router, React server components, TypeScript, and Tailwind CSS. Backend with Prisma ORM, PostgreSQL, and API integrations.",
  },
  {
    step: "04",
    title: "Auth, Dashboards & Features",
    description:
      "Implement authentication, client portals, admin dashboards, CMS, forms, and any custom features your project needs.",
  },
  {
    step: "05",
    title: "SEO & Performance",
    description:
      "SEO baked in from day one — structured data, meta tags, sitemaps, Core Web Vitals optimization, and Lighthouse scores above 95.",
  },
  {
    step: "06",
    title: "Launch & Support",
    description:
      "Deploy to Vercel with CI/CD, monitoring, and analytics. Post-launch support to fix, iterate, and optimize based on real data.",
  },
];

const deliverables = [
  "Custom Next.js website or full-stack web application",
  "Responsive design with Tailwind CSS (mobile-first)",
  "Authentication & user management system",
  "Admin dashboard and/or client portal",
  "PostgreSQL database with Prisma ORM",
  "SEO foundation (meta tags, schema markup, sitemap)",
  "Vercel deployment with CI/CD pipeline",
  "Post-launch support & maintenance period",
];

const projects = [
  { name: "Tacklers Consulting", url: "https://www.tacklersconsulting.com/", desc: "Full-stack consulting platform" },
  { name: "Focus Your Finance", url: "https://focusyourfinance.com/", desc: "Finance platform with tools & SEO" },
  { name: "Get Focus Health", url: "https://getfocushealth.com/", desc: "Health & wellness web app" },
  { name: "Focus Data", url: "http://focusdata.io/", desc: "Data analytics dashboard platform" },
  { name: "Naperville HWC", url: "https://napervillehwclinic.com/", desc: "Healthcare clinic with booking system" },
];

const faqs = [
  {
    q: "What is Next.js and why do you use it?",
    a: "Next.js is a React framework that enables server-side rendering, static generation, and API routes — all of which are critical for SEO, performance, and scalability. It's used by Vercel, Netflix, Hulu, and thousands of startups. I use it because it's the best framework for building fast, SEO-friendly websites and web apps.",
  },
  {
    q: "How long does a typical project take?",
    a: "A standard website takes 1–3 weeks. A full-stack web app with authentication, dashboards, and API integrations takes 3–6 weeks. Timelines depend on scope and complexity — I'll provide a clear estimate during our discovery call.",
  },
  {
    q: "Do you handle design too, or just development?",
    a: "Both. I design the UI/UX tailored to your brand and audience, then build it. If you already have designs (Figma, etc.), I can work from those too.",
  },
  {
    q: "Can you add features to an existing Next.js project?",
    a: "Absolutely. I've worked on greenfield builds and existing codebases. Whether you need new features, performance fixes, or a full refactor — I can jump into an existing project.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Web Development", path: "/services/web-development" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "Website & Web App Development",
            description: "Custom Next.js websites and full-stack web applications built with React, TypeScript, Tailwind CSS, Prisma, and Supabase.",
            path: "/services/web-development",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Web Development"
            title="Custom websites and web apps built to perform"
            as="h1"
            subtitle="Next.js, React, TypeScript, Tailwind CSS — full-stack development with SEO, authentication, dashboards, and everything your business needs. No templates. No page builders."
          />
        </div>
      </section>

      {/* Projects Built */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Projects I&apos;ve built with Next.js</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
                <ModuleShell className="p-5 h-full" enableHoverLift>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{p.name}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{p.desc}</p>
                  <p className="text-xs text-[#22D3EE] mt-2">{p.url.replace(/https?:\/\//, '').replace(/\/$/, '')} →</p>
                </ModuleShell>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Development process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full">
                  <span className="text-xs font-bold text-[#22D3EE]">{item.step}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.description}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">What you get</h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <CheckCircle2 className="h-4 w-4 text-[#22D3EE] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ModuleShell>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Tech stack</h2>
          <ModuleShell className="p-6">
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Supabase", "Vercel", "Node.js", "Framer Motion", "shadcn/ui", "Stripe", "OpenAI SDK"].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-[#F8FAFC] font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </ModuleShell>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Frequently asked questions</h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <ModuleShell key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-[#F8FAFC]">{faq.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{faq.a}</p>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="relative z-10 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">Related services</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "WordPress Development", description: "Professional WordPress sites for content-driven businesses.", href: "/services/wordpress" },
              { title: "Shopify Development", description: "E-commerce stores built on Shopify with custom themes.", href: "/services/shopify" },
              { title: "SEO / AEO / GEO", description: "Technical SEO and AI search optimization.", href: "/services/seo-aeo-geo" },
              { title: "Marketing Automation", description: "n8n workflows, CRM, and AI follow-up systems.", href: "/services/automation" },
            ].map((svc) => (
              <Link key={svc.title} href={svc.href}>
                <ModuleShell className="p-5 h-full" enableHoverLift>
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{svc.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{svc.description}</p>
                </ModuleShell>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
