import { Libre_Caslon_Display, Figtree, Caveat } from "next/font/google";

// Warm, characterful serif for headlines rather than another editorial
// didone (Amsel was Bodoni Moda) or a rustic slab (the original Wurzelwerk
// pass was Bitter) — Libre Caslon Display has personality without reading
// as fine-dining.
export const display = Libre_Caslon_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Friendly, rounded geometric sans for body/UI/menu — the opposite of the
// tightly tracked editorial groteskes (Archivo, Work Sans, Manrope, Jost)
// every other DarioDev project uses.
export const sans = Figtree({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Handwriting accent — used in exactly one or two spots on the whole site
// (see globals.css / the "Buon appetito" transition), never for real
// content. Not a base UI font.
export const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
