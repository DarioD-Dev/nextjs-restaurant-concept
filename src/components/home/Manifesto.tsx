import { getTranslations } from "next-intl/server";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// The one long-form passage on the homepage — a deliberate contrast moment
// against the image-led sections around it, like a magazine's single
// text-only spread between photo pages. The detail shot breaks the grid
// (angled crop, pulled up into the text column via negative margin) rather
// than sitting politely in its own cell — an asymmetric layering, not a
// text-left/image-right split.
export async function Manifesto() {
  const t = await getTranslations("Home.manifesto");

  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-8">
        <div className="max-w-2xl">
          <p className="font-sans text-xs tracking-label text-primary uppercase">{t("eyebrow")}</p>
          <p className="mt-6 font-display text-2xl text-balance italic sm:text-3xl" style={{ lineHeight: 1.3 }}>
            {t("quote")}
          </p>
          <p className="mt-3 font-sans text-xs tracking-[0.15em] text-foreground-muted uppercase">
            {t("quoteAttribution")}
          </p>
          <p className="mt-8 max-w-lg text-sm text-foreground-muted">{t("body")}</p>
        </div>
        <ImagePlaceholder
          label={t("imageLabel")}
          aspect="3 / 4"
          tone="petrol"
          angledCrop
          className="hidden lg:flex lg:-mt-10 lg:-mb-6"
        />
      </div>
    </section>
  );
}
