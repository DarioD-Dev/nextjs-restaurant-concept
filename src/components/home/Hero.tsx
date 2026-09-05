import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Asymmetric on purpose: text sits in a narrow left column, the image
// dominates the right two-thirds and bleeds to the page edge — a
// centered-hero-over-full-width-image would read as every other
// restaurant template. Slow entrance only (hero-rise), no scroll-linked
// motion here — that's reserved for the Saisonlinie.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-16 sm:pt-24 sm:pb-0 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-end lg:gap-16">
        <div className="hero-rise lg:pb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase">{t("eyebrow")}</p>
          <h1
            className="mt-5 font-display font-medium tracking-tight text-balance"
            style={{ fontSize: "var(--text-display-lg)", lineHeight: 1.05 }}
          >
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-sm text-base text-foreground-muted">{t("subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/saison"
              className="border border-primary px-6 py-3 font-sans text-xs tracking-[0.15em] text-primary uppercase transition-colors hover:bg-primary hover:text-background"
            >
              {t("ctaSeason")}
            </Link>
            <Link
              href="/reservieren"
              className="px-6 py-3 font-sans text-xs tracking-[0.15em] text-foreground-muted uppercase transition-colors hover:text-foreground"
            >
              {t("ctaReserve")}
            </Link>
          </div>
        </div>

        <ImagePlaceholder
          label={t("heroImageLabel")}
          aspect="4 / 5"
          tone="brass"
          className="hero-rise lg:aspect-[3/4]"
        />
      </div>
    </section>
  );
}
