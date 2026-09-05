"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { RESTAURANT } from "@/data/restaurant";

function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          aria-current={l === locale}
          className={
            l === locale
              ? "rounded-full bg-accent px-2 py-1 text-accent-foreground"
              : "rounded-full px-2 py-1 text-muted transition-colors hover:text-foreground"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const NAV_LINKS = ["/speisekarte", "/reservieren", "/kontakt"] as const;

export function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight" onClick={() => setOpen(false)}>
          {RESTAURANT.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((href) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className="text-sm text-muted transition-colors hover:text-foreground aria-[current=page]:text-accent aria-[current=page]:font-medium"
            >
              {t(href === "/speisekarte" ? "menu" : href === "/reservieren" ? "reservations" : "contact")}
            </Link>
          ))}
          <LocaleSwitcher />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
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
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {NAV_LINKS.map((href) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                {t(href === "/speisekarte" ? "menu" : href === "/reservieren" ? "reservations" : "contact")}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
