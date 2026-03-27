"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  BridgePaymentDialog,
  type BridgePaymentMethod,
} from "./bridge-payment-dialog";
import {
  COHORT_AMOUNT_TIERS,
  SPONSOR_AMOUNT_TIERS,
  SUPPORT_TIER_CARDS,
  WHY_SUPPORT_BULLETS,
  type SupportContributionKind,
} from "./support-access-data";
import { SupportAccessFormDialog } from "./support-access-form-dialog";

const PAYMENT_METHODS: readonly {
  id: BridgePaymentMethod;
  label: string;
  Icon: LucideIcon;
  accentClass: string;
}[] = [
  {
    id: "mobile-money",
    label: "Mobile Money",
    Icon: Smartphone,
    accentClass: "text-iw-purple",
  },
  {
    id: "orange-money",
    label: "Orange Money",
    Icon: Wallet,
    accentClass: "text-[#FF7900]",
  },
  {
    id: "bank-transfer",
    label: "Bank transfer",
    Icon: Building2,
    accentClass: "text-iw-purple/80",
  },
  {
    id: "card",
    label: "Card payment",
    Icon: CreditCard,
    accentClass: "text-iw-purple/80",
  },
] as const;

const tileContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const tileItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const tierMotion = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function BridgeSupportPage() {
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion === true;
  const tilesRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const tilesInView = useInView(tilesRef, { once: true, amount: 0.3 });
  const tiersInView = useInView(tiersRef, { once: true, amount: 0.15 });

  const [modalMethod, setModalMethod] = useState<BridgePaymentMethod | null>(
    null,
  );
  const [formOpen, setFormOpen] = useState(false);
  const [formKind, setFormKind] = useState<SupportContributionKind>(
    "sponsor-woman",
  );
  const [formInitialAmount, setFormInitialAmount] = useState<number | null>(
    null,
  );

  const openSupportForm = (
    kind: SupportContributionKind,
    amountUsd: number | null = null,
  ) => {
    setFormKind(kind);
    setFormInitialAmount(amountUsd);
    setFormOpen(true);
  };

  const openPayment = (id: BridgePaymentMethod) => {
    setModalMethod(id);
  };

  return (
    <div className="bg-iw-white text-iw-purple">
      <section
        className="border-b border-iw-purple/8 bg-iw-mist/50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="support-hero-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            Support access
          </p>
          <h1
            id="support-hero-heading"
            className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl md:text-[2.65rem] md:leading-tight"
          >
            Expanding Access. Scaling Impact.
          </h1>
          <div className="font-sans mx-auto mt-8 max-w-2xl space-y-5 text-left text-base leading-relaxed text-iw-purple/82 sm:mt-10 sm:text-lg">
            <p>
              At IWOMAN, we understand a fundamental reality: the need for
              structured mentorship, personal development, and economic
              empowerment among women is significantly greater than the number of
              women who can currently afford access to it.
            </p>
            <p>
              This is not a question of ambition or willingness—it is a question
              of access. Support Access is our structured mechanism for expanding
              participation and enabling more women to benefit from high-quality
              development programmes, regardless of immediate financial capacity.
            </p>
            <p>
              Positioned at the intersection of inclusion and performance,
              Support Access allows individuals and organizations to directly
              contribute to the development of women as economically active,
              leadership-ready contributors within society.
            </p>
          </div>
        </div>
      </section>

      <section
        className="border-b border-iw-purple/8 bg-iw-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="why-support-heading"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            id="why-support-heading"
            className="font-display text-center text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl"
          >
            Why Support Access matters
          </h2>
          <p className="font-sans mx-auto mt-5 max-w-2xl text-center text-base text-iw-purple/78 sm:text-lg">
            When access is limited, potential remains underutilized. When access
            is expanded, outcomes multiply. Supporting women&apos;s development is
            not a social gesture—it is a strategic investment in:
          </p>
          <ul className="font-sans mx-auto mt-8 max-w-xl list-disc space-y-2 pl-5 text-base text-iw-purple/85 sm:text-lg">
            {WHY_SUPPORT_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="font-sans mx-auto mt-8 text-center text-base leading-relaxed text-iw-purple/78 sm:text-lg">
            When a woman is equipped, the impact extends beyond the individual to
            families, institutions, and entire economies.
          </p>
        </div>
      </section>

      <section
        className="bg-iw-mist px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="tiers-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2
              id="tiers-heading"
              className="font-display text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl"
            >
              Support access tiers
            </h2>
            <p className="font-accent mt-2 text-xs font-bold uppercase tracking-[0.28em] text-iw-gold">
              Select your impact level
            </p>
          </div>

          <motion.div
            ref={tiersRef}
            className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-7"
            initial={instant ? false : "hidden"}
            animate={instant || tiersInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.04 },
              },
            }}
          >
            {SUPPORT_TIER_CARDS.map((tier) => (
              <motion.article
                key={tier.kind}
                variants={tierMotion}
                className="flex flex-col rounded-2xl border border-iw-gold/30 bg-iw-white/95 p-6 shadow-sm ring-1 ring-iw-gold/12 sm:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
                  {tier.title}
                </h3>
                <p className="font-accent mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-iw-purple/55">
                  {tier.tagline}
                </p>
                <p className="font-sans mt-5 text-sm leading-relaxed text-iw-purple/78 sm:text-base">
                  {tier.intro}
                </p>
                <ul className="font-sans mt-4 list-disc space-y-1.5 pl-5 text-sm text-iw-purple/80 sm:text-base">
                  {tier.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {tier.nominate ? (
                  <p className="font-sans mt-4 text-sm leading-relaxed text-iw-purple/75 sm:text-base">
                    {tier.nominate}
                  </p>
                ) : null}
                <p className="font-sans mt-4 text-sm leading-relaxed text-iw-purple/72 sm:text-base">
                  {tier.framework}
                </p>
                <p className="font-sans mt-5 text-sm font-medium text-iw-purple">
                  <span className="text-iw-gold">Ideal for:</span> {tier.ideal}
                </p>
                <div className="mt-6 border-t border-iw-purple/10 pt-6">
                  <p className="font-blueprint text-[10px] font-medium uppercase tracking-[0.2em] text-iw-purple/50">
                    {tier.accessLabel}
                  </p>
                  {tier.kind === "sponsor-woman" ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {SPONSOR_AMOUNT_TIERS.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => openSupportForm("sponsor-woman", n)}
                          className="rounded-full border border-iw-purple/14 bg-iw-mist/50 px-3 py-1.5 font-sans text-sm font-medium text-iw-purple transition-colors hover:border-iw-gold/45 hover:bg-iw-gold/10"
                        >
                          ${n}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => openSupportForm("sponsor-woman", null)}
                        className="rounded-full border border-dashed border-iw-purple/25 px-3 py-1.5 font-sans text-sm font-medium text-iw-purple/85 hover:border-iw-gold/40"
                      >
                        Other amount
                      </button>
                    </div>
                  ) : null}
                  {tier.kind === "fund-cohort" ? (
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                      {COHORT_AMOUNT_TIERS.map(({ label, amount }) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => openSupportForm("fund-cohort", amount)}
                          className="rounded-xl border border-iw-purple/14 bg-iw-mist/50 px-3 py-2 text-left font-sans text-xs font-medium leading-snug text-iw-purple transition-colors hover:border-iw-gold/45 sm:text-sm"
                        >
                          {label}: ${amount}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => openSupportForm("fund-cohort", null)}
                        className="rounded-xl border border-dashed border-iw-purple/25 px-3 py-2 text-left font-sans text-xs font-medium text-iw-purple/85 sm:text-sm"
                      >
                        Others: specify in form
                      </button>
                    </div>
                  ) : null}
                  {tier.kind === "strategic-partner" ? (
                    <p className="font-sans mt-3 text-sm text-iw-purple/78">
                      {tier.accessNote}
                    </p>
                  ) : (
                    <p className="font-sans mt-2 text-xs text-iw-purple/55">
                      {tier.accessNote}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <button
                type="button"
                onClick={() => openSupportForm("sponsor-woman", null)}
                className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
              >
                Sponsor a Woman
              </button>
              <button
                type="button"
                onClick={() => openSupportForm("fund-cohort", null)}
                className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
              >
                Fund a Cohort
              </button>
              <button
                type="button"
                onClick={() => openSupportForm("strategic-partner", null)}
                className="font-accent min-h-12 w-full rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
              >
                Become a Strategic Partner
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => openSupportForm("custom-amount", null)}
                className="font-accent min-h-11 w-full rounded-sm border-2 border-iw-purple/22 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/40 sm:w-auto"
              >
                Contribute a custom amount
              </button>
            </div>
          </div>

          <p className="font-sans mx-auto mt-12 max-w-3xl border-t border-iw-purple/10 pt-8 text-center text-xs leading-relaxed text-iw-purple/60 sm:text-sm">
            Contributions made through Support Access are used to fund
            participation in IWOMAN programmes and services. These contributions
            are not classified as charitable donations and are not tax-deductible
            unless explicitly stated.
          </p>
        </div>
      </section>

      <section
        className="border-t border-iw-purple/8 bg-iw-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="payment-heading"
      >
        <div className="mx-auto max-w-4xl">
          <h2
            id="payment-heading"
            className="font-display text-center text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl"
          >
            Ways to send your contribution
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-2xl text-center text-base text-iw-purple/72">
            After you submit the Support Access form, use one of these channels
            to complete payment—or open a method now to view transfer details and
            reference information.
          </p>

          <motion.div
            ref={tilesRef}
            className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            variants={tileContainer}
            initial={instant ? false : "hidden"}
            animate={instant || tilesInView ? "visible" : "hidden"}
          >
            {PAYMENT_METHODS.map(({ id, label, Icon, accentClass }) => (
              <motion.div key={id} variants={tileItem}>
                <button
                  type="button"
                  onClick={() => openPayment(id)}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl border border-iw-purple/12 bg-iw-mist/40 px-4 py-8 text-center shadow-[inset_0_2px_6px_rgb(75_36_106/0.07),0_1px_2px_rgb(0_0_0/0.04)] transition-[transform,box-shadow,border-color] hover:border-iw-gold/40 active:translate-y-px sm:py-10"
                >
                  <span
                    className={`flex size-14 items-center justify-center rounded-xl bg-iw-white shadow-sm ring-1 ring-iw-purple/8 ${accentClass}`}
                    aria-hidden
                  >
                    <Icon className="size-7 stroke-[1.35]" />
                  </span>
                  <span className="font-accent text-[11px] font-bold uppercase tracking-[0.14em] text-iw-purple sm:text-xs">
                    {label}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>

          <p className="font-blueprint mx-auto mt-10 max-w-2xl text-center text-[11px] leading-relaxed text-iw-purple/50 sm:text-xs">
            Include your name and contribution type in the reference where
            possible so we can match your gift to your submission.
          </p>
        </div>
      </section>

      <section
        className="bg-iw-purple px-5 py-16 text-center sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="contact-cta-heading"
      >
        <h2
          id="contact-cta-heading"
          className="font-display mx-auto max-w-2xl text-balance text-2xl font-semibold text-iw-white sm:text-3xl md:text-4xl"
        >
          Prefer to talk through partnership first?
        </h2>
        <Link
          href="/contact"
          className="font-accent mt-8 inline-flex min-h-14 items-center justify-center rounded-sm bg-iw-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-iw-purple no-underline transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:min-h-[3.75rem] sm:px-14"
        >
          Contact our team
        </Link>
      </section>

      <SupportAccessFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setFormInitialAmount(null);
        }}
        contributionKind={formKind}
        initialAmountUsd={formInitialAmount}
      />
      <BridgePaymentDialog
        method={modalMethod}
        onClose={() => setModalMethod(null)}
      />
    </div>
  );
}
