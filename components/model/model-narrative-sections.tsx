"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  COMMITMENT,
  PERSPECTIVE,
  PROBLEM,
  WHAT_WE_DO,
} from "./model-copy";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 * i,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3 font-sans text-base leading-relaxed text-iw-purple/85 sm:text-lg">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2.5 size-1.5 shrink-0 rounded-full bg-iw-gold shadow-[0_0_0_3px_rgba(253,195,0,0.2)]"
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ModelNarrativeSections() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? { initial: "show" as const, whileInView: undefined }
    : { initial: "hidden" as const, whileInView: "show" as const };

  return (
    <div className="relative z-10 space-y-0 bg-iw-parchment">
      <section
        className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
        aria-labelledby="what-we-do-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-iw-purple bg-iw-geometric-triangle opacity-[0.04]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            {...motionProps}
            variants={fadeUp}
            custom={0}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="font-accent mb-2 text-xs font-bold uppercase tracking-[0.32em] text-iw-gold">
              Execution-first
            </p>
            <h2
              id="what-we-do-heading"
              className="font-display mb-6 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
            >
              {WHAT_WE_DO.title}
            </h2>
            <p className="mb-6 font-sans text-lg leading-relaxed text-iw-purple/88">
              {WHAT_WE_DO.lead}
            </p>
            <BulletList items={WHAT_WE_DO.bullets} />
            <p className="mt-8 border-l-4 border-iw-gold/80 pl-5 font-sans text-base italic leading-relaxed text-iw-purple/80 sm:text-lg">
              {WHAT_WE_DO.closing}
            </p>
          </motion.div>
          <motion.div
            {...motionProps}
            variants={fadeUp}
            custom={1}
            viewport={{ once: true, margin: "-60px" }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(75,36,106,0.35)] ring-2 ring-iw-gold/40 ring-inset">
              <Image
                src="/images/founder.jpg"
                alt="IWOMAN leadership and programme delivery"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-iw-purple/50 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="relative bg-iw-purple px-5 py-16 text-iw-white sm:px-8 sm:py-20 lg:py-24"
        aria-labelledby="problem-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-iw-geometric-triangle opacity-[0.07]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:mb-14">
            <motion.div
              {...motionProps}
              variants={fadeUp}
              custom={0}
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
            >
              <p className="font-blueprint text-4xl font-semibold tabular-nums text-iw-gold sm:text-5xl">
                50%+
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
                of Africa&apos;s population — women (World Bank).
              </p>
            </motion.div>
            <motion.div
              {...motionProps}
              variants={fadeUp}
              custom={1}
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8"
            >
              <p className="font-blueprint text-4xl font-semibold tabular-nums text-iw-gold sm:text-5xl">
                ~33%
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
                approximate share of GDP from women (McKinsey Global Institute).
              </p>
            </motion.div>
          </div>
          <motion.div
            {...motionProps}
            variants={fadeUp}
            custom={2}
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-12 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <h2
                id="problem-heading"
                className="font-display mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                {PROBLEM.title}
              </h2>
              <p className="mb-8 font-sans text-base leading-relaxed text-white/88 sm:text-lg">
                {PROBLEM.stats}
              </p>
              <p className="mb-4 font-accent text-sm font-bold uppercase tracking-widest text-iw-gold">
                {PROBLEM.lead}
              </p>
              <ul className="space-y-3 font-sans text-base leading-relaxed text-white/85 sm:text-lg">
                {PROBLEM.bullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-iw-gold"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="relative aspect-video overflow-hidden rounded-2xl ring-2 ring-iw-gold/35 ring-inset">
                <Image
                  src="/images/hero/dsc-7765.jpg"
                  alt="Women navigating economic and social systems"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <p className="mt-8 font-sans text-base leading-relaxed text-white/82 sm:text-lg">
                {PROBLEM.closing}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="relative px-5 py-16 sm:px-8 sm:py-20 lg:py-24"
        aria-labelledby="perspective-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-iw-mist bg-iw-geometric-triangle opacity-[0.5]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            {...motionProps}
            variants={fadeUp}
            custom={0}
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="font-accent mb-2 text-xs font-bold uppercase tracking-[0.32em] text-iw-purple/70">
              Infrastructure, not events
            </p>
            <h2
              id="perspective-heading"
              className="font-display mb-8 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl lg:text-5xl"
            >
              {PERSPECTIVE.title}
            </h2>
            <p className="mb-10 font-sans text-lg leading-relaxed text-iw-purple/88 sm:text-xl">
              {PERSPECTIVE.lead}
            </p>
            <div className="mx-auto mb-10 grid max-w-xl gap-4 sm:grid-cols-2">
              {PERSPECTIVE.bullets.map((b, idx) => (
                <motion.div
                  key={b}
                  {...motionProps}
                  variants={fadeUp}
                  custom={idx + 1}
                  viewport={{ once: true, margin: "-40px" }}
                  className="rounded-xl border border-iw-purple/10 bg-iw-white/90 px-5 py-4 text-left shadow-sm"
                >
                  <p className="font-accent text-sm font-bold uppercase tracking-wide text-iw-purple">
                    {b}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="font-sans text-lg leading-relaxed text-iw-purple/85 sm:text-xl">
              {PERSPECTIVE.closing}
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="relative overflow-hidden px-5 pb-24 pt-4 sm:px-8 sm:pb-28"
        aria-labelledby="commitment-heading"
      >
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            {...motionProps}
            variants={fadeUp}
            custom={0}
            viewport={{ once: true, margin: "-40px" }}
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-iw-purple via-iw-purple to-[#351852] px-8 py-12 text-center text-iw-white shadow-[0_28px_80px_-24px_rgba(75,36,106,0.55)] sm:px-12 sm:py-16"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-iw-gold/15 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-white/10 blur-3xl"
              aria-hidden
            />
            <p className="font-accent relative z-[1] mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
              Forward
            </p>
            <h2
              id="commitment-heading"
              className="font-display relative z-[1] mb-8 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {COMMITMENT.title}
            </h2>
            <div className="relative z-[1] space-y-6 font-sans text-lg leading-relaxed text-white/90 sm:text-xl">
              {COMMITMENT.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
