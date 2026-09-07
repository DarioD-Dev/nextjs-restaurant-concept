"use server";

import { Resend } from "resend";
import { RESTAURANT } from "@/data/restaurant";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  fieldErrors?: {
    name?: string;
    email?: string;
    message?: string;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Without RESEND_API_KEY (this demo, not yet a real client site) the form
// still validates properly but only logs instead of sending — nothing
// silently fails, and turning it into a real mail flow is a one-env-var
// change, not a rewrite. Same pattern as Salon Kupferglanz and Maison
// Aurelle's contact forms.
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactFormState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "required";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "invalid";
  if (message.length < 10) fieldErrors.message = "tooShort";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[contact] RESEND_API_KEY not set — would have sent:\n${name} <${email}>\n${message}`);
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "La Barchetta <onboarding@resend.dev>",
      to: RESTAURANT.email,
      replyTo: email,
      subject: `Neue Nachricht von ${name}`,
      text: `${message}\n\n—\n${name} <${email}>`,
    });
    if (error) throw error;
  } catch (error) {
    console.error("[contact] Resend send failed:", error);
    return { status: "error" };
  }

  return { status: "success" };
}
