import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SeasonExplorer, type TranslatedMenuItem } from "@/components/season/SeasonExplorer";
import { menuCategories, menuItems, seasons } from "@/data/menu";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Season" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/saison" }) };
}

export default async function SeasonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Season");

  const items: TranslatedMenuItem[] = menuItems.map((item) => ({
    ...item,
    name: t(`items.${item.id}.name`),
    description: t(`items.${item.id}.description`),
  }));

  const categoryLabels = Object.fromEntries(menuCategories.map((c) => [c, t(`categories.${c}`)])) as Record<
    (typeof menuCategories)[number],
    string
  >;
  const seasonLabels = Object.fromEntries(seasons.map((s) => [s, t(`seasons.${s}`)])) as Record<
    (typeof seasons)[number],
    string
  >;
  const monthLabels = t.raw("months") as string[];
  const dietaryLabels = t.raw("dietary") as Record<string, string>;
  const allergenLabels = t.raw("allergens") as Record<string, string>;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase">{t("eyebrow")}</p>
      <h1 className="mt-4 max-w-2xl font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-base text-foreground-muted">{t("subtitle")}</p>

      <div className="mt-14">
        <SeasonExplorer
          items={items}
          categoryOrder={[...menuCategories]}
          categoryLabels={categoryLabels}
          monthLabels={monthLabels}
          seasonLabels={seasonLabels}
          dietaryLabels={dietaryLabels}
          allergenLabels={allergenLabels}
          containsLabel={t("containsAllergens")}
          inSeasonLabel={t("inSeasonLabel")}
          scrubberLabel={t("scrubberImageLabel")}
        />
      </div>
    </div>
  );
}
