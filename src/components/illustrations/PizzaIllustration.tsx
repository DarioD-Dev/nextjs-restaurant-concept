import type { SVGProps } from "react";

// A whole pizza from above, not a solid-fill circle-with-icon like the
// previous pass — crust ring, slice-cut lines, and scattered toppings
// (basil leaves, tomato roundels) as their own strokes, all in `className`'s
// color (the caller sets text-background when this sits on the bold tomato
// section). The sauce disk is a fixed, separate tomato-dark fill — not tied
// to currentColor — so the cream-stroke toppings stay visible against it
// instead of disappearing into a same-color fill.
export function PizzaIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="3" />
      <circle cx="100" cy="100" r="74" fill="var(--primary)" />
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M100 26v148" />
        <path d="M26 100h148" />
        <path d="M48 48l104 104" />
        <path d="M152 48L48 152" />
      </g>
      {/* basil leaves */}
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M78 70c10 2 14 10 8 18-10-2-14-10-8-18Z" />
        <path d="M126 88c10 2 14 10 8 18-10-2-14-10-8-18Z" />
        <path d="M92 132c10 2 14 10 8 18-10-2-14-10-8-18Z" />
      </g>
      {/* mozzarella / topping roundels */}
      <g stroke="currentColor" strokeWidth="2">
        <circle cx="112" cy="60" r="8" />
        <circle cx="60" cy="108" r="7" />
        <circle cx="140" cy="128" r="9" />
        <circle cx="100" cy="100" r="6" />
      </g>
    </svg>
  );
}
