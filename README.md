*[Diese Seite auf Deutsch](README.de.md)*

# Che Fame — Restaurant (Concept)

A fictional concept site for a modern, lively Italian restaurant in Vienna, built as a multi-page Next.js frontend — the fourth of four industry concepts in DarioDev's portfolio (alongside Maison Aurelle for perfumeries and Salon Kupferglanz for hair salons). This is the project's second identity: the first pass, "Amsel" (dark, editorial, seasonal-menu concept), was deliberately discarded — not for quality reasons, but because it converged on the same dark/editorial design language as the other two DarioDev concept projects. Che Fame is a full rebuild in the opposite direction: light, warm, illustrated, and functionally centered on a real, filterable menu.

> This is a concept/portfolio project. "Che Fame" is a fictional business — the address, phone number and menu are invented, and there is no real online reservation system behind it yet.

## Concept

A modern Italian restaurant, not fine dining — pasta, pizza, antipasti, dolci, real dishes with real prices. The menu (`src/data/dishes.ts`) is the flagship feature: a working category + dietary filter (`/la-cucina`), not a static list. Four small hand-coded line-art ingredient icons (pomodoro, basilico, limone, peperoncino) mark the dishes that feature them. A strict, deliberate motion budget of four moments — pizza steam, a boat that drifts across the footer as you scroll, the ingredient icons, and one handwritten "Buon appetito!" transition — keeps the site from turning into a demo of animation for its own sake.

## Deliberately not built yet

- **Online reservations.** `/prenota` states this plainly and gives a phone number and a contact form instead of a fake booking widget — same honest-gap pattern as Salon Kupferglanz's `bookingUrl` fallback.
- **Real photography.** The site is designed to work entirely on illustration and typography; photos are optional, not a prerequisite.

## Features

- Three routes (home, `/la-cucina`, `/prenota`) with localized paths (`/de/la-cucina` ↔ `/en/menu`, `/de/prenota` ↔ `/en/reservations`)
- Real, working menu filter: category tabs (Tutto/Pasta/Pizza/Antipasti/Dolci) plus combinable vegetarian/vegan toggles, live result count
- Four hand-coded SVG ingredient icons, reused across the teaser, the full menu and the "Fatto in casa" section
- A single light theme — no dark mode, by explicit decision (see the project's Second Brain notes for why)
- German/English UI via `next-intl`
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
CONTACT_FROM_EMAIL="Che Fame <you@yourdomain.com>"
```

## Status

Full rebuild complete (home, menu with working filter, reservations) — not yet deployed. See the project's Second Brain status note for what's next.
