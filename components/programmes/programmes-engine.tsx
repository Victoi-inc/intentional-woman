"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  type ProgrammeTrackConfig,
  type ProgrammeTrackId,
  PROGRAMME_TRACKS,
} from "@/lib/programmes/registration-config";
import { ProgrammeReadMoreDialog } from "./programme-read-more-dialog";
import { ProgrammeRegistrationFlow } from "./programme-registration-flow";

export function ProgrammesEngine() {
  const reduceMotion = useReducedMotion();
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [prefillTrack, setPrefillTrack] = useState<ProgrammeTrackId | null>(
    null,
  );
  const [regKey, setRegKey] = useState(0);
  const [readMoreTrack, setReadMoreTrack] =
    useState<ProgrammeTrackConfig | null>(null);

  const openRegistration = useCallback((track?: ProgrammeTrackId) => {
    setPrefillTrack(track ?? null);
    setRegKey((k) => k + 1);
    setRegistrationOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .getElementById("programme-registration")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash !== "#programme-registration") return;
    openRegistration();
  }, [openRegistration]);

  return (
    <div className="min-h-dvh bg-iw-mist">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10">
        <header className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            Programmes
          </p>
          <h1 className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl md:text-5xl">
            Choose your path
          </h1>
          <p className="font-sans mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-iw-purple/78 sm:text-xl">
            Corporate partnerships, personal 1:1 development, and cohort
            group programmes—each structured for clear outcomes and practical
            implementation.
          </p>
        </header>

        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {PROGRAMME_TRACKS.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 1, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              aria-labelledby={`programme-${section.id}-heading`}
              className="rounded-2xl border border-iw-purple/10 bg-iw-white/95 p-8 shadow-md ring-1 ring-iw-purple/5 sm:p-10 lg:p-12"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div className="min-w-0 flex-1">
                  <p className="font-blueprint mb-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-iw-gold sm:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2
                    id={`programme-${section.id}-heading`}
                    className="font-display text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl lg:text-[2.15rem] lg:leading-tight"
                  >
                    {section.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => openRegistration(section.id)}
                  className="font-accent inline-flex shrink-0 items-center justify-center rounded-sm border-2 border-iw-purple/25 bg-iw-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[border-color,background-color] hover:border-iw-gold/70 hover:bg-iw-gold/10 sm:min-h-[3.25rem]"
                >
                  Register
                </button>
              </div>

              <div className="mt-5 space-y-4 sm:mt-6">
                {section.overview.map((para, pi) => (
                  <p
                    key={`${section.id}-overview-${pi}`}
                    className="font-sans text-base leading-relaxed text-iw-purple/82 sm:text-lg"
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8 sm:mt-10">
                <button
                  type="button"
                  onClick={() => setReadMoreTrack(section)}
                  className="font-accent inline-flex min-h-[3rem] items-center justify-center rounded-sm border-2 border-iw-purple bg-iw-purple px-10 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-[background-color,border-color,color] hover:border-iw-gold hover:bg-iw-gold hover:text-iw-purple"
                >
                  Read more
                </button>
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center sm:mt-20">
          <button
            type="button"
            onClick={() => openRegistration()}
            className="font-accent inline-flex min-h-[3.5rem] items-center justify-center rounded-sm bg-iw-gold px-12 py-4 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[filter,transform] hover:brightness-105 active:scale-[0.99] sm:min-h-[3.75rem] sm:px-14 sm:py-[1.125rem]"
          >
            Register for a program
          </button>
          <p className="font-sans mt-4 max-w-md text-center text-sm text-iw-purple/60">
            Opens the registration form below. Use{" "}
            <strong className="font-medium text-iw-purple/80">Register</strong>{" "}
            on a section to start with that track, or{" "}
            <strong className="font-medium text-iw-purple/80">Read more</strong>{" "}
            for the full outline first.
          </p>
        </div>

        <p className="font-sans mt-14 text-center text-sm text-iw-purple/55 sm:mt-16">
          <Link
            href="/"
            className="font-accent font-semibold uppercase tracking-widest text-iw-purple underline decoration-iw-gold/50 underline-offset-4"
          >
            ← Back to home
          </Link>
        </p>
      </div>

      <ProgrammeReadMoreDialog
        track={readMoreTrack}
        onClose={() => setReadMoreTrack(null)}
        onRegister={(trackId) => openRegistration(trackId)}
      />

      {registrationOpen ? (
        <ProgrammeRegistrationFlow
          key={regKey}
          prefillTrack={prefillTrack}
        />
      ) : null}
    </div>
  );
}
