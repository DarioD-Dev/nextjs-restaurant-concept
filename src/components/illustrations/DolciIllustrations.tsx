import type { SVGProps } from "react";

// Three desserts, drawn rather than boxed: the Dolci station shows the
// actual sweets on small plates instead of a third row of cards. Same line
// language as the rest of La Barchetta — outline in currentColor, lemon as the
// only fill that ever appears.

export function TiramisuIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* plate */}
      <path d="M14,84 C34,92 86,92 106,84" />
      <ellipse cx="60" cy="82" rx="46" ry="9" />
      {/* slice */}
      <path d="M28,78 V40 C28,34 34,30 42,30 H80 C88,30 92,34 92,40 V78" />
      <path d="M28,52 C42,58 78,58 92,52" />
      <path d="M28,64 C42,70 78,70 92,64" />
      <path d="M28,40 C42,46 78,46 92,40" />
      {/* dusting */}
      <g fill="currentColor" stroke="none">
        <circle cx="44" cy="36" r="2" />
        <circle cx="60" cy="33" r="2" />
        <circle cx="76" cy="37" r="2" />
      </g>
      {/* mint */}
      <path d="M62,30 C68,18 78,16 82,20 C80,28 70,32 62,30 Z" />
    </svg>
  );
}

export function PannaCottaIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16,86 C36,94 84,94 104,86" />
      <ellipse cx="60" cy="84" rx="44" ry="9" />
      {/* dome */}
      <path d="M30,80 C30,50 40,32 60,32 C80,32 90,50 90,80" />
      <path d="M30,80 C42,86 78,86 90,80" />
      {/* lemon sauce pooling at the base */}
      <path d="M34,80 C42,88 78,88 86,80 C78,84 42,84 34,80 Z" fill="var(--highlight)" stroke="none" />
      <path d="M34,80 C44,86 76,86 86,80" />
      {/* zest curl */}
      <path d="M52,30 C56,20 68,18 72,24 C74,29 68,32 64,29" />
      <circle cx="60" cy="30" r="3" fill="var(--highlight)" />
    </svg>
  );
}

export function CannoliIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14,84 C34,92 86,92 106,84" />
      <ellipse cx="60" cy="82" rx="46" ry="9" />
      {/* lower tube */}
      <g transform="rotate(-9 60 66)">
        <rect x="24" y="54" width="72" height="24" rx="12" />
        <ellipse cx="28" cy="66" rx="6" ry="12" />
        <path d="M40,56 L34,76M54,55 L48,77M68,55 L62,77M82,56 L76,76" />
      </g>
      {/* upper tube */}
      <g transform="rotate(8 62 40)">
        <rect x="30" y="28" width="66" height="22" rx="11" />
        <ellipse cx="34" cy="39" rx="5.5" ry="11" />
        <path d="M46,30 L40,48M60,29 L54,49M74,29 L68,49" />
      </g>
      {/* candied lemon on the filling */}
      <circle cx="34" cy="39" r="3.5" fill="var(--highlight)" />
      <circle cx="28" cy="66" r="3.5" fill="var(--highlight)" />
    </svg>
  );
}
