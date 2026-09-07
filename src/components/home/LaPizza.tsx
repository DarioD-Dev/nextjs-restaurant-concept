import { getTranslations } from "next-intl/server";
import { PizzaIllustration } from "@/components/illustrations/PizzaIllustration";
import { StationReveal } from "@/components/route/StationReveal";
import { WavyBand } from "@/components/shapes/Fields";
import { dishes, formatPriceEur } from "@/data/dishes";

function SteamWisp({ delay }: { delay: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 30"
      className="steam-wisp h-14 w-3 text-background/80"
      style={{ animationDelay: delay }}
    >
      <path d="M5 29c-3-4 3-7 0-11s3-7 0-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const FEATURED_ID = "margherita";

// The tomato field is a drawn shape, not the section's background: it
// starts above this section (running up behind the tavola scene) and the
// pizza itself is larger than the content container and hangs off the
// shape's bottom edge into the next station. That overhang is the whole
// point — it puts the illustration in front of the colour instead of
// inside it.
export async function LaPizza() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dish = dishes.find((d) => d.id === FEATURED_ID)!;

  return (
    <section className="relative overflow-x-clip py-16 text-background sm:py-20">
      <WavyBand className="absolute inset-x-0 -top-14 -z-20 h-[calc(100%+7rem)] w-full text-primary-vivid sm:-top-20 sm:h-[calc(100%+10rem)]" />

      <div className="mx-auto grid max-w-5xl items-center gap-8 px-6 lg:grid-cols-[1fr_minmax(0,24rem)]">
        <div className="relative z-10 text-center lg:text-left">
          <p className="font-script text-3xl text-highlight">{tHome("pizzaTagline")}</p>
          <h2 className="mt-2 font-display" style={{ fontSize: "var(--text-display-lg)" }}>
            {t(`dishes.${dish.id}.name`)}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base text-background/85 lg:mx-0">
            {t(`dishes.${dish.id}.description`)}
          </p>
          <p className="mt-5 font-display text-2xl">€ {formatPriceEur(dish.priceEur)}</p>
        </div>

        {/* The pizza is served on a cream disc that hangs off the bottom of
            the tomato shape — that overhang is what turns it from a flat
            icon inside a coloured box into an object lying on top of one.
            On the cream disc the drawing switches to ink outlines, so it
            stays a pizza and not a red silhouette on red. */}
        <div className="relative z-10 -mb-16 flex flex-col items-center lg:-mb-28 lg:translate-x-8">
          <div className="mb-1 flex gap-3">
            <SteamWisp delay="0s" />
            <SteamWisp delay="0.9s" />
            <SteamWisp delay="1.7s" />
          </div>
          <StationReveal>
            <div className="rounded-full bg-background p-5 shadow-[0_10px_0_rgba(32,32,28,0.16)] sm:p-7">
              <PizzaIllustration className="w-60 text-foreground sm:w-80 lg:w-88" />
            </div>
          </StationReveal>
        </div>
      </div>
    </section>
  );
}
