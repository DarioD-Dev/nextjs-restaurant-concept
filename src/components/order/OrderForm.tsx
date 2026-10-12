"use client";

import { useLocale, useTranslations } from "next-intl";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { categories, dishes, formatPrice, type DishId } from "@/data/dishes";
import { nextOpenDays, timeSlots } from "@/lib/availability";
import { submitOrderRequest, type OrderFormState } from "@/lib/actions/order";

const initialState: OrderFormState = { status: "idle" };

const fieldClass =
  "mt-1.5 w-full rounded-xl border-2 border-foreground bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary aria-[invalid=true]:border-primary";

const stepperButton =
  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-foreground font-display text-lg transition-colors hover:bg-highlight active:scale-90 disabled:opacity-40";

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function OrderForm() {
  const t = useTranslations("Order");
  const tMenu = useTranslations("Menu");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitOrderRequest, initialState);
  const successRef = useRef<HTMLDivElement>(null);

  const [quantities, setQuantities] = useState<Partial<Record<DishId, number>>>({});
  const [pickupDateIso, setPickupDateIso] = useState("");
  const [pickupTime, setPickupTime] = useState("");

  const days = useMemo(() => nextOpenDays(14), []);
  const selectedDate = days.find((d) => isoDate(d) === pickupDateIso) ?? null;
  const slots = useMemo(() => (selectedDate ? timeSlots(selectedDate, 0, 15) : []), [selectedDate]);
  const dateFormat = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short" }),
    [locale],
  );

  function setQty(id: DishId, qty: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, qty) }));
  }

  const cartItems = dishes
    .filter((dish) => (quantities[dish.id] ?? 0) > 0)
    .map((dish) => ({
      id: dish.id,
      name: tMenu(`dishes.${dish.id}.name`),
      qty: quantities[dish.id] ?? 0,
      priceEur: dish.priceEur,
    }));
  const total = cartItems.reduce((sum, item) => sum + item.qty * item.priceEur, 0);

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
  const itemsInvalid = Boolean(state.fieldErrors?.items);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <input type="hidden" name="items" value={JSON.stringify(cartItems)} />

      <div className="flex flex-col gap-10">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="font-display text-xl text-foreground">
              {tMenu(`categories.${category}`)}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {dishes
                .filter((dish) => dish.category === category)
                .map((dish) => {
                  const qty = quantities[dish.id] ?? 0;
                  return (
                    <li
                      key={dish.id}
                      className="flex items-center justify-between gap-4 rounded-xl border-2 border-foreground bg-surface px-4 py-3"
                    >
                      <div>
                        <p className="font-display text-base text-foreground">
                          {tMenu(`dishes.${dish.id}.name`)}
                        </p>
                        <p className="text-sm text-foreground-muted">
                          {formatPrice(dish.priceEur, locale)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setQty(dish.id, qty - 1)}
                          disabled={qty === 0}
                          aria-label={t("decrease")}
                          className={stepperButton}
                        >
                          −
                        </button>
                        <span className="w-4 text-center font-sans text-sm font-semibold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(dish.id, qty + 1)}
                          aria-label={t("increase")}
                          className={stepperButton}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border-2 border-foreground bg-highlight px-4 py-3">
        <p className="flex items-center justify-between font-display text-lg text-foreground">
          <span>{t("totalLabel")}</span>
          <span>{formatPrice(total, locale)}</span>
        </p>
        {itemsInvalid && <p className="mt-1 text-xs text-primary">{t("emptyCartError")}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="pickupDate"
            className="font-sans text-sm font-semibold text-foreground-muted"
          >
            {t("pickupDateLabel")}
          </label>
          <select
            id="pickupDate"
            name="pickupDate"
            required
            value={pickupDateIso}
            onChange={(event) => {
              setPickupDateIso(event.target.value);
              setPickupTime("");
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
          <label
            htmlFor="pickupTime"
            className="font-sans text-sm font-semibold text-foreground-muted"
          >
            {t("pickupTimeLabel")}
          </label>
          <select
            id="pickupTime"
            name="pickupTime"
            required
            disabled={!selectedDate}
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
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

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-full bg-primary px-6 py-3 font-sans text-sm font-bold text-background transition-colors hover:bg-primary-hover active:scale-[0.97] disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
