import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { RESTAURANT } from "@/data/restaurant";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-restaurant-concept.vercel.app";

/** The internal route keys of `routing.pathnames` — "/", "/menu", "/reservations". */
export type Href = Parameters<typeof getPathname>[0]["href"];

export function absoluteUrl(href: Href, locale: Locale): string {
  return new URL(getPathname({ href, locale }), SITE_URL).toString();
}

// OG locale codes are underscored and region-qualified; the site's own
// codes are plain. Small enough to keep as a literal map, and it fails to
// compile if a locale is ever added without deciding what it maps to.
const OG_LOCALES: Record<Locale, string> = { de: "de_AT", en: "en_GB", hr: "hr_HR" };

/**
 * Every page's metadata is built here rather than assembled inline.
 *
 * Two things make that worth centralising. Next merges metadata per
 * top-level field, and `openGraph` is *replaced* wholesale rather than
 * merged — a page that sets only a title would silently drop the type and
 * site name inherited from the layout. And a bilingual site needs the
 * canonical/hreflang set consistently on every route, which is exactly the
 * kind of thing that rots when each page hand-rolls it.
 */
export function buildPageMetadata({
  title,
  description,
  locale,
  href,
}: {
  title: string;
  description: string;
  locale: Locale;
  href: Href;
}): Metadata {
  const url = absoluteUrl(href, locale);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
    },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: RESTAURANT.name,
      url,
      locale: OG_LOCALES[locale],
      // Ausdrücklich gesetzt, nicht der automatischen Ergänzung überlassen:
      // Next ergänzt das Bild aus app/opengraph-image.tsx nur, solange keine
      // eigene openGraph-Angabe existiert — und die wird, wie oben notiert,
      // ganz ersetzt statt zusammengeführt. Ohne diese Zeile bleibt die
      // Linkvorschau bildlos, obwohl die Route das Bild ausliefert.
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}
