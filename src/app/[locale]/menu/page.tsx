import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CucinaFilter, type TranslatedDish } from "@/components/cucina/CucinaFilter";
import { HeroUnderline } from "@/components/illustrations/AperitivoIllustration";
import { PastaIllustration } from "@/components/illustrations/PastaIllustration";
import { StationReveal } from "@/components/route/StationReveal";
import { SideBlob } from "@/components/shapes/Fields";
import { categories, dishes } from "@/data/dishes";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cucina" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/menu" }) };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Cucina");

  const translatedDishes: TranslatedDish[] = dishes.map((dish) => ({
    ...dish,
    name: t(`dishes.${dish.id}.name`),
    description: t(`dishes.${dish.id}.description`),
  }));

  const categoryLabels = {
    tutto: t("categories.tutto"),
    ...(Object.fromEntries(categories.map((c) => [c, t(`categories.${c}`)])) as Record<(typeof categories)[number], string>),
  };

  return (
    <div className="overflow-x-clip">
      {/* The menu opens like a station on the homepage rather than like a
          document: a colour shape running off the right edge, the pasta
          drawing sitting on it, and the same drawn stroke under the
          heading. */}
      {/* Extra bottom room on small screens: the blob is bigger than the
          drawing it sits behind, and on a phone the filter row follows
          directly underneath — without this the green reaches down over the
          category buttons. */}
      <section className="relative px-6 pt-12 pb-10 sm:pt-16 sm:pb-6">
        <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_minmax(0,17rem)]">
          <div>
            <p className="font-script text-3xl text-primary">{t("eyebrow")}</p>
            <h1 className="mt-1 font-display text-foreground" style={{ fontSize: "var(--text-display-lg)" }}>
              {t("title")}
            </h1>
            <HeroUnderline aria-hidden="true" className="mt-1 w-40 text-primary sm:w-52" />
            <p className="mt-4 max-w-xl text-base text-foreground-muted">{t("subtitle")}</p>
          </div>

          {/* The blob lives inside the illustration's own column rather
              than being positioned against the section: the drawing is
              cream, so any part of it that slipped off the green would
              simply disappear into the page. Nesting them keeps the two
              aligned at every breakpoint by construction. */}
          <div className="relative mx-auto w-56 sm:w-64">
            <SideBlob className="absolute inset-[-13%] -z-10 text-secondary" />
            <StationReveal>
              <PastaIllustration className="relative w-full text-background" />
            </StationReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-6 pb-20 sm:pb-24">
        <CucinaFilter
          dishes={translatedDishes}
          categoryLabels={categoryLabels}
          labels={{
            vegetarian: t("vegetarian"),
            vegan: t("vegan"),
            countOne: t("countOne"),
            countMany: t("countMany"),
            empty: t("empty"),
          }}
        />
      </section>
    </div>
  );
}
