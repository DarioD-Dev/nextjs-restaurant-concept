import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
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

// Honest, not a fake booking widget — same pattern Salon Kupferglanz
// established (no bookingUrl → the CTA goes to a real channel instead of
// pretending a reservation was taken). An online reservation flow is
// exactly the kind of interactive solution planned as a later phase.
export default async function ReservationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Reservations");
  const tFooter = await getTranslations("Footer");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase">{t("eyebrow")}</p>
      <h1 className="mt-4 font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
        {t("title")}
      </h1>
      <p className="mt-5 text-lg text-foreground-muted">{t("body")}</p>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="font-sans text-xs tracking-[0.2em] text-foreground-muted uppercase">{t("hoursTitle")}</h2>
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
  );
}
