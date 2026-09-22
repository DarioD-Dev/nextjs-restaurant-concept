import { defineRouting } from "next-intl/routing";

// Three lean routes: the menu is the flagship feature and gets its own
// shareable URL, reservations stay honest and separate, everything else
// (contact details) lives in the footer instead of its own page.
export const routing = defineRouting({
  locales: ["de", "en", "hr"],
  defaultLocale: "de",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    // Route keys are English (they're code); the URLs a visitor actually
    // sees are plain in their own language. Nothing functional is named in
    // Italian — a guest looking for the menu should never have to work out
    // what "la cucina" means.
    //
    // Jede Sprache MUSS hier stehen. next-intl typisiert die Tabelle als
    // Partial — eine fehlende Sprache ist kein Compilerfehler, sondern fällt
    // still auf den Routenschlüssel zurück (`/hr/menu` statt `/hr/jelovnik`).
    // Das ist die eine Stelle im Projekt, an der `tsc` nicht die Aufgabenliste
    // ist.
    "/menu": { de: "/speisekarte", en: "/menu", hr: "/jelovnik" },
    "/reservations": { de: "/reservierung", en: "/reservations", hr: "/rezervacija" },
  },
});

export type Locale = (typeof routing.locales)[number];
