import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CaseStudyBody } from "./CaseStudyBody";

interface Params {
  slug: string;
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.id === slug);
  if (!study) return {};

  return createPageMetadata({
    title: `${study.result.length > 50 ? study.result.slice(0, 47) + '...' : study.result} | Case Study`,
    description: `${study.problem} See how ${study.result.toLowerCase()} was achieved through focused ${study.tags.join(", ").toLowerCase()} work.`,
    path: `/work/${study.id}`,
    keywords: study.tags,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.id === slug);

  if (!study) notFound();

  return (
    <PageShell>
      <JsonLd data={breadcrumbSchema([
        { name: "Work", path: "/work" },
        { name: study.title, path: `/work/${study.id}` },
      ])} />
      <CaseStudyBody study={study} />
    </PageShell>
  );
}
