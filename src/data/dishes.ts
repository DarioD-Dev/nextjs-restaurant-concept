export const categories = ["antipasti", "pasta", "pizza", "dolci"] as const;
export type Category = (typeof categories)[number];

// The four illustrated ingredient icons the brief scoped — deliberately not
// a general allergen/tag system (see the "was nicht bauen" list), just
// enough to give a handful of dishes a small line-art marker.
export const ingredientIcons = ["pomodoro", "basilico", "limone", "peperoncino"] as const;
export type IngredientIcon = (typeof ingredientIcons)[number];

export type Dish = {
  id: string;
  category: Category;
  priceEur: number;
  vegetarian: boolean;
  vegan: boolean;
  icons: IngredientIcon[];
};

// Structure only — name/description live in messages/*.json (Cucina.dishes.*),
// same split every DarioDev data file uses. 14 real dishes, four categories,
// no Lorem Ipsum. `icons` is populated only where pomodoro/basilico/limone/
// peperoncino actually define the dish — most dishes carry zero or one, not
// every ingredient gets an icon.
export const dishes: Dish[] = [
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
];

export function dishesByCategory(category: Category): Dish[] {
  return dishes.filter((d) => d.category === category);
}

// "12.00" -> "12", "6.50" -> "6,50" — one shared formatter so every price
// display (teaser, spotlight, full menu) handles the German decimal comma
// the same way instead of four slightly different inline chains.
export function formatPriceEur(priceEur: number): string {
  return priceEur.toFixed(2).replace(/\.00$/, "").replace(".", ",");
}
