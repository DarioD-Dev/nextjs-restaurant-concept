import type { SVGProps } from "react";

// A folded paper boat, drawn the way it's actually folded — a trapezoid
// hull plus two triangular sail-flaps meeting at a center fold — not a
// generic sailboat clipart. Same single-stroke line language as the other
// Che Fame illustrations.
export function PaperBoat(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 14h16l-4 4H6z" />
      <path d="M10 14V2l-6 10.5" />
      <path d="M10 14V2l6 10.5" />
    </svg>
  );
}
