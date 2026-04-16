import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { OpenCookieSettingsButton } from "@/components/legal/OpenCookieSettingsButton";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Choices — Shree Krishna Gauli",
  description:
    "Manage cookie preferences and submit privacy rights requests for access, deletion, correction, or opt-out choices.",
  path: "/privacy-choices",
});

export default function PrivacyChoicesPage() {
  const sections = [
    {
      heading: "Cookie preferences",
      content: (
        <>
          <p>
            You can update your cookie preferences at any time. Essential cookies stay enabled because they are needed
            for core website functions.
          </p>
          <div className="pt-2">
            <OpenCookieSettingsButton />
          </div>
        </>
      ),
    },
    {
      heading: "EU/UK privacy rights",
      content: (
        <>
          <p>If you are in the EU, UK, or Switzerland, you may request to:</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data (subject to legal obligations)</li>
            <li>Restrict or object to certain processing</li>
            <li>Request data portability where applicable</li>
          </ul>
        </>
      ),
    },
    {
      heading: "U.S. state privacy choices",
      content: (
        <>
          <p>
            U.S. residents (including California and other applicable state laws) may request access, deletion,
            correction, and opt-out of sale/sharing for targeted advertising where applicable.
          </p>
          <p>
            This website does not sell personal information for money. If applicable law treats certain ad-tech sharing
            as a "sale" or "sharing", you can use this page to opt out.
          </p>
        </>
      ),
    },
    {
      heading: "How to submit a request",
      content: (
        <>
          <p>
            Submit your request through the{' '}
            <Link className="font-medium text-primary hover:underline" href="/contact">
              contact page
            </Link>{' '}
            or by emailing{' '}
            <a className="font-medium text-primary hover:underline" href="mailto:shreegauli1@gmail.com">
              shreegauli1@gmail.com
            </a>
            .
          </p>
          <p>
            Include the email address used with this site and your request type (access, delete, correct, or opt-out)
            so the request can be processed faster.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Choices", path: "/privacy-choices" }])} />
      <LegalPageLayout
        title="Privacy Choices"
        updatedAt="Last updated: April 2026"
        sections={sections}
        footerTitle="Need help with a request?"
        footerContent={
          <p>
            Contact{' '}
            <a className="font-medium text-primary hover:underline" href="mailto:shreegauli1@gmail.com">
              shreegauli1@gmail.com
            </a>{' '}
            and include “Privacy Request” in the subject line.
          </p>
        }
      />
    </>
  );
}
