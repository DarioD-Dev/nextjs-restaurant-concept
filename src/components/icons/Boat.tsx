"use client";

import { useEffect, useRef } from "react";
import { BoatGlyph } from "./BoatGlyph";

// Motion moment 2/4: the boat drifts left-to-right as the footer scrolls
// through the viewport — a single passive scroll listener, rAF-throttled,
// transform-only (translate3d, compositor-only, same technique as
// DarioDev's HeroMark). Under reduced-motion it just sits still, centered,
// as a static illustration rather than disappearing.
export function Boat() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const boat = boatRef.current;
    if (!wrap || !boat) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static, not hidden: centered instead of scroll-linked.
      const width = wrap.clientWidth;
      boat.style.transform = `translate3d(${width * 0.4}px, 0, 0)`;
      return;
    }

    let ticking = false;
    function update() {
      if (!wrap || !boat) return;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      const width = wrap.clientWidth;
      const x = -0.25 * width + progress * 1.25 * width;
      boat.style.transform = `translate3d(${x}px, 0, 0)`;
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="relative h-12 overflow-hidden">
      <div ref={boatRef} className="absolute top-0 left-0 w-28 text-primary sm:w-36">
        <BoatGlyph className="h-auto w-full" />
      </div>
    </div>
  );
}
