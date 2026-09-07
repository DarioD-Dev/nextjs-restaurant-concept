import { getTranslations } from "next-intl/server";
import { dishesByCategory, formatPriceEur } from "@/data/dishes";

export async function DolciTeaser() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dolci = dishesByCategory("dolci");

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="font-sans text-sm font-bold text-primary uppercase">{tHome("dolciEyebrow")}</p>
        <h2 className="mt-2 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
          {t("categories.dolci")}
        </h2>

        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {dolci.map((dish) => (
            <li key={dish.id} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-display text-lg text-foreground">{t(`dishes.${dish.id}.name`)}</h3>
              <p className="mt-1 text-sm text-foreground-muted">{t(`dishes.${dish.id}.description`)}</p>
              <p className="mt-3 font-display text-base text-foreground">
                € {formatPriceEur(dish.priceEur)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
