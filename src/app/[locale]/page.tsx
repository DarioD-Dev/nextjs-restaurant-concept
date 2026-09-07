import { setRequestLocale } from "next-intl/server";
import { RouteJourney } from "@/components/route/RouteJourney";
import { Hero } from "@/components/home/Hero";
import { IlTavolo } from "@/components/home/IlTavolo";
import { LaPizza } from "@/components/home/LaPizza";
import { IlCestino } from "@/components/home/IlCestino";
import { Dolci } from "@/components/home/Dolci";
import { ArrivoCta } from "@/components/home/ArrivoCta";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <RouteJourney>
      <Hero />
      <IlTavolo />
      <LaPizza />
      <IlCestino />
      <Dolci />
      <ArrivoCta />
    </RouteJourney>
  );
}
