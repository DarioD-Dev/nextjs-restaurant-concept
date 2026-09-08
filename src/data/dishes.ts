import type { Locale } from "@/i18n/routing";

export const categories = ["antipasti", "pasta", "pizza", "dolci"] as const;
export type Category = (typeof categories)[number];

// The four illustrated ingredient markers the brief scoped — deliberately
// not a general allergen/tag system, just enough to give a handful of
// dishes a small line-art marker. A plain union, not an array: nothing
// iterates over these, they are only ever looked up (see IngredientIcons).
export type IngredientIcon = "pomodoro" | "basilico" | "limone" | "peperoncino";

export type Dish = {
  id: string;
  category: Category;
  priceEur: number;
  vegetarian: boolean;
  vegan: boolean;
  icons: readonly IngredientIcon[];
};

// Structure only — name/description live in messages/*.json (Menu.dishes.*),
// same split every DarioDev data file uses. 14 real dishes, four categories,
// no Lorem Ipsum. `icons` is populated only where pomodoro/basilico/limone/
// peperoncino actually define the dish — most dishes carry zero or one, not
// every ingredient gets an icon.
//
// `as const satisfies` rather than a plain `Dish[]` annotation: it still
// type-checks every entry against Dish, but it also keeps the literal ids,
// which is what makes DishId below a real union. Components that pick
// specific dishes by hand (the homepage teaser, the pizza station, the
// desserts) are then checked at compile time instead of blowing up at
// runtime on a typo.
//
// One line per dish, because this is a table — prettier would otherwise
// turn 14 readable rows into a hundred lines of vertical objects.
// prettier-ignore
export const dishes = [
  { id: "bruschetta-pomodoro", category: "antipasti", priceEur: 8, vegetarian: true, vegan: true, icons: ["pomodoro", "basilico"] },
  { id: "burrata-prosciutto", category: "antipasti", priceEur: 14, vegetarian: false, vegan: false, icons: [] },
  { id: "carpaccio-manzo", category: "antipasti", priceEur: 15, vegetarian: false, vegan: false, icons: ["limone"] },

  { id: "spaghetti-pomodoro", category: "pasta", priceEur: 13, vegetarian: true, vegan: true, icons: ["pomodoro", "basilico"] },
  { id: "cacio-e-pepe", category: "pasta", priceEur: 15, vegetarian: true, vegan: false, icons: [] },
  { id: "pappardelle-ragu", category: "pasta", priceEur: 17, vegetarian: false, vegan: false, icons: [] },
  { id: "ravioli-zucca", category: "pasta", priceEur: 16, vegetarian: true, vegan: false, icons: [] },

  { id: "margherita", category: "pizza", priceEur: 12, vegetarian: true, vegan: false, icons: ["pomodoro", "basilico"] },
  { id: "diavola", category: "pizza", priceEur: 15, vegetarian: false, vegan: false, icons: ["pomodoro", "peperoncino"] },
  { id: "marinara", category: "pizza", priceEur: 10, vegetarian: true, vegan: true, icons: ["pomodoro"] },
  { id: "funghi-tartufo", category: "pizza", priceEur: 17, vegetarian: true, vegan: false, icons: [] },

  { id: "tiramisu", category: "dolci", priceEur: 7, vegetarian: true, vegan: false, icons: [] },
  { id: "panna-cotta-limone", category: "dolci", priceEur: 7, vegetarian: true, vegan: false, icons: ["limone"] },
  { id: "cannoli", category: "dolci", priceEur: 6.5, vegetarian: true, vegan: false, icons: [] },
] as const satisfies readonly Dish[];

export type DishId = (typeof dishes)[number]["id"];

export function getDish(id: DishId): Dish {
  const dish = dishes.find((d) => d.id === id);
  // Unreachable while DishId is derived from this very array — the throw is
  // here so a future refactor that widens the parameter type fails loudly
  // instead of rendering "undefined".
  if (!dish) throw new Error(`Unknown dish id: ${id}`);
  return dish;
}

// "12" and "6,50" in German, "12" and "6.50" in English — the decimal
// separator has to follow the locale, and trailing ",00" is noise on a
// menu. One shared formatter so every price on the site (teaser, pizza
// station, desserts, full menu) reads the same way.
//
// Deliberately not Intl's `style: "currency"`: that renders "€ 12,00" /
// "€12.00" with the zero cents the design drops, and puts the symbol on the
// wrong side in German.
export function formatPrice(priceEur: number, locale: Locale): string {
  const fractionDigits = Number.isInteger(priceEur) ? 0 : 2;
  const amount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(priceEur);
  return `€ ${amount}`;
}
