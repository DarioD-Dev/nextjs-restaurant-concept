import { getTranslations } from "next-intl/server";
import { IngredientsStillLife } from "@/components/illustrations/IngredientsStillLife";
import { StationReveal } from "@/components/route/StationReveal";

// Basil as a full-bleed counter-color to the tomato station before it —
// the still life (tomato/basil/lemon/chili as one composition, not four
// separate icons) is the whole visual here.
export async function IlCestino() {
  const t = await getTranslations("Home.fattoInCasa");

  return (
    <section className="bg-secondary py-20 text-background sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-center">
        <StationReveal>
          <IngredientsStillLife className="mx-auto size-56 text-background sm:size-64" />
        </StationReveal>
        <div className="text-center lg:text-left">
          <h2 className="font-display" style={{ fontSize: "var(--text-display-md)" }}>
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base text-background/85 lg:mx-0">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
