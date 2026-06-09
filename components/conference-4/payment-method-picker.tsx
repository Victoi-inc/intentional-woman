"use client";

import { PAYMENT_METHODS } from "./form-shared";

export function PaymentMethodPicker({
  value,
  onChange,
  description = "Select which provider you'd like to pay with. You'll complete the payment securely on the next step.",
  tone = "light",
}: {
  value: string;
  onChange: (id: string) => void;
  description?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`mt-8 border-t pt-7 ${dark ? "border-iw-white/15" : "border-iw-purple/10"}`}
    >
      <h3
        className={`font-display text-xl font-semibold sm:text-2xl ${dark ? "text-iw-white" : "text-iw-purple"}`}
      >
        Choose a payment method
      </h3>
      <p
        className={`font-sans mt-2 text-sm ${dark ? "text-iw-white/70" : "text-iw-purple/70"}`}
      >
        {description}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {PAYMENT_METHODS.map((m) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              aria-pressed={active}
              className={`flex items-start gap-3 rounded-xl border p-5 text-left transition-colors ${
                active
                  ? dark
                    ? "border-iw-gold bg-iw-gold ring-1 ring-iw-gold"
                    : "border-iw-gold bg-iw-gold/10 ring-1 ring-iw-gold"
                  : dark
                    ? "border-iw-white/20 bg-iw-white/5 backdrop-blur-sm hover:border-iw-gold/55"
                    : "border-iw-purple/15 bg-iw-white hover:border-iw-gold/45"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  active
                    ? "border-iw-gold bg-iw-gold"
                    : dark
                      ? "border-iw-white/35 bg-transparent"
                      : "border-iw-purple/25 bg-transparent"
                }`}
              >
                {active ? (
                  <span className="size-2 rounded-full bg-iw-purple" />
                ) : null}
              </span>
              <span className="flex flex-col">
                <span
                  className={`font-display text-lg font-semibold ${dark && !active ? "text-iw-white" : "text-iw-purple"} ${dark && active ? "text-iw-purple" : ""}`}
                >
                  {m.label}
                </span>
                <span
                  className={`font-sans mt-1 text-xs ${
                    active
                      ? "text-iw-purple/70"
                      : dark
                        ? "text-iw-white/60"
                        : "text-iw-purple/60"
                  }`}
                >
                  {m.blurb}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
