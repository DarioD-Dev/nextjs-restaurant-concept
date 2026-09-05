import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Haus" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/haus" }) };
}

// Replaces the old dedicated Kontakt page: the house's own story, ending in
// an invitation to write — the contact form belongs at the end of this
// narrative, not on an isolated utility page.
export default async function HausPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Haus");

  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <p className="font-sans text-xs tracking-[0.2em] text-primary uppercase">{t("eyebrow")}</p>
        <h1 className="mt-4 max-w-2xl font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
          {t("title")}
        </h1>
        <p className="mt-5 max-w-xl text-lg text-foreground-muted">{t("intro")}</p>
      </div>

      <ImagePlaceholder label={t("interiorImageLabel")} aspect="2 / 1" className="w-full" />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="font-display text-xl">{t("philosophyTitle")}</h2>
          <p className="mt-4 max-w-md text-sm text-foreground-muted">{t("philosophyBody")}</p>
        </div>
        <ImagePlaceholder label={t("detailImageLabel")} aspect="4 / 3" />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
          <h2 className="font-display font-medium" style={{ fontSize: "var(--text-display-md)" }}>
            {t("contactTitle")}
          </h2>
          <p className="mt-4 max-w-lg text-base text-foreground-muted">{t("contactBody")}</p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
