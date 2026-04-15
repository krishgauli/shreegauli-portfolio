import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ModuleShell } from "@/components/shared/ModuleShell";
import { FinalCTASection } from "@/components/sections/FinalCTA/FinalCTASection";
import { CertificationsCarousel } from "@/components/sections/Certifications/CertificationsCarousel";
import { apprenticeships } from "@/lib/credentials";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, credentialListSchema } from "@/lib/schema";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = createPageMetadata({
  title: "About Shree Krishna Gauli | Full-Stack Web Developer & SEO Consultant — Dallas, TX",
  description:
    "Full-stack developer building custom websites and web apps with Next.js, WordPress, and Shopify — plus SEO, AEO/GEO, and automation. 5 verified Acadium apprenticeships. Based in Dallas, working globally.",
  path: "/about",
  keywords: ["about shree gauli", "full-stack web developer dallas", "Next.js developer", "SEO consultant dallas", "acadium certified", "web developer certifications"],
});

const timeline = [
  {
    period: "2024 — Present",
    role: "Full-Stack Web Developer & SEO Consultant",
    description:
      "Building custom websites and web apps with Next.js, WordPress, and Shopify for healthcare, finance, SaaS, and e-commerce businesses. Handling design, development, SEO, and automation end-to-end. 14+ projects shipped.",
  },
  {
    period: "2022 — 2024",
    role: "Web Developer & SEO Specialist",
    description:
      "Built WordPress sites for multi-location healthcare practices. Developed SEO strategies that drove 340% organic growth. Created n8n automation workflows saving 20+ hours weekly. Began transitioning to full-stack JavaScript.",
  },
  {
    period: "2020 — 2022",
    role: "Marketing & Web Foundations",
    description:
      "Developed core skills in SEO, web development, Google Analytics, CRM management, and marketing technology. Started building WordPress sites and learning React/Next.js.",
  },
];

const tools = [
  { name: "Next.js", category: "Framework" },
  { name: "React", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Prisma", category: "ORM" },
  { name: "Supabase", category: "Database" },
  { name: "WordPress", category: "CMS" },
  { name: "Shopify", category: "E-Commerce" },
  { name: "Vercel", category: "Hosting" },
  { name: "VS Code", category: "Editor" },
  { name: "Figma", category: "Design" },
  { name: "Git / GitHub", category: "Version Control" },
  { name: "n8n", category: "Automation" },
  { name: "Ahrefs", category: "SEO" },
  { name: "Google Search Console", category: "SEO" },
  { name: "GA4", category: "Analytics" },
  { name: "ChatGPT / Claude", category: "AI" },
];

const education = [
  {
    school: "University of the People",
    degree: "Bachelor's degree, Business Administration",
  },
  {
    school: "Pearson College London",
    degree: "Level 3 Diploma, Information Technology",
  },
  {
    school: "UK Public College",
    degree: "Diploma, Leadership and Management",
  },
  {
    school: "HubSpot Academy",
    degree: "Digital Marketing",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      {credentialListSchema(
        apprenticeships.map((c) => ({
          name: c.title,
          focus: c.focus,
          issuer: c.issuer,
          dateISO: c.dateISO,
          verifyUrl: c.verifyUrl,
        }))
      ).map((schema, i) => (
        <JsonLd key={`cred-${i}`} data={schema} />
      ))}
      {/* Hero */}
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
            {/* Portrait */}
            <ScrollReveal direction="left">
              <ModuleShell className="overflow-hidden" enableHoverLift>
                <div className="h-56 overflow-hidden">
                  <Image
                    src="/shree-gauli.png"
                    alt="Shree Krishna Gauli"
                    width={240}
                    height={224}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                <div className="p-5">
                  <p className="text-base font-bold text-[#F8FAFC]">Shree Krishna Gauli</p>
                  <p className="text-sm text-[#94A3B8] mt-0.5">Full-Stack Web Developer &amp; SEO Consultant</p>
                  <p className="text-xs text-[#94A3B8]/80 mt-1">14+ Websites Shipped</p>
                  <p className="text-xs text-[#94A3B8]/60 mt-1">Dallas, TX · Working globally</p>
                  <div className="flex gap-3 mt-4">
                    <Link
                      href="https://www.linkedin.com/in/gauli/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </ModuleShell>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="right">
              <div>
                <SectionHeader
                  eyebrow="About"
                  title="The short version"
                  align="left"
                  className="mb-6"
                />
                <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                  <p>
                    I&apos;m a full-stack web developer and SEO consultant who builds
                    custom websites, web apps, and e-commerce stores with Next.js,
                    WordPress, and Shopify. Every project ships with SEO baked in
                    from day one — structured data, technical optimization, and
                    content strategy included.
                  </p>
                  <p>
                    I&apos;ve shipped 14+ projects for healthcare, finance, SaaS, and
                    e-commerce businesses across the US. My stack is React,
                    TypeScript, Tailwind CSS, Prisma, and Supabase for web apps —
                    plus WordPress and Shopify when they&apos;re the right tool.
                  </p>
                  <p>
                    I work directly with founders and business owners. No account
                    managers, no junior handoffs. You get design, development,
                    SEO, and automation from the same person — which means faster
                    iteration and better results.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-2">How I work</h2>
          <p className="text-sm text-[#94A3B8] mb-8 max-w-2xl">
            Every project follows the same core methodology, adapted to what the business actually needs.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                title: "Design",
                body: "Wireframes and visual design in Figma before writing a single line of code. You see the layout, approve it, and then I build it.",
                color: "#22D3EE",
              },
              {
                title: "Develop & Optimize",
                body: "Clean code, fast pages, and SEO built in from the start. Every site ships with structured data, Core Web Vitals tuned, and mobile-first responsive design.",
                color: "#7C3AED",
              },
              {
                title: "Launch & Iterate",
                body: "Deploy to production, set up analytics, and monitor performance. Post-launch SEO, content updates, and automation workflows keep things growing.",
                color: "#34D399",
              },
            ].map((item) => (
              <ScrollReveal key={item.title}>
                <ModuleShell className="p-6 h-full">
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <h3 className="text-base font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.body}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Experience</h2>
          <div className="grid gap-4">
            {timeline.map((item) => (
              <ScrollReveal key={item.period}>
                <ModuleShell className="p-6">
                  <span className="text-xs font-bold text-[#7C3AED]">{item.period}</span>
                  <h3 className="text-base font-bold text-[#F8FAFC] mt-1">{item.role}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.description}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-8">Education</h2>
          <div className="grid gap-4">
            {education.map((item) => (
              <ScrollReveal key={item.school}>
                <ModuleShell className="p-6">
                  <h3 className="text-base font-bold text-[#F8FAFC]">{item.school}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mt-2">{item.degree}</p>
                </ModuleShell>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Tools</h2>
          <ModuleShell className="p-6">
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool.name}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.08] bg-white/[0.03] text-[#94A3B8]"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </ModuleShell>
        </div>
      </section>

      {/* Certifications Carousel */}
      <CertificationsCarousel />

      {/* Personal */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-[#F8FAFC] mb-4">Outside of work</h2>
          <ModuleShell className="p-6">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              When I&apos;m not shipping websites or building automation workflows,
              you&apos;ll find me hiking, contributing to open-source projects, or
              learning whatever the next useful thing is — currently deep into
              AI integrations, edge computing, and DevOps. I believe the best
              developers are the ones who never stop learning how things
              actually work under the hood.
            </p>
          </ModuleShell>
        </div>
      </section>

      <FinalCTASection />
    </PageShell>
  );
}
