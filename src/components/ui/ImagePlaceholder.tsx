// Deliberately not a fake photo: a real photograph will replace this
// `<div>` with a Next/Image at the exact same aspect ratio later — the
// point of this component is to lock in the format/crop/hierarchy real
// photography needs to slot into, without pretending a gradient is a photo.
// The label is genuinely visible (not decoration), so it reads as "this
// space is reserved for X" rather than as a moody background texture.
export function ImagePlaceholder({
  label,
  aspect,
  tone = "ink",
  className,
}: {
  label: string;
  aspect: string;
  tone?: "ink" | "brass" | "petrol";
  // If className toggles visibility responsively (e.g. "hidden lg:flex"),
  // keep the visible variant as a flex display — "lg:block" would win over
  // the base `flex` at that breakpoint (same-specificity utilities, later
  // one in the stylesheet wins) and silently break the items-end caption
  // position.
  className?: string;
}) {
  const gradient =
    tone === "brass"
      ? "linear-gradient(135deg, var(--surface-strong), var(--primary))"
      : tone === "petrol"
        ? "linear-gradient(135deg, var(--surface-strong), var(--accent-secondary))"
        : "linear-gradient(135deg, var(--surface), var(--surface-strong))";

  return (
    <div
      className={`relative flex items-end overflow-hidden border border-border ${className ?? ""}`}
      style={{ aspectRatio: aspect, backgroundImage: gradient }}
    >
      <span className="m-4 border border-foreground-muted/40 px-2 py-1 font-sans text-[10px] tracking-[0.2em] text-foreground-muted uppercase">
        {label}
      </span>
    </div>
  );
}
