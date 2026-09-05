import { getTranslations } from "next-intl/server";
import { menuItemsByCategory, type MenuCategory } from "@/data/menu";

// Renders the dietary/allergen data straight from data/menu.ts — this is
// deliberately the same shape a future filter UI (see the DarioDev solution
// page's "planned" ideas) would read from, not a display-only afterthought.
// No filter control here yet — that interaction is the next build phase —
// just the data honestly and completely shown.
export async function MenuSection({ category }: { category: MenuCategory }) {
  const t = await getTranslations("Menu");
  const items = menuItemsByCategory(category);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        {t(`categories.${category}`)}
      </h2>
      <ul className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-semibold">{t(`items.${item.id}.name`)}</h3>
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-accent/10 px-2 py-0.5 font-sans text-xs font-medium text-accent-hover"
                  >
                    {t(`dietary.${tag}`)}
                  </span>
                ))}
              </div>
              <p className="mt-1.5 max-w-md text-sm text-muted">{t(`items.${item.id}.description`)}</p>
              {item.allergens.length > 0 && (
                <p className="mt-1.5 text-xs text-muted/80">
                  {t("containsAllergens")} {item.allergens.map((a) => t(`allergens.${a}`)).join(", ")}
                </p>
              )}
            </div>
            <span className="font-display text-base font-medium whitespace-nowrap">
              {item.priceEur.toFixed(2).replace(".", ",")} €
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
