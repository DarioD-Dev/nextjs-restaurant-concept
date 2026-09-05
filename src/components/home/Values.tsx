import { getTranslations } from "next-intl/server";

const KEYS = ["seasonal", "labelled", "noPhoneQueue"] as const;

// Three factual statements about how the kitchen and the site actually
// work, not claims about outcomes — no "loved by guests" or invented
// numbers, just what's true about the menu and the booking process.
export async function Values() {
  const t = await getTranslations("Home.values");

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <div className="grid gap-8 sm:grid-cols-3">
        {KEYS.map((key, i) => (
          <div key={key} className="rounded-2xl border border-border bg-surface p-6">
            <span className="font-display text-sm font-medium text-accent">0{i + 1}</span>
            <h3 className="mt-3 font-display text-lg font-semibold">{t(`${key}.title`)}</h3>
            <p className="mt-2 text-sm text-muted">{t(`${key}.body`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
