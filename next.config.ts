import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// Die Seite liefert keine Rasterbilder aus (jede Illustration ist Inline-SVG),
// es gibt also keine Bildpipeline zu konfigurieren. Der einzige Eintrag hier
// betrifft das Vorschaubild.
const nextConfig: NextConfig = {
  // src/app/opengraph-image.tsx liest die Schriftdatei über
  // readFile(join(process.cwd(), "assets/...")). Der Pfad entsteht zur
  // Laufzeit, die Dateiverfolgung des Builds erkennt ihn nicht zuverlässig.
  // Ohne diesen Eintrag wäre die Route lokal einwandfrei und erst in der
  // Produktion kaputt — sichtbar dann, wenn jemand den Link teilt.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**/*.woff"],
  },
};

export default withNextIntl(nextConfig);
