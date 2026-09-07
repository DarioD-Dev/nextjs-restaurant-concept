"use client";

import { useMemo, useState } from "react";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { categories, formatPriceEur, type Category, type Dish } from "@/data/dishes";

export type TranslatedDish = Dish & { name: string; description: string };

type CategoryFilter = "tutto" | Category;

// The flagship feature: real filtering, not a mockup. Deliberately narrow
// scope per the brief — one exclusive category tab row plus two
// combinable diet toggles, nothing else (no price slider, no allergen
// button battery, no sort options). A dish never disappears silently: the
// live count above the list says exactly how many match.
export function CucinaFilter({
  dishes,
  categoryLabels,
  labels,
}: {
  dishes: TranslatedDish[];
  categoryLabels: Record<CategoryFilter, string>;
  labels: {
    vegetarian: string;
    vegan: string;
    countSuffix: string;
  };
}) {
  const [category, setCategory] = useState<CategoryFilter>("tutto");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);

  const filtered = useMemo(() => {
    return dishes.filter((dish) => {
      if (category !== "tutto" && dish.category !== category) return false;
      if (veganOnly && !dish.vegan) return false;
      if (vegetarianOnly && !dish.vegetarian) return false;
      return true;
    });
  }, [dishes, category, vegetarianOnly, veganOnly]);

  const grouped = useMemo(() => {
    const cats = category === "tutto" ? categories : [category];
    return cats.map((c) => ({ category: c, items: filtered.filter((d) => d.category === c) })).filter((g) => g.items.length > 0);
  }, [filtered, category]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["tutto", ...categories] as CategoryFilter[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={
              category === c
                ? "rounded-full bg-primary px-4 py-2 font-sans text-sm font-bold text-background"
                : "rounded-full border border-border px-4 py-2 font-sans text-sm font-semibold text-foreground-muted transition-colors hover:border-primary hover:text-foreground"
            }
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setVegetarianOnly((v) => !v)}
          aria-pressed={vegetarianOnly}
          className={
            vegetarianOnly
              ? "rounded-full bg-secondary px-4 py-2 font-sans text-sm font-bold text-background"
              : "rounded-full border border-border px-4 py-2 font-sans text-sm font-semibold text-foreground-muted transition-colors hover:border-secondary hover:text-foreground"
          }
        >
          🌱 {labels.vegetarian}
        </button>
        <button
          type="button"
          onClick={() => setVeganOnly((v) => !v)}
          aria-pressed={veganOnly}
          className={
            veganOnly
              ? "rounded-full bg-secondary px-4 py-2 font-sans text-sm font-bold text-background"
              : "rounded-full border border-border px-4 py-2 font-sans text-sm font-semibold text-foreground-muted transition-colors hover:border-secondary hover:text-foreground"
          }
        >
          🌿 {labels.vegan}
        </button>
      </div>

      <p aria-live="polite" className="mt-6 font-sans text-sm text-foreground-muted">
        {filtered.length} {labels.countSuffix}
      </p>

      <div className="mt-6 flex flex-col gap-12">
        {grouped.map((group) => (
          <div key={group.category}>
            <h2 className="font-display text-2xl text-foreground">{categoryLabels[group.category]}</h2>
            <ul className="mt-6 divide-y divide-border">
              {group.items.map((dish) => (
                <li key={dish.id} className="flex items-start justify-between gap-6 py-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg text-foreground">{dish.name}</h3>
                      {dish.icons.map((icon) => (
                        <IngredientIconGlyph key={icon} name={icon} className="size-4 text-primary" />
                      ))}
                      {dish.vegan ? (
                        <span className="text-sm" title={labels.vegan}>
                          🌿
                        </span>
                      ) : dish.vegetarian ? (
                        <span className="text-sm" title={labels.vegetarian}>
                          🌱
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 max-w-md text-sm text-foreground-muted">{dish.description}</p>
                  </div>
                  <span className="font-display text-lg whitespace-nowrap text-foreground">
                    € {formatPriceEur(dish.priceEur)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
