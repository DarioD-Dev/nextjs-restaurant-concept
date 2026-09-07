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
    // Singular and plural come over separately rather than as one suffix:
    // the count changes on the client, so the right word has to be picked
    // there — "1 Gerichte" was the old, wrong version of this.
    countOne: string;
    countMany: string;
    empty: string;
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
        {filtered.length} {filtered.length === 1 ? labels.countOne : labels.countMany}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl border-2 border-dashed border-border px-6 py-10 text-center font-display text-lg text-foreground-muted">
          {labels.empty}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-14">
        {grouped.map((group) => (
          <div key={group.category}>
            <h2 className="font-display text-2xl text-foreground">{categoryLabels[group.category]}</h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((dish, i) => (
                <li key={dish.id}>
                  <div
                    tabIndex={0}
                    className="tilt-card h-full rounded-2xl border-2 border-foreground bg-surface p-5"
                    style={{ "--tilt": i % 2 === 0 ? "-1deg" : "1deg" } as React.CSSProperties}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-display text-lg text-foreground">{dish.name}</h3>
                      <span className="font-display text-lg whitespace-nowrap text-primary">
                        € {formatPriceEur(dish.priceEur)}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
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
                    <p className="mt-2 text-sm text-foreground-muted">{dish.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
