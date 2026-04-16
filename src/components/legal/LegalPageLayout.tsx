import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

type LegalSection = {
  heading: string;
  content: ReactNode;
};

type LegalPageLayoutProps = {
  title: string;
  updatedAt: string;
  sections: LegalSection[];
  footerTitle: string;
  footerContent: ReactNode;
};

export function LegalPageLayout({
  title,
  updatedAt,
  sections,
  footerTitle,
  footerContent,
}: LegalPageLayoutProps) {
  return (
    <PageShell>
      <section className="relative z-10 px-6 pb-24 pt-32 md:px-12">
        <article className="mx-auto w-full max-w-4xl rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-[0_12px_48px_rgba(51,104,93,0.06)] md:p-14">
          <header className="mb-14 border-b border-surface-container-low pb-8">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base text-on-surface-variant">{updatedAt}</p>
          </header>

          <div className="space-y-10 text-lg leading-relaxed text-on-background">
            {sections.map((section, index) => (
              <section key={section.heading}>
                <h2 className="mb-5 flex items-center gap-3 font-headline text-2xl font-semibold text-primary">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  {section.heading}
                </h2>
                <div className="space-y-4 text-on-surface-variant">{section.content}</div>
              </section>
            ))}

            <section className="rounded-2xl border border-outline-variant/20 bg-surface-container-low p-7">
              <h2 className="mb-3 font-headline text-xl font-semibold text-primary">{footerTitle}</h2>
              <div className="text-on-surface-variant">{footerContent}</div>
            </section>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
