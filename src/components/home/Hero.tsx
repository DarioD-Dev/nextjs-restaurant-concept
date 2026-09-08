import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AperitivoIllustration } from "@/components/illustrations/AperitivoIllustration";
import { HeadingUnderline } from "@/components/illustrations/HeadingUnderline";
import { StationReveal } from "@/components/route/StationReveal";

// Partenza — where La Rotta begins. Headline sits left, deliberately not
// centered, with the aperitivo scene taking the right half: the page opens
// on a drawn moment rather than on type alone. The boat is not visible up
// here (it fades in once the journey actually starts, see RouteJourney),
// so this station has to carry itself.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-x-clip px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
      {/* z-10 on every station's content wrapper: the route layer's boat is
          absolutely positioned and would otherwise paint over running text.
          See the layering note in RouteJourney. */}
      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,24rem)]">
        <div>
          <p className="hero-rise font-sans text-sm font-bold text-primary uppercase">
            {t("eyebrow")}
          </p>
          <h1
            className="hero-rise mt-4 max-w-2xl font-display text-display-xl leading-[0.95] text-foreground"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            {t("headline")}
          </h1>
          <HeadingUnderline
            className="hero-rise mt-1 w-48 text-primary sm:w-60"
            style={{ "--rise-delay": "120ms" } as React.CSSProperties}
          />
          <p
            className="hero-rise mt-5 max-w-md text-lg text-foreground-muted"
            style={{ "--rise-delay": "160ms" } as React.CSSProperties}
          >
            {t("subtitle")}
          </p>
          <div
            className="hero-rise mt-8 flex flex-wrap gap-4"
            style={{ "--rise-delay": "220ms" } as React.CSSProperties}
          >
            <Link
              href="/reservations"
              className="rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
            >
              {t("ctaReserve")}
            </Link>
            <Link
              href="/menu"
              className="rounded-full border-2 border-foreground px-6 py-3 font-sans text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {t("ctaMenu")}
            </Link>
          </div>
        </div>

        <StationReveal>
          <AperitivoIllustration className="mx-auto w-72 sm:w-88 lg:w-full" />
        </StationReveal>
      </div>
    </section>
  );
}
