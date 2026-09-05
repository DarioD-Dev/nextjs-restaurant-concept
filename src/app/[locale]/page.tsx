import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Values } from "@/components/home/Values";
import type { Locale } from "@/i18n/routing";

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Values />
    </>
  );
}
