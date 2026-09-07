import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { dishes, formatPriceEur } from "@/data/dishes";

// One real dish from each category, not a generic "our menu" blurb — the
// point is to prove the Cucina data model with actual content before the
// visitor even clicks through to /la-cucina.
const TEASER_IDS = ["bruschetta-pomodoro", "spaghetti-pomodoro", "margherita", "tiramisu"];

export async function CucinaTeaser() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const teaserDishes = TEASER_IDS.map((id) => dishes.find((d) => d.id === id)!);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-sans text-sm font-bold text-primary uppercase">{tHome("cucinaEyebrow")}</p>
          <h2 className="mt-2 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
            {t("title")}
          </h2>
        </div>
        <Link
          href="/la-cucina"
          className="rounded-full border-2 border-foreground px-5 py-2.5 font-sans text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {tHome("cucinaCta")}
        </Link>
      </div>

      <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {teaserDishes.map((dish) => (
          <li key={dish.id} className="flex items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg text-foreground">{t(`dishes.${dish.id}.name`)}</h3>
                {dish.icons.map((icon) => (
                  <IngredientIconGlyph key={icon} name={icon} className="size-4 text-primary" />
                ))}
              </div>
              <p className="mt-1 text-sm text-foreground-muted">{t(`dishes.${dish.id}.description`)}</p>
            </div>
            <span className="font-display text-base whitespace-nowrap text-foreground">
              € {formatPriceEur(dish.priceEur)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
