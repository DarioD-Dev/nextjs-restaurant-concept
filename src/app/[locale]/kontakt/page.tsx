import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { RESTAURANT } from "@/data/restaurant";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/kontakt" }) };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <h1 className="font-display font-semibold tracking-tight" style={{ fontSize: "var(--text-section)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">{t("body")}</p>

      <div className="mt-12 grid gap-12 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-semibold">{t("detailsTitle")}</h2>
          <address className="mt-3 space-y-1 text-sm text-foreground/90 not-italic">
            <p>{RESTAURANT.name}</p>
            <p>
              {RESTAURANT.address.street}, {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
            </p>
            <p>
              <a href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {RESTAURANT.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${RESTAURANT.email}`} className="hover:text-accent">
                {RESTAURANT.email}
              </a>
            </p>
          </address>

          <h2 className="mt-8 font-display text-lg font-semibold">{t("hours.title")}</h2>
          <ul className="mt-3 space-y-1 text-sm text-foreground/90">
            <li>
              {t("hours.weekdays")}: {t("hours.weekdaysTime")}
            </li>
            <li>
              {t("hours.weekend")}: {t("hours.weekendTime")}
            </li>
          </ul>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
