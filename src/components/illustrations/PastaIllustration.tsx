import type { SVGProps } from "react";

// A shallow bowl with a twirl of pasta and a resting fork — not a plate
// icon, an actual small scene. Single-stroke line art, same family as the
// pizza and ingredient illustrations.
export function PastaIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 170"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* bowl */}
      <path d="M22 92c0 34 35 58 78 58s78-24 78-58" />
      <ellipse cx="100" cy="92" rx="78" ry="14" />

      {/* twirled pasta strands */}
      <path d="M58 88c6-24-16-30-8-52s34-16 26 4" />
      <path d="M92 90c2-26-22-30-16-54s36-18 30 4" />
      <path d="M128 88c8-22-12-32-2-52s36-10 26 10" />

      {/* fork resting on the rim */}
      <g strokeWidth="2.2">
        <path d="M162 40v34" />
        <path d="M154 40v14a8 8 0 0 0 16 0V40" />
        <path d="M162 74v46" />
      </g>
    </svg>
  );
}
