import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// No photography needed here: a large tomato-vivid circle (a plate/pizza
// silhouette, not a literal illustration) bleeds off the right edge behind
// the headline — round shapes are the visual signature this project uses
// instead of Amsel's sharp rectilinear edges. Slow entrance only
// (hero-rise), nothing scroll-linked here — that's reserved for the boat.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-32 -z-10 size-[28rem] -translate-y-1/2 rounded-full bg-primary-vivid/15 sm:size-[38rem]"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-56 -z-10 size-[20rem] -translate-y-1/2 rounded-full border-4 border-highlight/50 sm:size-[26rem]"
      />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <p className="hero-rise font-sans text-sm font-bold text-primary uppercase">{t("eyebrow")}</p>
        <h1
          className="hero-rise mt-4 max-w-2xl font-display text-foreground"
          style={{ fontSize: "var(--text-display-xl)", lineHeight: 0.95, "--rise-delay": "80ms" } as React.CSSProperties}
        >
          {t("headline")}
        </h1>
        <p
          className="hero-rise mt-5 max-w-md text-lg text-foreground-muted"
          style={{ "--rise-delay": "160ms" } as React.CSSProperties}
        >
          {t("subtitle")}
        </p>
        <div className="hero-rise mt-8 flex flex-wrap gap-4" style={{ "--rise-delay": "220ms" } as React.CSSProperties}>
          <Link
            href="/prenota"
            className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
          >
            {t("ctaPrenota")}
          </Link>
          <Link
            href="/la-cucina"
            className="rounded-full border-2 border-foreground px-6 py-3 font-sans text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t("ctaCucina")}
          </Link>
        </div>
      </div>
    </section>
  );
}
