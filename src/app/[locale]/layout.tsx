import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { display, sans, script } from "@/styles/fonts";
import { assertLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { SITE_URL, buildPageMetadata } from "@/lib/seo";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    // Set once here so any future relative metadata URL (an OG image, say)
    // resolves against the real origin instead of failing the build.
    metadataBase: new URL(SITE_URL),
    // Konzeptstudie ohne Auftrag — darf keine echte Wiener Gastronomie im
    // Suchindex verdrängen. robots.txt allein genügt dafür nicht: Ein
    // Disallow verhindert nur das Abrufen, nicht das Indexieren. Eine URL,
    // die von anderswo verlinkt ist — und das Portfolio verlinkt sie —, kann
    // trotzdem als nackter Treffer ohne Beschreibung erscheinen. Maison
    // Aurelle und Salon Kupferglanz setzen den Hinweis seit jeher, dieses
    // Projekt bis 14.09.2026 nicht.
    //
    // Bewusst hier und NICHT in buildPageMetadata: Den Helfer benutzen Layout
    // und Seiten gemeinsam, und wenn beide robots setzen, gibt Next zwei
    // Meta-Tags aus. Vom Layout aus gilt der Wert ohnehin für jede Route.
    robots: { index: false, follow: false },
    ...buildPageMetadata({
      title: t("title"),
      description: t("description"),
      locale,
      href: "/",
    }),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Header");

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable} ${script.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          {/* Same header and nav on every page, so keyboard users get a way
              past it (WCAG 2.4.1). Invisible until focused.

              Parked above the viewport and slid in on focus, rather than
              sr-only + not-sr-only: not-sr-only resets padding to 0, which
              flattens the link to a thin strip exactly when it appears. */}
          <a
            href="#main"
            className="absolute top-3 left-3 z-50 -translate-y-24 rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-bold text-background transition-transform focus:translate-y-0"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
