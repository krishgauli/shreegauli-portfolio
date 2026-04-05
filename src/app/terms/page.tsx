import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service — Shree Krishna Gauli",
  description:
    "Terms of service for shreegauli.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-3xl mx-auto prose-custom">
          <h1>Terms of Service</h1>
          <p className="text-sm text-[#94A3B8]">Last updated: April 2026</p>

          <h2>1. Overview</h2>
          <p>
            By using shreegauli.com, you agree to these terms. If you do not
            agree, please do not use the site.
          </p>

          <h2>2. Services</h2>
          <p>
            This website provides information about digital marketing services
            offered by Shree Krishna Gauli. Any engagement for services will be
            governed by a separate agreement between you and Shree Krishna
            Gauli.
          </p>

          <h2>3. Client Portal</h2>
          <p>
            If you create an account on the client portal, you are responsible
            for maintaining the security of your credentials. You agree not to
            share your login information with unauthorized parties.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website — including text, design, code, and
            graphics — is owned by Shree Krishna Gauli unless otherwise noted.
            You may not reproduce, distribute, or create derivative works from
            any content without written permission.
          </p>

          <h2>5. Free SEO Tool</h2>
          <p>
            The SEO audit tool at /seo-tools is provided free of charge and
            &quot;as is.&quot; Results are informational only and do not
            constitute professional advice. I am not liable for decisions made
            based on tool output.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            This website is provided &quot;as is&quot; without warranties of any
            kind. I am not liable for any damages arising from your use of this
            site.
          </p>

          <h2>7. Changes to These Terms</h2>
          <p>
            I may update these terms from time to time. Continued use of the
            site after changes constitutes acceptance of the new terms.
          </p>

          <h2>8. Contact</h2>
          <p>
            Questions about these terms? Visit the{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
