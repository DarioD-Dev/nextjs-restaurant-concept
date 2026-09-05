*[This page in English](README.md)*

# Wurzelwerk — Restaurant (Konzept)

Ein fiktives Konzeptprojekt für ein saisonales, vegetabil geprägtes Bistro in Wien, als mehrseitiges Next.js-Frontend umgesetzt — das vierte von vier Branchenkonzepten im DarioDev-Portfolio (neben Maison Aurelle für Parfümerien und Salon Kupferglanz für Friseursalons).

> Dies ist ein Konzept-/Portfolioprojekt. "Wurzelwerk" ist ein fiktives Unternehmen — Adresse, Telefonnummer und Speisekarte sind erfunden, ein echtes Online-Reservierungssystem gibt es noch nicht (siehe "Bewusst noch nicht gebaut").

## Konzept

Echte Restaurant-Probleme, die hier adressiert werden: Telefonreservierungen, die während der Rushhour schwer zu handhaben sind, und eine Speisekarte, die nicht schnell genug beantwortet, was Gäste wirklich wissen wollen — vegan? vegetarisch? Allergene? Deshalb ist die Speisekarte von Anfang an mit Diät- und Allergen-Tags als echte Daten modelliert (`src/data/menu.ts`), nicht nur als Fließtext — der geplante nächste Schritt (ein echter Filter) liest direkt aus dieser Struktur, statt später ein neues Datenmodell zu brauchen.

## Bewusst noch nicht gebaut

- **Online-Reservierung.** Die Reservieren-Seite sagt das offen und bietet stattdessen Telefonnummer und Kontaktformular an — dasselbe ehrliche Muster wie Salon Kupferglanz' `bookingUrl`-Fallback.
- **Speisekartenfilter.** Jedes Gericht trägt schon die Diät-/Allergen-Daten; der Filter selbst ist als interaktive Mini-Demo für eine spätere Phase geplant, nicht Teil dieses Baus.

## Features

- Mehrseitiges Routing (Start, Speisekarte, Reservieren, Kontakt) mit lokalisierten Pfaden (`/de/speisekarte`, `/en/menu`, usw.)
- Speisekarte mit strukturierten Diät- (vegan/vegetarisch/glutenfrei) und Allergen-Daten pro Gericht
- Deutsch/Englisch über `next-intl`
- Kontaktformular via Resend, mit sicherem Konsolen-Log-Fallback ohne `RESEND_API_KEY`
- `robots: disallow` — Konzeptstudie, bewusst nicht indexiert wie die anderen DarioDev-Konzeptprojekte

## Tech-Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 mit dreischichtigem Design-Token-System
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
CONTACT_FROM_EMAIL="Wurzelwerk <du@deinedomain.com>"
```

## Status

Grundlegender Bau (Start, Speisekarte, Reservieren, Kontakt) — noch nicht deployed, noch kein eigener Foto-/Design-Durchgang. Was als Nächstes ansteht, steht in der Second-Brain-Statusnotiz des Projekts.
