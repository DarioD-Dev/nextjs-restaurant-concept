import type { SVGProps } from "react";
import type { IngredientIcon } from "@/data/dishes";

// Simple single-stroke line art, not detailed illustration — four
// recognizable shapes (pomodoro, basilico, limone, peperoncino), each its
// own tiny SVG so it can be reused both as a dish marker and in the
// "Fatto in casa" ingredient row at whatever size/color the caller needs
// via currentColor.
const shared: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Pomodoro(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...shared} {...props}>
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7c-1.4-1.6-2.2-2.6-3-3.8M12 7V2.5M12 7c1.4-1.6 2.2-2.6 3-3.8" />
    </svg>
  );
}

function Basilico(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...shared} {...props}>
      <path d="M12 3c6 2 8 8 0 18-8-10-6-16 0-18Z" />
      <path d="M12 5.5v14" />
    </svg>
  );
}

function Limone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...shared} {...props}>
      <ellipse cx="12" cy="12" rx="8" ry="6" />
      <path d="M4 12c-.9.2-1.6.5-2 1M20 12c.9.2 1.6.5 2 1" />
    </svg>
  );
}

function Peperoncino(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...shared} {...props}>
      <path d="M7 4c-1 0-1.6.3-2 1" />
      <path d="M6 4c4 0 12 3 12 10 0 5-4 7-8 6-4-1-6-5-5-10 .6-3 3-4.5 1-6Z" />
    </svg>
  );
}

const ICONS: Record<IngredientIcon, (props: SVGProps<SVGSVGElement>) => React.ReactElement> = {
  pomodoro: Pomodoro,
  basilico: Basilico,
  limone: Limone,
  peperoncino: Peperoncino,
};

export function IngredientIconGlyph({ name, ...props }: { name: IngredientIcon } & SVGProps<SVGSVGElement>) {
  const Icon = ICONS[name];
  return <Icon aria-hidden="true" {...props} />;
}
