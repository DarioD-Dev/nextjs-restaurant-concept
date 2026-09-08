"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { categories, formatPrice, type Category, type Dish } from "@/data/dishes";

export type TranslatedDish = Dish & { name: string; description: string };

/** The category tabs, including the pseudo-category that clears the filter. */
export type CategoryFilter = "all" | Category;

export type MenuFilterLabels = {
  vegetarian: string;
  vegan: string;
  // Singular and plural come over separately rather than as one suffix:
  // the count changes on the client, so the right word has to be picked
  // there — "1 Gerichte" was the old, wrong version of this.
  countOne: string;
  countMany: string;
  empty: string;
};

const CHIP_BASE = "rounded-full px-4 py-2 font-sans text-sm transition-colors";
const CHIP_OFF = `${CHIP_BASE} border border-border font-semibold text-foreground-muted`;

// The flagship feature: real filtering, not a mockup. Deliberately narrow
// scope per the brief — one exclusive category tab row plus two combinable
// diet toggles, nothing else (no price slider, no allergen button battery,
// no sort options). A dish never disappears silently: the live count above
// the list says exactly how many match, and an empty result says so.
//
// Filtering runs on every render without useMemo on purpose. It is a
// single pass over 14 objects triggered by a click, the results feed plain
// DOM rather than a memoised child, and caching it would cost more
// attention to read than it saves in work.
export function MenuFilter({
  dishes,
  categoryLabels,
  labels,
}: {
  dishes: TranslatedDish[];
  categoryLabels: Record<CategoryFilter, string>;
  labels: MenuFilterLabels;
}) {
  const locale = useLocale();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);

  const filtered = dishes.filter((dish) => {
    if (category !== "all" && dish.category !== category) return false;
    if (veganOnly && !dish.vegan) return false;
    if (vegetarianOnly && !dish.vegetarian) return false;
    return true;
  });

  // Grouped in menu order, empty groups dropped. No need to special-case a
  // selected category: filtering has already removed every other one.
  const groups = categories
    .map((c) => ({ category: c, items: filtered.filter((dish) => dish.category === c) }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={
              category === c
                ? `${CHIP_BASE} bg-primary font-bold text-background`
                : `${CHIP_OFF} hover:border-primary hover:text-foreground`
            }
          >
            {categoryLabels[c]}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <DietToggle
          label={labels.vegetarian}
          emoji="🌱"
          pressed={vegetarianOnly}
          onToggle={() => setVegetarianOnly((v) => !v)}
        />
        <DietToggle
          label={labels.vegan}
          emoji="🌿"
          pressed={veganOnly}
          onToggle={() => setVeganOnly((v) => !v)}
        />
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
        {groups.map((group) => (
          <div key={group.category}>
            <h2 className="font-display text-2xl text-foreground">
              {categoryLabels[group.category]}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((dish, i) => (
                <li key={dish.id}>
                  <article
                    tabIndex={0}
                    className="tilt-card h-full rounded-2xl border-2 border-foreground bg-surface p-5"
                    style={{ "--tilt": i % 2 === 0 ? "-1deg" : "1deg" } as React.CSSProperties}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-display text-lg text-foreground">{dish.name}</h3>
                      <span className="font-display text-lg whitespace-nowrap text-primary">
                        {formatPrice(dish.priceEur, locale)}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {dish.icons.map((icon) => (
                        <IngredientIconGlyph
                          key={icon}
                          name={icon}
                          className="size-4 text-primary"
                        />
                      ))}
                      <DietMark dish={dish} labels={labels} />
                    </div>
                    <p className="mt-2 text-sm text-foreground-muted">{dish.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function DietToggle({
  label,
  emoji,
  pressed,
  onToggle,
}: {
  label: string;
  emoji: string;
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={pressed}
      className={
        pressed
          ? `${CHIP_BASE} bg-secondary font-bold text-background`
          : `${CHIP_OFF} hover:border-secondary hover:text-foreground`
      }
    >
      {/* The label already carries the meaning — without this the emoji is
          announced as "seedling" in front of every option. */}
      <span aria-hidden="true">{emoji} </span>
      {label}
    </button>
  );
}

// Vegan implies vegetarian, so only the stronger of the two is marked.
function DietMark({ dish, labels }: { dish: Dish; labels: MenuFilterLabels }) {
  if (!dish.vegetarian && !dish.vegan) return null;
  const [emoji, label] = dish.vegan
    ? (["🌿", labels.vegan] as const)
    : (["🌱", labels.vegetarian] as const);

  return (
    <span role="img" aria-label={label} className="text-sm">
      {emoji}
    </span>
  );
}
