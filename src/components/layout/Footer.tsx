"use client";

import Link from "next/link";
import { Linkedin, Mail, Phone } from "lucide-react";
import Logo from "@/components/Logo";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

const footerNav = {
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "WordPress", href: "/services/wordpress" },
    { label: "Shopify", href: "/services/shopify" },
    { label: "SEO / AEO / GEO", href: "/services/seo-aeo-geo" },
    { label: "Automation", href: "/services/automation" },
  ],
  Resources: [
    { label: "Portfolio", href: "/work" },
    { label: "Results", href: "/results" },
    { label: "Blog", href: "/blogs" },
    { label: "Free SEO Audit", href: "/seo-tools" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "FAQ", href: "/faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Working Together", href: "/working-together" },
    { label: "Pricing", href: "/pricing" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
    { label: "Client Portal", href: "/login" },
  ],
};

export function Footer() {
  const openCookieSettings = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-cookie-settings"));
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/8 bg-bg-base/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] mb-12">
          {/* Brand + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo showText={true} iconSize={48} darkText={false} compact={true} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-content-muted">
              Full-Stack Web Developer &amp; SEO Consultant — Dallas, TX · Building websites that rank, convert, and scale.
            </p>

            {/* Newsletter */}
            <NewsletterForm />
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-content-muted">
                {heading}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-content-muted transition-colors hover:text-content-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/6 pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-content-muted transition-colors hover:text-brand-cyan"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Contact</span>
            </Link>
            <a
              href="tel:+14099952521"
              className="flex items-center gap-1.5 text-content-muted transition-colors hover:text-brand-cyan"
              aria-label="Phone"
            >
              <Phone className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">(409) 995-2521</span>
              <span className="sr-only sm:hidden">Call (409) 995-2521</span>
            </a>
            <Link
              href="https://www.linkedin.com/in/gauli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-muted transition-colors hover:text-brand-cyan"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-content-muted/60">
            <Link href="/privacy" className="transition-colors hover:text-content-muted">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-content-muted">
              Cookies
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="transition-colors hover:text-content-muted"
            >
              Cookie Settings
            </button>
            <Link href="/privacy-choices" className="transition-colors hover:text-content-muted">
              Privacy Choices
            </Link>
            <Link href="/terms" className="transition-colors hover:text-content-muted">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Shree Krishna Gauli</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
