"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  /** How many pixels into the viewport before triggering */
  threshold?: number;
}

const getInitial = (direction: Direction) => {
  switch (direction) {
    case "up": return { opacity: 0, y: 32 };
    case "down": return { opacity: 0, y: -32 };
    case "left": return { opacity: 0, x: 40 };
    case "right": return { opacity: 0, x: -40 };
    case "none": return { opacity: 0 };
  }
};

const getAnimate = (direction: Direction) => {
  switch (direction) {
    case "up":
    case "down":
      return { opacity: 1, y: 0 };
    case "left":
    case "right":
      return { opacity: 1, x: 0 };
    case "none":
      return { opacity: 1 };
  }
};

/**
 * Wraps children in a scroll-triggered reveal animation.
 * Respects prefers-reduced-motion — falls back to instant opacity reveal.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: threshold });

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn("opacity-100", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitial(direction)}
      animate={isInView ? getAnimate(direction) : getInitial(direction)}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
