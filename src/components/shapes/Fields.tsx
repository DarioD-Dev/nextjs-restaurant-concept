import type { SVGProps } from "react";

// The color fields. Tomato and basil are never plain background rectangles
// on a section: they are drawn shapes with hand-wobbled edges, sized and
// positioned by the section that uses them, free to start above their own
// section and end below it. That is the whole difference between "a
// colored container" and "a shape in a poster".
//
// Both take their color from `currentColor` (so a section sets it with a
// text-* utility) and use preserveAspectRatio="none": these are organic
// blobs, stretching them is the point, and it means one path works at
// every width without a per-breakpoint variant.
//
// Every field belongs at -z-20. See the layering note in RouteJourney.

export function WavyBand(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 60" preserveAspectRatio="none" {...props}>
      <path
        d="M0,7 C14,1 26,9 40,7 C56,4 70,12 84,7 C90,5 96,3 100,4 L100,52 C88,58 76,50 62,53 C46,56 32,49 18,54 C11,56 5,58 0,56 Z"
        fill="currentColor"
      />
    </svg>
  );
}

// A single large blob anchored to one edge of the viewport and allowed to
// run off it — used where a full-width band would just re-create the
// horizontal stripe rhythm we're trying to break.
export function SideBlob(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" {...props}>
      <path
        d="M0,2 C34,-2 62,6 78,22 C94,38 96,60 84,76 C70,94 44,102 16,99 C8,98 3,96 0,94 Z"
        fill="currentColor"
      />
    </svg>
  );
}
