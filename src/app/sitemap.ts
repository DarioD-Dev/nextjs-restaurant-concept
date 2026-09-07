import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

const paths = ["/", "/menu", "/reservations"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  );
}
