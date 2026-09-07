import { getTranslations } from "next-intl/server";
import { IngredientsStillLife } from "@/components/illustrations/IngredientsStillLife";
import { StationReveal } from "@/components/route/StationReveal";
import { SideBlob } from "@/components/shapes/Fields";

// Basil, but not as another full-width stripe: one big blob running off
// the left edge of the viewport, with the still life sitting on it and the
// text beside it on the open cream. On small screens the same blob caps
// the top of the section instead, so the copy always stands on cream and
// never on green.
export async function IlCestino() {
  const t = await getTranslations("Home.fattoInCasa");

  return (
    <section className="relative overflow-x-clip px-6 pt-24 pb-12 sm:pt-28 sm:pb-16">
      <SideBlob className="absolute top-6 left-[-26%] -z-20 h-72 w-[152%] text-secondary lg:top-0 lg:left-[-10%] lg:h-full lg:w-[50%]" />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
        <StationReveal className="relative z-10">
          {/* Sized to stay inside the blob at every width: the drawing is
              cream, so anything that hangs past the green edge would simply
              vanish into the page. */}
          <IngredientsStillLife className="mx-auto w-64 text-background sm:w-80 lg:mx-0 lg:ml-4 lg:w-60" />
        </StationReveal>

        <div className="relative z-10 text-center lg:text-left">
          <h2 className="font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
            {t("title")}
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-base text-foreground-muted lg:mx-0">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
