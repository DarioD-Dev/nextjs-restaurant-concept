import { useTranslations } from "next-intl";
import { RESTAURANT } from "@/data/restaurant";

// Contact details live here persistently rather than on a dedicated Kontakt
// page — a request/reservation moment belongs on /reservieren, and the
// house's own story belongs on /haus; a bare address/phone/email block
// doesn't need a whole route of its own.
export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg text-foreground">{RESTAURANT.name}</p>
          <address className="mt-3 space-y-1 font-sans text-sm text-foreground-muted not-italic">
            <p>{RESTAURANT.address.street}</p>
            <p>
              {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
            </p>
          </address>
        </div>
        <div className="font-sans text-sm text-foreground-muted">
          <p>
            <a href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
              {RESTAURANT.phone}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${RESTAURANT.email}`} className="transition-colors hover:text-foreground">
              {RESTAURANT.email}
            </a>
          </p>
        </div>
        <div className="font-sans text-sm text-foreground-muted">
          <p>{t("hoursWeekdays")}</p>
          <p className="mt-1">{t("hoursWeekend")}</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 font-sans text-xs tracking-wide text-foreground-muted/70">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
