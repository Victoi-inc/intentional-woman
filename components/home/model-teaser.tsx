"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MODEL_JOURNEY_STEPS } from "@/components/model/model-copy";

const STEP_ICONS = [
  (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 20c0-3.5 3-6 6-6s6 2.5 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19h16M7 15l3-4 3 3 4-6 3 3"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M17 8v4h-4"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 20V11h3v9M11.5 20V7h3v13M18 20V14h3v6"
      />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M8 10h8M8 14h5"
      />
      <circle cx="9" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 20c.5-2.5 2.5-4 4-4m6 0c1.5 0 3.5 1.5 4 4"
      />
    </svg>
  ),
] as const;

export function ModelTeaser() {
  return (
    <section
      id="model"
      className="scroll-mt-20 bg-iw-mist px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      aria-labelledby="model-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
          The journey
        </p>
        <h2
          id="model-heading"
          className="font-display mb-4 max-w-2xl text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
        >
          Identity, growth, leadership
        </h2>
        <p className="font-sans mb-14 max-w-2xl text-lg leading-relaxed text-iw-purple/80">
          Three through-lines we walk with you—so who you are, how you expand, and
          how you lead stay connected, not competing.
        </p>

        <ul className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {MODEL_JOURNEY_STEPS.map((step, i) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 1, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-2xl border border-iw-purple/10 bg-iw-white/80 p-8 shadow-sm ring-1 ring-iw-purple/5"
            >
              <div className="mb-5 text-iw-gold">{STEP_ICONS[i]}</div>
              <h3 className="font-accent mb-3 text-sm font-bold uppercase tracking-[0.2em] text-iw-purple">
                {step.label}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-iw-purple/80 sm:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center sm:justify-start">
          <Link
            href="/model"
            className="font-accent inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-iw-purple/15 bg-iw-white px-8 text-sm font-bold uppercase tracking-widest text-iw-purple no-underline transition-[border-color,background-color,color] duration-200 hover:border-iw-gold/70 hover:bg-iw-gold/10"
          >
            Explore the blueprint
          </Link>
        </div>
      </div>
    </section>
  );
}
