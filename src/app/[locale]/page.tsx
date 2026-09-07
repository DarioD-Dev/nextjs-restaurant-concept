import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { BuonAppetito } from "@/components/home/BuonAppetito";
import { CucinaTeaser } from "@/components/home/CucinaTeaser";
import { PizzaSpotlight } from "@/components/home/PizzaSpotlight";
import { FattoInCasa } from "@/components/home/FattoInCasa";
import { DolciTeaser } from "@/components/home/DolciTeaser";
import { PrenotaCta } from "@/components/home/PrenotaCta";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <BuonAppetito />
      <CucinaTeaser />
      <PizzaSpotlight />
      <FattoInCasa />
      <DolciTeaser />
      <PrenotaCta />
    </>
  );
}
