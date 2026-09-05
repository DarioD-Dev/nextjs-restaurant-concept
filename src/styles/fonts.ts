import { Bitter, Work_Sans } from "next/font/google";

// A slab serif for display rather than another elegant serif: Kupferglanz
// already owns "refined serif" (Fraunces) and Maison Aurelle "classic
// serif" (Cormorant Garamond) among DarioDev's projects. Bitter reads as
// sturdy and hand-set — closer to a chalkboard menu than a fashion editorial
// — which fits a vegetable-forward neighbourhood bistro better than either.
export const display = Bitter({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const sans = Work_Sans({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  display: "swap",
});
