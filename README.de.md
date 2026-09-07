*[This page in English](README.md)*

# Che Fame — Restaurant (Konzept)

Ein fiktives Konzeptprojekt für ein modernes, lebendiges italienisches Restaurant in Wien, als mehrseitiges Next.js-Frontend umgesetzt — das vierte von vier Branchenkonzepten im DarioDev-Portfolio (neben Maison Aurelle für Parfümerien und Salon Kupferglanz für Friseursalons). Es ist die zweite Identität dieses Projekts: Der erste Anlauf, "Amsel" (dunkel, editorial, Saisonkarten-Konzept), wurde bewusst verworfen — nicht aus Qualitätsgründen, sondern weil er dieselbe dunkel-editoriale Designsprache wie die anderen beiden DarioDev-Konzeptprojekte hatte. Che Fame ist ein kompletter Neubau in die entgegengesetzte Richtung: hell, warm, illustrativ, mit einer echten, filterbaren Speisekarte im Zentrum.

> Dies ist ein Konzept-/Portfolioprojekt. "Che Fame" ist ein fiktives Unternehmen — Adresse, Telefonnummer und Speisekarte sind erfunden, ein echtes Online-Reservierungssystem gibt es noch nicht.

## Konzept

Ein modernes italienisches Restaurant, kein Fine Dining — Pasta, Pizza, Antipasti, Dolci, echte Gerichte mit echten Preisen. Die Speisekarte (`src/data/dishes.ts`) ist das Kernfeature: ein funktionierender Kategorie- und Diät-Filter (`/la-cucina`), keine statische Liste. Vier kleine, selbst gezeichnete Line-Art-Zutaten-Icons (Pomodoro, Basilico, Limone, Peperoncino) markieren die Gerichte, in denen sie vorkommen. Ein striktes Motion-Budget von genau vier Momenten — Pizza-Dampf, ein Boot, das beim Scrollen durch den Footer driftet, die Zutaten-Icons und ein handschriftlicher "Buon appetito!"-Übergang — verhindert, dass die Seite zu einer Animations-Spielwiese wird.

## Bewusst noch nicht gebaut

- **Online-Reservierung.** `/prenota` sagt das offen und bietet stattdessen Telefonnummer und Kontaktformular an — dasselbe ehrliche Muster wie Salon Kupferglanz' `bookingUrl`-Fallback.
- **Echte Fotografie.** Die Seite ist so konzipiert, dass sie vollständig mit Illustration und Typografie funktioniert; Fotos sind optional, keine Voraussetzung.

## Features

- Drei Routen (Start, `/la-cucina`, `/prenota`) mit lokalisierten Pfaden (`/de/la-cucina` ↔ `/en/menu`, `/de/prenota` ↔ `/en/reservations`)
- Echter, funktionierender Speisekartenfilter: Kategorie-Tabs (Tutto/Pasta/Pizza/Antipasti/Dolci) plus kombinierbare Vegetarisch/Vegan-Toggles, Live-Trefferzähler
- Vier selbst gezeichnete SVG-Zutaten-Icons, wiederverwendet im Teaser, der vollständigen Karte und bei "Fatto in casa"
- Ein einziges helles Theme — bewusst kein Dark Mode (siehe die Second-Brain-Notizen des Projekts für die Begründung)
- Deutsch/Englisch über `next-intl`
- Kontaktformular via Resend, mit sicherem Konsolen-Log-Fallback ohne `RESEND_API_KEY`
- `robots: disallow` — Konzeptstudie, bewusst nicht indexiert wie die anderen DarioDev-Konzeptprojekte

## Tech-Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- [next-intl](https://next-intl.dev/) für Internationalisierung
- [Resend](https://resend.com/) fürs Kontaktformular (optional — siehe unten)

## Erste Schritte

```bash
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) öffnen.

### Kontaktformular (optional)

Ohne Konfiguration validiert das Formular korrekt und loggt in die Server-Konsole statt zu senden. Für echten E-Mail-Versand in `.env.local` eintragen:

```
RESEND_API_KEY=dein-resend-api-key
CONTACT_FROM_EMAIL="Che Fame <du@deinedomain.com>"
```

## Status

Kompletter Neubau abgeschlossen (Start, Speisekarte mit funktionierendem Filter, Reservierung) — noch nicht deployed. Was als Nächstes ansteht, steht in der Second-Brain-Statusnotiz des Projekts.
