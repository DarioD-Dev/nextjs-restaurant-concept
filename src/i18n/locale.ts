import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "./routing";

/**
 * Narrows the `[locale]` route param to a locale this app actually has.
 *
 * Next generates the route param as `string` (see PageProps/LayoutProps),
 * and the honest way to get the union back is to check it rather than to
 * declare it. In practice the middleware never lets an unknown locale
 * through, so this is a guard, not a code path with a design behind it.
 *
 * Kept out of routing.ts on purpose: that module is imported by the
 * middleware, which has no business pulling in next/navigation.
 */
export function assertLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}
