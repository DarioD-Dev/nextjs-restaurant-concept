import { getTranslations } from "next-intl/server";
import {
  CannoliIllustration,
  PannaCottaIllustration,
  TiramisuIllustration,
} from "@/components/illustrations/DolciIllustrations";
import { StationReveal } from "@/components/route/StationReveal";
import { dishesByCategory, formatPriceEur } from "@/data/dishes";

// The desserts are drawn, not boxed: three small plated illustrations at
// different sizes and heights, with a single lemon disc behind the middle
// one as the accent. No cards — Il Tavolo and La Cucina already own that
// language.
const ART = {
  tiramisu: TiramisuIllustration,
  "panna-cotta-limone": PannaCottaIllustration,
  cannoli: CannoliIllustration,
} as const;

const LAYOUT = [
  { art: "tiramisu", width: "w-40 sm:w-44", offset: "sm:mt-12", accent: false },
  { art: "panna-cotta-limone", width: "w-52 sm:w-60", offset: "", accent: true },
  { art: "cannoli", width: "w-40 sm:w-44", offset: "sm:mt-16", accent: false },
] as const;

export async function Dolci() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dolci = dishesByCategory("dolci");

  return (
    <section className="px-6 pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="font-script text-3xl text-primary">{tHome("dolciEyebrow")}</p>
        <h2 className="mt-1 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
          {t("categories.dolci")}
        </h2>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          {dolci.map((dish, i) => {
            const { width, offset, accent } = LAYOUT[i % LAYOUT.length];
            const Art = ART[dish.id as keyof typeof ART] ?? TiramisuIllustration;
            return (
              <StationReveal key={dish.id} className={`relative z-10 flex flex-col items-center ${offset}`}>
                {accent ? (
                  <span aria-hidden="true" className="absolute top-4 -z-10 size-40 rounded-full bg-highlight sm:size-48" />
                ) : null}
                <Art className={`${width} text-foreground`} />
                <p className="mt-3 font-display text-lg text-foreground">{t(`dishes.${dish.id}.name`)}</p>
                <p className="font-display text-base text-primary">€ {formatPriceEur(dish.priceEur)}</p>
                <p className="mt-1 max-w-44 text-sm text-foreground-muted">{t(`dishes.${dish.id}.description`)}</p>
              </StationReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
