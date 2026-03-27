"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";
import { MODEL_HERO, MODEL_JOURNEY_STEPS } from "./model-copy";
import { ModelNarrativeSections } from "./model-narrative-sections";

export function BlueprintJourney() {
  const reduceMotion = useReducedMotion();
  const rm = reduceMotion === true;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-iw-purple bg-iw-geometric-triangle opacity-[0.05]"
        aria-hidden
      />
      <div className="relative z-10" aria-label="Our Model">
        <header className="relative overflow-hidden bg-iw-purple px-5 pb-14 pt-14 text-iw-white sm:px-8 sm:pb-16 sm:pt-20 lg:pb-20">
          <div
            className="pointer-events-none absolute inset-0 bg-iw-purple bg-iw-geometric-triangle opacity-[0.05]"
            aria-hidden
          />
          <div className="relative z-[1]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-accent mb-2 text-xs font-bold uppercase tracking-[0.35em] text-iw-white/80">
                {MODEL_HERO.kicker}
              </p>
              <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.28em] text-iw-gold sm:text-sm sm:tracking-[0.32em]">
                {MODEL_HERO.subkicker}
              </p>
              <h1 className="font-display mx-auto mb-6 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {MODEL_HERO.title}
              </h1>
              <p className="font-sans mx-auto max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
                {MODEL_HERO.lead}
              </p>
              <p className="font-sans mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/92 sm:text-lg">
                {MODEL_HERO.programsLead}
              </p>
            </div>

            <div
              className="mx-auto mt-12 w-full max-w-7xl"
              role="list"
              aria-label="Model journey stages"
            >
              <div className="flex flex-col gap-2 xl:flex-row xl:items-stretch xl:gap-3">
                {MODEL_JOURNEY_STEPS.map((step, i) => (
                  <Fragment key={step.id}>
                    <motion.article
                      role="listitem"
                      className="flex min-h-0 w-full min-w-0 flex-1 flex-col rounded-2xl border border-white/25 bg-white/[0.12] px-6 py-7 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-8 sm:py-8 lg:px-9 lg:py-9"
                      initial={rm ? false : { opacity: 0, y: 16 }}
                      animate={rm ? undefined : { opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.06 * i,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <p className="font-accent text-xs font-bold uppercase tracking-[0.28em] text-iw-gold sm:text-sm sm:tracking-[0.22em]">
                        {step.label}
                      </p>
                      <p className="mt-4 font-sans text-base leading-relaxed text-white/90 sm:text-lg">
                        {step.description}
                      </p>
                    </motion.article>
                    {i < MODEL_JOURNEY_STEPS.length - 1 && (
                      <>
                        <div
                          className="flex justify-center py-3 xl:hidden"
                          aria-hidden
                        >
                          <span className="font-display text-2xl leading-none text-iw-gold">
                            ↓
                          </span>
                        </div>
                        <div
                          className="hidden shrink-0 items-center justify-center self-center px-1 xl:flex"
                          aria-hidden
                        >
                          <span className="font-display text-2xl text-iw-gold lg:text-3xl">
                            →
                          </span>
                        </div>
                      </>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            <p className="font-display mx-auto mt-12 max-w-3xl text-center text-lg font-medium leading-snug text-white/92 sm:mt-14 sm:text-xl">
              {MODEL_HERO.journeyClosing}
            </p>
          </div>
        </header>

        <ModelNarrativeSections />

        <footer className="relative bg-iw-mist px-5 pb-20 pt-6 text-center sm:px-8">
          <div
            className="pointer-events-none absolute inset-0 bg-iw-purple bg-iw-geometric-triangle opacity-[0.05]"
            aria-hidden
          />
          <div className="relative z-[1]">
            <Link
              href="/"
              className="font-accent text-sm font-semibold uppercase tracking-widest text-iw-purple underline decoration-iw-gold/50 underline-offset-4"
            >
              ← Back to home
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
