import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title:
    "AI Follow-Up Systems | Respond to Every Lead in Under 60 Seconds",
  description:
    "AI-powered lead follow-up systems using call agents, SMS bots, and chatbots. Ensure every lead gets a response within seconds — not hours. Built on n8n and integrated with your CRM.",
  path: "/services/ai-follow-up",
  keywords: [
    "AI follow-up system",
    "AI call agent",
    "lead response automation",
    "AI chatbot leads",
    "automated lead follow-up",
  ],
});

const process = [
  {
    step: "01",
    title: "Speed-to-Lead Audit",
    description:
      "Measure your current average response time from form fill to first contact. Most businesses discover it takes 4–48 hours — by which point the lead has already called a competitor.",
  },
  {
    step: "02",
    title: "Channel Mapping",
    description:
      "Identify every inbound channel — web forms, phone calls, chat widgets, social DMs — and map which ones have automated responses and which ones rely on manual follow-up.",
  },
  {
    step: "03",
    title: "AI Agent Configuration",
    description:
      "Deploy AI call agents, SMS auto-responders, and chatbot flows configured for your services, qualifying questions, and booking workflows. Every agent is trained on your FAQs and pricing.",
  },
  {
    step: "04",
    title: "CRM Integration",
    description:
      "Connect every AI touchpoint to your CRM so leads are logged, tagged, and routed to the right person automatically. No manual data entry, no lost leads.",
  },
  {
    step: "05",
    title: "Monitoring & Optimization",
    description:
      "Review conversation transcripts, track qualification accuracy, and refine agent scripts weekly. Measure response time, booking rate, and lead-to-revenue conversion.",
  },
];

const deliverables = [
  "AI call agent deployment with custom scripts",
  "SMS auto-response sequences for new leads",
  "Website chatbot with lead qualification logic",
  "CRM integration and lead-routing automation",
  "Real-time response time monitoring dashboard",
  "Weekly optimization of AI agent performance",
];

const faqs = [
  {
    q: "Won't AI follow-up feel robotic to leads?",
    a: "Modern AI call agents use natural language processing and sound conversational — not scripted. Most leads can't tell they're talking to AI. The key is training the agent on your specific services, tone, and qualifying questions. A well-configured AI agent outperforms a human receptionist who puts leads on hold for 5 minutes.",
  },
  {
    q: "What systems does the AI integrate with?",
    a: "The AI agents integrate with any CRM that has an API — GoHighLevel, HubSpot, Salesforce, and most industry-specific systems. Phone integrations work with Twilio, Vapi, and standard SIP/VoIP setups. All workflows are built on n8n for full transparency and customization.",
  },
  {
    q: "How fast does the AI actually respond?",
    a: "Under 60 seconds for inbound calls and SMS. Chatbot responses are instant. Compare that to the industry average of 47 hours for lead follow-up. Speed-to-lead is the single biggest factor in conversion — leads contacted within 5 minutes are 21x more likely to convert.",
  },
  {
    q: "What happens when the AI can't answer a question?",
    a: "The agent is configured with escalation rules. If a lead asks something outside the agent's scope, it seamlessly transfers to a human team member with full context — the conversation transcript, lead details, and qualifying data are passed along so nothing is lost.",
  },
];

export default function AIFollowUpPage() {
  return (
    <PageShell>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: "AI Follow-Up", path: "/services/ai-follow-up" },
          ]),
          faqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
        ]}
      />

      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="AI Follow-Up Systems"
            title="Respond to every lead in under 60 seconds"
            subtitle="Leads that wait 5+ minutes are 10x less likely to convert. AI follow-up systems ensure every inbound lead — call, text, or chat — gets an instant, intelligent response that qualifies, books, and logs automatically."
          />
        </div>
      </section>

      {/* Speed-to-lead callout */}
      <section className="relative z-10 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <ModuleShell className="p-6 md:p-8 border-[#7C3AED]/20">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#7C3AED] mb-2">
                The Speed-to-Lead Problem
              </p>
              <p className="text-lg font-bold text-[#F8FAFC]">
                The average business takes 47 hours to respond to a new lead
              </p>
              <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                By that point, the lead has already contacted 2–3 competitors and
                made a decision. AI follow-up eliminates the gap entirely — responding
                in seconds with a qualified conversation, not a generic
                &quot;thanks for reaching out&quot; email.
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Link
                  href="/services/lead-conversion"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors group"
                >
                  Lead conversion systems
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/industries/healthcare"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors group"
                >
                  Healthcare use cases
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ModuleShell>
          </ScrollReveal>
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
                  <span className="text-xs font-bold text-[#7C3AED]">
                    {item.step}
                  </span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                    {item.description}
                  </p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            What you get
          </h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-[#94A3B8]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#7C3AED] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ModuleShell>
        </div>
      </section>

      {/* Internal links */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">
            Related services
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Lead Conversion Optimization", href: "/services/lead-conversion" },
              { title: "Healthcare Marketing", href: "/industries/healthcare" },
              { title: "Dallas Marketing Consultant", href: "/dallas/marketing-consultant" },
            ].map((link) => (
              <ModuleShell key={link.href} className="p-5">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#7C3AED] hover:text-[#F8FAFC] transition-colors group"
                >
                  {link.title}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">
            Frequently asked questions
          </h2>
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <ModuleShell key={faq.q} className="p-6">
                <h3 className="text-base font-bold text-[#F8FAFC]">{faq.q}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">
                  {faq.a}
                </p>
              </ModuleShell>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
