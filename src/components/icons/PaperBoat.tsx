import type { SVGProps } from "react";

// A folded paper boat, drawn the way it's actually folded — a trapezoid
// hull plus two triangular sail-flaps meeting at a center fold — not a
// generic sailboat clipart. Same single-stroke line language as the other
// La Barchetta illustrations.
//
// The little pennant at the mast is what makes the shape asymmetric, and
// that is deliberate: RouteJourney mirrors the boat horizontally each time
// the route changes direction, and a perfectly symmetric glyph would make
// that flip invisible.
export function PaperBoat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 14h16l-4 4H6z" />
      <path d="M10 14V3l-6 9.5" />
      <path d="M10 14V3l6 9.5" />
      <path d="M10 3.4 14.6 4.9 10 6.4" />
    </svg>
  );
}
