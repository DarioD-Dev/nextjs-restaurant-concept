import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PaperBoat } from "@/components/icons/PaperBoat";

// Arrivo — where La Rotta ends. Bold tomato again (bookending the Pizza
// station's color), and the boat glyph appears once more, at rest, as if
// it has actually arrived — a small payoff for having followed the route
// down the page.
export async function ArrivoCta() {
  const t = await getTranslations("Home.prenotaCta");

  return (
    <section className="relative bg-primary-vivid py-20 text-background sm:py-28">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <PaperBoat className="size-10 text-background" aria-hidden="true" />
        <h2 className="font-display" style={{ fontSize: "var(--text-display-md)" }}>
          {t("title")}
        </h2>
        <Link
          href="/prenota"
          className="rounded-full bg-background px-8 py-3.5 font-sans text-sm font-bold text-primary transition-colors hover:bg-highlight"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
