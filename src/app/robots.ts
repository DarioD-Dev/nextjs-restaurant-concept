import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Concept study, no client mandate yet — same standard as DarioDev's other
// concept demos: stay out of the index so this can't outrank a real
// restaurant's own site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
