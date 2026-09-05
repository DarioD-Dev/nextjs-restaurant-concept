"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { RESTAURANT } from "@/data/restaurant";

const NAV_LINKS = ["/saison", "/haus", "/reservieren"] as const;

function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={l === locale}
          className={l === locale ? "text-primary" : "text-foreground-muted transition-colors hover:text-foreground"}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {RESTAURANT.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((href) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="font-sans text-xs tracking-[0.2em] text-foreground-muted uppercase transition-colors hover:text-foreground aria-[current=page]:text-primary"
            >
              {t(href === "/saison" ? "season" : href === "/haus" ? "haus" : "reservations")}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="flex size-9 items-center justify-center border border-border"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {NAV_LINKS.map((href) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-3 font-sans text-xs tracking-[0.2em] text-foreground-muted uppercase transition-colors hover:text-foreground"
              >
                {t(href === "/saison" ? "season" : href === "/haus" ? "haus" : "reservations")}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
