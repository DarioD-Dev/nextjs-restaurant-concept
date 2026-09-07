import { getTranslations } from "next-intl/server";
import { PizzaIllustration } from "@/components/illustrations/PizzaIllustration";
import { StationReveal } from "@/components/route/StationReveal";
import { dishes, formatPriceEur } from "@/data/dishes";

function SteamWisp({ delay }: { delay: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 30"
      className="steam-wisp h-12 w-3 text-background/80"
      style={{ animationDelay: delay }}
    >
      <path d="M5 29c-3-4 3-7 0-11s3-7 0-11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const FEATURED_ID = "margherita";

// A full-bleed tomato station, not a pale tint — the boldest color moment
// on the page. Big illustration instead of the previous plain circle;
// steam rises above it (animation 2/3).
export async function LaPizza() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dish = dishes.find((d) => d.id === FEATURED_ID)!;

  return (
    <section className="relative bg-primary-vivid py-20 text-background sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1fr_minmax(0,22rem)] lg:items-center">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="font-script text-3xl text-highlight">{tHome("pizzaTagline")}</p>
          <h2 className="mt-3 font-display" style={{ fontSize: "var(--text-display-lg)" }}>
            {t(`dishes.${dish.id}.name`)}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base text-background/85 lg:mx-0">
            {t(`dishes.${dish.id}.description`)}
          </p>
          <p className="mt-5 font-display text-2xl">€ {formatPriceEur(dish.priceEur)}</p>
        </div>

        <div className="order-1 mx-auto lg:order-2">
          <div className="mb-1 flex justify-center gap-3">
            <SteamWisp delay="0s" />
            <SteamWisp delay="0.9s" />
            <SteamWisp delay="1.7s" />
          </div>
          <StationReveal>
            <PizzaIllustration className="size-56 text-background sm:size-64" />
          </StationReveal>
        </div>
      </div>
    </section>
  );
}
