"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  EVENT_DATE_LABEL,
  EVENT_DATE_ISO,
  EVENT_LOCATION_LABEL,
  EVENT_TIME_LABEL,
  REGISTRATION_FEE_FCFA,
} from "./conference-4-meta";
import { CountdownTimer } from "./countdown-timer";

const PRESET_COUNTS = [1, 2, 3, 5, 10] as const;
const CUSTOM_SENTINEL = -1;
const SPONSOR_GOAL = 100;
const SPONSORED_SO_FAR = 0; // Placeholder until backend wired

const CATEGORIES = [
  { id: "students", label: "Students" },
  { id: "single-mothers", label: "Single Mothers" },
  { id: "young-women-in-ministry", label: "Young Women in Ministry" },
  { id: "entrepreneurs", label: "Entrepreneurs" },
  { id: "widows", label: "Widows" },
  { id: "women-in-need", label: "Women in Need" },
] as const;

const AGE_RANGES = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55+",
] as const;

const PAYMENT_METHODS = [
  {
    id: "mtn",
    label: "MTN Mobile Money",
    blurb: "Pay securely with your MTN MoMo account.",
  },
  {
    id: "orange",
    label: "Orange Money",
    blurb: "Pay securely with your Orange Money account.",
  },
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const inputClass =
  "w-full rounded-lg border border-iw-purple/15 bg-iw-mist/40 px-4 py-2.5 font-sans text-iw-purple placeholder:text-iw-purple/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold";

const labelClass =
  "font-accent mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-iw-purple/65";

function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ConferenceFourSponsorPage() {
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion === true;

  const [selectedCount, setSelectedCount] = useState<number>(1);
  const [customCount, setCustomCount] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [ageRange, setAgeRange] = useState<string>("");
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
  const progressPct = Math.min(
    100,
    Math.round((SPONSORED_SO_FAR / SPONSOR_GOAL) * 100),
  );

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
        !address.trim() ||
        !ageRange
      ) {
        setError(
          "Please complete your name, email, WhatsApp number, address and age range — or choose to sponsor anonymously.",
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
    if (submitted) scrollToId("confirmation");
  }, [submitted]);

  return (
    <div className="bg-iw-white text-iw-purple">
      {/* SPONSOR FORM */}
      <section
        id="sponsor-form"
        className="border-b border-iw-purple/8 bg-iw-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="sponsor-form-heading"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
              The Intentional Woman Conference — 4th Edition
            </p>
            <h1
              id="sponsor-form-heading"
              className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
            >
              Register your sponsorship
            </h1>
            <p className="font-sans mx-auto mt-4 max-w-xl text-base text-iw-purple/72 sm:text-lg">
              Fill in your details below to sponsor a woman into the 4th edition.
              Each registration is {formatFcfa(REGISTRATION_FEE_FCFA)}.
            </p>
          </div>

          {submitted ? (
            <ConfirmationPanel
              name={isAnonymous ? null : fullName}
              count={effectiveCount}
              total={totalAmount}
              method={selectedMethod}
              onReset={() => {
                setSubmitted(false);
                setTimeout(() => scrollToId("sponsor-form"), 0);
              }}
            />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 rounded-2xl border border-iw-purple/10 bg-iw-mist/40 p-6 shadow-sm sm:p-8"
              noValidate
            >
              {/* Sponsor info */}
              <div>
                <h2 className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
                  Your details
                </h2>

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
                      Your sponsorship will be recorded without your name being
                      shown publicly.
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
                    <label className="block">
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
                    <label className="block">
                      <span className={labelClass}>Age range</span>
                      <select
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        className={`${inputClass} ${ageRange ? "" : "text-iw-purple/35"}`}
                      >
                        <option value="" disabled>
                          Select your age range
                        </option>
                        {AGE_RANGES.map((range) => (
                          <option
                            key={range}
                            value={range}
                            className="text-iw-purple"
                          >
                            {range}
                          </option>
                        ))}
                      </select>
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

              {/* Number of women + total */}
              <div className="mt-8 border-t border-iw-purple/10 pt-7">
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
                      <label className={labelClass} htmlFor="custom-count">
                        Enter a custom number
                      </label>
                      <input
                        id="custom-count"
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
              </div>

              {/* Optional category */}
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

              {/* Payment method */}
              <div className="mt-8 border-t border-iw-purple/10 pt-7">
                <h3 className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
                  Choose a payment method
                </h3>
                <p className="font-sans mt-2 text-sm text-iw-purple/70">
                  Select which provider you&apos;d like to pay with. You&apos;ll
                  complete the payment securely on the next step.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {PAYMENT_METHODS.map((m) => {
                    const active = paymentMethodId === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethodId(m.id)}
                        aria-pressed={active}
                        className={`flex items-start gap-3 rounded-xl border p-5 text-left transition-colors ${
                          active
                            ? "border-iw-gold bg-iw-gold/10 ring-1 ring-iw-gold"
                            : "border-iw-purple/15 bg-iw-white hover:border-iw-gold/45"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            active
                              ? "border-iw-gold bg-iw-gold"
                              : "border-iw-purple/25 bg-transparent"
                          }`}
                        >
                          {active ? (
                            <span className="size-2 rounded-full bg-iw-purple" />
                          ) : null}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-display text-lg font-semibold text-iw-purple">
                            {m.label}
                          </span>
                          <span className="font-sans mt-1 text-xs text-iw-purple/60">
                            {m.blurb}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

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
          )}
        </div>
      </section>

      {/* HERO */}
      <section
        className="relative overflow-hidden border-b border-iw-purple/8 bg-iw-purple bg-iw-geometric-triangle px-5 py-20 text-iw-white sm:px-8 sm:py-24 lg:px-10"
        aria-labelledby="conf-hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            The Intentional Woman Conference — 4th Edition
          </p>
          <h2
            id="conf-hero-heading"
            className="font-display text-balance text-4xl font-semibold tracking-tight text-iw-white sm:text-5xl lg:text-6xl"
          >
            Fund Access.{" "}
            <span className="text-iw-gold">Scale impact.</span>
          </h2>
          <p className="font-sans mx-auto mt-6 max-w-2xl text-base leading-relaxed text-iw-white/85 sm:mt-8 sm:text-lg">
            Support Access helps fund women into transformational spaces that
            build leadership, growth, and economic empowerment. Every{" "}
            <span className="font-semibold text-iw-gold">
              {formatFcfa(REGISTRATION_FEE_FCFA)}
            </span>{" "}
            sponsors one woman to attend the 4th edition.
          </p>

          {/* Event details */}
          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4">
            {[
              { label: "Date", value: EVENT_DATE_LABEL },
              { label: "Time", value: EVENT_TIME_LABEL },
              { label: "Location", value: EVENT_LOCATION_LABEL },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-iw-gold/25 bg-iw-purple/40 px-4 py-3 backdrop-blur-sm"
              >
                <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-iw-gold">
                  {row.label}
                </dt>
                <dd className="font-sans mt-1 text-sm text-iw-white sm:text-base">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Countdown */}
          <div className="mx-auto mt-8 max-w-md sm:max-w-lg">
            <p className="font-accent mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-iw-gold">
              Doors open in
            </p>
            <CountdownTimer
              targetIso={EVENT_DATE_ISO}
              variant="large"
              tone="dark"
            />
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToId("sponsor-form")}
              className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
            >
              Sponsor Access Today
            </button>
            <button
              type="button"
              onClick={() => scrollToId("impact")}
              className="font-accent min-h-12 w-full rounded-sm border-2 border-iw-white/40 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-white/95 transition-colors hover:border-iw-gold hover:text-iw-gold sm:w-auto sm:min-h-14 sm:px-10"
            >
              See the impact
            </button>
          </div>
        </div>
      </section>

      {/* IMPACT / PROGRESS */}
      <section
        id="impact"
        className="border-b border-iw-purple/8 bg-iw-mist/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="impact-heading"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
              Together we are
            </p>
            <h2
              id="impact-heading"
              className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
            >
              Opening the door for {SPONSOR_GOAL} women
            </h2>
            <p className="font-sans mx-auto mt-5 max-w-xl text-base leading-relaxed text-iw-purple/78 sm:text-lg">
              When a woman is equipped, the impact extends beyond the
              individual to families, communities, and entire economies.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-iw-purple/10 bg-iw-white p-6 shadow-sm sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-accent text-[11px] font-bold uppercase tracking-[0.2em] text-iw-purple/55">
                  Women sponsored so far
                </p>
                <p className="font-display mt-1 text-4xl font-semibold text-iw-purple sm:text-5xl">
                  {SPONSORED_SO_FAR}
                  <span className="font-sans ml-2 text-base font-normal text-iw-purple/55 sm:text-lg">
                    of {SPONSOR_GOAL}
                  </span>
                </p>
              </div>
              <p className="font-accent text-sm font-bold uppercase tracking-[0.18em] text-iw-gold">
                {progressPct}%
              </p>
            </div>
            <div
              className="mt-5 h-3 w-full overflow-hidden rounded-full bg-iw-purple/8"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Sponsorship progress"
            >
              <motion.div
                className="h-full rounded-full bg-iw-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={
                  instant ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
                }
              />
            </div>
            <p className="font-sans mt-4 text-xs text-iw-purple/55">
              Updated as sponsorships come in. Be the first to sponsor a
              woman.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section
        className="border-b border-iw-purple/8 bg-iw-purple px-5 py-16 text-iw-white sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="testimonial-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
            From a past attendee
          </p>
          <h2 id="testimonial-heading" className="sr-only">
            Attendee testimonial
          </h2>
          <blockquote className="font-display text-2xl font-semibold leading-snug text-iw-white sm:text-3xl md:text-4xl">
            &ldquo;Walking into that room changed the trajectory of my life. I
            came in unsure, and I left clear, equipped, and ready to lead.&rdquo;
          </blockquote>
          <p className="font-accent mt-6 text-xs font-bold uppercase tracking-[0.25em] text-iw-white/80">
            — Past Conference Attendee
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="bg-iw-mist/60 px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="final-cta-heading"
      >
        <div className="mx-auto max-w-2xl">
          <h2
            id="final-cta-heading"
            className="font-display text-balance text-3xl font-semibold text-iw-purple sm:text-4xl"
          >
            One sponsorship. One woman. One open door.
          </h2>
          <p className="font-sans mt-4 text-base text-iw-purple/75 sm:text-lg">
            Be part of the 4th edition of The Intentional Woman Conference by
            sending a woman who otherwise couldn&apos;t attend.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("sponsor-form")}
            className="font-accent mt-8 inline-flex min-h-14 items-center justify-center rounded-sm bg-iw-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-iw-purple no-underline transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:min-h-[3.75rem] sm:px-14"
          >
            Sponsor Access Today
          </button>
        </div>
      </section>
    </div>
  );
}

function ConfirmationPanel({
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
      id="confirmation"
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
