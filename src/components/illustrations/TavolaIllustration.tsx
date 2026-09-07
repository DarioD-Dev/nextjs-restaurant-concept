import type { SVGProps } from "react";

// "A tavola" — the centrepiece of the homepage: one Italian table seen
// from above, drawn as a single connected scene rather than a row of
// icons. The basil tablecloth is part of the drawing, not a section
// background behind it, and several objects (the glasses at the top, the
// napkin at the bottom) deliberately cross its edge so the colour reads as
// a shape in an illustration.
//
// Two stroke rules keep the whole thing legible wherever it lands: an
// object drawn straight onto the cloth is outlined in cream, and an object
// with a cream body is outlined in ink. That is why the tomato and the
// basil sprig have cream outlines while the plates have ink ones — and why
// nothing goes invisible where an object hangs off the cloth onto the
// page.
export function TavolaIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 640 470" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {/* the tablecloth */}
      <path
        d="M56,74 C170,42 300,54 432,46 C524,40 606,74 610,152 C614,232 598,332 562,388 C520,450 378,434 248,428 C138,423 40,404 30,320 C20,238 26,124 56,74 Z"
        fill="var(--secondary)"
      />

      {/* two glasses, crossing the top edge of the cloth */}
      <g stroke="var(--foreground)" strokeWidth="2.6">
        <g transform="translate(468 96)">
          <path d="M-21,-52 H21 C21,-20 12,-4 0,-2 C-12,-4 -21,-20 -21,-52 Z" fill="var(--background)" />
          <path d="M-18,-28 C-10,-22 10,-22 18,-28 C17,-14 9,-4 0,-2 C-9,-4 -17,-14 -18,-28 Z" fill="var(--primary-vivid)" />
          <path d="M0,-2 V26" />
          <path d="M-15,28 H15" />
        </g>
        <g transform="translate(536 74) rotate(6)">
          <path d="M-17,-44 H17 C17,-17 10,-4 0,-2 C-10,-4 -17,-17 -17,-44 Z" fill="var(--background)" />
          <path d="M0,-2 V22" />
          <path d="M-13,24 H13" />
        </g>
      </g>

      {/* the pizza, on its board */}
      <g>
        <circle cx="300" cy="238" r="112" fill="var(--background)" stroke="var(--foreground)" strokeWidth="3" />
        <circle cx="300" cy="238" r="94" fill="var(--primary-vivid)" />
        <circle cx="300" cy="238" r="94" stroke="var(--foreground)" strokeWidth="2.4" />
        <g stroke="var(--background)" strokeWidth="1.8" strokeOpacity="0.55">
          <path d="M300,144 V332M206,238 H394M234,172 L366,304M366,172 L234,304" />
        </g>
        <g fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.6">
          <circle cx="262" cy="196" r="12" />
          <circle cx="342" cy="206" r="11" />
          <circle cx="272" cy="284" r="11" />
          <circle cx="348" cy="278" r="12" />
          <circle cx="304" cy="238" r="10" />
        </g>
        <g fill="var(--secondary)" stroke="var(--foreground)" strokeWidth="1.4">
          <path d="M0,0 C9,-8 23,-5 26,3 C17,11 4,9 0,0 Z" transform="translate(238 232) rotate(-14)" />
          <path d="M0,0 C9,-8 23,-5 26,3 C17,11 4,9 0,0 Z" transform="translate(316 300) rotate(12)" />
          <path d="M0,0 C9,-8 23,-5 26,3 C17,11 4,9 0,0 Z" transform="translate(320 172) rotate(-6)" />
        </g>
      </g>

      {/* pasta bowl, top left */}
      <g>
        <ellipse cx="134" cy="152" rx="84" ry="64" fill="var(--background)" stroke="var(--foreground)" strokeWidth="3" />
        <ellipse cx="134" cy="152" rx="66" ry="48" stroke="var(--foreground)" strokeWidth="2" />
        <g stroke="var(--foreground)" strokeWidth="2.4">
          <path d="M80,150 C96,132 112,168 130,150 C148,132 166,166 186,146" />
          <path d="M84,166 C102,150 116,182 136,164 C154,148 170,180 188,160" />
          <path d="M88,132 C104,116 120,146 140,130 C156,117 172,146 186,130" />
        </g>
        <g fill="var(--primary-vivid)" stroke="var(--foreground)" strokeWidth="1.4">
          <circle cx="108" cy="142" r="7" />
          <circle cx="158" cy="158" r="6" />
          <circle cx="132" cy="176" r="5" />
        </g>
      </g>

      {/* fork on the cloth, between bowl and pizza */}
      <g stroke="var(--background)" strokeWidth="2.6">
        <path d="M228,96 V150" />
        <path d="M216,96 V124 C216,132 240,132 240,124 V96" />
        <path d="M224,96 V118M232,96 V118" />
      </g>

      {/* plate with lemon and olives, right */}
      <g>
        <circle cx="500" cy="330" r="72" fill="var(--background)" stroke="var(--foreground)" strokeWidth="3" />
        <circle cx="500" cy="330" r="55" stroke="var(--foreground)" strokeWidth="1.8" />
        <circle cx="488" cy="322" r="26" fill="var(--highlight)" stroke="var(--foreground)" strokeWidth="2.2" />
        <g stroke="var(--foreground)" strokeWidth="1.6">
          <path d="M488,300 V344M466,322 H510M472,306 L504,338M504,306 L472,338" />
        </g>
        <g fill="var(--secondary)" stroke="var(--foreground)" strokeWidth="1.6">
          <ellipse cx="524" cy="356" rx="12" ry="9" transform="rotate(-18 524 356)" />
          <ellipse cx="500" cy="368" rx="11" ry="8" transform="rotate(8 500 368)" />
        </g>
      </g>

      {/* napkin with cutlery, crossing the bottom edge */}
      <g transform="translate(126 400) rotate(-7)">
        <rect x="-76" y="-52" width="152" height="104" rx="10" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2.6" />
        <g stroke="var(--foreground)" strokeWidth="1.8">
          <path d="M-76,-22 H76M-76,18 H76" />
        </g>
        <g stroke="var(--foreground)" strokeWidth="2.4">
          <path d="M14,-38 V38" />
          <path d="M2,-38 V-16 C2,-9 26,-9 26,-16 V-38" />
          <path d="M44,-38 C56,-30 56,-8 44,-2 V38" />
        </g>
      </g>

      {/* loose bread, on the cloth */}
      <g fill="var(--background)" stroke="var(--foreground)" strokeWidth="2.2">
        <ellipse cx="366" cy="396" rx="30" ry="21" transform="rotate(-12 366 396)" />
        <ellipse cx="422" cy="380" rx="26" ry="18" transform="rotate(9 422 380)" />
      </g>
      <g stroke="var(--foreground)" strokeWidth="1.6">
        <path d="M352,390 L378,400M410,376 L432,384" />
      </g>

      {/* tomato and basil, straight on the cloth */}
      <g stroke="var(--background)" strokeWidth="2.4">
        <circle cx="404" cy="126" r="24" fill="var(--primary-vivid)" />
        <path d="M404,102 C398,94 400,88 405,86M404,102 C407,94 412,91 418,90M404,102 C399,96 396,90 399,85" />
      </g>
      <g stroke="var(--background)" strokeWidth="2.4">
        <path d="M556,318 V214" />
        <path d="M556,292 C570,294 576,304 568,316 C554,314 548,304 556,292 Z" />
        <path d="M556,256 C542,258 536,268 544,280 C558,278 564,268 556,256 Z" />
        <path d="M556,222 C568,222 574,231 568,242 C556,242 550,233 556,222 Z" />
      </g>

      {/* crumbs */}
      <g fill="var(--background)" fillOpacity="0.75">
        <circle cx="196" cy="330" r="4" />
        <circle cx="214" cy="352" r="3" />
        <circle cx="452" cy="228" r="3.5" />
        <circle cx="436" cy="252" r="2.6" />
        <circle cx="308" cy="384" r="3" />
      </g>
    </svg>
  );
}
