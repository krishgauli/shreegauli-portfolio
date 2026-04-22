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
  title: "Dallas Marketing Automation Consultant | n8n & AI",
  description:
    "Dallas marketing automation consultant building n8n workflows, AI follow-up systems, CRM automations, and appointment reminders for service businesses.",
  path: "/services/automation",
  keywords: [
    "dallas marketing automation consultant",
    "n8n automation",
    "marketing automation",
    "AI chatbot",
    "CRM automation",
    "appointment reminders",
    "review automation",
    "lead follow-up automation",
    "AI call center",
  ],
});

const process = [
  {
    step: "01",
    title: "Workflow Audit",
    description:
      "Map your current lead flow, follow-up process, appointment scheduling, and review collection to identify bottlenecks and manual steps to automate.",
  },
  {
    step: "02",
    title: "Tool Stack Selection",
    description:
      "Select the right tools — n8n for orchestration, Twilio for SMS/voice, OpenAI for AI responses, CRM integration, calendar booking, and review platforms.",
  },
  {
    step: "03",
    title: "Workflow Design",
    description:
      "Design automations from trigger to action: lead capture → qualification → CRM entry → follow-up sequence → booking → reminder → post-visit review request.",
  },
  {
    step: "04",
    title: "Build & Integrate",
    description:
      "Build the workflows in n8n, connect your CRM, configure AI prompts, set up SMS/email templates, and wire everything into your existing tech stack.",
  },
  {
    step: "05",
    title: "Test & Refine",
    description:
      "Run live tests through every automation path. Verify data flows, timing, AI response quality, and fallback logic before going live.",
  },
  {
    step: "06",
    title: "Launch & Monitor",
    description:
      "Deploy to production, monitor execution logs, track conversion rates, and iterate on messaging and timing based on real performance data.",
  },
];

const automationTypes = [
  {
    title: "AI Chatbot Lead Capture",
    description:
      "Website chatbots that qualify leads, answer FAQs, capture contact info, and book appointments — powered by OpenAI, running 24/7.",
  },
  {
    title: "Appointment Reminders & No-Show Recovery",
    description:
      "Automated SMS/email reminders before appointments, plus follow-up sequences for missed appointments to recover lost revenue.",
  },
  {
    title: "Google Review Collection",
    description:
      "Post-visit automation that sends review requests via SMS/email at the right time with direct Google review links.",
  },
  {
    title: "Patient/Client Intake",
    description:
      "Digital intake forms that auto-populate your CRM, trigger pre-appointment workflows, and eliminate paper-based processes.",
  },
  {
    title: "Social Media Auto-Posting",
    description:
      "Content scheduling workflows that repurpose blog posts and updates across platforms automatically via n8n.",
  },
  {
    title: "AI Call Centre & Voice Bots",
    description:
      "Twilio + OpenAI-powered voice bots that answer calls, qualify leads, book appointments, and escalate to humans when needed.",
  },
];

const deliverables = [
  "Custom n8n workflow design & deployment",
  "AI chatbot (OpenAI-powered) for lead capture",
  "Automated appointment reminder sequences",
  "Google review request automation",
  "CRM integration (GoHighLevel, HubSpot, etc.)",
  "SMS/email follow-up sequences via Twilio",
  "Social media auto-posting workflow",
  "Workflow documentation & training",
];

const faqs = [
  {
    q: "What is n8n and why do you use it?",
    a: "n8n is an open-source workflow automation platform — like Zapier but more powerful and cost-effective. It lets me build complex multi-step automations with branching logic, AI integration, and custom code nodes. You can self-host it for full data control.",
  },
  {
    q: "Can you integrate with my existing CRM?",
    a: "Yes. I work with GoHighLevel, HubSpot, Salesforce, and most CRMs that have an API. The automation workflows connect directly to your CRM so leads, appointments, and follow-ups are synced in real time.",
  },
  {
    q: "How much does automation cost?",
    a: "Project pricing depends on the number of workflows and complexity. A basic chatbot + review automation starts around $2,000. Multi-workflow systems with AI, voice bots, and CRM integration are scoped individually.",
  },
  {
    q: "Do I need technical knowledge to manage the automations?",
    a: "No. I design workflows to run autonomously. You get a dashboard to monitor performance and I provide documentation for any adjustments you may need. I also offer ongoing management retainers.",
  },
];

export default function AutomationServicePage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "Automation", path: "/services/automation" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
          serviceSchema({
            name: "Marketing Automation & AI Follow-Up Systems",
            description: "Custom n8n workflows, AI chatbots, appointment reminders, review automation, and CRM integration to automate your lead flow.",
            path: "/services/automation",
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Dallas Automation"
            title="Dallas Marketing Automation Consultant for Faster Follow-Up"
            as="h1"
            subtitle="Custom n8n workflows, AI chatbots, and automated sequences for Dallas businesses that need faster follow-up, cleaner booking flows, and less lead leakage."
          />
        </div>
      </section>

      {/* Automation Types */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">What I automate</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {automationTypes.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <ModuleShell className="p-6 h-full">
                  <h3 className="text-base font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.description}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">How it works</h2>
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

      {/* n8n Templates callout */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ModuleShell className="p-8 text-center">
            <h2 className="text-lg font-bold text-[#F8FAFC]">Pre-built n8n templates available</h2>
            <p className="text-sm text-[#94A3B8] mt-2 max-w-xl mx-auto">
              I maintain a library of battle-tested n8n workflow templates for common automations —
              chatbot lead capture, appointment reminders, review collection, insurance verification,
              and social media posting. These accelerate deployment and reduce cost.
            </p>
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
              { title: "Web App Development", description: "Custom Next.js sites with built-in chatbot and form integrations.", href: "/services/web-development" },
              { title: "WordPress Development", description: "WordPress sites with CRM and automation hooks.", href: "/services/wordpress" },
              { title: "Shopify Development", description: "E-commerce stores with automated review and follow-up.", href: "/services/shopify" },
              { title: "SEO / AEO / GEO", description: "Search optimization that drives the leads your automations capture.", href: "/services/seo-aeo-geo" },
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
