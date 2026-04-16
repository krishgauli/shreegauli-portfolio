"use client";

import { forwardRef } from "react";
import { motion, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMouseTilt } from "@/hooks/useMouseTilt";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ModuleShellProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableHoverLift?: boolean;
  glowColor?: "violet" | "cyan" | "amber" | "none";
  as?: "div" | "article" | "section";
}

/**
 * The core 3D module wrapper for all floating card elements.
 * Applies: rounded-3xl border, dark background, box shadows,
 * optional mouse tilt, and hover lift.
 */
export const ModuleShell = forwardRef<HTMLDivElement, ModuleShellProps>(
  (
    {
      children,
      className,
      enableTilt = false,
      enableHoverLift = true,
      glowColor = "none",
      as: Tag = "div",
    },
    _ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const tilt = useMouseTilt(6);
    const perspective = "perspective(1000px)";
    const transformTemplate = useMotionTemplate`${perspective} rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`;
    const shouldTilt = enableTilt && !prefersReducedMotion;

    const glowStyles: Record<string, string> = {
      violet: "hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6),0_0_30px_rgba(124,58,237,0.2)]",
      cyan: "hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.2)]",
      amber: "hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.2)]",
      none: "hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]",
    };

    if (shouldTilt) {
      return (
        <motion.div
          ref={tilt.ref}
          style={{ transform: transformTemplate, willChange: "transform" }}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          className={cn(
            "module",
            enableHoverLift && "hover-lift",
            glowStyles[glowColor],
            "transition-shadow duration-300",
            className
          )}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <Tag
        className={cn(
          "module",
          enableHoverLift && "hover-lift",
          glowStyles[glowColor],
          "transition-shadow duration-300",
          className
        )}
      >
        {children}
      </Tag>
    );
  }
);

ModuleShell.displayName = "ModuleShell";
