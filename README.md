*[Diese Seite auf Deutsch](README.de.md)*

# Wurzelwerk — Restaurant (Concept)

A fictional concept site for a seasonal, vegetable-forward bistro in Vienna, built as a multi-page Next.js frontend — the fourth of four industry concepts in DarioDev's portfolio (alongside Maison Aurelle for perfumeries and Salon Kupferglanz for hair salons).

> This is a concept/portfolio project. "Wurzelwerk" is a fictional business — the address, phone number and menu are invented, and there is no real online reservation system behind it yet (see "Deliberately not built yet" below).

## Concept

Real restaurant problems this addresses: phone reservations that are hard to manage during a dinner rush, and a menu that doesn't quickly answer what guests actually need to know — vegan? vegetarian? allergens? So the menu here is data-modeled with dietary tags and allergens from the start (`src/data/menu.ts`), not just prose — the planned next step (an actual filter UI) reads directly from this shape instead of needing a data rebuild later.

## Deliberately not built yet

- **Online reservations.** The Reservieren/Reservations page states this plainly and gives a phone number and the contact form instead of a fake booking widget — same honest-gap pattern as Salon Kupferglanz's `bookingUrl` fallback.
- **Menu filtering.** Every dish already carries its dietary/allergen data; the filter control itself is planned as an interactive mini-demo in a later phase, not part of this build.

## Features

- Multi-page routing (home, menu, reservations, contact) with localized routes (`/de/speisekarte`, `/en/menu`, etc.)
- Menu with structured dietary (vegan/vegetarian/gluten-free) and allergen data per dish
- German/English UI via `next-intl`
- Contact form via Resend, with a safe console-log fallback when `RESEND_API_KEY` isn't set
- `robots: disallow` — a concept study, kept out of the index like DarioDev's other concept demos

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 with a three-layer design-token system
- [next-intl](https://next-intl.dev/) for internationalization
- [Resend](https://resend.com/) for the contact form (optional — see below)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Contact form (optional)

Without any setup, the contact form validates and logs to the server console instead of sending. To actually send email, add to `.env.local`:

```
RESEND_API_KEY=your-resend-api-key
CONTACT_FROM_EMAIL="Wurzelwerk <you@yourdomain.com>"
```

## Status

Foundational build (homepage, menu, reservations, contact) — not yet deployed, not yet committed to a design/photography pass. See the project's Second Brain status note for what's next.
