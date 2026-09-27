// Greift nur für Adressen außerhalb von /[locale] — dort gibt es keine
// Sprache, also auch keine Übersetzungen und kein Layout mit Kopf und Fuß.
// Die gestaltete 404-Seite liegt in [locale]/not-found.tsx; hierher kommt
// praktisch nur, wer die Middleware umgeht.
//
// Der Link zeigt auf „/" statt auf „/de": Dort verhandelt die Middleware die
// Sprache, statt sie zu erraten.
export default function RootNotFound() {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f1e3",
          color: "#20201c",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p>
          Seite nicht gefunden —{" "}
          <a href="/" style={{ color: "#a62f25" }}>
            zur Startseite
          </a>
        </p>
      </body>
    </html>
  );
}
