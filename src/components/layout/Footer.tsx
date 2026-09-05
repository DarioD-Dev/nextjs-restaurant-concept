import { useTranslations } from "next-intl";
import { RESTAURANT } from "@/data/restaurant";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
        <p>
          {RESTAURANT.name} · {RESTAURANT.address.street}, {RESTAURANT.address.postalCode}{" "}
          {RESTAURANT.address.city}
        </p>
        <p className="mt-2">{t("copyright", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
