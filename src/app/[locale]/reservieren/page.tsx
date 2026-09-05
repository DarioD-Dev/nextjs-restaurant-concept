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

// Honest, not a fake booking widget: same pattern Salon Kupferglanz already
// established for this exact situation (no bookingUrl → the CTA goes to
// contact instead of pretending a reservation was taken). An online
// reservation flow is exactly the kind of interactive solution planned as
// the next build phase, not something to fake here.
export default async function ReservationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Reservations");
  const tHours = await getTranslations("Contact.hours");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <h1 className="font-display font-semibold tracking-tight" style={{ fontSize: "var(--text-section)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-muted">{t("body")}</p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-semibold">{t("hoursTitle")}</h2>
        <ul className="mt-3 space-y-1 text-sm text-foreground/90">
          <li>
            {tHours("weekdays")}: {tHours("weekdaysTime")}
          </li>
          <li>
            {tHours("weekend")}: {tHours("weekendTime")}
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:bg-accent-hover active:scale-[0.97]"
        >
          {t("ctaCall")} {RESTAURANT.phone}
        </a>
        <Link
          href="/kontakt"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent active:scale-[0.97]"
        >
          {t("ctaContact")}
        </Link>
      </div>
    </div>
  );
}
