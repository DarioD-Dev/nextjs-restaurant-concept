import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PaperBoat } from "@/components/icons/PaperBoat";

// Eine 404-Seite in der Sprache und Bildwelt des Hauses statt der weißen
// englischen Standardseite von Next, die hier bis 14.09.2026 zu sehen war.
//
// Das Papierboot ist dasselbe Zeichen, das die Startseite entlangfährt — hier
// steht es still, weil der Weg nicht weitergeht. Kein neues Motiv, nur das
// vorhandene an der Stelle, an der es passt.
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <PaperBoat className="size-12 text-primary" />
      <h1 className="font-display text-display-md text-foreground">{t("title")}</h1>
      <p className="max-w-md text-lg text-foreground/70">{t("body")}</p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-primary px-8 py-3.5 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-vivid"
      >
        {t("home")}
      </Link>
    </section>
  );
}
