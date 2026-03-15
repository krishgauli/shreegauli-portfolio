"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { GlowButton } from "@/components/shared/GlowButton";
import { mobileMenuVariants, navbarEntrance } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <motion.header
      variants={navbarEntrance}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "w-full max-w-5xl rounded-2xl px-5 py-3 transition-all duration-300",
          scrolled
            ? "glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-[#070B14]/55 backdrop-blur-sm border border-white/[0.06]"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
          >
            <span className="text-base font-bold tracking-tight text-[#F8FAFC]">
              Shree
              <span className="text-gradient-brand">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors duration-200 rounded-lg hover:bg-white/[0.05]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/resume"
              className="text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              Resume
            </Link>
            <GlowButton href="/contact" showArrow={false} className="py-2 px-5 text-xs">
              Hire Me
            </GlowButton>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <div className="pt-3 pb-2 flex flex-col gap-1 border-t border-white/[0.08] mt-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05] rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 flex gap-3">
                  <Link
                    href="/resume"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center py-2.5 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-white/[0.1] rounded-lg transition-colors"
                  >
                    Resume
                  </Link>
                  <GlowButton
                    href="/contact"
                    showArrow={false}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 justify-center py-2.5 text-xs"
                  >
                    Hire Me
                  </GlowButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
