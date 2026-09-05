import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export async function SeasonTeaser() {
  const t = await getTranslations("Home.seasonTeaser");

  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase">{t("eyebrow")}</p>
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
        <ImagePlaceholder label={t("imageLabel")} aspect="16 / 9" />
      </div>
    </section>
  );
}
