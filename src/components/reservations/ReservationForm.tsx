"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { nextOpenDays, timeSlots } from "@/lib/availability";
import { submitReservationRequest, type ReservationFormState } from "@/lib/actions/reservation";

const initialState: ReservationFormState = { status: "idle" };

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

const fieldClass =
  "mt-1.5 w-full rounded-xl border-2 border-foreground bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary aria-[invalid=true]:border-primary";

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function ReservationForm() {
  const t = useTranslations("Reservations.form");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitReservationRequest, initialState);
  const successRef = useRef<HTMLDivElement>(null);

  const [dateIso, setDateIso] = useState("");
  const [time, setTime] = useState("");

  const days = useMemo(() => nextOpenDays(21), []);
  const selectedDate = days.find((d) => isoDate(d) === dateIso) ?? null;
  const slots = useMemo(() => (selectedDate ? timeSlots(selectedDate) : []), [selectedDate]);

  const dateFormat = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }),
    [locale],
  );

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="outline-none">
        <p className="font-semibold text-primary">{t("success")}</p>
        <p className="mt-2 text-sm text-foreground/70">{t("demoNote")}</p>
      </div>
    );
  }

  const nameInvalid = Boolean(state.fieldErrors?.name);
  const emailInvalid = Boolean(state.fieldErrors?.email);
  const hasUnattributedError =
    state.status === "error" &&
    !nameInvalid &&
    !emailInvalid &&
    !state.fieldErrors?.partySize &&
    !state.fieldErrors?.date &&
    !state.fieldErrors?.time;

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label
            htmlFor="partySize"
            className="font-sans text-sm font-semibold text-foreground-muted"
          >
            {t("partySizeLabel")}
          </label>
          <select id="partySize" name="partySize" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {PARTY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="font-sans text-sm font-semibold text-foreground-muted">
            {t("dateLabel")}
          </label>
          <select
            id="date"
            name="date"
            required
            value={dateIso}
            onChange={(event) => {
              setDateIso(event.target.value);
              setTime("");
            }}
            className={fieldClass}
          >
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {days.map((day) => (
              <option key={isoDate(day)} value={isoDate(day)}>
                {dateFormat.format(day)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time" className="font-sans text-sm font-semibold text-foreground-muted">
            {t("timeLabel")}
          </label>
          <select
            id="time"
            name="time"
            required
            disabled={!selectedDate}
            value={time}
            onChange={(event) => setTime(event.target.value)}
            className={fieldClass}
          >
            <option value="" disabled>
              {t("selectPlaceholder")}
            </option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-foreground/60">{t("largePartyHint")}</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-sans text-sm font-semibold text-foreground-muted">
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
            <p id="name-error" className="mt-1 text-xs text-primary">
              {t("error")}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="font-sans text-sm font-semibold text-foreground-muted">
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
            <p id="email-error" className="mt-1 text-xs text-primary">
              {t("error")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="font-sans text-sm font-semibold text-foreground-muted">
          {t("phoneLabel")}
        </label>
        <input id="phone" name="phone" type="tel" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="note" className="font-sans text-sm font-semibold text-foreground-muted">
          {t("noteLabel")}
        </label>
        <textarea id="note" name="note" rows={3} className={fieldClass} />
      </div>

      {hasUnattributedError && <p className="text-xs text-primary">{t("error")}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover active:scale-[0.97] disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
