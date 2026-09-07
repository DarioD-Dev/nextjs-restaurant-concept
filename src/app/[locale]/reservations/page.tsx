import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { HeroUnderline } from "@/components/illustrations/AperitivoIllustration";
import { TavolaIllustration } from "@/components/illustrations/TavolaIllustration";
import { PaperBoat } from "@/components/icons/PaperBoat";
import { BoatWake } from "@/components/icons/BoatWake";
import { StationReveal } from "@/components/route/StationReveal";
import { WavyBand } from "@/components/shapes/Fields";
import { RESTAURANT } from "@/data/restaurant";
import { buildOpenGraph } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Prenota" });
  const title = t("metaTitle");
  const description = t("metaDescription");

  return { title, description, openGraph: buildOpenGraph({ title, description, locale, href: "/reservations" }) };
}

// Honest, not a fake booking widget — same pattern every DarioDev concept
// project uses for this exact situation: no real online reservation system
// yet, so the CTA goes to a phone call or a real message instead of
// pretending a table was booked. What changed is only the presentation:
// the page is built from the same stations, colour shapes and drawings as
// the homepage instead of being a bare form on a white page.
export default async function ReservationsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Prenota");
  const tFooter = await getTranslations("Footer");

  return (
    <div className="overflow-x-clip">
      <section className="px-6 pt-12 pb-10 sm:pt-16">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[1fr_minmax(0,24rem)]">
          <div>
            <p className="font-script text-3xl text-primary">{t("eyebrow")}</p>
            <h1 className="mt-1 font-display text-foreground" style={{ fontSize: "var(--text-display-lg)" }}>
              {t("title")}
            </h1>
            <HeroUnderline aria-hidden="true" className="mt-1 w-44 text-primary sm:w-56" />
            <p className="mt-4 max-w-lg text-lg text-foreground-muted">{t("body")}</p>
          </div>

          <StationReveal>
            <TavolaIllustration className="mx-auto w-full max-w-sm lg:max-w-none" />
          </StationReveal>
        </div>
      </section>

      {/* The phone call is the thing that actually books a table, so it gets
          the boldest surface on the page instead of sitting in a grey box. */}
      <section className="relative py-14 text-background sm:py-16">
        <WavyBand className="absolute inset-x-0 -top-8 -z-20 h-[calc(100%+4rem)] w-full text-primary-vivid" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 text-center">
          <div className="flex items-center gap-1.5">
            <BoatWake className="w-5 opacity-70" />
            <PaperBoat className="size-10" aria-hidden="true" />
            <BoatWake className="w-5 -scale-x-100 opacity-70" />
          </div>
          <a
            href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
            className="rounded-full bg-background px-8 py-4 font-display text-xl text-primary transition-colors hover:bg-highlight hover:text-foreground"
          >
            {RESTAURANT.phone}
          </a>
          <p className="font-sans text-sm font-semibold tracking-wide uppercase">{t("ctaCall")}</p>
          <p className="text-base text-background/90">
            {tFooter("hoursWeekdays")} · {tFooter("hoursWeekend")}
          </p>
        </div>
      </section>

      <section className="px-6 pt-14 pb-20 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
            {t("formTitle")}
          </h2>
          <div className="mt-6 rounded-3xl border-2 border-foreground bg-surface p-6 shadow-[6px_6px_0_var(--foreground)] sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
