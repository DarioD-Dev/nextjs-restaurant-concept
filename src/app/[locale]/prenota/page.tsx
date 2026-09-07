import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { RESTAURANT } from "@/data/restaurant";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Prenota" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/prenota" }) };
}

// Honest, not a fake booking widget — same pattern every DarioDev concept
// project uses for this exact situation: no real online reservation system
// yet, so the CTA goes to a phone call or a real message instead of
// pretending a table was booked.
export default async function PrenotaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prenota");
  const tFooter = await getTranslations("Footer");

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <p className="font-sans text-sm font-bold text-primary uppercase">{t("eyebrow")}</p>
      <h1 className="mt-3 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
        {t("title")}
      </h1>
      <p className="mt-4 text-lg text-foreground-muted">{t("body")}</p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-sans text-sm font-bold text-foreground-muted uppercase">{t("hoursTitle")}</h2>
        <p className="mt-2 text-sm text-foreground">{tFooter("hoursWeekdays")}</p>
        <p className="text-sm text-foreground">{tFooter("hoursWeekend")}</p>
      </div>

      <a
        href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
      >
        {t("ctaCall")} {RESTAURANT.phone}
      </a>

      <div className="mt-14 border-t border-border pt-10">
        <h2 className="font-display text-xl text-foreground">{t("formTitle")}</h2>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
