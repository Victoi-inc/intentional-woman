"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";

export type SupportPaymentMethod =
  | "mobile-money"
  | "orange-money"
  | "bank-transfer"
  | "card";

const MOBILE_MONEY = {
  headline: "Mobile Money",
  recipientName: "Intentional Woman — Treasury",
  phone: "+237 6 90 12 34 56",
  note: "Use your operator’s Mobile Money menu to send to this number. Include your name in the reference if the app allows it—we match gifts to our Systemic Impact Ledger.",
} as const;

const ORANGE_MONEY = {
  headline: "Orange Money",
  recipientName: "Intentional Woman — Treasury",
  phone: "+237 6 95 98 76 54",
  note: "Open Orange Money, choose transfer to this number, and confirm the recipient name before you send. We will acknowledge your gift by email when you share your receipt with us.",
} as const;

const BANK_ACCOUNTS = [
  {
    bankName: "Afriland First Bank",
    accountNumber: "012 3456 7890 12",
    accountHolder: "Intentional Woman Association",
  },
  {
    bankName: "Ecobank Cameroon",
    accountNumber: "001 234 567 890 1234",
    accountHolder: "Intentional Woman Association",
  },
] as const;

const inputClass =
  "w-full rounded-lg border border-iw-purple/15 bg-iw-mist/40 px-4 py-3 font-sans text-iw-purple placeholder:text-iw-purple/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold";

const labelClass =
  "font-blueprint mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-iw-purple/55";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-iw-gold/25 bg-iw-white px-4 py-3 ring-1 ring-iw-purple/5">
      <p className={labelClass}>{label}</p>
      <p className="font-sans text-base font-medium text-iw-purple">{value}</p>
    </div>
  );
}

function BankBlock({
  bankName,
  accountNumber,
  accountHolder,
}: {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}) {
  return (
    <div className="rounded-xl border border-iw-gold/30 bg-iw-mist/35 p-4 ring-1 ring-iw-purple/6 sm:p-5">
      <p className="font-display text-lg font-semibold text-iw-purple">{bankName}</p>
      <dl className="mt-4 space-y-3">
        <div>
          <dt className={labelClass}>Account number</dt>
          <dd className="font-sans font-mono text-sm font-medium tracking-wide text-iw-purple sm:text-base">
            {accountNumber}
          </dd>
        </div>
        <div>
          <dt className={labelClass}>Account holder</dt>
          <dd className="font-sans text-sm text-iw-purple/88 sm:text-base">
            {accountHolder}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function CardPaymentInline({ onDismiss }: { onDismiss: () => void }) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardSuccess, setCardSuccess] = useState(false);

  const reset = useCallback(() => {
    setCardName("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setAmount("");
    setCardError(null);
    setCardSuccess(false);
  }, []);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const validateDonation = (e: FormEvent) => {
    e.preventDefault();
    setCardError(null);
    const digits = cardNumber.replace(/\s/g, "");
    if (
      !cardName.trim() ||
      digits.length < 13 ||
      !/^\d+$/.test(digits) ||
      !expiry.trim() ||
      !cvc.trim() ||
      !amount.trim()
    ) {
      setCardError(
        "Please complete all fields with valid card and amount details.",
      );
      return;
    }
    const numAmount = Number.parseFloat(amount.replace(/,/g, ""));
    if (Number.isNaN(numAmount) || numAmount <= 0) {
      setCardError("Enter a valid donation amount greater than zero.");
      return;
    }
    console.log("[SupportAccess] Card donation validated (mock):", {
      amount: numAmount,
      last4: digits.slice(-4),
      name: cardName.trim(),
    });
    setCardSuccess(true);
  };

  if (cardSuccess) {
    return (
      <div className="rounded-xl border border-iw-gold/35 bg-iw-mist/50 p-5 text-center ring-1 ring-iw-purple/6 sm:p-6">
        <p className="font-display text-lg font-semibold text-iw-purple sm:text-xl">
          Details received
        </p>
        <p className="font-sans mt-3 text-sm text-iw-purple/75">
          In production, Paystack would process this securely. Nothing was
          charged—this was a validation check only.
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="font-accent mt-6 w-full rounded-sm bg-iw-gold py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:w-auto sm:px-10"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={validateDonation} className="space-y-4">
      <p className="font-sans text-sm leading-relaxed text-iw-purple/75">
        Enter your card and contribution amount. Processing will connect to
        Paystack; for now we only validate and log a mock confirmation.
      </p>
      <label className="block">
        <span className={labelClass}>Name on card</span>
        <input
          className={inputClass}
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="As printed on card"
          autoComplete="cc-name"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Card number</span>
        <input
          className={`${inputClass} font-mono tracking-wide`}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          autoComplete="cc-number"
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className={labelClass}>Expiry</span>
          <input
            className={inputClass}
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            placeholder="MM / YY"
            autoComplete="cc-exp"
          />
        </label>
        <label className="block">
          <span className={labelClass}>CVC</span>
          <input
            className={inputClass}
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
          />
        </label>
      </div>
      <label className="block">
        <span className={labelClass}>Contribution amount</span>
        <input
          className={inputClass}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 50000 or 50,000"
          inputMode="decimal"
        />
      </label>
      {cardError ? (
        <p className="font-sans text-sm text-red-700/90" role="alert">
          {cardError}
        </p>
      ) : null}
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onDismiss}
          className="font-accent order-2 rounded-sm border-2 border-iw-purple/18 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/35 sm:order-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="font-accent order-1 rounded-sm bg-iw-gold px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:order-2"
        >
          Validate payment
        </button>
      </div>
    </form>
  );
}

export function SupportPaymentDetailPanel({
  method,
  onDismiss,
}: {
  method: SupportPaymentMethod;
  onDismiss: () => void;
}) {
  return (
    <div className="mt-4 rounded-xl border border-iw-gold/35 bg-iw-white p-4 ring-1 ring-iw-purple/8 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-iw-purple/10 pb-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-iw-purple sm:text-xl">
            {method === "mobile-money"
              ? MOBILE_MONEY.headline
              : method === "orange-money"
                ? ORANGE_MONEY.headline
                : method === "bank-transfer"
                  ? "Bank transfer"
                  : "Card payment"}
          </h3>
          <p className="font-sans mt-1 text-xs text-iw-purple/60 sm:text-sm">
            {method === "mobile-money"
              ? "Send your gift directly via Mobile Money"
              : method === "orange-money"
                ? "Send your gift via Orange Money"
                : method === "bank-transfer"
                  ? "Up to two official accounts"
                  : "Secure checkout (preview)"}
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="font-accent shrink-0 rounded-sm border border-iw-purple/18 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/35"
        >
          Close
        </button>
      </div>

      {method === "mobile-money" ? (
        <>
          <p className="font-sans text-sm leading-relaxed text-iw-purple/78">
            {MOBILE_MONEY.note}
          </p>
          <div className="mt-4 space-y-3">
            <DetailRow label="Send to (name)" value={MOBILE_MONEY.recipientName} />
            <DetailRow label="Mobile Money number" value={MOBILE_MONEY.phone} />
          </div>
          <p className="font-blueprint mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-iw-purple/45">
            Reference: Intentional Woman — Support Access
          </p>
        </>
      ) : null}

      {method === "orange-money" ? (
        <>
          <p className="font-sans text-sm leading-relaxed text-iw-purple/78">
            {ORANGE_MONEY.note}
          </p>
          <div className="mt-4 space-y-3">
            <DetailRow label="Send to (name)" value={ORANGE_MONEY.recipientName} />
            <DetailRow label="Orange Money number" value={ORANGE_MONEY.phone} />
          </div>
          <p className="font-blueprint mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-iw-purple/45">
            Reference: Intentional Woman — Support Access
          </p>
        </>
      ) : null}

      {method === "bank-transfer" ? (
        <>
          <p className="font-sans text-sm leading-relaxed text-iw-purple/78">
            Use either account below. Include &ldquo;Support Access&rdquo; and your
            name in the transfer description so we can credit the Systemic Impact
            Ledger accurately.
          </p>
          <div className="mt-4 grid gap-4">
            {BANK_ACCOUNTS.map((b) => (
              <BankBlock key={b.accountNumber} {...b} />
            ))}
          </div>
        </>
      ) : null}

      {method === "card" ? <CardPaymentInline onDismiss={onDismiss} /> : null}
    </div>
  );
}
