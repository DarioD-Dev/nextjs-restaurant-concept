import { getTranslations } from "next-intl/server";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { ingredientIcons } from "@/data/dishes";

export async function FattoInCasa() {
  const t = await getTranslations("Home.fattoInCasa");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
      <h2 className="font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
        {t("title")}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base text-foreground-muted">{t("body")}</p>

      <div className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12">
        {ingredientIcons.map((icon) => (
          <div key={icon} className="flex flex-col items-center gap-2">
            <IngredientIconGlyph name={icon} className="size-8 text-primary" />
            <span className="font-sans text-xs font-semibold text-foreground-muted">{t(`labels.${icon}`)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
