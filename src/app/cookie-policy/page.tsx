import { OpenCookieSettingsButton } from "@/components/legal/OpenCookieSettingsButton";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy — Shree Krishna Gauli",
  description:
    "Cookie policy for shreegauli.com. Learn which cookies are used, why they are used, and how to control them.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  const sections = [
    {
      heading: "What cookies are used on this site?",
      content: (
        <p>
          This website uses a small set of cookies and similar storage technologies to keep the site functioning,
          remember consent choices, and measure general performance.
        </p>
      ),
    },
    {
      heading: "Cookie categories",
      content: (
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong className="text-on-background">Essential cookies:</strong> Required for security, navigation,
            form handling, and core site functionality.
          </li>
          <li>
            <strong className="text-on-background">Performance cookies:</strong> Help understand how visitors use the
            site so pages and content can be improved.
          </li>
          <li>
            <strong className="text-on-background">Marketing cookies:</strong> May be used to measure campaigns,
            remarketing activity, or related promotional performance.
          </li>
        </ul>
      ),
    },
    {
      heading: "Consent choices",
      content: (
        <p>
          When you first land on the homepage, a cookie banner allows you to accept all cookies, use only necessary
          cookies, or open cookie settings and save custom preferences.
        </p>
      ),
    },
    {
      heading: "How consent is stored",
      content: (
        <p>
          Your cookie preferences may be stored in a browser cookie and local browser storage so the website can
          remember your choice on future visits.
        </p>
      ),
    },
    {
      heading: "Managing cookies",
      content: (
        <>
          <p>
            You can manage or delete cookies at any time through your browser settings. Blocking some cookies may
            affect how parts of the site work.
          </p>
          <div className="pt-2">
            <OpenCookieSettingsButton />
          </div>
        </>
      ),
    },
    {
      heading: "Withdrawing consent",
      content: (
        <p>
          You may withdraw or update consent at any time using Cookie Settings. Changes apply going forward and do not
          affect processing that already occurred before withdrawal.
        </p>
      ),
    },
    {
      heading: "Third-party services",
      content: (
        <p>
          Hosting, analytics, forms, and payment providers may set or rely on cookies under their own policies.
          Please review the relevant provider documentation when applicable.
        </p>
      ),
    },
    {
      heading: "Related policies",
      content: (
        <p>
          For more information about personal data handling, see the{' '}
          <a className="font-medium text-primary hover:underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Cookie Policy", path: "/cookie-policy" }])} />
      <LegalPageLayout
        title="Cookie Policy"
        updatedAt="Last updated: April 2026"
        sections={sections}
        footerTitle="Contact"
        footerContent={
          <p>
            If you have questions about this cookie policy, email{' '}
            <a className="font-medium text-primary hover:underline" href="mailto:shreegauli1@gmail.com">
              shreegauli1@gmail.com
            </a>{' '}
            or use the{' '}
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