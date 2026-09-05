import { defineRouting } from "next-intl/routing";

// IA mirrors Salon Kupferglanz's shape (four lean pages, not five) rather
// than Maison Aurelle's product-catalog structure: this is a service
// business with one menu, not a multi-page product grid.
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/speisekarte": { de: "/speisekarte", en: "/menu" },
    "/reservieren": { de: "/reservieren", en: "/reservations" },
    "/kontakt": { de: "/kontakt", en: "/contact" },
  },
});

export type Locale = (typeof routing.locales)[number];
