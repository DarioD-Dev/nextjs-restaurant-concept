import { getTranslations } from "next-intl/server";
import { IngredientIconGlyph } from "@/components/icons/IngredientIcons";
import { dishes, formatPriceEur } from "@/data/dishes";

const FEATURED_ID = "margherita";

function SteamWisp({ delay }: { delay: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 10 30"
      className="steam-wisp h-10 w-3 text-foreground-muted/70"
      style={{ animationDelay: delay }}
    >
      <path
        d="M5 29c-3-4 3-7 0-11s3-7 0-11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Motion moment 3/4: pizza steam. A plain circle stands in for the pizza
// (round shape = the site's whole visual signature, see Hero) rather than
// a literal illustration of a pizza — the steam above it is the actual
// point of this section, not the graphic itself.
export async function PizzaSpotlight() {
  const t = await getTranslations("Cucina");
  const tHome = await getTranslations("Home");
  const dish = dishes.find((d) => d.id === FEATURED_ID)!;

  return (
    <section className="bg-primary-vivid/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center lg:gap-16">
        <div className="mx-auto flex justify-center">
          <div className="relative">
            <div className="mb-1 flex justify-center gap-3">
              <SteamWisp delay="0s" />
              <SteamWisp delay="0.9s" />
              <SteamWisp delay="1.7s" />
            </div>
            <div className="relative flex size-48 items-center justify-center rounded-full bg-primary-vivid sm:size-56">
              <div className="flex size-40 items-center justify-center rounded-full border-4 border-highlight/70 sm:size-48">
                <IngredientIconGlyph name="basilico" className="size-8 text-background" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="font-script text-3xl text-primary sm:text-4xl">{tHome("pizzaTagline")}</p>
          <h2 className="mt-3 font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
            {t(`dishes.${dish.id}.name`)}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base text-foreground-muted lg:mx-0">
            {t(`dishes.${dish.id}.description`)}
          </p>
          <p className="mt-4 font-display text-xl text-foreground">
            € {formatPriceEur(dish.priceEur)}
          </p>
        </div>
      </div>
    </section>
  );
}
