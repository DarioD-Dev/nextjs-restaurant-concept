_[Diese Seite auf Deutsch](README.de.md)_

# La Barchetta — Restaurant (Concept)

A fictional concept site for a modern, lively Italian restaurant in Vienna, built as a multi-page Next.js frontend — the fourth of four industry concepts in DarioDev's portfolio (alongside Maison Aurelle for perfumeries and Salon Kupferglanz for hair salons). It took two discarded identities to get here: "Amsel" (dark, editorial) was dropped because it converged on the same design language as the other two concepts, and "Che Fame" was rebuilt once more when it still read as a stack of sections rather than a place. La Barchetta — "the little boat" — is named after the paper boat that sails down the homepage, and after the boat-shaped pastry shells antipasti are served in.

> This is a concept/portfolio project. "La Barchetta" is a fictional business — the address, phone number and menu are invented, and there is no real online reservation system behind it yet.

## Concept

A modern Italian restaurant, not fine dining — pasta, pizza, antipasti, dolci, real dishes with real prices. Two ideas carry the site.

**The menu is the product.** `src/data/dishes.ts` drives a working category and dietary filter with a live result count, not a static list.

**The homepage is a journey, not a stack of sections.** A dashed route ("La Rotta") runs the full height of the page and a paper boat travels along it as you scroll, carving between 70% and 80% of the width like a skier taking a slope. Stations sit along that route: the aperitivo, the menu teaser, the laid table, the pizza on a full tomato field, the ingredients on basil, the desserts, and the arrival. Nothing functional is named in Italian — navigation, buttons and URLs are plain German and English; Italian is left where it is read for pleasure (dish names, categories, three script asides).

The motion budget is three moments, deliberately: the boat following the route, the pizza steam, and illustrations arriving as they reach their station. All three respect `prefers-reduced-motion`.

Every illustration is hand-drawn inline SVG in this repository — no third-party or licensed artwork is used anywhere.

## Deliberately not built yet

- **Online reservations.** The reservations page states this plainly and gives a phone number and a contact form instead of a fake booking widget — same honest-gap pattern as Salon Kupferglanz's `bookingUrl` fallback.
- **Real photography.** The site is designed to work entirely on illustration, colour and typography; photos are optional, not a prerequisite.

## Features

- Three routes (home, menu, reservations) with localized paths (`/de/speisekarte` ↔ `/en/menu`, `/de/reservierung` ↔ `/en/reservations`)
- Real, working menu filter: category tabs plus combinable vegetarian/vegan toggles, live result count and an explicit empty state
- Prices formatted per locale (`6,50` in German, `6.50` in English) from one shared formatter
- Hand-drawn SVG throughout: the logo (a paper boat with the name on its sail, plus a nameless variant as the favicon), four ingredient markers, and the station illustrations
- A single light theme — no dark mode, by explicit decision (see the project's Second Brain notes for why)
- German/English UI via `next-intl`, with locale and message keys type-checked (`src/global.d.ts`)
- Contact form via Resend, with a safe console-log fallback when `RESEND_API_KEY` isn't set
- `robots: disallow` — a concept study, kept out of the index like DarioDev's other concept demos

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
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
CONTACT_FROM_EMAIL="La Barchetta <you@yourdomain.com>"
```

## Status

Complete (home, menu with working filter, reservations) — not yet deployed. See the project's Second Brain status note for what's next.
