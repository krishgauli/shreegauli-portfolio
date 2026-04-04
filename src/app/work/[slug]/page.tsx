import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/lib/data";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";
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
    title: `${study.title} — Shree Krishna Gauli`,
    description: `${study.problem} ${study.result}`,
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
      <CaseStudyBody study={study} />
    </PageShell>
  );
}
