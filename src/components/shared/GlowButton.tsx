"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  external?: boolean;
  type?: "button" | "submit";
}

/**
 * Primary CTA button — pill shape, gradient violet→cyan, glow shadow.
 * Renders as <a> when href is provided, otherwise <button>.
 */
export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, href, onClick, className, showArrow = true, external = false, type = "button" }, ref) => {
    const classes = cn(
      "glow-btn",
      "inline-flex items-center gap-2",
      "rounded-full px-6 py-3",
      "text-sm font-semibold text-white",
      "cursor-pointer select-none",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
          {showArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} onClick={onClick} className={classes}>
        {children}
        {showArrow && <ArrowRight className="h-4 w-4 shrink-0" />}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";
