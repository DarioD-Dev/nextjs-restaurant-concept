import { getTranslations } from "next-intl/server";
import { TavolaIllustration } from "@/components/illustrations/TavolaIllustration";
import { StationReveal } from "@/components/route/StationReveal";

// The middle of the homepage, and the one station that is deliberately not
// built like a section: no card grid, barely any text, one large drawn
// scene that runs wider than the content container it sits in. The route
// passes behind it — the boat disappears under the tablecloth and comes
// out the other side.
export async function LaTavola() {
  const t = await getTranslations("Home.tavola");

  return (
    <section className="relative overflow-x-clip px-6 pt-4 pb-8 sm:pt-6 sm:pb-10">
      <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[minmax(0,19rem)_1fr] lg:gap-4">
        <div className="relative z-10">
          <p className="font-script text-3xl text-primary">{t("eyebrow")}</p>
          <h2 className="mt-1 font-display text-foreground text-display-md">{t("title")}</h2>
        </div>

        <StationReveal className="relative z-10">
          <TavolaIllustration className="w-[122%] max-w-none -translate-x-[9%] sm:w-[112%] sm:-translate-x-[6%] lg:w-[126%] lg:-translate-x-[6%]" />
        </StationReveal>
      </div>
    </section>
  );
}
