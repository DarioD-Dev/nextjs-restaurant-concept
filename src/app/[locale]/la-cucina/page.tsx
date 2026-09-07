import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CucinaFilter, type TranslatedDish } from "@/components/cucina/CucinaFilter";
import { categories, dishes } from "@/data/dishes";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cucina" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/la-cucina" }) };
}

export default async function CucinaPage({ params }: Props) {
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
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <p className="font-sans text-sm font-bold text-primary uppercase">{t("eyebrow")}</p>
      <h1 className="mt-3 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-base text-foreground-muted">{t("subtitle")}</p>

      <div className="mt-10">
        <CucinaFilter
          dishes={translatedDishes}
          categoryLabels={categoryLabels}
          labels={{
            vegetarian: t("vegetarian"),
            vegan: t("vegan"),
            countSuffix: t("countSuffix"),
          }}
        />
      </div>
    </div>
  );
}
