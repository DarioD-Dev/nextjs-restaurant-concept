import type messages from "../messages/de.json";
import type { routing } from "@/i18n/routing";

// Teaches next-intl about this app's own locales and message shape:
// `useLocale()`/`getLocale()` return the "de" | "en" union instead of a
// bare string, and every translation key is checked against the German
// messages file at compile time. A renamed or mistyped key is a build
// error rather than a MISSING_MESSAGE at runtime — which is exactly the
// class of bug that i18n refactors otherwise leak.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
