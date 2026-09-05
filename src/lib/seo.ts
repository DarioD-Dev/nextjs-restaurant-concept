import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-restaurant-concept.vercel.app";

type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: string): string {
  return new URL(getPathname({ href, locale: locale as Locale }), SITE_URL).toString();
}

/**
 * Next merges metadata per top-level field, and `openGraph` is replaced
 * wholesale rather than merged — a page that sets only a title silently
 * drops the type and site name inherited from the layout. So every page
 * builds the complete object through here.
 */
export function buildOpenGraph({
  title,
  description,
  locale,
  href,
}: {
  title: string;
  description: string;
  locale: string;
  href: Href;
}): Metadata["openGraph"] {
  return {
    type: "website",
    title,
    description,
    siteName: "Wurzelwerk",
    url: absoluteUrl(href, locale),
    locale: locale === "de" ? "de_AT" : "en",
  };
}
