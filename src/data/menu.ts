export const menuCategories = ["vorspeisen", "hauptgerichte", "desserts"] as const;
export type MenuCategory = (typeof menuCategories)[number];

export const dietaryTags = ["vegan", "vegetarisch", "glutenfrei"] as const;
export type DietaryTag = (typeof dietaryTags)[number];

export const allergens = ["gluten", "milchprodukte", "nuesse", "fisch", "eier"] as const;
export type Allergen = (typeof allergens)[number];

// 1 = Januar … 12 = Dezember. A dish's real harvest/availability window, not
// a marketing gesture — this is what the Saisonlinie scrubber reads from,
// and what derives the coarse four-season label for the accessible
// fallback view.
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const seasons = ["fruehling", "sommer", "herbst", "winter"] as const;
export type Season = (typeof seasons)[number];

export function seasonForMonth(month: Month): Season {
  if (month >= 3 && month <= 5) return "fruehling";
  if (month >= 6 && month <= 8) return "sommer";
  if (month >= 9 && month <= 11) return "herbst";
  return "winter";
}

export type MenuItem = {
  id: string;
  category: MenuCategory;
  priceEur: number;
  dietary: DietaryTag[];
  allergens: Allergen[];
  seasonMonths: Month[];
};

// Structure only — name/description live in messages/*.json (Season.items.*),
// same split the rest of DarioDev's data files use. dietary/allergens/
// seasonMonths are real content: this is the data shape both the planned
// menu filter and the Saisonlinie scrubber read from directly.
export const menuItems: MenuItem[] = [
  {
    id: "rote-bete-carpaccio",
    category: "vorspeisen",
    priceEur: 9.5,
    dietary: ["vegetarisch"],
    allergens: ["nuesse", "milchprodukte"],
    seasonMonths: [9, 10, 11, 12, 1, 2],
  },
  {
    id: "kuerbissuppe",
    category: "vorspeisen",
    priceEur: 7.5,
    dietary: ["vegan", "glutenfrei"],
    allergens: [],
    seasonMonths: [9, 10, 11, 12],
  },
  {
    id: "wurzelgemuese-tarte",
    category: "vorspeisen",
    priceEur: 10.5,
    dietary: ["vegetarisch"],
    allergens: ["gluten", "milchprodukte"],
    seasonMonths: [10, 11, 12, 1, 2, 3],
  },
  {
    id: "geschmorte-pastinake",
    category: "hauptgerichte",
    priceEur: 18.5,
    dietary: ["vegan"],
    allergens: [],
    seasonMonths: [10, 11, 12, 1, 2],
  },
  {
    id: "saiblingsfilet",
    category: "hauptgerichte",
    priceEur: 24,
    dietary: [],
    allergens: ["fisch", "milchprodukte"],
    seasonMonths: [4, 5, 6, 7, 8],
  },
  {
    id: "rindsragout",
    category: "hauptgerichte",
    priceEur: 22.5,
    dietary: [],
    allergens: [],
    seasonMonths: [10, 11, 12, 1, 2, 3],
  },
  {
    id: "sellerie-steak",
    category: "hauptgerichte",
    priceEur: 19.5,
    dietary: ["vegan", "glutenfrei"],
    allergens: [],
    seasonMonths: [9, 10, 11, 12, 1, 2, 3, 4],
  },
  {
    id: "apfel-topfen-strudel",
    category: "desserts",
    priceEur: 7.5,
    dietary: ["vegetarisch"],
    allergens: ["gluten", "milchprodukte", "eier"],
    seasonMonths: [9, 10, 11, 12, 1],
  },
  {
    id: "schokoladentarte",
    category: "desserts",
    priceEur: 8,
    dietary: ["vegan"],
    allergens: [],
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

export function menuItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}

export function isInSeason(item: MenuItem, month: Month): boolean {
  return item.seasonMonths.includes(month);
}
