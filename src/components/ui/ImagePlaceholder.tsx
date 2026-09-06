// Deliberately not a fake photo: a real photograph will replace this `<div>`
// with a Next/Image at the exact same aspect ratio/crop later. But a flat
// gradient rectangle reads as "missing content", not as a planned
// photograph — so this now behaves like a shot waiting to be taken: a grain
// texture instead of a smooth UI gradient, thin viewfinder corner marks
// (this is a framed composition, not a filler block), and a small italic
// caption in the corner like a museum wall label or a photo credit, not a
// bold "PLACEHOLDER" stamp.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function CornerMarks() {
  const positions = ["top-3 left-3", "top-3 right-3 rotate-90", "bottom-3 left-3 -rotate-90", "bottom-3 right-3 rotate-180"];
  return (
    <>
      {positions.map((pos) => (
        <svg
          key={pos}
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={`pointer-events-none absolute ${pos} size-3.5 opacity-60`}
        >
          <path d="M1 7V3a2 2 0 0 1 2-2h4" fill="none" stroke="var(--primary)" strokeWidth="1" />
        </svg>
      ))}
    </>
  );
}

export function ImagePlaceholder({
  label,
  aspect,
  tone = "ink",
  fill = false,
  angledCrop = false,
  scrim = false,
  className,
}: {
  label: string;
  /** Ignored when `fill` is true. */
  aspect?: string;
  tone?: "ink" | "brass" | "petrol";
  /** Fills the nearest `relative` positioned ancestor instead of sizing by aspect ratio — the same technique a real hero photograph would use (next/image `fill` + object-cover). */
  fill?: boolean;
  /** Cuts one corner via clip-path — for the handful of placements where the final photograph is planned as an asymmetric, grid-breaking crop rather than a plain rectangle. */
  angledCrop?: boolean;
  /** Darkens the lower portion so overlaid headline type stays legible — used where real text sits on top of this image. */
  scrim?: boolean;
  // If className toggles visibility responsively (e.g. "hidden lg:flex"),
  // keep the visible variant as a flex display — "lg:block" would win over
  // the base `flex` at that breakpoint (same-specificity utilities, later
  // one in the stylesheet wins) and silently break the items-end caption
  // position.
  className?: string;
}) {
  const gradient =
    tone === "brass"
      ? "linear-gradient(160deg, var(--surface-strong) 0%, var(--primary) 100%)"
      : tone === "petrol"
        ? "linear-gradient(160deg, var(--surface-strong) 0%, var(--accent-secondary) 100%)"
        : "linear-gradient(160deg, var(--surface) 0%, var(--surface-strong) 100%)";

  // `fill` needs `position:absolute`, never `relative` at the same time —
  // two conflicting position utilities on one element is the same class of
  // bug the Manifesto image already hit once (see git history): whichever
  // wins, the other silently loses, and here a `relative`-wins outcome
  // collapses this element to zero height (no aspect-ratio is set in fill
  // mode) — the whole placeholder disappears with no error.
  return (
    <div
      className={`${fill ? "absolute inset-0 size-full" : "relative"} overflow-hidden border border-border ${className ?? ""}`}
      style={{
        aspectRatio: fill ? undefined : aspect,
        backgroundImage: gradient,
        clipPath: angledCrop ? "polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)" : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRAIN, opacity: 0.2, mixBlendMode: "overlay" }}
      />
      {scrim && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{ backgroundImage: "linear-gradient(to top, var(--background) 0%, transparent 100%)" }}
        />
      )}
      <CornerMarks />
      {/* angledCrop cuts the bottom-right corner (see clip-path above) — the
          caption has to sit bottom-left there instead, or the clip silently
          eats the end of the label text. */}
      <span
        className={`absolute bottom-4 max-w-[70%] font-display text-xs text-foreground/70 italic sm:text-sm ${
          angledCrop ? "left-4 text-left" : "right-4 text-right"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
