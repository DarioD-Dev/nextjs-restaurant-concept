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
  // 600 for headings, 700/800 for the logo lettering. Nothing requests 900.
  weight: ["600", "700", "800"],
  display: "swap",
});

export const sans = Figtree({
  variable: "--font-sans-ui",
  subsets: ["latin"],
  // Body text, font-semibold and font-bold — no other weight is used.
  weight: ["400", "600", "700"],
  display: "swap",
});

// Handwriting accent, used only for the short line above a station's
// heading (and the one on the closing banner). Never body content, never a
// heading — it carries no information that isn't repeated in the heading
// underneath it.
export const script = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});
