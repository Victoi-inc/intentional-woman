/**
 * Shared form constants, styles, and helpers for the 4th Conference
 * registration and sponsorship flows.
 */

export const PAYMENT_METHODS = [
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

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const AGE_RANGES = [
  "Under 18",
  "18–24",
  "25–34",
  "35–44",
  "45–54",
  "55+",
] as const;

export const inputClass =
  "w-full rounded-lg border border-iw-purple/15 bg-iw-mist/40 px-4 py-2.5 font-sans text-iw-purple placeholder:text-iw-purple/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold";

export const labelClass =
  "font-accent mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-iw-purple/65";

/** Dark-surface variants — for forms placed directly on the purple pattern. */
export const inputClassDark =
  "w-full rounded-lg border border-iw-white/20 bg-iw-white/10 px-4 py-2.5 font-sans text-iw-white placeholder:text-iw-white/45 backdrop-blur-sm focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold";

export const labelClassDark =
  "font-accent mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-iw-white/75";

export function formatFcfa(amount: number) {
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
