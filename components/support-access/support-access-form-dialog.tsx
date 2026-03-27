"use client";

import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FormEvent,
} from "react";
import {
  COHORT_AMOUNT_TIERS,
  CONTRIBUTION_LABELS,
  SPONSOR_AMOUNT_TIERS,
  STRATEGIC_BUDGET_RANGES,
  type SupportContributionKind,
} from "./support-access-data";

const inputClass =
  "w-full rounded-lg border border-iw-purple/15 bg-iw-mist/40 px-4 py-3 font-sans text-iw-purple placeholder:text-iw-purple/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold";

const labelClass =
  "font-blueprint mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-iw-purple/55";

type SupportAccessFormDialogProps = {
  open: boolean;
  onClose: () => void;
  contributionKind: SupportContributionKind;
  initialAmountUsd: number | null;
};

export function SupportAccessFormDialog({
  open,
  onClose,
  contributionKind,
  initialAmountUsd,
}: SupportAccessFormDialogProps) {
  const titleId = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [amountMode, setAmountMode] = useState<"preset" | "custom">("preset");
  const [presetAmount, setPresetAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [orgType, setOrgType] = useState("");
  const [csrFocus, setCsrFocus] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [programType, setProgramType] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = useCallback(() => {
    setName("");
    setEmail("");
    setCountry("");
    setMessage("");
    setAmountMode("preset");
    setPresetAmount(null);
    setCustomAmount("");
    setOrgType("");
    setCsrFocus("");
    setBudgetRange("");
    setProgramType("");
    setError(null);
    setSuccess(false);
  }, []);

  useEffect(() => {
    if (!open) {
      reset();
      return;
    }
    setError(null);
    setSuccess(false);
    if (initialAmountUsd != null) {
      setPresetAmount(initialAmountUsd);
      setAmountMode("preset");
      setCustomAmount("");
    } else if (contributionKind === "custom-amount") {
      setAmountMode("custom");
      setPresetAmount(null);
    } else {
      setPresetAmount(null);
      setAmountMode("preset");
    }
  }, [open, contributionKind, initialAmountUsd, reset]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const isStrategic = contributionKind === "strategic-partner";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !country.trim()) {
      setError("Please complete name or organization, email, and country.");
      return;
    }
    if (isStrategic) {
      if (!orgType.trim() || !budgetRange.trim()) {
        setError("Please add organization type and estimated budget range.");
        return;
      }
    } else {
      let amountNum: number | null = null;
      if (amountMode === "custom") {
        const n = Number.parseFloat(customAmount.replace(/,/g, ""));
        if (Number.isNaN(n) || n <= 0) {
          setError("Enter a valid contribution amount.");
          return;
        }
        amountNum = n;
      } else if (presetAmount != null) {
        amountNum = presetAmount;
      } else {
        setError("Select a tier amount or choose a custom amount.");
        return;
      }
      console.log("[SupportAccess] Form submitted:", {
        contributionKind,
        name: name.trim(),
        email: email.trim(),
        country: country.trim(),
        message: message.trim() || undefined,
        amountUsd: amountNum,
      });
      setSuccess(true);
      return;
    }
    console.log("[SupportAccess] Strategic partner inquiry:", {
      contributionKind,
      name: name.trim(),
      email: email.trim(),
      country: country.trim(),
      message: message.trim() || undefined,
      orgType: orgType.trim(),
      csrFocus: csrFocus.trim() || undefined,
      budgetRange,
      programType: programType.trim() || undefined,
    });
    setSuccess(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-iw-purple/60 backdrop-blur-[3px]"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92dvh,780px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-iw-gold/35 bg-iw-white shadow-[0_28px_72px_-16px_rgba(75,36,106,0.35)] ring-1 ring-iw-purple/10"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b-4 border-iw-gold bg-iw-mist/40 px-5 py-4 sm:px-7">
          <div className="min-w-0 pr-2">
            <h2
              id={titleId}
              className="font-display text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl"
            >
              Support Access
            </h2>
            <p className="font-sans mt-1 text-sm text-iw-purple/65">
              Tell us how you&apos;d like to contribute. We&apos;ll follow up with next
              steps.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-iw-purple/45 transition-colors hover:bg-iw-purple/8 hover:text-iw-purple"
            aria-label="Close"
          >
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-8">
          {success ? (
            <div className="rounded-xl border border-iw-gold/35 bg-iw-mist/50 p-6 text-center ring-1 ring-iw-purple/6">
              <p className="font-display text-xl font-semibold text-iw-purple">
                Thank you
              </p>
              <p className="font-sans mt-3 text-sm text-iw-purple/75">
                Your details were recorded. Our team will contact you shortly to
                confirm alignment and payment instructions.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="font-accent mt-8 w-full rounded-sm bg-iw-gold py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:w-auto sm:px-10"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <label className="block">
                <span className={labelClass}>Full name / organization name</span>
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Email address</span>
                <input
                  type="email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </label>
              <div>
                <span className={labelClass}>Contribution type</span>
                <p className="rounded-lg border border-iw-purple/12 bg-iw-purple/[0.04] px-4 py-3 font-sans text-sm font-medium text-iw-purple">
                  {CONTRIBUTION_LABELS[contributionKind]}
                </p>
              </div>

              {!isStrategic ? (
                <fieldset className="space-y-3">
                  <legend className={labelClass}>Contribution amount (USD)</legend>
                  <div className="flex flex-wrap gap-2">
                    {contributionKind === "sponsor-woman" ||
                    contributionKind === "custom-amount"
                      ? SPONSOR_AMOUNT_TIERS.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => {
                              setAmountMode("preset");
                              setPresetAmount(n);
                              setCustomAmount("");
                            }}
                            className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                              amountMode === "preset" && presetAmount === n
                                ? "border-iw-gold bg-iw-gold/25 text-iw-purple"
                                : "border-iw-purple/15 bg-iw-white text-iw-purple hover:border-iw-gold/50"
                            }`}
                          >
                            ${n}
                          </button>
                        ))
                      : null}
                    {contributionKind === "fund-cohort"
                      ? COHORT_AMOUNT_TIERS.map(({ label, amount }) => (
                          <button
                            key={amount}
                            type="button"
                            onClick={() => {
                              setAmountMode("preset");
                              setPresetAmount(amount);
                              setCustomAmount("");
                            }}
                            className={`rounded-full border px-3 py-2 text-left font-sans text-xs font-medium transition-colors sm:text-sm ${
                              amountMode === "preset" && presetAmount === amount
                                ? "border-iw-gold bg-iw-gold/25 text-iw-purple"
                                : "border-iw-purple/15 bg-iw-white text-iw-purple hover:border-iw-gold/50"
                            }`}
                          >
                            {label}: ${amount}
                          </button>
                        ))
                      : null}
                    <button
                      type="button"
                      onClick={() => {
                        setAmountMode("custom");
                        setPresetAmount(null);
                      }}
                      className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                        amountMode === "custom"
                          ? "border-iw-gold bg-iw-gold/25 text-iw-purple"
                          : "border-iw-purple/15 bg-iw-white text-iw-purple hover:border-iw-gold/50"
                      }`}
                    >
                      Other amount
                    </button>
                  </div>
                  {amountMode === "custom" ? (
                    <label className="block pt-1">
                      <span className="sr-only">Custom amount</span>
                      <input
                        className={inputClass}
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Enter amount (USD)"
                        inputMode="decimal"
                      />
                    </label>
                  ) : null}
                </fieldset>
              ) : (
                <div className="space-y-4 rounded-xl border border-iw-purple/10 bg-iw-mist/30 p-4">
                  <label className="block">
                    <span className={labelClass}>Organization type</span>
                    <input
                      className={inputClass}
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      placeholder="e.g. corporation, NGO, public sector"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>CSR / impact focus</span>
                    <input
                      className={inputClass}
                      value={csrFocus}
                      onChange={(e) => setCsrFocus(e.target.value)}
                      placeholder="Optional"
                    />
                  </label>
                  <label className="block">
                    <span className={labelClass}>Estimated budget range</span>
                    <select
                      className={inputClass}
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                    >
                      <option value="">Select range</option>
                      {STRATEGIC_BUDGET_RANGES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className={labelClass}>Preferred program type</span>
                    <input
                      className={inputClass}
                      value={programType}
                      onChange={(e) => setProgramType(e.target.value)}
                      placeholder="Optional"
                    />
                  </label>
                </div>
              )}

              <label className="block">
                <span className={labelClass}>Country</span>
                <input
                  className={inputClass}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  autoComplete="country-name"
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Message (optional)</span>
                <textarea
                  className={`${inputClass} min-h-[100px] resize-y`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </label>

              {error ? (
                <p className="font-sans text-sm text-red-700/90" role="alert">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="font-accent order-2 rounded-sm border-2 border-iw-purple/18 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/35 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="font-accent order-1 rounded-sm bg-iw-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:order-2"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
