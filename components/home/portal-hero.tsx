"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EVENT_DATE_ISO } from "@/components/conference-4/conference-4-meta";
import { CountdownTimer } from "@/components/conference-4/countdown-timer";

/**
 * Hero tint: image brightness, then a single purple vertical gradient overlay
 * (darker top/bottom, lighter center for subject visibility).
 */
const HERO_IMAGE_BRIGHTNESS_PERCENT = 48;
const HERO_IMAGE_CONTRAST_PERCENT = 105;

const HERO_PURPLE_GRADIENT =
  "linear-gradient(to bottom, rgba(75, 36, 106, 0.9), rgba(75, 36, 106, 0.3), rgba(75, 36, 106, 0.9))";

const HERO_SLIDES = [
  {
    src: "/images/hero/dsc-7765.jpg",
    alt: "Panel discussion at the iWOMAN Intentional Conference",
  },
  {
    src: "/images/hero/dsc-7634.jpg",
    alt: "Audience gathered for the iWOMAN Arise and Shine conference",
  },
  {
    src: "/images/hero/dsc-7615.jpg",
    alt: "Community of women on stage at an iWOMAN event",
  },
  {
    src: "/images/hero/iw-dsc-7817.jpg",
    alt: "Speaker on stage at the Intentional Woman conference",
  },
] as const;

const SLIDE_INTERVAL_MS = 3000;
const CROSSFADE_DURATION = 1.25;

export function PortalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1, 0.8],
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 40],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const contentVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.22,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemShow = reduceMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] bg-iw-mist"
      aria-label="The Portal — hero"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden pb-[env(safe-area-inset-bottom)]">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            scale,
            borderRadius,
            transformOrigin: "center center",
            willChange: reduceMotion ? undefined : "transform",
          }}
        >
          <div className="absolute inset-0">
            {HERO_SLIDES.map((slide, i) => {
              const isActive = reduceMotion ? i === 0 : i === active;
              return (
                <motion.div
                  key={slide.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 1.06,
                  }}
                  transition={{
                    duration: CROSSFADE_DURATION,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ zIndex: isActive ? 2 : 1 }}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="object-cover object-[center_30%]"
                    style={{
                      filter: `brightness(${HERO_IMAGE_BRIGHTNESS_PERCENT}%) contrast(${HERO_IMAGE_CONTRAST_PERCENT}%)`,
                    }}
                    sizes="100vw"
                    aria-hidden
                  />
                </motion.div>
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: HERO_PURPLE_GRADIENT }}
            aria-hidden
          />
        </motion.div>

        <motion.div
          className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center gap-8 px-4 pt-20 text-center sm:gap-10 sm:px-8 sm:pt-24 md:pt-28"
          variants={contentVariants}
          initial="hidden"
          animate="show"
        >
          {/* 0. Conference 4 announcement pill + countdown */}
          <motion.div
            variants={itemShow}
            className="flex flex-col items-center gap-4"
          >
            <Link
              href="/conference-4#sponsor-access"
              className="font-accent group inline-flex max-w-[18rem] items-start gap-2 rounded-2xl border border-iw-gold/60 bg-iw-purple/45 px-4 py-2 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-iw-gold no-underline shadow-[0_4px_20px_rgb(0_0_0/0.35)] backdrop-blur-md transition-[background-color,border-color] hover:border-iw-gold hover:bg-iw-purple/65 sm:max-w-none sm:items-center sm:rounded-full sm:text-xs sm:leading-none"
            >
              <span
                className="mt-[3px] size-1.5 shrink-0 animate-pulse rounded-full bg-iw-gold sm:mt-0"
                aria-hidden
              />
              <span>
                4th Edition · Intentional Woman Conference · 22 Aug 2026 ·
                Sponsor a woman
                <span className="hidden sm:inline"> →</span>
              </span>
            </Link>
            <Link
              href="/conference-4"
              aria-label="View conference details and sponsor a woman"
              className="no-underline"
            >
              <CountdownTimer
                targetIso={EVENT_DATE_ISO}
                variant="compact"
                tone="dark"
                className="rounded-full border border-iw-white/15 bg-iw-purple/30 px-4 py-2 backdrop-blur-md transition-colors hover:border-iw-gold/50"
              />
            </Link>
          </motion.div>

          {/* 1. Primary headline — two block lines so each centers cleanly (avoids tracking/balance skew) */}
          <motion.h1
            variants={itemShow}
            className="font-display w-full max-w-5xl text-4xl font-semibold uppercase leading-[1.08] text-iw-white sm:text-5xl md:text-6xl md:leading-[1.06] lg:text-7xl xl:text-8xl [text-shadow:0_1px_2px_rgb(0_0_0/0.75),0_3px_14px_rgb(0_0_0/0.55),0_8px_40px_rgb(0_0_0/0.45)]"
          >
            <span className="block w-full text-center tracking-[0.06em]">
              Intentional
            </span>
            <span className="block w-full text-center tracking-[0.06em]">
              Woman
            </span>
          </motion.h1>

          {/* 2. Sub-headline — wraps on small screens; single line from md up */}
          <motion.p
            variants={itemShow}
            className="font-display max-w-prose text-2xl font-extralight leading-snug text-iw-gold sm:text-4xl md:max-w-none md:whitespace-nowrap md:text-[clamp(1.35rem,2.8vw,2.75rem)] md:leading-tight lg:text-5xl xl:text-6xl [text-shadow:0_1px_3px_rgb(0_0_0/0.85),0_4px_24px_rgb(0_0_0/0.5)]"
          >
            Empowering Women to Thrive
          </motion.p>

          {/* 3. CTAs */}
          <motion.div
            variants={itemShow}
            className="flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5"
          >
            <a
              href="https://iwoman.kwiknkap.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent inline-flex min-h-12 items-center justify-center rounded-sm bg-iw-gold px-8 text-sm font-bold uppercase tracking-widest text-iw-purple no-underline transition-[transform,box-shadow] hover:shadow-lg hover:shadow-iw-gold/35 active:scale-[0.98]"
            >
              Register for the conference
            </a>
            <Link
              href="/model"
              className="font-accent inline-flex min-h-12 items-center justify-center rounded-sm border-2 border-white/95 bg-black/30 px-8 text-sm font-bold uppercase tracking-widest text-iw-white shadow-[0_4px_24px_rgb(0_0_0/0.4)] backdrop-blur-[8px] transition-[background-color] hover:bg-black/45"
            >
              Explore our model
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
