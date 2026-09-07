import { getTranslations } from "next-intl/server";
import { dishesByCategory, formatPriceEur } from "@/data/dishes";
import { StationReveal } from "@/components/route/StationReveal";

// Not three identical cards: three lemon-ringed medallions of different
// sizes, the center one largest — a small deliberate break from the
// postcard language Il Tavolo already used, so the last two food stations
// don't repeat the same idea.
const SIZES = ["size-32 sm:size-36", "size-40 sm:size-48", "size-32 sm:size-36"];

export async function Dolci() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dolci = dishesByCategory("dolci");

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-script text-3xl text-primary">{tHome("dolciEyebrow")}</p>
        <h2 className="mt-2 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
          {t("categories.dolci")}
        </h2>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {dolci.map((dish, i) => (
            <StationReveal key={dish.id} className="flex flex-col items-center">
              <div
                className={`${SIZES[i % SIZES.length]} flex flex-col items-center justify-center rounded-full border-4 border-highlight bg-surface p-4 text-center`}
              >
                <span className="font-display text-lg text-foreground sm:text-xl">{t(`dishes.${dish.id}.name`)}</span>
                <span className="mt-1 font-display text-base text-primary">€ {formatPriceEur(dish.priceEur)}</span>
              </div>
              <p className="mt-3 max-w-40 text-sm text-foreground-muted">{t(`dishes.${dish.id}.description`)}</p>
            </StationReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
