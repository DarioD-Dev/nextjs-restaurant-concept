import type { SVGProps } from "react";

// Two short ripples that sit beside the hull so the boat reads as floating
// in water rather than hovering. Rendered once per side (the right side is
// mirrored) and carried along by the boat's own transform — they have no
// animation of their own, the movement they belong to is already there.
export function BoatWake(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      {...props}
    >
      <path d="M2 5c2.6-2.6 5.2-2.6 7.8 0" />
      <path d="M9 11c3.2-2.6 6.4-2.6 9.6 0" />
    </svg>
  );
}
