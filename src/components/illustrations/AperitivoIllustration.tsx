import type { SVGProps } from "react";

// The hero's own scene: an aperitivo on a basil tray — the moment before
// the meal, so it doesn't repeat the pasta, pizza or dolci further down
// the page. Same construction as the tavola scene: one connected
// composition, several objects deliberately crossing the tray's edge, and
// the two stroke rules that keep everything legible (cream body gets an
// ink outline, anything drawn straight onto the colour gets a cream one).
//
// Drawn here by hand, like every other illustration in this project — no
// third-party or licensed artwork is used anywhere in Che Fame.
export function AperitivoIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 360 310" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* the tray */}
      <path
        d="M180,45 C250,43 306,99 305,170 C304,240 249,294 178,293 C110,292 55,238 56,168 C57,100 112,47 180,45 Z"
        fill="var(--secondary)"
      />

      {/* straw, poking past the tray's edge */}
      <g stroke="var(--foreground)" strokeWidth="6">
        <path d="M254,40 L246,64" />
        <path d="M246,64 L206,142" />
      </g>

      {/* the glass */}
      <g stroke="var(--foreground)" strokeWidth="3">
        <path d="M137,86 C137,152 161,192 195,198 C229,192 253,152 253,86 Z" fill="var(--background)" />
        <path d="M144,112 C148,154 168,184 195,190 C222,184 242,154 246,112 Z" fill="var(--primary-vivid)" />
        <path d="M195,198 V244" />
        <ellipse cx="195" cy="248" rx="34" ry="8" fill="var(--background)" />
      </g>

      {/* ice */}
      <g stroke="var(--foreground)" strokeWidth="2.4" fill="var(--background)">
        <rect x="152" y="98" width="30" height="30" rx="6" transform="rotate(-13 167 113)" />
        <rect x="200" y="112" width="26" height="26" rx="6" transform="rotate(11 213 125)" />
      </g>

      {/* lemon wheel on the rim */}
      <g stroke="var(--foreground)" strokeWidth="2.6">
        <circle cx="252" cy="94" r="25" fill="var(--highlight)" />
        <circle cx="252" cy="94" r="16" />
        <path d="M252,69v50M227,94h50M234,76l36,36M270,76l-36,36" strokeWidth="1.8" />
      </g>

      {/* dish of olives, hanging off the tray on the left */}
      <g stroke="var(--foreground)" strokeWidth="2.8">
        <ellipse cx="105" cy="236" rx="53" ry="21" fill="var(--background)" />
        <path d="M56,232 C74,250 136,250 154,232" />
      </g>
      <g stroke="var(--foreground)" strokeWidth="2.2" fill="var(--secondary)">
        <ellipse cx="84" cy="228" rx="12" ry="9" transform="rotate(-14 84 228)" />
        <ellipse cx="108" cy="223" rx="12" ry="9" transform="rotate(6 108 223)" />
        <ellipse cx="131" cy="229" rx="11" ry="8.5" transform="rotate(-4 131 229)" />
      </g>

      {/* lemon wedge, crossing the bottom-right edge */}
      <g stroke="var(--foreground)" strokeWidth="2.6">
        <path d="M256,268 A30,30 0 0 1 316,268 Z" fill="var(--highlight)" />
        <path d="M286,268 V240M266,262 L296,246M306,262 L276,246" strokeWidth="1.8" />
      </g>

      {/* sparkle marks: cream on the tray, tomato out on the page */}
      <g fill="var(--background)">
        <path d="M0,-9 L2.4,-2.4 L9,0 L2.4,2.4 L0,9 L-2.4,2.4 L-9,0 L-2.4,-2.4 Z" transform="translate(104 120)" />
        <path d="M0,-6 L1.6,-1.6 L6,0 L1.6,1.6 L0,6 L-1.6,1.6 L-6,0 L-1.6,-1.6 Z" transform="translate(128 84)" />
      </g>
      <g fill="var(--primary)">
        <path d="M0,-10 L2.6,-2.6 L10,0 L2.6,2.6 L0,10 L-2.6,2.6 L-10,0 L-2.6,-2.6 Z" transform="translate(326 128)" />
        <path d="M0,-7 L1.8,-1.8 L7,0 L1.8,1.8 L0,7 L-1.8,1.8 L-7,0 L-1.8,-1.8 Z" transform="translate(36 96)" />
      </g>
    </svg>
  );
}

// A quick hand-drawn stroke under the headline — the same gesture as the
// Caveat script used elsewhere, just drawn instead of typed.
export function HeroUnderline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 220 14" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" {...props}>
      <path d="M3,9 C46,2 82,12 124,6 C154,1.5 186,8 217,4" />
    </svg>
  );
}
