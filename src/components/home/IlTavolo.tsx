import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { dishes, formatPriceEur } from "@/data/dishes";
import { StationReveal } from "@/components/route/StationReveal";

// A scattered set of dish "postcards" — alternating vertical offset and a
// few degrees of rotation each, not a uniform grid — one from each
// category, proving the data model with real content before the visitor
// even reaches the menu page.
const TEASER = [
  { id: "bruschetta-pomodoro", tilt: "-2deg", offset: "" },
  { id: "spaghetti-pomodoro", tilt: "1deg", offset: "sm:mt-10" },
  { id: "margherita", tilt: "2deg", offset: "" },
  { id: "tiramisu", tilt: "-1deg", offset: "sm:mt-6" },
];

export async function IlTavolo() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");

  return (
    <section className="relative px-6 pt-16 pb-6 sm:pt-24 sm:pb-8">
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="font-script text-3xl text-primary">{tHome("cucinaEyebrow")}</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
            {t("title")}
          </h2>
          <Link
            href="/menu"
            className="rounded-full border-2 border-foreground px-5 py-2.5 font-sans text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {tHome("cucinaCta")}
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 sm:gap-8">
          {TEASER.map(({ id, tilt, offset }) => {
            const dish = dishes.find((d) => d.id === id)!;
            return (
              <li key={id} className={offset}>
                <StationReveal>
                  <div
                    tabIndex={0}
                    className="tilt-card rounded-2xl border-2 border-foreground bg-surface p-5 shadow-[4px_4px_0_var(--foreground)]"
                    style={{ "--tilt": tilt } as React.CSSProperties}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl text-foreground">{t(`dishes.${id}.name`)}</h3>
                      {dish.icons.map((icon) => (
                        <IngredientIconGlyph key={icon} name={icon} className="size-4 text-primary" />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-foreground-muted">{t(`dishes.${id}.description`)}</p>
                    <p className="mt-3 font-display text-lg text-primary">€ {formatPriceEur(dish.priceEur)}</p>
                  </div>
                </StationReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
