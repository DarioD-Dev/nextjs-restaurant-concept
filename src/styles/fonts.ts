import { Gabarito, Figtree, Caveat } from "next/font/google";

// Rounded, warm, geometric display face with real character — but
// restrained enough not to read as childish (that ruled out Baloo 2 and
// Fredoka). No serif at all: every other DarioDev project uses one
// (Bricolage, Fraunces, Cormorant Garamond, Libre Caslon), and a serif is
// also the fastest way to accidentally drift back toward "editorial /
// fine dining", which this project explicitly isn't.
export const display = Gabarito({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const sans = Figtree({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Handwriting accent — now specifically the "route label" font, the small
// station names along La Rotta (see Route.tsx), plus the one Buon-appetito
// moment. Never body content.
export const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});
