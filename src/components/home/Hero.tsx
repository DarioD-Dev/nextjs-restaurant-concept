import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Same hero-rise approach as DarioDev's own Hero: visible by default, the
// staggered entrance only exists inside a prefers-reduced-motion guard in
// globals.css, so a slow first paint or JS never running still shows the
// headline immediately.
export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32 sm:pb-28">
      <p className="hero-rise font-display text-sm font-medium tracking-wide text-accent">{t("eyebrow")}</p>
      <h1
        className="hero-rise mt-5 max-w-3xl font-display font-semibold tracking-tight text-balance"
        style={{ fontSize: "var(--text-hero)", lineHeight: 1.05, "--rise-delay": "60ms" } as React.CSSProperties}
      >
        {t("headline")}
      </h1>
      <p
        className="hero-rise mt-6 max-w-xl text-lg text-muted sm:text-xl"
        style={{ "--rise-delay": "140ms" } as React.CSSProperties}
      >
        {t("subtitle")}
      </p>
      <div className="hero-rise mt-9 flex flex-wrap gap-4" style={{ "--rise-delay": "200ms" } as React.CSSProperties}>
        <Link
          href="/speisekarte"
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:bg-accent-hover active:scale-[0.97]"
        >
          {t("ctaMenu")}
        </Link>
        <Link
          href="/reservieren"
          className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:border-accent active:scale-[0.97]"
        >
          {t("ctaReserve")}
        </Link>
      </div>
    </section>
  );
}
