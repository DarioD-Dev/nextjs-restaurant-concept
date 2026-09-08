import { setRequestLocale } from "next-intl/server";
import { RouteJourney } from "@/components/route/RouteJourney";
import { Hero } from "@/components/home/Hero";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { LaTavola } from "@/components/home/LaTavola";
import { LaPizza } from "@/components/home/LaPizza";
import { IlCestino } from "@/components/home/IlCestino";
import { Dolci } from "@/components/home/Dolci";
import { ArrivoCta } from "@/components/home/ArrivoCta";
import { assertLocale } from "@/i18n/locale";

// The stations of La Rotta, in the order the boat passes them. They are
// named after what they are in the restaurant (la tavola, la pizza, il
// cestino, dolci, l'arrivo) rather than after their layout, because that is
// what the design is built from — the two exceptions are Hero and
// MenuTeaser, which exist to do a job on the page rather than to be a place
// in the meal.
export default async function Home({ params }: PageProps<"/[locale]">) {
  setRequestLocale(assertLocale((await params).locale));

  return (
    <RouteJourney>
      <Hero />
      <MenuTeaser />
      <LaTavola />
      <LaPizza />
      <IlCestino />
      <Dolci />
      <ArrivoCta />
    </RouteJourney>
  );
}
