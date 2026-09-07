import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Compact closing band, not a full section — a headline and one button,
// immediately before the footer.
export async function PrenotaCta() {
  const t = await getTranslations("Home.prenotaCta");

  return (
    <section className="border-t border-border bg-primary-vivid/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-16 text-center sm:py-20">
        <h2 className="font-display text-foreground" style={{ fontSize: "var(--text-display-md)" }}>
          {t("title")}
        </h2>
        <Link
          href="/prenota"
          className="rounded-full bg-primary px-8 py-3.5 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
