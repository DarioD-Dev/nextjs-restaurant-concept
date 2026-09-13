import { useTranslations } from "next-intl";
import { RESTAURANT } from "@/data/restaurant";
import { BarchettaLogo } from "@/components/brand/BarchettaLogo";

// The boat's own animated journey now ends at ArrivoCta, just above this
// footer — repeating it here would be a second, redundant "arrival"
// moment, so the footer stays text-only.
export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-2">
        {/* The logo gets its one large outing here, where the name on the
            sail is actually readable. */}
        <BarchettaLogo className="h-24 w-auto" />
        <p className="mt-6 font-display text-2xl text-foreground">{t("thanks")}</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 pb-14 sm:grid-cols-3">
        <address className="font-sans text-sm text-foreground-muted not-italic">
          <p className="font-semibold text-foreground">{RESTAURANT.name}</p>
          <p>{RESTAURANT.address.street}</p>
          <p>
            {RESTAURANT.address.postalCode} {RESTAURANT.address.city}
          </p>
        </address>
        <div className="font-sans text-sm text-foreground-muted">
          <p>
            <a
              href={`tel:${RESTAURANT.phone.replace(/\s/g, "")}`}
              className="transition-colors hover:text-foreground"
            >
              {RESTAURANT.phone}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={`mailto:${RESTAURANT.email}`}
              className="transition-colors hover:text-foreground"
            >
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
        <div className="mx-auto max-w-6xl px-6 py-6 font-sans text-xs text-foreground-muted/70">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
