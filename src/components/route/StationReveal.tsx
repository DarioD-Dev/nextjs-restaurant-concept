"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Animation 3/3: an illustration arrives once it reaches its station.
// Same no-JS-safe pattern as DarioDev's Reveal.tsx — always rendered
// visible; only a mounted effect can hide an instance currently below the
// fold, and only outside prefers-reduced-motion.
export function StationReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    node.classList.add("station-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("station-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`station-illustration ${className ?? ""}`}>
      {children}
    </div>
  );
}
