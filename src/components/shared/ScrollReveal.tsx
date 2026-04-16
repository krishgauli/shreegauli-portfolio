"use client";

import { useEffect, useRef, useState } from "react";
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

const getInitialStyle = (direction: Direction) => {
  switch (direction) {
    case "up": return { opacity: 0, transform: "translate3d(0, 32px, 0)" };
    case "down": return { opacity: 0, transform: "translate3d(0, -32px, 0)" };
    case "left": return { opacity: 0, transform: "translate3d(40px, 0, 0)" };
    case "right": return { opacity: 0, transform: "translate3d(-40px, 0, 0)" };
    case "none": return { opacity: 0, transform: "translate3d(0,0,0)" };
  }
};

const visibleStyle = { opacity: 1, transform: "translate3d(0,0,0)" };

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
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={cn("opacity-100", className)}>
        {children}
      </div>
    );
  }

  const transitionDelay = `${Math.max(0, delay)}s`;

  return (
    <div
      ref={ref}
      style={
        isVisible
          ? {
              ...visibleStyle,
              transition:
                "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)",
              transitionDelay,
              willChange: "transform, opacity",
            }
          : {
              ...getInitialStyle(direction),
              transition:
                "transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)",
              transitionDelay,
              willChange: "transform, opacity",
            }
      }
      className={className}
    >
      {children}
    </div>
  );
}
