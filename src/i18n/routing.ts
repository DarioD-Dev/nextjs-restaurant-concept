import { defineRouting } from "next-intl/routing";

// Three lean routes: the menu is the flagship feature and gets its own
// shareable URL, reservations stay honest and separate, everything else
// (contact details) lives in the footer instead of its own page.
export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    // Route keys are English (they're code); the URLs a visitor actually
    // sees are plain in their own language. Nothing functional is named in
    // Italian — a guest looking for the menu should never have to work out
    // what "la cucina" means.
    "/menu": { de: "/speisekarte", en: "/menu" },
    "/reservations": { de: "/reservierung", en: "/reservations" },
  },
});

export type Locale = (typeof routing.locales)[number];
