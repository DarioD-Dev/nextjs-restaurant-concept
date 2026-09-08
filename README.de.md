_[This page in English](README.md)_

# La Barchetta — Restaurant (Konzept)

Ein fiktives Konzeptprojekt für ein modernes, lebendiges italienisches Restaurant in Wien, als mehrseitiges Next.js-Frontend umgesetzt — das vierte von vier Branchenkonzepten im DarioDev-Portfolio (neben Maison Aurelle für Parfümerien und Salon Kupferglanz für Friseursalons). Bis hierher brauchte es zwei verworfene Identitäten: "Amsel" (dunkel, editorial) fiel weg, weil es dieselbe Designsprache wie die anderen beiden Konzepte hatte, und "Che Fame" wurde noch einmal neu gebaut, weil es weiterhin wie ein Stapel Sections wirkte statt wie ein Ort. La Barchetta — "das kleine Boot" — ist nach dem Papierschiff benannt, das die Startseite hinunterfährt, und nach den bootsförmigen Teigschiffchen, in denen Antipasti serviert werden.

> Dies ist ein Konzept-/Portfolioprojekt. "La Barchetta" ist ein fiktives Unternehmen — Adresse, Telefonnummer und Speisekarte sind erfunden, ein echtes Online-Reservierungssystem gibt es noch nicht.

## Konzept

Ein modernes italienisches Restaurant, kein Fine Dining — Pasta, Pizza, Antipasti, Dolci, echte Gerichte mit echten Preisen. Zwei Ideen tragen die Seite.

**Die Speisekarte ist das Produkt.** `src/data/dishes.ts` speist einen funktionierenden Kategorie- und Diät-Filter mit Live-Trefferzähler, keine statische Liste.

**Die Startseite ist eine Reise, kein Stapel Sections.** Eine gepunktete Route ("La Rotta") läuft über die volle Seitenhöhe, ein Papierschiff fährt sie beim Scrollen ab und schneidet dabei zwischen 70 % und 80 % der Breite wie ein Skifahrer die Piste. Entlang dieser Route liegen die Stationen: Aperitivo, Speisekarten-Teaser, gedeckter Tisch, Pizza auf voller Tomatenfläche, Zutaten auf Basilikum, Dolci und die Ankunft. Nichts Funktionales heißt italienisch — Navigation, Buttons und URLs sind deutsch bzw. englisch; Italienisch bleibt dort, wo es zum Vergnügen gelesen wird (Gerichtnamen, Kategorien, drei Script-Zeilen).

Das Motion-Budget umfasst bewusst drei Momente: das Schiff auf der Route, den Pizza-Dampf und Illustrationen, die beim Erreichen ihrer Station erscheinen. Alle drei respektieren `prefers-reduced-motion`.

Sämtliche Illustrationen sind selbst gezeichnetes Inline-SVG in diesem Repository — es wird nirgends fremdes oder lizenziertes Artwork verwendet.

## Bewusst noch nicht gebaut

- **Online-Reservierung.** Die Reservierungsseite sagt das offen und bietet stattdessen Telefonnummer und Kontaktformular an — dasselbe ehrliche Muster wie Salon Kupferglanz' `bookingUrl`-Fallback.
- **Echte Fotografie.** Die Seite ist so konzipiert, dass sie vollständig mit Illustration, Farbe und Typografie funktioniert; Fotos sind optional, keine Voraussetzung.

## Features

- Drei Routen (Start, Speisekarte, Reservierung) mit lokalisierten Pfaden (`/de/speisekarte` ↔ `/en/menu`, `/de/reservierung` ↔ `/en/reservations`)
- Echter, funktionierender Speisekartenfilter: Kategorie-Tabs plus kombinierbare Vegetarisch/Vegan-Toggles, Live-Trefferzähler und expliziter Leerzustand
- Preise pro Sprache formatiert (`6,50` deutsch, `6.50` englisch) aus einem gemeinsamen Formatter
- Durchgehend selbst gezeichnetes SVG: das Logo (ein Papierschiff mit dem Namen im Segel, dazu eine namenlose Fassung als Favicon), vier Zutaten-Marker und die Stations-Illustrationen
- Ein einziges helles Theme — bewusst kein Dark Mode (siehe die Second-Brain-Notizen des Projekts für die Begründung)
- Deutsch/Englisch über `next-intl`, mit typgeprüften Locales und Message-Keys (`src/global.d.ts`)
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
CONTACT_FROM_EMAIL="La Barchetta <du@deinedomain.com>"
```

## Status

Fertig (Start, Speisekarte mit funktionierendem Filter, Reservierung) — noch nicht deployed. Was als Nächstes ansteht, steht in der Second-Brain-Statusnotiz des Projekts.
