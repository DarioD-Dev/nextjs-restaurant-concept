import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Haus" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/haus" }) };
}

// A small magazine feature, not a utility "about" page: the interior shot
// bleeds full-width and the section heading that follows is pulled up over
// its bottom edge (a scrim keeps it legible) instead of the two sitting in
// separate, politely stacked blocks. The kitchen text/detail-image pairing
// below is asymmetric and vertically offset, not a plain two-column split.
export default async function HausPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Haus");

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20">
        <p className="font-sans text-xs tracking-label text-primary uppercase">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-2xl font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
          {t("title")}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-foreground-muted">{t("intro")}</p>
      </div>

      <div className="relative mt-14">
        <ImagePlaceholder label={t("interiorImageLabel")} aspect="2 / 1" tone="brass" scrim className="w-full" />
        <h2
          className="relative z-10 mx-auto -mt-24 max-w-6xl px-6 font-display text-3xl sm:text-5xl"
          style={{ color: "var(--foreground)" }}
        >
          {t("philosophyTitle")}
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-8 pb-20 sm:pb-28 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <p className="max-w-md text-base text-foreground-muted lg:mt-4">{t("philosophyBody")}</p>
        {/* Sizing here is deliberate and fragile-if-changed: `self-start`
            stops the grid stretching its height (aspect-ratio would then
            derive a squashed width from it), and `w-full` is required
            because `justify-self-end` otherwise shrink-wraps the box to its
            content — which is empty, so it collapses to nothing. */}
        <ImagePlaceholder
          label={t("detailImageLabel")}
          aspect="4 / 3"
          tone="petrol"
          angledCrop
          className="w-full lg:mt-16 lg:max-w-md lg:self-start lg:justify-self-end"
        />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
          <h2 className="font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
            {t("contactTitle")}
          </h2>
          <p className="mt-4 max-w-lg text-base text-foreground-muted">{t("contactBody")}</p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
