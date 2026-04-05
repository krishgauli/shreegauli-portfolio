import type { Metadata } from "next";
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
  title: "Marketing Automation Consultant | n8n, CRM, Reporting",
  description:
    "Build n8n workflows, CRM automation, and reporting systems that save time, reduce lead leakage, and improve visibility.",
  path: "/services/automation",
  keywords: [
    "marketing automation consultant",
    "n8n automation",
    "CRM integration",
    "reporting dashboards",
    "workflow automation",
    "business process automation",
  ],
});

const process = [
  {
    step: "01",
    title: "Process Mapping",
    description:
      "Document current manual workflows, identify bottlenecks, and map out the ideal automated state for each process.",
  },
  {
    step: "02",
    title: "Tool Selection",
    description:
      "Choose the right stack for your needs — n8n, Make, Zapier, or custom solutions — based on complexity, budget, and integration requirements.",
  },
  {
    step: "03",
    title: "Workflow Build",
    description:
      "Build automated workflows with error handling, retry logic, and monitoring. Every workflow is production-grade from day one.",
  },
  {
    step: "04",
    title: "CRM Integration",
    description:
      "Connect your CRM, email platform, ad accounts, and internal tools into a unified data pipeline.",
  },
  {
    step: "05",
    title: "Dashboard Setup",
    description:
      "Build live reporting dashboards that pull from all sources. No more manual spreadsheet updates or end-of-month scrambles.",
  },
  {
    step: "06",
    title: "Training & Handoff",
    description:
      "Document everything. Train your team on how to use, maintain, and extend the automations without ongoing dependency on me.",
  },
];

const deliverables = [
  "Process audit and automation roadmap",
  "Custom n8n / Make workflow builds",
  "CRM and tool integrations (HubSpot, Salesforce, etc.)",
  "Live reporting dashboard",
  "Error monitoring and alerting setup",
  "Documentation and team training",
];

const faqs = [
  {
    q: "What tools do you work with?",
    a: "Primarily n8n (self-hosted for full control), but also Make and Zapier depending on the use case. For CRM, I work with HubSpot, Salesforce, Pipedrive, and others. For reporting: Looker Studio, custom dashboards, and Google Sheets as a last resort.",
  },
  {
    q: "How much time can automation actually save?",
    a: "It depends on your current processes, but most clients save 15-25 hours per week across their team. My highest-impact project saved a team of 6 over 30 hours weekly by automating reporting and lead routing.",
  },
  {
    q: "Will I be dependent on you to maintain the workflows?",
    a: "No. Everything I build comes with documentation and training. The goal is to hand off fully functional systems your team can manage. I\u2019m available for ongoing support if needed, but it\u2019s not required.",
  },
  {
    q: "What\u2019s the typical timeline for an automation project?",
    a: "Simple automations (lead routing, notifications) can be built in 1-2 weeks. Complex multi-system integrations with dashboards typically take 4-6 weeks. I scope every project upfront so there are no surprises.",
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
            name: "Reporting & Automation Services",
            description: "Build n8n workflows, CRM automation, and reporting systems that save time, reduce lead leakage, and improve visibility.",
            path: "/services/automation",
          }),
        ]}
      />
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Reporting & Automation"
            title="Eliminate the manual work that slows you down"
            subtitle="n8n workflows, CRM integrations, and reporting dashboards that save 20+ hours per week and eliminate human error."
          />
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
                  <span className="text-xs font-bold text-[#34D399]">{item.step}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-2">{item.title}</h3>
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
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-6">What you get</h2>
          <ModuleShell className="p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#94A3B8]">
                  <CheckCircle2 className="h-4 w-4 text-[#34D399] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
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

      <FinalCTASection />
    </PageShell>
  );
}
