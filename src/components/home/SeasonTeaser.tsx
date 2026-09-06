import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// Image on the left this time, text on the right — alternating the
// rhythm against Manifesto's text-left/image-right so the page doesn't
// read as one repeated two-column template stamped three times.
export async function SeasonTeaser() {
  const t = await getTranslations("Home.seasonTeaser");

  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center lg:gap-16">
        <ImagePlaceholder label={t("imageLabel")} aspect="4 / 3" tone="ink" className="order-2 lg:order-1" />
        <div className="order-1 lg:order-2">
          <p className="font-sans text-xs tracking-label text-primary uppercase">{t("eyebrow")}</p>
          <h2
            className="mt-5 font-display font-medium tracking-tight text-balance"
            style={{ fontSize: "var(--text-display-md)", lineHeight: 1.1 }}
          >
            {t("title")}
          </h2>
          <p className="mt-5 text-sm text-foreground-muted">{t("body")}</p>
          <Link
            href="/saison"
            className="mt-8 inline-block border border-primary px-6 py-3 font-sans text-xs tracking-[0.15em] text-primary uppercase transition-colors hover:bg-primary hover:text-background"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
