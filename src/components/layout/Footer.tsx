"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";

const footerNav = {
  Services: [
    { label: "SEO & Content", href: "/services/seo" },
    { label: "Paid Media", href: "/services/paid-media" },
    { label: "Social Media", href: "/services/social-media" },
    { label: "Automation", href: "/services/automation" },
  ],
  Resources: [
    { label: "Case Studies", href: "/work" },
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#070B14]/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-14">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] mb-12">
          {/* Brand + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <Logo showText={true} iconSize={48} darkText={false} compact={true} />
            </div>
            <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
              Digital Marketing Specialist · Dallas, TX
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletter} className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-2">
                Newsletter
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] outline-none focus:border-[#7C3AED] transition"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-lg bg-[#7C3AED] px-3 py-2 text-sm font-semibold text-white hover:bg-[#8B5CF6] transition disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              {status === "success" && (
                <p className="text-xs text-emerald-400 mt-1.5">Subscribed!</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-400 mt-1.5">Something went wrong. Try again.</p>
              )}
            </form>
          </div>

          {/* Nav columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
                {heading}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
              aria-label="Contact"
            >
              <Mail className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gauli/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
            <Link
              href="https://github.com/shreegauli"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#94A3B8]/60">
            <Link href="/privacy" className="hover:text-[#94A3B8] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#94A3B8] transition-colors">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Shree Krishna Gauli</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
