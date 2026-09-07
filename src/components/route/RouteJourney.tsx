"use client";

import { useEffect, useRef } from "react";
import { PaperBoat } from "@/components/icons/PaperBoat";

// La Rotta — the connecting device the whole homepage is built around. A
// single dashed path runs the full height of the page (drawn once, in a
// coordinate space independent of pixels — see viewBox below), and a paper
// boat travels along it as the visitor scrolls. This is the layout's spine,
// not decoration laid on top of finished sections: every station on the
// homepage is positioned relative to where the route passes near it.
//
// Technique: the SVG uses `preserveAspectRatio="none"` with a fixed
// viewBox (100 wide, ROUTE_HEIGHT tall) stretched to exactly match the
// wrapper's real rendered height — so the path re-flows correctly at any
// viewport width or content height (translations change text length,
// responsive breakpoints reflow content) without needing per-breakpoint
// path data.
//
// The SVG's height is set imperatively from `wrap.scrollHeight` rather
// than a CSS `height: 100%`. `wrap` is a position:relative box whose own
// height is auto (determined by its normal-flow children), and while a
// *percentage* height on an absolutely positioned descendant is spec-legal
// against an auto-height containing block, it turned out not to be
// reliable in practice here — specifically, it measured correctly during
// normal rendering but produced wildly wrong values (including the SVG's
// intrinsic viewBox aspect ratio taking over, ~14× too tall) when captured
// via a full-page screenshot tool, which resizes the render surface in a
// way this percentage math didn't survive. An explicit pixel height
// measured straight from the DOM sidesteps that ambiguity entirely.
const ROUTE_HEIGHT = 1400;
const ROUTE_PATH =
  "M82,20 C42,90 14,130 26,210 C38,290 78,320 72,420 " +
  "C66,520 16,545 22,640 C28,735 82,760 76,860 " +
  "C70,960 34,985 44,1080 C54,1175 52,1230 50,1300";

// Rest position for reduced-motion / not-yet-measured states — near the
// start of the route, a calm illustration rather than mid-journey.
const REST_PROGRESS = 0.06;

export function RouteJourney({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const boat = boatRef.current;
    if (!wrap || !content || !svg || !path || !boat) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const totalLength = path.getTotalLength();

    // Measured from `content` — a plain normal-flow sibling that holds
    // only the actual page sections — never from `wrap` itself. `wrap`
    // also contains the absolutely positioned svg/boat overlay, and
    // reading its scrollHeight while the svg's own (possibly still wrong,
    // pre-sync) box is one of its children is circular: the fix would feed
    // on the bug it's trying to correct.
    function syncHeight() {
      if (!content || !svg) return;
      svg.style.height = `${content.scrollHeight}px`;
    }

    function place(progress: number) {
      if (!wrap || !svg || !path || !boat) return;
      const svgRect = svg.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const scaleX = svgRect.width / 100;
      const scaleY = svgRect.height / ROUTE_HEIGHT;
      // The svg isn't always flush with wrap's own top-left corner — on
      // mobile it's pinned to a narrow strip on the right edge instead of
      // spanning full-bleed (see className below), so the boat (which is
      // positioned absolute against `wrap`, not `svg`) needs that offset
      // added, or it renders at the wrong spot once the two containers
      // stop sharing an origin.
      const offsetX = svgRect.left - wrapRect.left;
      const offsetY = svgRect.top - wrapRect.top;

      const len = totalLength * progress;
      const p0 = path!.getPointAtLength(len);
      const p1 = path!.getPointAtLength(Math.min(totalLength, len + totalLength * 0.01));

      const dx = (p1.x - p0.x) * scaleX;
      const dy = (p1.y - p0.y) * scaleY;
      // Tangent angle, damped hard (×0.35) — a boat that fully points along
      // every curve reads as a compass needle, not a gentle drift.
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) * 0.35;

      const x = offsetX + p0.x * scaleX;
      const y = offsetY + p0.y * scaleY;
      boat.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
    }

    syncHeight();

    if (reduced) {
      place(REST_PROGRESS);
      // Content can still reflow after mount (webfont swap, images), so
      // the static boat's height reference stays correct too.
      const ro = new ResizeObserver(syncHeight);
      ro.observe(wrap);
      return () => ro.disconnect();
    }

    let ticking = false;
    function computeProgress() {
      if (!wrap) return 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = Math.max(1, rect.height - vh);
      return Math.min(1, Math.max(0, -rect.top / total));
    }
    function update() {
      place(computeProgress());
      ticking = false;
    }
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    function onResize() {
      syncHeight();
      onScrollOrResize();
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(wrap);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-x-clip">
      {/* On mobile the route stays visible but shrinks to a narrow strip
          pinned to the right edge instead of spanning full-bleed — the same
          path data, just mapped into a much narrower box, so its left-right
          wobble automatically compresses and never reaches into the content
          column or forces horizontal scroll. Height is set imperatively
          (see syncHeight above), not via a CSS h-full utility. */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox={`0 0 100 ${ROUTE_HEIGHT}`}
        preserveAspectRatio="none"
        // Starts at 0 height so there's no flash of the SVG's intrinsic
        // (viewBox-ratio-derived) size before the effect below measures
        // `content` and sets the real value — belt-and-braces against any
        // first-paint flicker, not load-bearing for the fix itself.
        style={{ height: 0 }}
        className="pointer-events-none absolute top-0 right-0 -z-10 w-12 sm:inset-x-0 sm:w-full"
      >
        <path
          ref={pathRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.22"
          strokeWidth="0.6"
          strokeDasharray="0.2 3.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        ref={boatRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 size-7 -translate-x-1/2 -translate-y-1/2 text-primary sm:size-10"
      >
        <PaperBoat className="size-full drop-shadow-sm" />
      </div>

      <div ref={contentRef}>{children}</div>
    </div>
  );
}
