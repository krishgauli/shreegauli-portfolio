"use client";

import { useRef, useCallback } from "react";
import { useSpring, useTransform, MotionValue } from "framer-motion";

interface MouseTiltResult {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

/**
 * Calculates a subtle tilt effect based on mouse position relative to the element.
 * Max tilt: ±8 degrees. Uses Framer Motion springs for smooth interpolation.
 */
export function useMouseTilt(maxTilt = 8): MouseTiltResult {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });
  const rawY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(rawX, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(rawY, [-1, 1], [-maxTilt, maxTilt]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(y * 2);
      rawY.set(x * 2);
    },
    [rawX, rawY]
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}
