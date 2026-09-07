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
    "/la-cucina": { de: "/la-cucina", en: "/menu" },
    "/prenota": { de: "/prenota", en: "/reservations" },
  },
});

export type Locale = (typeof routing.locales)[number];
