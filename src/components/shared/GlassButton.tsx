"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
}

/**
 * Secondary button — transparent glass with blur, white border.
 * Renders as <a> when href is provided, otherwise <button>.
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, href, onClick, className, external = false, type = "button" }, ref) => {
    const classes = cn(
      "glass-btn",
      "inline-flex items-center gap-2",
      "rounded-full px-6 py-3",
      "text-sm font-semibold text-[#F8FAFC]",
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
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
