import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service — Shree Krishna Gauli",
  description:
    "Terms of service for shreegauli.com.",
  path: "/terms",
});

export default function TermsPage() {
  const sections = [
    {
      heading: "Overview",
      content: (
        <p>
          By using shreegauli.com, you agree to these terms. If you do not agree, please do not use the site.
        </p>
      ),
    },
    {
      heading: "Services",
      content: (
        <p>
          This website provides information about web development and SEO services offered by Shree Krishna Gauli.
          Any engagement for services will be governed by a separate agreement between you and Shree Krishna Gauli.
        </p>
      ),
    },
    {
      heading: "Client Portal",
      content: (
        <p>
          If you create an account on the client portal, you are responsible for maintaining the security of your
          credentials. You agree not to share your login information with unauthorized parties.
        </p>
      ),
    },
    {
      heading: "Intellectual Property",
      content: (
        <p>
          All content on this website — including text, design, code, and graphics — is owned by Shree Krishna Gauli
          unless otherwise noted. You may not reproduce, distribute, or create derivative works from any content
          without written permission.
        </p>
      ),
    },
    {
      heading: "Free SEO Tool",
      content: (
        <p>
          The SEO audit tool at /seo-tools is provided free of charge and &quot;as is.&quot; Results are informational only and
          do not constitute professional advice. I am not liable for decisions made based on tool output.
        </p>
      ),
    },
    {
      heading: "Limitation of Liability",
      content: (
        <p>
          This website is provided &quot;as is&quot; without warranties of any kind. I am not liable for any damages arising
          from your use of this site.
        </p>
      ),
    },
    {
      heading: "Changes to These Terms",
      content: (
        <p>
          I may update these terms from time to time. Continued use of the site after changes constitutes acceptance of
          the new terms.
        </p>
      ),
    },
    {
      heading: "Governing law",
      content: (
        <p>
          These terms are governed by applicable laws of the United States and the State of Texas, without regard to
          conflict-of-law principles.
        </p>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Terms of Service", path: "/terms" }])} />
      <LegalPageLayout
        title="Terms of Service"
        updatedAt="Last updated: April 2026"
        sections={sections}
        footerTitle="Contact"
        footerContent={
          <p>
            Questions about these terms? Email{' '}
            <a className="font-medium text-primary hover:underline" href="mailto:shreegauli1@gmail.com">
              shreegauli1@gmail.com
            </a>{' '}
            or visit the{' '}
            <a className="font-medium text-primary hover:underline" href="/contact">
              contact page
            </a>
            .
          </p>
        }
      />
    </>
  );
}
