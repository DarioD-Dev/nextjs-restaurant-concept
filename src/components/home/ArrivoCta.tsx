import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PaperBoat } from "@/components/icons/PaperBoat";
import { BoatWake } from "@/components/icons/BoatWake";
import { WavyBand } from "@/components/shapes/Fields";

// Arrivo — where La Rotta ends. Tomato again, but as a shape whose top
// edge cuts into the dolci station above it, and the boat is here with its
// wake, moored rather than travelling: the same glyph that has been
// crossing the page, finally at rest.
export async function ArrivoCta() {
  const t = await getTranslations("Home.closingCta");

  // data-route-end marks the arrival for RouteJourney: the travelling boat
  // fades out just before this band, so it reads as having sailed in behind
  // it — and the moored boat below is the one that made it.
  return (
    <section data-route-end className="relative overflow-x-clip py-20 text-background sm:py-24">
      <WavyBand className="absolute inset-x-0 -top-10 -z-20 h-[calc(100%+3rem)] w-full text-primary-vivid" />

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <div className="flex items-center gap-1.5 text-background">
          <BoatWake className="w-5 opacity-70" />
          <PaperBoat className="size-11" />
          <BoatWake className="w-5 -scale-x-100 opacity-70" />
        </div>
        <p className="font-script text-3xl text-highlight">{t("eyebrow")}</p>
        <h2 className="font-display text-display-lg">{t("title")}</h2>
        <Link
          href="/reservations"
          className="rounded-full bg-background px-8 py-3.5 font-sans text-sm font-bold text-primary transition-colors hover:bg-highlight"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
