"use client";

import { useEffect, useState, type FormEvent } from "react";
import { REGISTRATION_FEE_FCFA } from "./conference-4-meta";
import {
  AGE_RANGES,
  PAYMENT_METHODS,
  formatFcfa,
  inputClassDark,
  labelClassDark,
  scrollToId,
  type PaymentMethod,
} from "./form-shared";
import { PaymentMethodPicker } from "./payment-method-picker";
import { ThemeSelect } from "./theme-select";

const PRESET_COUNTS = [1, 2, 3, 4, 5] as const;
const MAX_ATTENDEES = 20;

type Attendee = {
  fullName: string;
  whatsapp: string;
  email: string;
  ageRange: string;
};

function emptyAttendee(): Attendee {
  return { fullName: "", whatsapp: "", email: "", ageRange: "" };
}

export function ConferenceRegistrationForm() {
  const [attendees, setAttendees] = useState<Attendee[]>([emptyAttendee()]);
  const [useCustom, setUseCustom] = useState(false);
  const [customCount, setCustomCount] = useState("1");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const count = attendees.length;
  const totalAmount = count * REGISTRATION_FEE_FCFA;
  const selectedMethod =
    PAYMENT_METHODS.find((m) => m.id === paymentMethodId) ?? null;

  function setCount(next: number) {
    const clamped = Math.max(1, Math.min(next, MAX_ATTENDEES));
    setAttendees((prev) => {
      if (clamped === prev.length) return prev;
      if (clamped < prev.length) return prev.slice(0, clamped);
      return [
        ...prev,
        ...Array.from({ length: clamped - prev.length }, emptyAttendee),
      ];
    });
  }

  function updateAttendee(index: number, patch: Partial<Attendee>) {
    setAttendees((prev) =>
      prev.map((a, i) => (i === index ? { ...a, ...patch } : a)),
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const firstIncomplete = attendees.findIndex(
      (a) =>
        !a.fullName.trim() ||
        !a.whatsapp.trim() ||
        !a.email.trim() ||
        !a.ageRange,
    );
    if (firstIncomplete !== -1) {
      setError(
        `Please complete every field for attendee ${firstIncomplete + 1} — registration cannot be anonymous.`,
      );
      return;
    }
    if (!paymentMethodId) {
      setError(
        "Please choose a payment method — MTN Mobile Money or Orange Money.",
      );
      return;
    }
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted) scrollToId("registration-confirmation");
  }, [submitted]);

  if (submitted) {
    return (
      <RegistrationConfirmation
        attendees={attendees}
        total={totalAmount}
        method={selectedMethod}
        onReset={() => {
          setSubmitted(false);
          setTimeout(() => scrollToId("register"), 0);
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 rounded-2xl border border-iw-white/15 bg-iw-white/[0.04] p-6 shadow-[0_24px_70px_rgb(0_0_0/0.28)] backdrop-blur-sm sm:p-8"
      noValidate
    >
      {/* How many attendees */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-iw-white sm:text-2xl">
          How many people are you registering?
        </legend>
        <p className="font-sans mt-2 text-sm text-iw-white/70">
          Each seat is {formatFcfa(REGISTRATION_FEE_FCFA)}. We&apos;ll open a
          details form for every attendee so each receives their own ticket.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PRESET_COUNTS.map((n) => {
            const active = !useCustom && count === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setUseCustom(false);
                  setCount(n);
                }}
                aria-pressed={active}
                className={`min-h-11 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  active
                    ? "border-iw-gold bg-iw-gold text-iw-purple"
                    : "border-iw-white/25 bg-iw-white/5 text-iw-white backdrop-blur-sm hover:border-iw-gold/55 hover:bg-iw-gold/15"
                }`}
              >
                {n} {n === 1 ? "Person" : "People"}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setUseCustom(true);
              setCustomCount(String(count));
            }}
            aria-pressed={useCustom}
            className={`min-h-11 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
              useCustom
                ? "border-iw-gold bg-iw-gold text-iw-purple"
                : "border-dashed border-iw-white/30 bg-transparent text-iw-white/85 hover:border-iw-gold/55"
            }`}
          >
            Custom number
          </button>
        </div>
        {useCustom ? (
          <div className="mt-4">
            <label className={labelClassDark} htmlFor="attendee-count">
              Number of attendees (max {MAX_ATTENDEES})
            </label>
            <input
              id="attendee-count"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_ATTENDEES}
              value={customCount}
              onChange={(e) => {
                setCustomCount(e.target.value);
                const parsed = Number.parseInt(e.target.value, 10);
                if (Number.isFinite(parsed)) setCount(parsed);
              }}
              placeholder="e.g. 8"
              className={`${inputClassDark} max-w-xs`}
            />
          </div>
        ) : null}
      </fieldset>

      {/* Per-attendee details */}
      <div className="mt-8 border-t border-iw-white/15 pt-7">
        <h3 className="font-display text-xl font-semibold text-iw-white sm:text-2xl">
          Attendee details
        </h3>
        <p className="font-sans mt-2 text-sm text-iw-white/70">
          Every attendee must provide their details — conference registration
          cannot be anonymous.
        </p>

        <div className="mt-5 space-y-5">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="rounded-xl border border-iw-white/15 bg-iw-white/[0.06] p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-accent flex size-7 shrink-0 items-center justify-center rounded-full bg-iw-gold text-xs font-bold text-iw-purple">
                  {index + 1}
                </span>
                <p className="font-accent text-[11px] font-bold uppercase tracking-[0.18em] text-iw-white/70">
                  Attendee {index + 1}
                </p>
              </div>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className={labelClassDark}>Full name</span>
                  <input
                    type="text"
                    autoComplete={index === 0 ? "name" : "off"}
                    value={attendee.fullName}
                    onChange={(e) =>
                      updateAttendee(index, { fullName: e.target.value })
                    }
                    placeholder="Jane Doe"
                    className={inputClassDark}
                  />
                </label>
                <label className="block">
                  <span className={labelClassDark}>WhatsApp number</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={attendee.whatsapp}
                    onChange={(e) =>
                      updateAttendee(index, { whatsapp: e.target.value })
                    }
                    placeholder="+237 ..."
                    className={inputClassDark}
                  />
                </label>
                <label className="block">
                  <span className={labelClassDark}>Email address</span>
                  <input
                    type="email"
                    value={attendee.email}
                    onChange={(e) =>
                      updateAttendee(index, { email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className={inputClassDark}
                  />
                </label>
                <div className="block sm:col-span-2">
                  <span className={labelClassDark}>Age range</span>
                  <ThemeSelect
                    value={attendee.ageRange}
                    onChange={(next) =>
                      updateAttendee(index, { ageRange: next })
                    }
                    options={AGE_RANGES}
                    placeholder="Select age range"
                    label={`Age range for attendee ${index + 1}`}
                    tone="dark"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-7 flex flex-col gap-1 rounded-xl border border-iw-gold/40 bg-iw-white/[0.06] p-5 backdrop-blur-sm sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-iw-white/60">
            Your total
          </p>
          <p className="font-sans mt-1 text-sm text-iw-white/70">
            {count} {count === 1 ? "seat" : "seats"} ×{" "}
            {formatFcfa(REGISTRATION_FEE_FCFA)}
          </p>
        </div>
        <p className="font-display text-3xl font-semibold text-iw-white sm:text-4xl">
          {formatFcfa(totalAmount)}
        </p>
      </div>

      {/* Payment */}
      <PaymentMethodPicker
        value={paymentMethodId}
        onChange={setPaymentMethodId}
        tone="dark"
      />

      {error ? (
        <p
          role="alert"
          className="font-sans mt-6 rounded-lg border border-red-300/60 bg-red-500/15 p-3 text-sm text-red-100 backdrop-blur-sm"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-iw-white/70">
          Tickets are sent to each attendee once payment is confirmed.
        </p>
        <button
          type="submit"
          className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
        >
          Pay {formatFcfa(totalAmount)} now
        </button>
      </div>
    </form>
  );
}

function RegistrationConfirmation({
  attendees,
  total,
  method,
  onReset,
}: {
  attendees: { fullName: string }[];
  total: number;
  method: PaymentMethod | null;
  onReset: () => void;
}) {
  const count = attendees.length;
  return (
    <div
      id="registration-confirmation"
      className="mt-10 scroll-mt-24 rounded-2xl border border-iw-gold/40 bg-iw-white p-6 shadow-sm sm:p-8"
    >
      <p className="font-accent text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
        Almost there
      </p>
      <h3 className="font-display mt-2 text-2xl font-semibold text-iw-purple sm:text-3xl">
        You&apos;re registering {count} {count === 1 ? "seat" : "seats"}.
      </h3>
      <p className="font-sans mt-3 text-base text-iw-purple/80 sm:text-lg">
        Total due:{" "}
        <span className="font-semibold text-iw-purple">
          {new Intl.NumberFormat("fr-FR").format(total)} FCFA
        </span>
        , paying with{" "}
        <span className="font-semibold text-iw-purple">
          {method ? method.label : "your selected provider"}
        </span>
        . Each attendee will receive their own ticket once payment is confirmed.
      </p>

      <ul className="mt-6 divide-y divide-iw-purple/10 rounded-xl border border-iw-purple/10 bg-iw-mist/40">
        {attendees.map((a, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-5 py-3 font-sans text-sm text-iw-purple"
          >
            <span className="font-accent flex size-6 shrink-0 items-center justify-center rounded-full bg-iw-gold text-[11px] font-bold text-iw-purple">
              {i + 1}
            </span>
            {a.fullName}
          </li>
        ))}
      </ul>

      <p className="font-sans mt-6 text-sm text-iw-purple/65">
        Secure in-page checkout is coming soon. Our team will reach out to
        confirm your registration and guide you through completing the payment.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="font-accent mt-6 inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-iw-purple/22 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/40"
      >
        Edit registration
      </button>
    </div>
  );
}
