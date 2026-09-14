import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "La Barchetta — italienisches Restaurant in Wien";

// Statische, sprachneutrale Karte (Linkvorschauen verhandeln praktisch nie
// die Sprache) aus derselben Palette wie die Seite. Vorher gab es hier kein
// Bild — wer den Link verschickte, bekam eine Vorschau aus reinem Text.
const display = await readFile(join(process.cwd(), "assets/Gabarito-Bold.woff"));

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "90px",
        background: "#f7f1e3",
        color: "#20201c",
        fontFamily: "Gabarito",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 7,
          textTransform: "uppercase",
          color: "#a62f25",
        }}
      >
        La Barchetta · Wien
      </div>
      <div
        style={{ display: "flex", marginTop: 38, fontSize: 88, lineHeight: 1.08, maxWidth: 900 }}
      >
        Hunger? Perfetto.
      </div>
      <div style={{ display: "flex", marginTop: 34, fontSize: 30, color: "#20201c", opacity: 0.7 }}>
        Pasta, Pizza, Antipasti, Dolci — mitten in Wien-Margareten
      </div>
    </div>,
    { ...size, fonts: [{ name: "Gabarito", data: display, style: "normal", weight: 700 }] },
  );
}
