"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  EVENT_DATE_LABEL,
  EVENT_DATE_ISO,
  EVENT_LOCATION_LABEL,
  EVENT_TIME_LABEL,
  REGISTRATION_FEE_FCFA,
} from "./conference-4-meta";
import { CountdownTimer } from "./countdown-timer";
import { formatFcfa, scrollToId } from "./form-shared";
import { ConferenceRegistrationForm } from "./registration-form";
import { ConferenceSponsorForm } from "./sponsor-form";

const SPONSOR_GOAL = 100;
const SPONSORED_SO_FAR = 0; // Placeholder until backend wired

export function ConferenceFourSponsorPage() {
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion === true;
  const progressPct = Math.min(
    100,
    Math.round((SPONSORED_SO_FAR / SPONSOR_GOAL) * 100),
  );

  return (
    <div className="bg-iw-white text-iw-purple">
      {/* REGISTRATION — first section, carries the page title */}
      <section
        id="register"
        className="relative scroll-mt-24 overflow-hidden border-b border-iw-purple/8 bg-iw-purple bg-iw-geometric-triangle px-5 py-20 text-iw-white sm:px-8 sm:py-24 lg:px-10"
        aria-labelledby="register-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent mb-4 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            The Intentional Woman Conference — 4th Edition
          </p>
          <h1
            id="register-heading"
            className="font-display text-balance text-4xl font-semibold tracking-tight text-iw-white sm:text-5xl lg:text-6xl"
          >
            Register for the conference.
          </h1>
          <p className="font-accent mt-6 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold sm:mt-8">
            Reserve your seat
          </p>
          <p className="font-sans mx-auto mt-3 max-w-2xl text-base leading-relaxed text-iw-white/85 sm:text-lg">
            Reserve your seat at the 4th edition — a transformational space for
            leadership, growth, and economic empowerment. Registration is{" "}
            <span className="font-semibold text-iw-gold">
              {formatFcfa(REGISTRATION_FEE_FCFA)}
            </span>{" "}
            per attendee. Tell us how many people you&apos;re registering and
            we&apos;ll collect each attendee&apos;s details for their ticket.
          </p>
        </div>

        {/* Registration form — directly on the purple pattern background */}
        <div className="mx-auto max-w-3xl">
          <ConferenceRegistrationForm />
        </div>

        {/* Floating event-details + countdown — minor, bottom-right */}
        <aside
          className="fixed bottom-4 right-4 z-40 w-[min(16rem,calc(100vw-2rem))] rounded-2xl border border-iw-gold/30 bg-iw-purple/85 p-4 shadow-[0_12px_40px_rgb(0_0_0/0.45)] backdrop-blur-md"
          aria-label="Conference date and countdown"
        >
          <p className="font-accent text-[9px] font-bold uppercase tracking-[0.28em] text-iw-gold">
            Doors open in
          </p>
          <div className="mt-2">
            <CountdownTimer
              targetIso={EVENT_DATE_ISO}
              variant="compact"
              tone="dark"
            />
          </div>
          <dl className="mt-3 space-y-1 border-t border-iw-white/15 pt-3">
            <div className="flex items-baseline justify-between gap-2">
              <dt className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-iw-gold/80">
                Date
              </dt>
              <dd className="font-sans text-right text-[11px] text-iw-white/90">
                {EVENT_DATE_LABEL} · {EVENT_TIME_LABEL}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <dt className="font-accent text-[8px] font-bold uppercase tracking-[0.2em] text-iw-gold/80">
                Venue
              </dt>
              <dd className="font-sans text-right text-[11px] text-iw-white/90">
                {EVENT_LOCATION_LABEL}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {/* SPONSOR INVITATION — bridge between registering and sponsoring */}
      <section
        className="scroll-mt-24 border-b border-iw-purple/8 bg-iw-mist/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="sponsor-invite-heading"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
            Can&apos;t make it — or want to give more?
          </p>
          <h2
            id="sponsor-invite-heading"
            className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
          >
            Open the door for a woman who can&apos;t attend.
          </h2>
          <p className="font-sans mx-auto mt-5 max-w-xl text-base leading-relaxed text-iw-purple/78 sm:text-lg">
            Registering is just for you and your guests. If you&apos;d like to
            send a woman who otherwise couldn&apos;t be in the room, that&apos;s
            a separate gift — Sponsor Access lets you fund one or many seats.
          </p>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => scrollToId("sponsor-access")}
              className="font-accent inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-iw-purple px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-white transition-[filter,transform] hover:brightness-110 active:scale-[0.99] sm:w-auto sm:min-h-14 sm:px-10"
            >
              Sponsor a woman
            </button>
          </div>
        </div>
      </section>

      {/* IMPACT / PROGRESS */}
      <section
        id="impact"
        className="scroll-mt-24 border-b border-iw-purple/8 bg-iw-white px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
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

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-iw-purple/10 bg-iw-mist/40 p-6 shadow-sm sm:p-8">
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

      {/* SPONSOR ACCESS */}
      <section
        id="sponsor-access"
        className="scroll-mt-24 border-b border-iw-purple/8 bg-iw-mist/60 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
        aria-labelledby="sponsor-access-heading"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.3em] text-iw-gold">
              Sponsor Access
            </p>
            <h2
              id="sponsor-access-heading"
              className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
            >
              Fund Access.{" "}
              <span className="text-iw-gold">Scale impact.</span>
            </h2>
            <p className="font-sans mx-auto mt-4 max-w-xl text-base text-iw-purple/72 sm:text-lg">
              Support the event by sponsoring women who otherwise couldn&apos;t
              attend. Every {formatFcfa(REGISTRATION_FEE_FCFA)} sends one woman
              to the 4th edition. You can sponsor anonymously or choose exactly
              who you&apos;d like to support.
            </p>
          </div>

          <ConferenceSponsorForm />
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
            Take your seat — or open a door for another woman.
          </h2>
          <p className="font-sans mt-4 text-base text-iw-purple/75 sm:text-lg">
            Be part of the 4th edition of The Intentional Woman Conference,
            whether you&apos;re attending or sponsoring someone who is.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToId("register")}
              className="font-accent inline-flex min-h-14 w-full items-center justify-center rounded-sm bg-iw-gold px-10 py-4 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:w-auto sm:min-h-[3.75rem] sm:px-12"
            >
              Register now
            </button>
            <button
              type="button"
              onClick={() => scrollToId("sponsor-access")}
              className="font-accent inline-flex min-h-14 w-full items-center justify-center rounded-sm border-2 border-iw-purple/25 bg-transparent px-10 py-4 text-sm font-bold uppercase tracking-widest text-iw-purple transition-colors hover:border-iw-purple/45 sm:w-auto sm:min-h-[3.75rem] sm:px-12"
            >
              Sponsor a woman
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
