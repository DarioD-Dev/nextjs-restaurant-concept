import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// The opening of an editorial, not a landing-page hero: one dominant,
// full-bleed photograph with the type sitting directly on top of it (a
// scrim protects legibility, not a text box). Content is deliberately
// left-heavy and bottom-anchored — most of the frame stays pure image.
// "Wo die Stadt leiser wird." carries the scene; the food-forward line
// does the grounding work one register down, as the subtitle.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative flex min-h-[94vh] items-end overflow-hidden border-b border-border">
      <ImagePlaceholder label={t("heroImageLabel")} tone="brass" fill scrim />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-32 pb-16 sm:pb-20">
        <p className="hero-rise font-sans text-xs tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
        <h1
          className="hero-rise mt-5 max-w-2xl font-display font-medium text-balance"
          style={{ fontSize: "var(--text-display-xl)", lineHeight: 0.98, "--rise-delay": "80ms" } as React.CSSProperties}
        >
          {t("headline")}
        </h1>
        <p
          className="hero-rise mt-6 max-w-md text-base text-foreground-muted sm:text-lg"
          style={{ "--rise-delay": "160ms" } as React.CSSProperties}
        >
          {t("subtitle")}
        </p>
        <div className="hero-rise mt-9 flex flex-wrap gap-6" style={{ "--rise-delay": "220ms" } as React.CSSProperties}>
          <Link
            href="/saison"
            className="border border-primary bg-background/40 px-6 py-3 font-sans text-xs tracking-[0.15em] text-primary uppercase backdrop-blur-sm transition-colors hover:bg-primary hover:text-background"
          >
            {t("ctaSeason")}
          </Link>
          <Link
            href="/reservieren"
            className="px-6 py-3 font-sans text-xs tracking-[0.15em] text-foreground uppercase transition-colors hover:text-primary"
          >
            {t("ctaReserve")}
          </Link>
        </div>
      </div>
    </section>
  );
}
