"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent aria-[invalid=true]:border-accent";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);
  const successRef = useRef<HTMLParagraphElement>(null);

  // On success the form is replaced by the confirmation; focus would
  // otherwise fall back to <body> since the submit button it was on is
  // gone, and the next Tab would restart at the top of the page.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <p ref={successRef} tabIndex={-1} role="status" className="font-medium text-accent-hover outline-none">
        {t("success")}
      </p>
    );
  }

  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);
  const messageInvalid = Boolean(state.fieldErrors?.message);
  const hasUnattributedError = state.status === "error" && !nameInvalid && !emailInvalid && !messageInvalid;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground/90">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          required
          aria-invalid={nameInvalid}
          aria-describedby={nameInvalid ? "name-error" : undefined}
          className={fieldClass}
        />
        {nameInvalid && (
          <p id="name-error" className="mt-1 text-xs text-accent-hover">
            {t("error")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-foreground/90">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? "email-error" : undefined}
          className={fieldClass}
        />
        {emailInvalid && (
          <p id="email-error" className="mt-1 text-xs text-accent-hover">
            {t("error")}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground/90">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={4}
          aria-invalid={messageInvalid}
          aria-describedby={messageInvalid ? "message-error" : undefined}
          className={fieldClass}
        />
        {messageInvalid && (
          <p id="message-error" className="mt-1 text-xs text-accent-hover">
            {t("error")}
          </p>
        )}
      </div>
      {hasUnattributedError && <p className="text-xs text-accent-hover">{t("error")}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition hover:bg-accent-hover active:scale-[0.97] disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
