import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MenuSection } from "@/components/menu/MenuSection";
import { menuCategories } from "@/data/menu";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Menu" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/speisekarte" }) };
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Menu");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <h1 className="font-display font-semibold tracking-tight" style={{ fontSize: "var(--text-section)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t("subtitle")}</p>

      <div className="mt-14 flex flex-col gap-14">
        {menuCategories.map((category) => (
          <MenuSection key={category} category={category} />
        ))}
      </div>
    </div>
  );
}
