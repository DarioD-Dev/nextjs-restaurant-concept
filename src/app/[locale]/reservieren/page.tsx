import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { RESTAURANT } from "@/data/restaurant";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Reservations" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/reservieren" }) };
}

// A deliberate close for the brand, not a bare form page: a large
// atmospheric image carries a short typographic statement, same
// image-plus-overlaid-type technique as the homepage hero, just smaller.
// The honest fact — no online booking yet — still gets its own plain,
// undecorated paragraph beneath it; that sentence doesn't get to hide
// behind atmosphere.
export default async function ReservationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Reservations");
  const tFooter = await getTranslations("Footer");

  return (
    <div>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden border-b border-border">
        <ImagePlaceholder label={t("imageLabel")} tone="petrol" fill scrim />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-14">
          <p className="font-sans text-xs tracking-[0.25em] text-primary uppercase">{t("eyebrow")}</p>
          <p
            className="mt-5 max-w-xl font-display font-medium text-balance"
            style={{ fontSize: "var(--text-display-lg)", lineHeight: 1.05 }}
          >
            {t("statement")}
          </p>
        </div>
      </section>

      {/* Same left edge as the statement above it — a centred max-w-2xl
          block here would break the page's editorial axis. */}
      <div className="mx-auto max-w-6xl px-6 py-16 *:max-w-2xl sm:py-24">
        <h1 className="font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
          {t("title")}
        </h1>
        <p className="mt-5 text-lg text-foreground-muted">{t("body")}</p>

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="font-sans text-xs tracking-label text-foreground-muted uppercase">{t("hoursTitle")}</h2>
          <p className="mt-3 text-sm text-foreground">{tFooter("hoursWeekdays")}</p>
          <p className="text-sm text-foreground">{tFooter("hoursWeekend")}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-6">
          <a
            href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
            className="border border-primary px-6 py-3 font-sans text-xs tracking-[0.15em] text-primary uppercase transition-colors hover:bg-primary hover:text-background"
          >
            {t("ctaCall")} {RESTAURANT.phone}
          </a>
          <Link
            href="/haus"
            className="px-6 py-3 font-sans text-xs tracking-[0.15em] text-foreground-muted uppercase transition-colors hover:text-foreground"
          >
            {t("ctaWrite")}
          </Link>
        </div>
      </div>
    </div>
  );
}
