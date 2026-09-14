import { notFound } from "next/navigation";

// Fängt alles ab, was unterhalb einer Sprache keiner echten Route entspricht,
// und leitet es auf die übersetzte 404-Seite nebenan. Ohne diese Route greift
// Next auf seine eigene weiße Standardseite zurück.
export default function CatchAll() {
  notFound();
}
