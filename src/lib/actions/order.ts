"use server";

import { Resend } from "resend";
import { RESTAURANT } from "@/data/restaurant";

export type OrderFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string;
    email?: string;
    items?: string;
    pickupDate?: string;
    pickupTime?: string;
  };
};

type CartItem = { id: string; name: string; qty: number; priceEur: number };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseItems(raw: string): CartItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.id === "string" &&
        typeof item?.name === "string" &&
        typeof item?.qty === "number" &&
        item.qty > 0 &&
        typeof item?.priceEur === "number",
    );
  } catch {
    return [];
  }
}

// Same honesty as the reservation request: this sends the order to the
// kitchen's inbox for someone to confirm by phone, it does not charge a
// card or hold a slot in a real kitchen queue.
export async function submitOrderRequest(
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const pickupDate = String(formData.get("pickupDate") ?? "").trim();
  const pickupTime = String(formData.get("pickupTime") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  const items = parseItems(String(formData.get("items") ?? ""));

  const fieldErrors: OrderFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";
  if (items.length === 0) fieldErrors.items = "required";
  if (!pickupDate) fieldErrors.pickupDate = "required";
  if (!pickupTime) fieldErrors.pickupTime = "required";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const total = items.reduce((sum, item) => sum + item.qty * item.priceEur, 0);

  const text = [
    ...items.map(
      (item) => `${item.qty}x ${item.name} — ${(item.qty * item.priceEur).toFixed(2)} €`,
    ),
    `Gesamt: ${total.toFixed(2)} €`,
    "",
    `Abholung: ${pickupDate}, ${pickupTime}`,
    phone ? `Telefon: ${phone}` : null,
    note ? `Anmerkung: ${note}` : null,
    "",
    `${name} <${email}>`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[order] RESEND_API_KEY not set — would have sent:\n${text}`);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "La Barchetta <onboarding@resend.dev>",
      to: RESTAURANT.email,
      replyTo: email,
      subject: `Vorbestellung von ${name}`,
      text,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[order] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
