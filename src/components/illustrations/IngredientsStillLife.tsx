import type { SVGProps } from "react";

// Tomato, basil, lemon and chili as one small composed still life —
// scattered together the way they'd sit on a cutting board, not four
// separate icons in a row. This is "Il Cestino", the one illustration
// that carries the whole "Fatto in casa" station.
export function IngredientsStillLife(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* tomato */}
      <circle cx="52" cy="108" r="30" />
      <path d="M52 78c-6-8-4-14 2-18M52 78c2-9 8-13 15-14M52 78c6-7 3-14-3-19" />

      {/* basil sprig */}
      <path d="M100 155V60" />
      <path d="M100 130c14 2 20 12 12 24-14-2-20-12-12-24Z" />
      <path d="M100 95c-14 2-20 12-12 24 14-2 20-12 12-24Z" />
      <path d="M100 65c12 0 18 9 12 20-12 0-18-9-12-20Z" />

      {/* lemon half, cut face with segment lines */}
      <circle cx="175" cy="100" r="32" />
      <circle cx="175" cy="100" r="21" />
      <path d="M175 79v42M156 100h38M162 86l26 28M188 86l-26 28" />

      {/* peperoncino */}
      <path d="M214 30c-3 0-5 1-6 3" />
      <path d="M210 32c11 3 16 16 10 30-8 17-24 21-30 10-6-11 0-25 8-32 4-4 8-7 12-8Z" />
    </svg>
  );
}
