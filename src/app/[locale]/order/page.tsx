import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeadingUnderline } from "@/components/illustrations/HeadingUnderline";
import { OrderForm } from "@/components/order/OrderForm";
import { buildPageMetadata } from "@/lib/seo";
import { assertLocale } from "@/i18n/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/order">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "Order" });

  return buildPageMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale,
    href: "/order",
  });
}

// Same honesty line as the reservation page: picking dishes here sends an
// order request to the kitchen's inbox, it doesn't charge a card or push
// anything into a real kitchen queue — there's no payment processor and no
// POS behind this.
export default async function OrderPage({ params }: PageProps<"/[locale]/order">) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("Order");

  return (
    <div className="overflow-x-clip">
      <section className="px-6 pt-12 pb-10 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-3xl text-primary">{t("eyebrow")}</p>
          <h1 className="mt-1 font-display text-display-lg text-foreground">{t("title")}</h1>
          <HeadingUnderline className="mx-auto mt-1 w-44 text-primary sm:w-56" />
          <p className="mt-4 text-lg text-foreground-muted">{t("body")}</p>
        </div>
      </section>

      <section className="px-6 pb-20 sm:pb-24">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border-2 border-foreground bg-surface p-6 shadow-[6px_6px_0_var(--foreground)] sm:p-8">
            <OrderForm />
          </div>
        </div>
      </section>
    </div>
  );
}
