"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { navLinks } from "@/lib/data";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [navDropdown, setNavDropdown] = useState<string | null>(null);
  const navDropdownRef = useRef<HTMLLIElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [mobileOpen]);

  // Close user menu / nav dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
      if (
        navDropdownRef.current &&
        !navDropdownRef.current.contains(e.target as Node)
      ) {
        setNavDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={cn(
          "w-full max-w-6xl rounded-2xl px-5 py-2.5 transition-all duration-300",
          mobileOpen
            ? "bg-[#070B14]/96 backdrop-blur-xl border border-white/[0.12] shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            : scrolled
            ? "bg-[#070B14]/90 backdrop-blur-xl border border-white/[0.10] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-[#070B14]/55 backdrop-blur-sm border border-white/[0.06]"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo — animated SG icon + brand text */}
          <Logo
            showText={true}
            iconSize={scrolled ? 36 : 42}
            darkText={false}
            compact={true}
          />

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              // Dropdown nav item
              if (link.children && link.children.length > 0) {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    ref={navDropdown === link.href ? navDropdownRef : undefined}
                    onMouseEnter={() => setNavDropdown(link.href)}
                    onMouseLeave={() => setNavDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setNavDropdown((prev) =>
                          prev === link.href ? null : link.href
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                        isActive
                          ? "text-[#F8FAFC] bg-white/[0.08]"
                          : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          navDropdown === link.href && "rotate-180"
                        )}
                      />
                    </button>

                    {navDropdown === link.href && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                        <div className="w-56 rounded-xl border border-white/[0.12] bg-[#0F172A]/95 backdrop-blur-xl shadow-2xl p-2 space-y-0.5">
                          {link.children.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setNavDropdown(null)}
                                className={cn(
                                  "block rounded-lg px-3 py-2.5 transition-colors",
                                  childActive
                                    ? "bg-white/[0.08] text-[#F8FAFC]"
                                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06]"
                                )}
                              >
                                <span className="text-sm font-medium">
                                  {child.label}
                                </span>
                                {child.description && (
                                  <span className="block mt-0.5 text-[11px] text-[#64748B]">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // Plain nav item
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg",
                      isActive
                        ? "text-[#F8FAFC] bg-white/[0.08]"
                        : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: user menu + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* User Menu */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all hover:scale-105",
                    "border border-white/20 text-white/90 hover:text-white hover:border-white/40 bg-white/10 hover:bg-white/20"
                  )}
                >
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white ring-2 ring-white/20">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      user.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  <span className="hidden lg:inline truncate max-w-[100px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      userMenuOpen && "rotate-180"
                    )}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-72 rounded-2xl bg-[#0F172A]/95 backdrop-blur-xl border border-white/[0.12] shadow-2xl z-50 overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-4 border-b border-white/[0.08] bg-gradient-to-r from-[#7C3AED]/15 via-transparent to-transparent">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white shadow-lg flex-shrink-0">
                            {user.avatar ? (
                              <Image
                                src={user.avatar}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                            ) : (
                              user.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#F8FAFC] truncate">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-[#94A3B8] truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                              user.role === "admin"
                                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            )}
                          >
                            {user.role}
                          </span>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-2 px-2 space-y-0.5">
                        <Link
                          href={
                            user.role === "admin"
                              ? "/dashboard/admin"
                              : "/dashboard/client"
                          }
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06] transition-all"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href={
                            user.role === "admin"
                              ? "/dashboard/admin?view=profile"
                              : "/dashboard/client?view=profile"
                          }
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.06] transition-all"
                        >
                          <User className="h-4 w-4" />
                          My Profile
                        </Link>
                        <div className="border-t border-white/[0.06] my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Book a Call CTA */}
            <Link
              href="/book"
              className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile: user avatar + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white ring-2 ring-white/20">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  user.name.substring(0, 2).toUpperCase()
                )}
              </div>
            )}
            <button
              className="p-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full z-[60] mt-3 px-1">
              <div className="max-h-[calc(100vh-8.5rem)] overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0B1220]/98 px-4 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  // Mobile dropdown
                  if (link.children && link.children.length > 0) {
                    return (
                      <div key={link.href} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() =>
                            setNavDropdown((prev) =>
                              prev === link.href ? null : link.href
                            )
                          }
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                            isActive
                              ? "text-[#F8FAFC] bg-white/[0.08]"
                              : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-200",
                              navDropdown === link.href && "rotate-180"
                            )}
                          />
                        </button>
                        {navDropdown === link.href && (
                          <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-white/[0.08] pl-3">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setNavDropdown(null);
                                }}
                                className={cn(
                                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                  pathname === child.href
                                    ? "text-[#F8FAFC] bg-white/[0.08]"
                                    : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
                                )}
                              >
                                {child.label}
                                {child.description && (
                                  <span className="block text-[11px] text-[#64748B]">
                                    {child.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "text-[#F8FAFC] bg-white/[0.08]"
                          : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05]"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {/* Auth section in mobile */}
                <div className="border-t border-white/[0.06] mt-2 pt-3">
                  {user ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold bg-gradient-to-br from-[#7C3AED] to-[#22D3EE] text-white">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            user.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#F8FAFC]">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-[#94A3B8]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <Link
                        href={
                          user.role === "admin"
                            ? "/dashboard/admin"
                            : "/dashboard/client"
                        }
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/[0.05] transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <p className="px-3 py-2 text-xs uppercase tracking-[0.18em] text-[#64748B]">
                      Client portal available in the footer
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/book"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
