import { getLocale, getTranslations } from "next-intl/server";
import {
  CannoliIllustration,
  PannaCottaIllustration,
  TiramisuIllustration,
} from "@/components/illustrations/DolciIllustrations";
import { StationReveal } from "@/components/route/StationReveal";
import { getDish, formatPrice, type DishId } from "@/data/dishes";

// The desserts are drawn, not boxed: three plated illustrations at
// different sizes and heights, with a single lemon disc behind the middle
// one as the accent. No cards — the menu teaser and the menu page already
// own that language.
//
// Each dessert is paired with its drawing and its place in the composition
// explicitly. The three positions are hand-composed rather than a repeating
// layout, so listing them beats deriving them from the data and then
// re-attaching art and sizes by index.
const DOLCI: readonly {
  id: DishId;
  Art: typeof TiramisuIllustration;
  width: string;
  offset: string;
  accent?: boolean;
}[] = [
  { id: "tiramisu", Art: TiramisuIllustration, width: "w-40 sm:w-44", offset: "sm:mt-12" },
  {
    id: "panna-cotta-limone",
    Art: PannaCottaIllustration,
    width: "w-52 sm:w-60",
    offset: "",
    accent: true,
  },
  { id: "cannoli", Art: CannoliIllustration, width: "w-40 sm:w-44", offset: "sm:mt-16" },
];

export async function Dolci() {
  const locale = await getLocale();
  const t = await getTranslations("Menu");
  const tHome = await getTranslations("Home");

  return (
    <section className="px-6 pt-10 pb-16 sm:pt-12 sm:pb-20">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="font-script text-3xl text-primary">{tHome("dolciEyebrow")}</p>
        <h2 className="mt-1 font-display text-display-md text-foreground">
          {t("categories.dolci")}
        </h2>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-10 sm:gap-14">
          {DOLCI.map(({ id, Art, width, offset, accent }) => (
            <StationReveal
              key={id}
              className={`relative z-10 flex flex-col items-center ${offset}`}
            >
              {accent ? (
                <span
                  aria-hidden="true"
                  className="absolute top-4 -z-10 size-40 rounded-full bg-highlight sm:size-48"
                />
              ) : null}
              <Art className={`${width} text-foreground`} />
              <p className="mt-3 font-display text-lg text-foreground">{t(`dishes.${id}.name`)}</p>
              <p className="font-display text-base text-primary">
                {formatPrice(getDish(id).priceEur, locale)}
              </p>
              <p className="mt-1 max-w-44 text-sm text-foreground-muted">
                {t(`dishes.${id}.description`)}
              </p>
            </StationReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
