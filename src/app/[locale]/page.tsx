import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { SeasonTeaser } from "@/components/home/SeasonTeaser";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Manifesto />
      <SeasonTeaser />
    </>
  );
}
