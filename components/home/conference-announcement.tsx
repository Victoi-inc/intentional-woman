"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  EVENT_DATE_ISO,
  EVENT_DATE_LABEL,
  EVENT_LOCATION_LABEL,
  EVENT_TIME_LABEL,
} from "@/components/conference-4/conference-4-meta";
import { CountdownTimer } from "@/components/conference-4/countdown-timer";

export function ConferenceAnnouncement() {
  return (
    <section
      id="conference-4"
      className="relative scroll-mt-20 overflow-hidden border-y border-iw-gold/20 bg-iw-purple bg-iw-geometric-triangle px-5 py-16 text-iw-white sm:px-8 sm:py-20 md:px-10 md:py-12 lg:px-16 lg:py-10"
      aria-labelledby="conference-4-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl text-center md:text-left"
      >
        <div className="flex justify-center md:justify-start">
          <span className="font-accent inline-flex items-center gap-2 rounded-full border border-iw-gold/60 bg-iw-purple/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-iw-gold sm:text-xs">
            <span
              className="size-1.5 animate-pulse rounded-full bg-iw-gold"
              aria-hidden
            />
            Save the date
          </span>
        </div>

        {/*
          Mobile: source-order stack — H2, details, countdown, description, CTAs.
          md+ (≥768px): explicit 2-col placement keeps text on the left, time-info on the right.
        */}
        <div className="mt-5 grid gap-7 md:grid-cols-2 md:gap-x-10 md:gap-y-5 lg:gap-x-14">
          {/* H2 — mobile: 1st, md+: col 1 / row 1 */}
          <h2
            id="conference-4-heading"
            className="font-display mx-auto max-w-3xl text-balance text-3xl font-semibold leading-tight text-iw-white sm:text-4xl md:col-start-1 md:row-start-1 md:mx-0 md:max-w-none md:text-[2rem] md:leading-[1.1] lg:text-[2.4rem]"
          >
            The 4th Intentional Woman Conference{" "}
            <span className="text-iw-gold">is coming.</span>
          </h2>

          {/* Details — mobile: 2nd, md+: col 2 / row 1 */}
          <dl className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-3 md:col-start-2 md:row-start-1 md:mx-0 md:max-w-none md:grid-cols-3">
            {[
              { label: "Date", value: EVENT_DATE_LABEL },
              { label: "Time", value: EVENT_TIME_LABEL },
              { label: "Location", value: EVENT_LOCATION_LABEL },
            ].map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-iw-gold/25 bg-iw-purple/40 px-3 py-2.5 backdrop-blur-sm"
              >
                <dt className="font-accent text-[10px] font-bold uppercase tracking-[0.2em] text-iw-gold">
                  {row.label}
                </dt>
                <dd className="font-sans mt-1 text-sm text-iw-white">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Countdown — mobile: 3rd, md+: col 2 / row 2 */}
          <div className="mx-auto w-full max-w-xl md:col-start-2 md:row-start-2 md:mx-0 md:max-w-none">
            <p className="font-accent mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-iw-gold">
              Doors open in
            </p>
            <CountdownTimer
              targetIso={EVENT_DATE_ISO}
              variant="large"
              tone="dark"
            />
          </div>

          {/* Description — mobile: 4th, md+: col 1 / row 2 */}
          <p className="font-sans mx-auto max-w-2xl text-base leading-relaxed text-iw-white/85 sm:text-lg md:col-start-1 md:row-start-2 md:mx-0 md:max-w-none md:text-sm md:leading-relaxed lg:text-base">
            A full edition built to equip women with leadership, growth, and
            economic empowerment. Open the door for a woman who otherwise
            couldn&apos;t attend — every{" "}
            <span className="font-semibold text-iw-gold">25,000 FCFA</span>{" "}
            sponsors one woman.
          </p>

          {/* CTAs — mobile: 5th (bottom), md+: col 1 / row 3 */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4 md:col-start-1 md:row-start-3 md:justify-start">
            <a
              href="https://iwoman.kwiknkap.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-iw-gold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple no-underline transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:min-h-14 sm:w-auto sm:px-10 md:min-h-12 md:px-7 md:py-3"
            >
              Register for the conference
            </a>
            <Link
              href="/conference-4#impact"
              className="font-accent inline-flex min-h-12 w-full items-center justify-center rounded-sm border-2 border-iw-white/40 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-white/95 no-underline transition-colors hover:border-iw-gold hover:text-iw-gold sm:min-h-14 sm:w-auto sm:px-10 md:min-h-12 md:px-7 md:py-3"
            >
              Learn more
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
