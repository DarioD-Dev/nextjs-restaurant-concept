"use client";

import { useId, useMemo, useState } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { seasonForMonth, type Month, type MenuCategory } from "@/data/menu";

export type TranslatedMenuItem = {
  id: string;
  category: MenuCategory;
  priceEur: number;
  dietary: string[];
  allergens: string[];
  seasonMonths: number[];
  name: string;
  description: string;
};

// The Saisonlinie: a native <input type="range"> restyled as an editorial
// instrument. Native on purpose — free keyboard stepping (arrow keys,
// Home/End), free touch drag, free screen-reader value announcement via
// aria-valuetext. Scrubbing NEVER hides a dish: every item in the full,
// categorized menu below stays fully visible and at full text contrast at
// all times (constraint: allergens/dietary/prices must always be legible).
// In-season dishes get a quiet left accent marker instead of dimming
// out-of-season ones — a highlight, not a filter.
export function SeasonExplorer({
  items,
  categoryOrder,
  categoryLabels,
  monthLabels,
  seasonLabels,
  dietaryLabels,
  allergenLabels,
  containsLabel,
  inSeasonLabel,
  scrubberLabel,
}: {
  items: TranslatedMenuItem[];
  categoryOrder: MenuCategory[];
  categoryLabels: Record<MenuCategory, string>;
  monthLabels: string[];
  seasonLabels: Record<string, string>;
  dietaryLabels: Record<string, string>;
  allergenLabels: Record<string, string>;
  containsLabel: string;
  inSeasonLabel: string;
  scrubberLabel: string;
}) {
  // November by default: a fixed, deterministic value (not `new Date()`,
  // which would risk a server/client hydration mismatch for no real
  // benefit) chosen because it's the month where most of this menu is
  // actually in season — a strong first impression rather than a slider
  // sitting at an arbitrary January.
  const [month, setMonth] = useState<Month>(11);
  const sliderId = useId();

  const season = seasonForMonth(month);
  const monthLabel = monthLabels[month - 1];

  const itemsByCategory = useMemo(() => {
    const map = new Map<MenuCategory, TranslatedMenuItem[]>();
    for (const category of categoryOrder) {
      map.set(
        category,
        items.filter((item) => item.category === category),
      );
    }
    return map;
  }, [items, categoryOrder]);

  return (
    <div>
      <div className="border-b border-border pb-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-center lg:gap-16">
          <ImagePlaceholder
            label={`${scrubberLabel} — ${monthLabel}`}
            aspect="4 / 5"
            tone={month % 2 === 0 ? "petrol" : "brass"}
            angledCrop
            className="lg:-my-6"
          />

          <div>
            <label htmlFor={sliderId} className="font-sans text-xs tracking-label text-primary uppercase">
              {seasonLabels[season]}
            </label>
            <p className="mt-2 font-display text-4xl sm:text-5xl">{monthLabel}</p>

            <input
              id={sliderId}
              type="range"
              min={1}
              max={12}
              step={1}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value) as Month)}
              className="season-slider mt-8"
              aria-valuetext={`${monthLabel} — ${seasonLabels[season]}`}
            />
            <div className="mt-3 flex justify-between font-sans text-[10px] tracking-widest text-foreground-muted uppercase">
              {monthLabels.map((label, i) => (
                <span key={label} className={i + 1 === month ? "text-primary" : undefined}>
                  {label.slice(0, 1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-16 py-16">
        {categoryOrder.map((category) => (
          <div key={category}>
            <h2 className="font-display text-2xl sm:text-3xl">{categoryLabels[category]}</h2>
            <ul className="mt-8 flex flex-col gap-6">
              {itemsByCategory.get(category)?.map((item) => {
                const inSeason = item.seasonMonths.includes(month);
                return (
                  <li
                    key={item.id}
                    className={`border-l-2 pl-5 ${inSeason ? "border-primary" : "border-border"}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg">{item.name}</h3>
                        {inSeason && (
                          <span className="font-sans text-[10px] tracking-widest text-primary uppercase">
                            {inSeasonLabel}
                          </span>
                        )}
                        {item.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="border border-border px-1.5 py-0.5 font-sans text-[10px] tracking-wide text-foreground-muted uppercase"
                          >
                            {dietaryLabels[tag]}
                          </span>
                        ))}
                      </div>
                      <span className="font-display text-base italic whitespace-nowrap">
                        {item.priceEur.toFixed(2).replace(".", ",")} €
                      </span>
                    </div>
                    <p className="mt-2 max-w-md text-sm text-foreground-muted">{item.description}</p>
                    {item.allergens.length > 0 && (
                      <p className="mt-1.5 font-sans text-xs text-foreground-muted/80">
                        {containsLabel} {item.allergens.map((a) => allergenLabels[a]).join(", ")}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
