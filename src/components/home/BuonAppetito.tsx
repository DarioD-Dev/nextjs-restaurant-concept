import { getTranslations } from "next-intl/server";

// One of exactly two places the handwriting accent (Caveat) appears on the
// whole site — a single transitional line between the hero and the menu,
// not a UI font. No motion here at all; the "moment" is typographic.
export async function BuonAppetito() {
  const t = await getTranslations("Home");

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:py-14">
      <p className="font-script text-4xl text-primary sm:text-5xl">{t("buonAppetito")}</p>
    </div>
  );
}
