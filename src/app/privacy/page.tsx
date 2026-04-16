import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy — Shree Krishna Gauli",
  description:
    "Privacy policy for shreegauli.com. Learn how your data is collected, used, and protected.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const sections = [
    {
      heading: "Information I Collect",
      content: (
        <>
          <p>When you use this website, I may collect the following types of information:</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-on-background">Contact form submissions:</strong> Name, email address,
              phone number, and any details you include in your message.
            </li>
            <li>
              <strong className="text-on-background">Account information:</strong> If you create a client
              portal account, I store your email and a hashed password.
            </li>
            <li>
              <strong className="text-on-background">Newsletter subscriptions:</strong> Your email address when
              you sign up for updates.
            </li>
            <li>
              <strong className="text-on-background">Analytics data:</strong> Anonymized usage data through
              cookies and similar technologies (pages visited, time on site, referral source).
            </li>
          </ul>
        </>
      ),
    },
    {
      heading: "How I Use Your Information",
      content: (
        <>
          <ul className="list-disc space-y-3 pl-6">
            <li>To respond to inquiries and project requests</li>
            <li>To provide client dashboard access and campaign reporting</li>
            <li>To send marketing newsletters (only if you opted in)</li>
            <li>To improve the website experience based on usage patterns</li>
          </ul>
          <p className="rounded-xl bg-surface-container p-4 text-sm">
            For EU/UK users, the legal bases typically include performance of a contract, legitimate interests, legal
            obligations, and consent where required.
          </p>
        </>
      ),
    },
    {
      heading: "Data Sharing",
      content: (
        <>
          <p>I do not sell your personal information. Data may be shared with:</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong className="text-on-background">Vercel</strong> — hosting provider
            </li>
            <li>
              <strong className="text-on-background">Stripe</strong> — payment processing (if applicable)
            </li>
            <li>
              <strong className="text-on-background">Email service provider</strong> — for sending confirmations
              and newsletters
            </li>
          </ul>
          <p className="rounded-xl bg-surface-container p-4 text-sm">
            Each third party processes data under their own privacy policies and applicable data protection laws.
          </p>
        </>
      ),
    },
    {
      heading: "Cookies",
      content: (
        <p>
          This site uses cookies for analytics and to remember your preferences. You can control cookies through your
          browser settings, the cookie consent banner shown on your first homepage visit, or by reviewing the{' '}
          <a className="font-medium text-primary hover:underline" href="/cookie-policy">
            Cookie Policy
          </a>
          .
        </p>
      ),
    },
    {
      heading: "Data Retention",
      content: (
        <p>
          Contact form submissions and account data are retained for as long as necessary to provide services. You may
          request deletion at any time by visiting the{' '}
          <a className="font-medium text-primary hover:underline" href="/contact">
            contact page
          </a>
          .
        </p>
      ),
    },
    {
      heading: "International transfers",
      content: (
        <p>
          Data may be processed in countries outside your own. When applicable, reasonable contractual and technical
          safeguards are used to protect personal data during transfer and processing.
        </p>
      ),
    },
    {
      heading: "Your Rights",
      content: (
        <>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>Access the personal data I hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p>
            If you are in a U.S. state with privacy rights laws (including California), you can review and submit
            requests via{' '}
            <a className="font-medium text-primary hover:underline" href="/privacy-choices">
              Privacy Choices
            </a>
            .
          </p>
          <p>
            To exercise any of these rights, visit the{' '}
            <a className="font-medium text-primary hover:underline" href="/contact">
              contact page
            </a>
            .
          </p>
        </>
      ),
    },
    {
      heading: "Children’s privacy",
      content: (
        <p>
          This site is not directed to children under 13, and I do not knowingly collect personal information from
          children under 13.
        </p>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }])} />
      <LegalPageLayout
        title="Privacy Policy"
        updatedAt="Last updated: April 2026"
        sections={sections}
        footerTitle="Contact"
        footerContent={
          <p>
            If you have questions about this privacy policy, email{' '}
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
