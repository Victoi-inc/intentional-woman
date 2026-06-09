"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { REGISTRATION_FEE_FCFA } from "./conference-4-meta";
import {
  PAYMENT_METHODS,
  formatFcfa,
  inputClass,
  labelClass,
  scrollToId,
  type PaymentMethod,
} from "./form-shared";
import { PaymentMethodPicker } from "./payment-method-picker";

const PRESET_COUNTS = [1, 2, 3, 5, 10] as const;
const CUSTOM_SENTINEL = -1;

const CATEGORIES = [
  { id: "students", label: "Students" },
  { id: "single-mothers", label: "Single Mothers" },
  { id: "young-women-in-ministry", label: "Young Women in Ministry" },
  { id: "entrepreneurs", label: "Entrepreneurs" },
  { id: "widows", label: "Widows" },
  { id: "women-in-need", label: "Women in Need" },
] as const;

export function ConferenceSponsorForm() {
  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [customCount, setCustomCount] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState<string>("");
  const [paymentMethodId, setPaymentMethodId] = useState<string>("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isCustom = selectedCount === CUSTOM_SENTINEL;
  const effectiveCount = useMemo(() => {
    if (!isCustom) return selectedCount;
    const parsed = Number.parseInt(customCount, 10);
    if (!Number.isFinite(parsed) || parsed < 1) return 0;
    return Math.min(parsed, 500);
  }, [isCustom, customCount, selectedCount]);

  const totalAmount = effectiveCount * REGISTRATION_FEE_FCFA;
  const selectedMethod =
    PAYMENT_METHODS.find((m) => m.id === paymentMethodId) ?? null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (effectiveCount < 1) {
      setError("Please choose how many women you would like to sponsor.");
      return;
    }
    if (!isAnonymous) {
      if (
        !fullName.trim() ||
        !email.trim() ||
        !whatsapp.trim() ||
        !address.trim()
      ) {
        setError(
          "Please complete your name, email, WhatsApp number and address — or choose to sponsor anonymously.",
        );
        return;
      }
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
    if (submitted) scrollToId("sponsor-confirmation");
  }, [submitted]);

  if (submitted) {
    return (
      <SponsorConfirmation
        name={isAnonymous ? null : fullName}
        count={effectiveCount}
        total={totalAmount}
        method={selectedMethod}
        onReset={() => {
          setSubmitted(false);
          setTimeout(() => scrollToId("sponsor-access"), 0);
        }}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-2xl border border-iw-purple/10 bg-iw-mist/40 p-6 shadow-sm sm:p-8"
      noValidate
    >
      {/* Number of women + total */}
      <fieldset>
        <legend className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
          How many women would you like to sponsor?
        </legend>
        <div className="mt-5 flex flex-wrap gap-2">
          {PRESET_COUNTS.map((n) => {
            const active = !isCustom && selectedCount === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setSelectedCount(n);
                  setCustomCount("");
                }}
                aria-pressed={active}
                className={`min-h-11 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                  active
                    ? "border-iw-gold bg-iw-gold text-iw-purple"
                    : "border-iw-purple/15 bg-iw-white text-iw-purple hover:border-iw-gold/45 hover:bg-iw-gold/10"
                }`}
              >
                {n} {n === 1 ? "Woman" : "Women"}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setSelectedCount(CUSTOM_SENTINEL)}
            aria-pressed={isCustom}
            className={`min-h-11 rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
              isCustom
                ? "border-iw-gold bg-iw-gold text-iw-purple"
                : "border-dashed border-iw-purple/25 bg-transparent text-iw-purple/85 hover:border-iw-gold/45"
            }`}
          >
            Custom number
          </button>
        </div>
        {isCustom ? (
          <div className="mt-4">
            <label className={labelClass} htmlFor="sponsor-custom-count">
              Enter a custom number
            </label>
            <input
              id="sponsor-custom-count"
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              value={customCount}
              onChange={(e) => setCustomCount(e.target.value)}
              placeholder="e.g. 25"
              className={`${inputClass} max-w-xs`}
            />
          </div>
        ) : null}
      </fieldset>

      {/* Total */}
      <div className="mt-7 flex flex-col gap-1 rounded-xl border border-iw-gold/30 bg-iw-white p-5 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <p className="font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-iw-purple/55">
            Your total
          </p>
          <p className="font-sans mt-1 text-sm text-iw-purple/65">
            {effectiveCount > 0
              ? `${effectiveCount} ${effectiveCount === 1 ? "woman" : "women"} × ${formatFcfa(REGISTRATION_FEE_FCFA)}`
              : "Choose a number above"}
          </p>
        </div>
        <p className="font-display text-3xl font-semibold text-iw-purple sm:text-4xl">
          {formatFcfa(totalAmount)}
        </p>
      </div>

      {/* Sponsor identity */}
      <div className="mt-8 border-t border-iw-purple/10 pt-7">
        <h3 className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
          Your details
        </h3>

        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-iw-purple/15 bg-iw-white p-4 transition-colors hover:border-iw-gold/40">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mt-1 size-4 accent-iw-purple"
          />
          <span className="font-sans text-sm text-iw-purple sm:text-base">
            <span className="block font-semibold">
              I would like to remain anonymous
            </span>
            <span className="mt-0.5 block text-iw-purple/60">
              Your sponsorship will be recorded without your name being shown
              publicly.
            </span>
          </span>
        </label>

        {!isAnonymous ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className={labelClass}>Full name</span>
              <input
                type="text"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className={labelClass}>WhatsApp number</span>
              <input
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+237 ..."
                className={inputClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={labelClass}>Email address</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className={labelClass}>Address</span>
              <input
                type="text"
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, neighbourhood, or full street address"
                className={inputClass}
              />
            </label>
          </div>
        ) : null}
      </div>

      {/* Who you'd like to support */}
      <div className="mt-8 border-t border-iw-purple/10 pt-7">
        <h3 className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
          Choose who you&apos;d like to support{" "}
          <span className="font-sans text-sm font-normal text-iw-purple/55">
            (optional)
          </span>
        </h3>
        <p className="font-sans mt-2 text-sm text-iw-purple/70">
          If you have a heart for a specific group of women, let us know.
          Otherwise leave this blank and your sponsorship will go where
          it&apos;s needed most.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(active ? "" : c.id)}
                aria-pressed={active}
                className={`min-h-10 rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors ${
                  active
                    ? "border-iw-purple bg-iw-purple text-iw-white"
                    : "border-iw-purple/15 bg-iw-white text-iw-purple hover:border-iw-purple/40"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Payment */}
      <PaymentMethodPicker
        value={paymentMethodId}
        onChange={setPaymentMethodId}
      />

      {/* Optional message */}
      <div className="mt-8 border-t border-iw-purple/10 pt-7">
        <label className="block">
          <span className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
            A short message or prayer{" "}
            <span className="font-sans text-sm font-normal text-iw-purple/55">
              (optional)
            </span>
          </span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Write a word of encouragement for the women you're sponsoring..."
            className={`${inputClass} mt-3 resize-y`}
          />
        </label>
      </div>

      {error ? (
        <p
          role="alert"
          className="font-sans mt-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-iw-purple/65">
          You&apos;ll receive payment instructions on the next step.
        </p>
        <button
          type="submit"
          className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
        >
          Confirm sponsorship · {formatFcfa(totalAmount)}
        </button>
      </div>
    </form>
  );
}

function SponsorConfirmation({
  name,
  count,
  total,
  method,
  onReset,
}: {
  name: string | null;
  count: number;
  total: number;
  method: PaymentMethod | null;
  onReset: () => void;
}) {
  return (
    <div
      id="sponsor-confirmation"
      className="mt-10 scroll-mt-24 rounded-2xl border border-iw-gold/40 bg-iw-white p-6 shadow-sm sm:p-8"
    >
      <p className="font-accent text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
        Almost there
      </p>
      <h3 className="font-display mt-2 text-2xl font-semibold text-iw-purple sm:text-3xl">
        Thank you{name ? `, ${name.split(" ")[0]}` : ""}.
      </h3>
      <p className="font-sans mt-3 text-base text-iw-purple/80 sm:text-lg">
        You&apos;ve chosen to sponsor{" "}
        <span className="font-semibold text-iw-purple">
          {count} {count === 1 ? "woman" : "women"}
        </span>{" "}
        for a total of{" "}
        <span className="font-semibold text-iw-purple">
          {new Intl.NumberFormat("fr-FR").format(total)} FCFA
        </span>
        . You&apos;ve chosen to pay with{" "}
        <span className="font-semibold text-iw-purple">
          {method ? method.label : "your selected provider"}
        </span>
        . Continue to the secure checkout to complete your payment.
      </p>

      {method ? (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-iw-gold/40 bg-iw-mist/40 p-5">
          <span
            aria-hidden
            className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-iw-gold bg-iw-gold"
          >
            <span className="size-2 rounded-full bg-iw-purple" />
          </span>
          <div>
            <p className="font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-iw-purple/55">
              Payment provider
            </p>
            <p className="font-display mt-1 text-lg font-semibold text-iw-purple">
              {method.label}
            </p>
          </div>
        </div>
      ) : null}

      <p className="font-sans mt-6 text-sm text-iw-purple/65">
        Secure in-page checkout is coming soon. Our team will reach out to
        confirm your sponsorship and guide you through completing the payment.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="font-accent mt-6 inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-iw-purple/22 bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/40"
      >
        Sponsor another
      </button>
    </div>
  );
}
