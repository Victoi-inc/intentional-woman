"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import {
  type ProgrammeTrackId,
  PROGRAMME_TRACKS,
  getTrackById,
} from "@/lib/programmes/registration-config";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop";

const SLIDE = {
  enter: (dir: number) => ({
    x: dir >= 0 ? 36 : -36,
    opacity: 0,
    filter: "blur(4px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({
    x: dir >= 0 ? -28 : 28,
    opacity: 0,
    filter: "blur(3px)",
  }),
};

type Step = 1 | 2 | 3;

export function ProgrammeRegistrationFlow({
  prefillTrack,
}: {
  /** When user opens registration from a section CTA */
  prefillTrack: ProgrammeTrackId | null;
}) {
  const reduceMotion = useReducedMotion();
  const instant = reduceMotion === true;
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(1);
  const [track, setTrack] = useState<ProgrammeTrackId | null>(null);
  const [selectedOfferingIds, setSelectedOfferingIds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const go = useCallback((next: Step, dir: number) => {
    setDirection(dir);
    setStep(next);
  }, []);

  useEffect(() => {
    if (prefillTrack) {
      setTrack(prefillTrack);
      setSelectedOfferingIds([]);
      setStep(2);
      setStatus("idle");
    }
  }, [prefillTrack]);

  const toggleOffering = (id: string) => {
    setSelectedOfferingIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const offeringsForTrack = track ? getTrackById(track).offerings : [];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!track || selectedOfferingIds.length === 0) return;
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
    }, 650);
  };

  const resetWizard = () => {
    setSelectedOfferingIds([]);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setStatus("idle");
    if (prefillTrack) {
      setTrack(prefillTrack);
      setStep(2);
    } else {
      setTrack(null);
      setStep(1);
    }
  };

  return (
    <section
      id="programme-registration"
      className="relative min-h-dvh overflow-x-clip bg-iw-purple text-white"
      aria-labelledby="registration-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover opacity-[0.22] grayscale contrast-110"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-iw-purple/88 mix-blend-multiply"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(253,195,0,0.06)_0%,transparent_40%,transparent_60%,rgba(253,195,0,0.05)_100%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(105deg,rgba(253,195,0,0.04)_0_1px,transparent_1px_48px)] opacity-[0.35] mix-blend-overlay"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16 lg:max-w-3xl">
        <header className="mb-10 text-center sm:mb-12">
          <p className="font-blueprint mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-iw-gold/90">
            Programmes
          </p>
          <h2
            id="registration-heading"
            className="font-display text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]"
          >
            Register for a program
          </h2>
          <p className="font-sans mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Choose your track, select what you want to explore, then leave your
            details—we will follow up with next steps.
          </p>
        </header>

        {status === "success" ? (
          <motion.div
            initial={instant ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center backdrop-blur-sm"
          >
            <p className="font-display mb-3 text-2xl text-iw-gold">
              Registration received
            </p>
            <p className="font-sans text-white/80">
              Thank you. Our programmes team will be in touch shortly.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={resetWizard}
                className="font-accent rounded-sm border-2 border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:border-iw-gold hover:text-iw-gold"
              >
                Register again
              </button>
              <Link
                href="/"
                className="font-accent inline-flex items-center justify-center rounded-sm bg-iw-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-iw-purple no-underline transition-[filter] hover:brightness-105"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col">
            <p className="font-blueprint mb-6 text-center text-sm tabular-nums tracking-[0.2em] text-iw-gold/85">
              {String(step).padStart(2, "0")} / 03
            </p>

            <div className="relative w-full">
              <AnimatePresence mode="wait" custom={direction}>
                {step === 1 ? (
                  <motion.div
                    key="s1"
                    role="group"
                    aria-labelledby="reg-q1"
                    custom={direction}
                    variants={SLIDE}
                    initial={instant ? false : "enter"}
                    animate="center"
                    exit={instant ? undefined : "exit"}
                    transition={{
                      duration: instant ? 0 : 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-full"
                  >
                    <h3
                      id="reg-q1"
                      className="font-display mb-2 text-xl font-semibold text-white sm:text-2xl"
                    >
                      Which programme area fits you best?
                    </h3>
                    <p className="font-sans mb-8 text-sm text-white/65">
                      Select one. You can choose specific offerings in the next
                      step.
                    </p>
                    <ul className="flex flex-col gap-3">
                      {PROGRAMME_TRACKS.map((t) => (
                        <li key={t.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setTrack(t.id);
                              setSelectedOfferingIds([]);
                              go(2, 1);
                            }}
                            className="w-full rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-left transition-[border-color,background-color] hover:border-iw-gold hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold"
                          >
                            <span className="font-accent block text-sm font-bold uppercase tracking-[0.12em] text-iw-gold/90">
                              {t.title}
                            </span>
                            <span className="font-sans mt-1 block text-sm text-white/80">
                              {t.listingSummary}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}

                {step === 2 && track ? (
                  <motion.div
                    key="s2"
                    role="group"
                    aria-labelledby="reg-q2"
                    custom={direction}
                    variants={SLIDE}
                    initial={instant ? false : "enter"}
                    animate="center"
                    exit={instant ? undefined : "exit"}
                    transition={{
                      duration: instant ? 0 : 0.38,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-full"
                  >
                    <button
                      type="button"
                      onClick={() => go(1, -1)}
                      className="font-blueprint mb-6 text-left text-xs uppercase tracking-widest text-iw-gold/80 hover:text-iw-gold"
                    >
                      ← Back
                    </button>
                    <h3
                      id="reg-q2"
                      className="font-display mb-2 text-xl font-semibold text-white sm:text-2xl"
                    >
                      What would you like to register for?
                    </h3>
                    <p className="font-sans mb-8 text-sm text-white/65">
                      Select all that apply for{" "}
                      <strong className="font-medium text-iw-gold">
                        {getTrackById(track).title}
                      </strong>
                      .
                    </p>
                    <ul className="flex flex-col gap-3">
                      {offeringsForTrack.map((o) => {
                        const checked = selectedOfferingIds.includes(o.id);
                        return (
                          <li key={o.id}>
                            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/20 bg-white/5 px-5 py-4 transition-[border-color,background-color] hover:border-iw-gold/60 hover:bg-white/10 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-iw-gold">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleOffering(o.id)}
                                className="mt-1 size-4 shrink-0 rounded border-white/40 bg-white/10 text-iw-gold focus:ring-iw-gold"
                              />
                              <span className="font-sans text-base text-white/95">
                                {o.label}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                    <button
                      type="button"
                      disabled={selectedOfferingIds.length === 0}
                      onClick={() => go(3, 1)}
                      className="font-accent mt-10 w-full rounded-sm bg-iw-gold py-4 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[filter,opacity] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Continue
                    </button>
                  </motion.div>
                ) : null}

                {step === 3 && track ? (
                  <motion.form
                    key="s3"
                    onSubmit={handleSubmit}
                    custom={direction}
                    variants={SLIDE}
                    initial={instant ? false : "enter"}
                    animate="center"
                    exit={instant ? undefined : "exit"}
                    transition={{
                      duration: instant ? 0 : 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-full pb-2"
                    aria-live="polite"
                  >
                    <button
                      type="button"
                      onClick={() => go(2, -1)}
                      className="font-blueprint mb-6 text-left text-xs uppercase tracking-widest text-iw-gold/80 hover:text-iw-gold"
                    >
                      ← Back
                    </button>
                    <h3 className="font-display mb-2 text-xl font-semibold text-white sm:text-2xl">
                      Your contact details
                    </h3>
                    <p className="font-sans mb-8 text-sm text-white/65">
                      We will use this to confirm your interests and share
                      enrolment options.
                    </p>

                    <div className="flex flex-col gap-4">
                      <label className="block">
                        <span className="font-blueprint mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-white/55">
                          Name
                        </span>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold"
                          placeholder="Full name"
                          autoComplete="name"
                        />
                      </label>
                      <label className="block">
                        <span className="font-blueprint mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-white/55">
                          Email
                        </span>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold"
                          placeholder="you@email.com"
                          autoComplete="email"
                        />
                      </label>
                      <label className="block">
                        <span className="font-blueprint mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-white/55">
                          Phone
                        </span>
                        <input
                          required
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold"
                          placeholder="+237 …"
                          autoComplete="tel"
                        />
                      </label>
                      <label className="block">
                        <span className="font-blueprint mb-1.5 block text-[10px] uppercase tracking-[0.2em] text-white/55">
                          Notes{" "}
                          <span className="font-sans normal-case text-white/40">
                            (optional)
                          </span>
                        </span>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="w-full resize-y rounded-lg border border-white/20 bg-white/5 px-4 py-3 font-sans text-white placeholder:text-white/35 focus:border-iw-gold focus:outline-none focus:ring-1 focus:ring-iw-gold"
                          placeholder="Timing, questions, or context for our team"
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        status === "submitting" || selectedOfferingIds.length === 0
                      }
                      className="font-accent mt-8 w-full rounded-sm bg-iw-gold py-4 text-sm font-bold uppercase tracking-widest text-iw-purple transition-[filter,opacity] hover:brightness-105 disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? "Submitting…"
                        : "Submit registration"}
                    </button>
                  </motion.form>
                ) : null}
              </AnimatePresence>
            </div>

            <p className="font-sans pt-12 text-center text-sm text-white/45 sm:pt-16">
              <Link
                href="/"
                className="underline decoration-iw-gold/40 underline-offset-4 hover:text-white"
              >
                ← Back to home
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
