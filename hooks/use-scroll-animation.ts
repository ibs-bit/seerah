"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollAnimationOptions {
  offset?: [string, string];
  threshold?: number;
}

interface ScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  isInView: boolean;
}

export function useScrollAnimation(
  options: ScrollAnimationOptions = {}
): ScrollAnimationReturn {
  const { offset = ["start end", "end start"], threshold = 0.2 } = options;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: offset as [string, string],
  });

  // Create transform values
  const opacity = useTransform(
    scrollYProgress,
    [0, threshold, 1 - threshold, 1],
    [0, 1, 1, 0]
  );

  const y = useTransform(scrollYProgress, [0, threshold], [50, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, threshold, 1 - threshold, 1],
    [0.95, 1, 1, 0.95]
  );

  // Intersection Observer for isInView
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return {
    ref,
    scrollYProgress,
    opacity,
    y,
    scale,
    isInView,
  };
}

// Hook for parallax effects
export function useParallax(scrollYProgress: MotionValue<number>, distance: number = 100) {
  return useTransform(scrollYProgress, [0, 1], [-distance, distance]);
}

export default useScrollAnimation;
