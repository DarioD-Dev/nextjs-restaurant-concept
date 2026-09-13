"use client";

import { useEffect, useRef } from "react";
import { PaperBoat } from "@/components/icons/PaperBoat";
import { BoatWake } from "@/components/icons/BoatWake";

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
// The SVG's height is set imperatively from the measured content height
// rather than a CSS `height: 100%`. `wrap` is a position:relative box whose
// own height is auto (determined by its normal-flow children), and while a
// *percentage* height on an absolutely positioned descendant is spec-legal
// against an auto-height containing block, it turned out not to be
// reliable in practice here — specifically, it measured correctly during
// normal rendering but produced wildly wrong values (including the SVG's
// intrinsic viewBox aspect ratio taking over, ~14× too tall) when captured
// via a full-page screenshot tool, which resizes the render surface in a
// way this percentage math didn't survive. An explicit pixel height
// measured straight from the DOM sidesteps that ambiguity entirely.
//
// Layering (the whole homepage depends on this order, see the home
// sections): color fields sit at -z-20, this route line at -z-10, the boat
// just above them at the default layer, and every piece of text and every
// illustration at `relative z-10`. That is what lets the boat glide *over*
// the big tomato and basil shapes while still passing *behind* the
// illustrations — and guarantees it can never sit on top of readable text.
const ROUTE_HEIGHT = 1400;

// The boat keeps to a narrow lane on the right-hand side instead of
// crossing the full page width: it carves between 70% and 80% of the
// route box, centred on 75%. Long carves (one direction change per CARVE
// units, ~4 over the whole page) so it reads like a skier taking a slope
// in calm, wide turns rather than a zig-zagging cursor.
const LANE_LEFT = 70;
const LANE_RIGHT = 80;
const CARVE = 350;

function buildSlalomPath(height: number): string {
  const turns = [{ x: (LANE_LEFT + LANE_RIGHT) / 2, y: 0 }];
  let goRight = true;
  for (let y = CARVE; y <= height; y += CARVE) {
    turns.push({ x: goRight ? LANE_RIGHT : LANE_LEFT, y });
    goRight = !goRight;
  }
  const last = turns[turns.length - 1];
  if (last.y < height) turns.push({ x: goRight ? LANE_RIGHT : LANE_LEFT, y: height });

  return turns
    .map((p, i) => {
      if (i === 0) return `M${p.x},${p.y}`;
      const prev = turns[i - 1];
      const midY = (prev.y + p.y) / 2;
      return `C${prev.x},${midY} ${p.x},${midY} ${p.x},${p.y}`;
    })
    .join(" ");
}

const ROUTE_PATH = buildSlalomPath(ROUTE_HEIGHT);

// Rest position for reduced-motion: parked half way down the route, which
// is both where the boat spends most of the journey anyway and the one
// place it is guaranteed to be fully visible under the fade rules below.
const REST_PROGRESS = 0.5;

// The boat eases toward the scroll position instead of being pinned to it
// frame-for-frame. Without this it snaps as fast as the wheel turns; with
// it, it glides.
const EASE = 0.11;

// Visibility along the journey. The boat is not on the page at the very
// top — the hero station carries itself — then it appears quickly and
// stays for the entire middle of the page, and it is gone again by the
// time the closing tomato banner arrives, so it looks like it sails in
// behind it rather than sitting on top of it. Both distances are in
// pixels down the page, and the fade-out is measured backwards from the
// element marked data-route-end, so it stays correct whatever the content
// above it does.
const FADE_IN_START = 220;
const FADE_IN_END = 460;
const FADE_OUT_LENGTH = 340;

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

export function RouteJourney({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const boat = boatRef.current;
    const glyph = glyphRef.current;
    if (!wrap || !content || !svg || !path || !boat || !glyph) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const totalLength = path.getTotalLength();
    let heading = 1;
    let endY = Number.POSITIVE_INFINITY;
    // The route's pixel height, kept here rather than re-read off the SVG.
    // place() runs from the same callbacks that set it, and inside a
    // ResizeObserver callback the element's box still reports the previous
    // value — which silently made the vertical scale zero and parked the
    // boat at the top of the page.
    let routeHeightPx = 0;

    // Measured from `content` — a plain normal-flow sibling that holds
    // only the actual page sections — never from `wrap` itself. `wrap`
    // also contains the absolutely positioned svg/boat overlay, and
    // reading its scrollHeight while the svg's own (possibly still wrong,
    // pre-sync) box is one of its children is circular: the fix would feed
    // on the bug it's trying to correct.
    const syncHeight = () => {
      routeHeightPx = content.scrollHeight;
      svg.style.height = `${routeHeightPx}px`;

      // Where the journey ends: the top edge of the closing station, in the
      // same coordinate space the boat is positioned in. Re-measured
      // whenever the content resizes, so no breakpoint or translation can
      // leave the fade sitting at the wrong height.
      const marker = content.querySelector("[data-route-end]");
      endY = marker
        ? marker.getBoundingClientRect().top - content.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;

      // Die gepunktete Linie endet dort, wo die Reise endet — sie lief sonst
      // über das rote Abschlussband hinweg bis in den Footer. Bewusst
      // geclippt statt die SVG zu kürzen: Die Höhe ist der Maßstab, aus dem
      // die Schiffsposition gerechnet wird. Kürzen würde die Route stauchen
      // und damit die Bewegung verändern; Clippen ändert nur, was man sieht.
      svg.style.clipPath = marker ? `inset(0 0 ${routeHeightPx - endY}px 0)` : "none";
    };

    const place = (progress: number) => {
      const svgRect = svg.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const scaleX = svgRect.width / 100;
      const scaleY = routeHeightPx / ROUTE_HEIGHT;
      // The svg isn't always flush with wrap's own top-left corner — on
      // mobile it's pinned to a narrow strip on the right edge instead of
      // spanning full-bleed (see className below), so the boat (which is
      // positioned absolute against `wrap`, not `svg`) needs that offset
      // added, or it renders at the wrong spot once the two containers
      // stop sharing an origin.
      const offsetX = svgRect.left - wrapRect.left;
      const offsetY = svgRect.top - wrapRect.top;

      const len = totalLength * progress;
      const p0 = path.getPointAtLength(len);
      const p1 = path.getPointAtLength(Math.min(totalLength, len + totalLength * 0.01));

      // Direction comes from the path's own tangent, not from comparing
      // frames, so it stays stable no matter how the easing above lands.
      // The dead zone keeps the boat from flickering at a turn's apex,
      // where the horizontal component passes through zero.
      if (Math.abs(p1.x - p0.x) > 0.05) heading = p1.x > p0.x ? 1 : -1;

      const dx = (p1.x - p0.x) * scaleX;
      const dy = (p1.y - p0.y) * scaleY;
      // Tangent angle, damped hard (×0.35) — a boat that fully points along
      // every curve reads as a compass needle, not a gentle drift. Measured
      // in the boat's own frame (dx × heading, so travel is always "forward"
      // here) and mirrored back out below: taken raw, a leftward heading
      // would come out of atan2 near 180° and tip the boat right over.
      const angle = Math.atan2(dy, dx * heading) * (180 / Math.PI) * 0.35;

      const x = offsetX + p0.x * scaleX;
      const y = offsetY + p0.y * scaleY;
      // Position on the wrapper, orientation on the glyph inside it: the
      // wake ripples live in the wrapper and must stay level with the
      // water instead of tipping and mirroring along with the hull.
      boat.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      glyph.style.transform = `rotate(${angle * heading}deg) scaleX(${heading})`;
      boat.style.opacity = String(
        Math.min(
          clamp01((y - FADE_IN_START) / (FADE_IN_END - FADE_IN_START)),
          clamp01((endY - y) / FADE_OUT_LENGTH),
        ),
      );
    };

    // Re-measure, then draw. Always in that order: the boat's vertical
    // scale comes from the measured height, so placing before measuring
    // puts it at the top of the page with a zero scale.
    const settle = (progress: number) => {
      syncHeight();
      place(progress);
    };

    if (reduced) {
      const park = () => settle(REST_PROGRESS);
      park();
      // Placed again on the next frame: on a cold load the first call can
      // land before the route SVG's new height has been laid out, and with
      // no scrolling to correct it afterwards the parked boat would stay
      // stuck where it started.
      const frame = requestAnimationFrame(park);
      // Content can still reflow after that (webfont swap, images), so the
      // static boat's height reference stays correct too.
      const ro = new ResizeObserver(park);
      ro.observe(content);
      return () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
      };
    }

    const computeProgress = () => {
      const rect = wrap.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      return Math.min(1, Math.max(0, -rect.top / total));
    };

    let target = computeProgress();
    let current = target;
    let frame: number | null = null;

    const step = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.0005) current = target;
      place(current);
      frame = current === target ? null : requestAnimationFrame(step);
    };
    const schedule = () => {
      target = computeProgress();
      if (frame === null) frame = requestAnimationFrame(step);
    };
    const onResize = () => {
      syncHeight();
      schedule();
    };

    settle(current);
    // Same insurance as the reduced-motion branch above: re-place once the
    // first frame has been laid out, so a visitor who lands and doesn't
    // scroll still sees the boat where the route actually runs.
    const firstFrame = requestAnimationFrame(() => settle(current));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(content);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cancelAnimationFrame(firstFrame);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative overflow-x-clip">
      {/* On mobile the route stays visible but shrinks to a narrow strip
          pinned to the right edge instead of spanning full-bleed — the same
          path data, just mapped into a much narrower box, so its left-right
          carve automatically compresses and never reaches into the content
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
        className="pointer-events-none absolute top-0 right-3 -z-10 w-14 sm:inset-x-0 sm:w-full"
      >
        <path
          ref={pathRef}
          d={ROUTE_PATH}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          strokeDasharray="0.5 3.4"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        ref={boatRef}
        aria-hidden="true"
        // z-20 on mobile, z-0 from sm up: on a phone the stations run edge
        // to edge, so a boat behind them would spend most of the page
        // sliced in half by a card border. Up there it rides over the empty
        // right margin of the cards instead — it can't cover copy, which is
        // left-aligned, and it never becomes interactive (pointer-events
        // none). On wider screens it goes back to travelling behind the
        // illustrations, which is where the disappearing-and-resurfacing
        // effect belongs.
        // Starts hidden: the effect below sets the real opacity on its
        // first frame, and without this the boat would flash once at the
        // page's top-left corner before it is ever placed.
        style={{ opacity: 0 }}
        className="boat-halo pointer-events-none absolute top-0 left-0 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 text-primary sm:z-0"
      >
        {/* Wake only from the small breakpoint up: on mobile the boat sits
            a few pixels from the viewport edge, and the ripples would be
            clipped there anyway. */}
        <BoatWake className="hidden w-4 opacity-70 sm:block" />
        <div ref={glyphRef} className="size-7 sm:size-10">
          <PaperBoat className="size-full" />
        </div>
        <BoatWake className="hidden w-4 -scale-x-100 opacity-70 sm:block" />
      </div>

      <div ref={contentRef}>{children}</div>
    </div>
  );
}
