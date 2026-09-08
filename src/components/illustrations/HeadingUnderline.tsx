import type { SVGProps } from "react";

// A quick hand-drawn stroke under a page's main heading — the same gesture
// as the script accent used elsewhere, drawn instead of typed. Lives on its
// own because all three pages use it; it belongs to none of the scenes.
export function HeadingUnderline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
      {...props}
    >
      <path d="M3,9 C46,2 82,12 124,6 C154,1.5 186,8 217,4" />
    </svg>
  );
}
