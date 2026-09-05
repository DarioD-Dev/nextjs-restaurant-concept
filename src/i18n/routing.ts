import { defineRouting } from "next-intl/routing";

// Experience-led IA, not a utility-page list: no dedicated Kontakt route —
// contact details live in the persistent footer and the Haus page instead.
// "Speisekarte" is replaced by "Saison" (the Saisonlinie IS the menu
// experience, not a separate list bolted on next to it).
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/saison": { de: "/saison", en: "/season" },
    "/haus": { de: "/haus", en: "/house" },
    "/reservieren": { de: "/reservieren", en: "/reservations" },
  },
});

export type Locale = (typeof routing.locales)[number];
