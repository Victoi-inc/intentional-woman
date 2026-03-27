"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Theme = "zenith" | "awakening" | "foundation";

export function ImpactYearChapter({
  year,
  name,
  epithet,
  body,
  image,
  imageAlt,
  theme,
  priority,
}: {
  year: string;
  name: string;
  epithet: string;
  body: string;
  image: string;
  imageAlt: string;
  theme: Theme;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const themeWrap =
    theme === "zenith"
      ? "border-iw-gold/40 bg-iw-purple text-iw-white shadow-[0_24px_48px_-12px_rgba(75,36,106,0.35)]"
      : theme === "awakening"
        ? "border-iw-purple/20 bg-iw-white/90 text-iw-purple shadow-[0_20px_40px_-16px_rgba(75,36,106,0.12)]"
        : "border-iw-purple/30 bg-iw-parchment text-iw-purple shadow-[0_16px_32px_-12px_rgba(0,0,0,0.12)]";

  const imageShell =
    theme === "foundation"
      ? "grayscale contrast-110 sepia-[0.35]"
      : theme === "awakening"
        ? "saturate-[0.82] brightness-[0.98]"
        : "";

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"
    >
      <div
        className={`overflow-hidden rounded-2xl border ${themeWrap} lg:grid lg:grid-cols-2 lg:gap-0`}
      >
        <div
          className={`relative aspect-[4/3] min-h-[220px] w-full lg:aspect-auto lg:min-h-[340px] ${theme === "zenith" ? "lg:order-2" : ""}`}
        >
          <div className={`absolute inset-0 ${imageShell}`}>
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={priority}
            />
          </div>
          {theme === "zenith" ? (
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-tr from-iw-purple/50 via-transparent to-iw-gold/25"
              aria-hidden
            />
          ) : null}
        </div>
        <div
          className={`flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12 ${theme === "zenith" ? "lg:order-1" : ""}`}
        >
          <p className="font-blueprint text-[10px] uppercase tracking-[0.22em] text-iw-gold sm:text-[11px]">
            Chapter · {year}
          </p>
          <h2
            className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.35rem] ${theme === "zenith" ? "text-white" : "text-iw-purple"}`}
          >
            {name}
            <span className="mt-1 block font-display text-xl font-normal italic text-iw-gold sm:text-2xl">
              ({epithet})
            </span>
          </h2>
          <div className="h-px max-w-16 bg-iw-gold/80" aria-hidden />
          <p
            className={`font-sans text-base leading-relaxed sm:text-lg ${theme === "zenith" ? "text-white/88" : "text-iw-purple/88"}`}
          >
            {body}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
