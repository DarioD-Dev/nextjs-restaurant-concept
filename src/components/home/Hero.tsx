import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Partenza — where La Rotta begins. Headline sits left, deliberately not
// centered, leaving the right side open for the route/boat layer above it.
// No illustration of its own here: the boat starting its journey behind
// the text is the visual.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-4xl">
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
