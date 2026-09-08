import type { SVGProps } from "react";

// The logo: a folded paper boat with the restaurant's name written across
// its sail. Same fold language as the boat that travels down the homepage
// — this is that boat, standing still.
//
// The sail is drawn deliberately wide and shallow rather than as a tall
// triangle: the name has to sit inside it with real margins and still be
// readable at header size (~56px tall, which puts the wordmark at about
// 10px). A steeper sail looks more like a boat and makes the name a
// smudge.
//
// The favicon is a separate drawing (src/app/icon.svg): at 32px the name
// on the sail is a grey smudge, so that one leaves the sail blank — and it
// has to be a standalone file with literal hex values anyway, because it
// renders outside the page and has no CSS variables to read.

export function BarchettaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 260 112" fill="none" {...props}>
      {/* sail, carrying the name */}
      <path d="M130,6 L18,68 H242 Z" fill="var(--primary)" />
      <path d="M130,6 V68" stroke="var(--background)" strokeWidth="1.6" strokeOpacity="0.45" />
      <text
        x="130"
        y="37"
        textAnchor="middle"
        fill="var(--background)"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="3"
      >
        LA
      </text>
      <text
        x="130"
        y="60"
        textAnchor="middle"
        fill="var(--background)"
        fontFamily="var(--font-display), Georgia, serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="0.5"
      >
        BARCHETTA
      </text>

      {/* hull */}
      <path
        d="M10,70 H250 L226,99 H34 Z"
        fill="var(--surface)"
        stroke="var(--foreground)"
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <path d="M130,70 V99" stroke="var(--foreground)" strokeWidth="1.6" strokeOpacity="0.3" />

      {/* water */}
      <g stroke="var(--primary)" strokeWidth="3" strokeLinecap="round">
        <path d="M4,106 C12,99 20,99 28,106" />
        <path d="M52,109 C61,102 70,102 79,109" />
        <path d="M181,109 C190,102 199,102 208,109" />
        <path d="M232,106 C240,99 248,99 256,106" />
      </g>
    </svg>
  );
}
