"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { RESTAURANT } from "@/data/restaurant";
import { BarchettaLogo } from "@/components/brand/BarchettaLogo";

function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 font-sans text-xs font-semibold">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={l === locale}
          className={
            l === locale
              ? "rounded-full bg-foreground px-2 py-1 text-background"
              : "rounded-full px-2 py-1 text-foreground-muted transition-colors hover:text-foreground"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// Deliberately broken from the other three DarioDev projects' quiet,
// outline-only nav: a big display wordmark and a permanently filled
// PRENOTA button, not another reduced editorial header.
export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // z-30: the homepage's stations sit at z-10 so the route's boat can't
  // paint over their text, which means the sticky header has to clear them
  // both or content scrolls over the wordmark.
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label={RESTAURANT.name} onClick={() => setOpen(false)}>
          <BarchettaLogo className="h-11 w-auto sm:h-14" aria-hidden="true" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/menu"
            aria-current={pathname === "/menu" ? "page" : undefined}
            className="font-sans text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground aria-[current=page]:text-primary"
          >
            {t("cucina")}
          </Link>
          <LocaleSwitcher />
          <Link
            href="/reservations"
            className="rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
          >
            {t("prenota")}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full border border-border"
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
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="py-2 font-sans text-sm font-semibold text-foreground-muted transition-colors hover:text-foreground"
            >
              {t("cucina")}
            </Link>
            <Link
              href="/reservations"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block w-fit rounded-full bg-primary px-5 py-2.5 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover"
            >
              {t("prenota")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
