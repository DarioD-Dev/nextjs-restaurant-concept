"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/**
 * Was `not-found.tsx` für falsche Adressen ist, ist diese Seite für Fehler
 * beim Rendern — in der Sprache und Bildwelt des Hauses statt der weißen
 * englischen Standardseite von Next.
 *
 * Kein Papierboot hier: Das Boot steht auf der 404-Seite still, weil der Weg
 * dort nicht weitergeht. Hier geht er weiter, man muss es nur noch einmal
 * versuchen — dasselbe Zeichen zweimal mit zwei Bedeutungen wäre eins zu viel.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <h1 className="font-display text-display-md text-foreground">{t("title")}</h1>
      <p className="max-w-md text-lg text-foreground/70">{t("body")}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-primary px-8 py-3.5 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-vivid"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-foreground px-8 py-3 font-sans text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
