import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy — Shree Krishna Gauli",
  description:
    "Privacy policy for shreegauli.com. Learn how your data is collected, used, and protected.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell>
      <section className="relative z-10 section-pad px-6">
        <div className="max-w-3xl mx-auto prose-custom">
          <h1>Privacy Policy</h1>
          <p className="text-sm text-[#94A3B8]">Last updated: April 2026</p>

          <h2>1. Information I Collect</h2>
          <p>
            When you use this website, I may collect the following types of
            information:
          </p>
          <ul>
            <li>
              <strong>Contact form submissions:</strong> Name, email address,
              phone number, and any details you include in your message.
            </li>
            <li>
              <strong>Account information:</strong> If you create a client
              portal account, I store your email and a hashed password.
            </li>
            <li>
              <strong>Newsletter subscriptions:</strong> Your email address when
              you sign up for updates.
            </li>
            <li>
              <strong>Analytics data:</strong> Anonymized usage data through
              cookies and similar technologies (pages visited, time on site,
              referral source).
            </li>
          </ul>

          <h2>2. How I Use Your Information</h2>
          <ul>
            <li>To respond to inquiries and project requests</li>
            <li>To provide client dashboard access and campaign reporting</li>
            <li>To send marketing newsletters (only if you opted in)</li>
            <li>To improve the website experience based on usage patterns</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>
            I do not sell your personal information. Data may be shared with:
          </p>
          <ul>
            <li>
              <strong>Vercel</strong> — hosting provider
            </li>
            <li>
              <strong>Stripe</strong> — payment processing (if applicable)
            </li>
            <li>
              <strong>Email service provider</strong> — for sending
              confirmations and newsletters
            </li>
          </ul>
          <p>
            Each third party processes data under their own privacy policies and
            applicable data protection laws.
          </p>

          <h2>4. Cookies</h2>
          <p>
            This site uses cookies for analytics and to remember your
            preferences. You can control cookies through your browser settings
            or the cookie consent banner shown on your first visit.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            Contact form submissions and account data are retained for as long
            as necessary to provide services. You may request deletion at any
            time by visiting the <a href="/contact">contact page</a>.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data I hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p>
            To exercise any of these rights, visit the{" "}
            <a href="/contact">contact page</a>.
          </p>

          <h2>7. Contact</h2>
          <p>
            If you have questions about this privacy policy, email{" "}
            <a href="mailto:shreegauli1@gmail.com">shreegauli1@gmail.com</a> or use the{" "}
            <a href="/contact">contact page</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
