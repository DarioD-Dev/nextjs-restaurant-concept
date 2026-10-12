"use server";

import { Resend } from "resend";
import { RESTAURANT } from "@/data/restaurant";

export type ReservationFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string;
    email?: string;
    partySize?: string;
    date?: string;
    time?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same honesty as the contact form and every other DarioDev booking flow:
// this is a request, not a reservation — there's no real floor plan that
// actually holds the table, so the confirmation says so instead of
// pretending otherwise.
export async function submitReservationRequest(
  _prevState: ReservationFormState,
  formData: FormData,
): Promise<ReservationFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const partySize = String(formData.get("partySize") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const time = String(formData.get("time") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();

  const fieldErrors: ReservationFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";
  if (!partySize) fieldErrors.partySize = "required";
  if (!date) fieldErrors.date = "required";
  if (!time) fieldErrors.time = "required";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const text = [
    `Personen: ${partySize}`,
    `Wunschtermin: ${date}, ${time}`,
    phone ? `Telefon: ${phone}` : null,
    note ? `Anmerkung: ${note}` : null,
    "",
    `${name} <${email}>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[reservation] RESEND_API_KEY not set — would have sent:\n${text}`);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "La Barchetta <onboarding@resend.dev>",
      to: RESTAURANT.email,
      replyTo: email,
      subject: `Tischanfrage von ${name}`,
      text,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[reservation] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
