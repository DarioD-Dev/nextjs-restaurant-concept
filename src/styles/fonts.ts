import { Bodoni_Moda, Archivo } from "next/font/google";

// A true Didone for display — strong stroke-contrast, editorial-fashion
// register — rather than another warm rustic serif. Distinct from every
// other DarioDev project's type pairing (Fraunces at Kupferglanz, Cormorant
// Garamond at Aurelle, Bricolage Grotesque at DarioDev itself).
export const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// One neutral grotesk carries body, navigation, labels and dietary tags —
// contrast comes from scale/weight/tracking, not from a third typeface.
export const sans = Archivo({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});
