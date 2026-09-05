export const menuCategories = ["vorspeisen", "hauptgerichte", "desserts"] as const;
export type MenuCategory = (typeof menuCategories)[number];

export const dietaryTags = ["vegan", "vegetarisch", "glutenfrei"] as const;
export type DietaryTag = (typeof dietaryTags)[number];

export const allergens = ["gluten", "milchprodukte", "nuesse", "fisch", "eier"] as const;
export type Allergen = (typeof allergens)[number];

export type MenuItem = {
  id: string;
  category: MenuCategory;
  priceEur: number;
  dietary: DietaryTag[];
  allergens: Allergen[];
};

// Structure only — name/description live in messages/*.json (Menu.items.*),
// same split DarioDev's own data/solutions.ts uses. dietary/allergens are
// real content, not filler: this is the data shape the planned menu filter
// (vegan/vegetarian/allergen — see the DarioDev solution page for
// restaurants) will read from directly, so building that filter later is a
// UI problem on top of this, not a data model to invent afterward.
export const menuItems: MenuItem[] = [
  { id: "rote-bete-carpaccio", category: "vorspeisen", priceEur: 9.5, dietary: ["vegetarisch"], allergens: ["nuesse", "milchprodukte"] },
  { id: "kuerbissuppe", category: "vorspeisen", priceEur: 7.5, dietary: ["vegan", "glutenfrei"], allergens: [] },
  { id: "wurzelgemuese-tarte", category: "vorspeisen", priceEur: 10.5, dietary: ["vegetarisch"], allergens: ["gluten", "milchprodukte"] },

  { id: "geschmorte-pastinake", category: "hauptgerichte", priceEur: 18.5, dietary: ["vegan"], allergens: [] },
  { id: "saiblingsfilet", category: "hauptgerichte", priceEur: 24, dietary: [], allergens: ["fisch", "milchprodukte"] },
  { id: "rindsragout", category: "hauptgerichte", priceEur: 22.5, dietary: [], allergens: [] },
  { id: "sellerie-steak", category: "hauptgerichte", priceEur: 19.5, dietary: ["vegan", "glutenfrei"], allergens: [] },

  { id: "apfel-topfen-strudel", category: "desserts", priceEur: 7.5, dietary: ["vegetarisch"], allergens: ["gluten", "milchprodukte", "eier"] },
  { id: "schokoladentarte", category: "desserts", priceEur: 8, dietary: ["vegan"], allergens: [] },
];

export function menuItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((item) => item.category === category);
}
