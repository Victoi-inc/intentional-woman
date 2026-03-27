"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import dsc7615 from "@/assets/images/DSC 7615 from iwoman.jpg";
import dsc7634 from "@/assets/images/DSC 7634 from iwoman.jpg";
import dsc7765 from "@/assets/images/DSC 7765 from iwoman.jpg";
import iw7817 from "@/assets/images/Iwoman DSC 7817.jpg";

const SLIDES: readonly { src: StaticImageData; alt: string }[] = [
  {
    src: dsc7615,
    alt: "Women together at the Intentional Woman Conference",
  },
  {
    src: dsc7634,
    alt: "Conference participants in session at Intentional Woman",
  },
  {
    src: dsc7765,
    alt: "Gathering and connection at the Intentional Woman Conference",
  },
  {
    src: iw7817,
    alt: "Intentional Woman Conference celebration and community",
  },
];

const SLIDE_MS = 6000;

export function FeaturedProgramme() {
  const reduceMotion = useReducedMotion();
  const prefersReducedMotion = reduceMotion === true;
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section
      id="programmes"
      className="scroll-mt-20 bg-iw-white px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-16"
      aria-labelledby="conference-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-iw-purple/10 lg:aspect-[5/4]"
            aria-roledescription="carousel"
            aria-label="Intentional Woman Conference photos"
          >
            {prefersReducedMotion ? (
              <Image
                src={SLIDES[index].src}
                alt={SLIDES[index].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
              />
            ) : (
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{
                    type: "tween",
                    duration: 0.55,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Image
                    src={SLIDES[index].src}
                    alt={SLIDES[index].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <div
            className="mt-4 flex justify-center gap-2"
            role="tablist"
            aria-label="Select conference photo"
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-[width,background-color] ${
                  i === index
                    ? "w-8 bg-iw-gold"
                    : "w-2 bg-iw-purple/20 hover:bg-iw-purple/35"
                }`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            Featured event
          </p>
          <h2
            id="conference-heading"
            className="font-display mb-6 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
          >
            Intentional Woman Conference
          </h2>
          <p className="font-sans mb-6 text-lg leading-relaxed text-iw-purple/80">
            The Intentional Woman Conference is our flagship convening—a high-energy
            space where women gather to be equipped, challenged, and celebrated. It
            brings together teaching, testimony, and practical tools so you leave
            with clarity for your next chapter and connections that last beyond the
            weekend.
          </p>
          <ul className="font-sans mb-10 space-y-2 text-iw-purple/75">
            <li className="flex gap-2">
              <span className="text-iw-gold" aria-hidden>
                ·
              </span>
              Keynotes and sessions built around intentional living, leadership, and
              growth
            </li>
            <li className="flex gap-2">
              <span className="text-iw-gold" aria-hidden>
                ·
              </span>
              A community of peers who are serious about purpose and impact
            </li>
            <li className="flex gap-2">
              <span className="text-iw-gold" aria-hidden>
                ·
              </span>
              Moments that anchor our wider work—from the Power Walk to programmes
              and mentorship year-round
            </li>
          </ul>
          <Link
            href="/community-impact"
            className="font-accent inline-flex min-h-11 items-center justify-center rounded-sm bg-iw-gold px-8 py-3 text-xs font-bold uppercase tracking-widest text-iw-purple transition-shadow hover:shadow-md hover:shadow-iw-gold/30"
          >
            Explore community impact
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
