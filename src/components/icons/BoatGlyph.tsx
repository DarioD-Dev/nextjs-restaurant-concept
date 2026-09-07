import type { SVGProps } from "react";

// A generic small coastal rowing boat with a tiny figure — deliberately
// not a gondola: this restaurant's footer names Roma/Napoli/Palermo, not
// Venice, so the illustration stays geography-neutral rather than
// contradicting that with a Venetian visual cliché.
export function BoatGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 21h52" />
      <path d="M6 21c4 8 12 8.5 26 8.5S54 29 58 21" />
      <circle cx="30" cy="11" r="2.6" />
      <path d="M30 13.6v6.4" />
      <path d="M30 16l9 6.5" />
      <path d="M37.5 21.3l3 2.4" />
    </svg>
  );
}
