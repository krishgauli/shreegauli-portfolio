import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-white/[0.08] bg-[#070B14]/80 backdrop-blur-sm"
    >
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-base font-bold text-[#F8FAFC]">
              Shree Krishna Gauli
            </p>
            <p className="text-sm text-[#94A3B8] mt-0.5">
              Digital Marketing Specialist · Dallas, TX
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <Link
              href="mailto:hello@shreegauli.com"
              className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#22D3EE] transition-colors"
              aria-label="Email Shree"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">hello@shreegauli.com</span>
            </Link>
            <Link
              href="https://linkedin.com/in/shreegauli"
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

          {/* Copyright */}
          <p className="text-xs text-[#94A3B8]/60">
            © {new Date().getFullYear()} Shree Krishna Gauli
          </p>
        </div>
      </div>
    </footer>
  );
}
