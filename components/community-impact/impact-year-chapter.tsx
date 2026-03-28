"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import type { ConferenceChapterTheme } from "./community-impact-data";
import type { EditionGallerySlide } from "./edition-galleries";

function ChapterMedia({
  gallery,
  image,
  imageAlt,
  priority,
}: {
  gallery?: readonly EditionGallerySlide[];
  image?: string;
  imageAlt?: string;
  priority?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const hasGallery = Boolean(gallery && gallery.length > 0);
  const slides = gallery ?? [];
  const count = slides.length;

  const morphTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  const goPrev = useCallback(() => {
    if (!hasGallery || count < 2) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [hasGallery, count]);

  const goNext = useCallback(() => {
    if (!hasGallery || count < 2) return;
    setIndex((i) => (i + 1) % count);
  }, [hasGallery, count]);

  const showControls = hasGallery && count > 1;

  return (
    <div className="relative h-full min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[min(100%,520px)]">
      <div className="absolute inset-0">
        {hasGallery && reduceMotion !== true ? (
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={slides[index].src.src ?? index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.045, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
              transition={morphTransition}
            >
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority={priority && index === 0}
              />
            </motion.div>
          </AnimatePresence>
        ) : hasGallery ? (
          <Image
            key={index}
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority={priority && index === 0}
          />
        ) : image && imageAlt ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority={priority}
          />
        ) : null}
      </div>

      {showControls ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-iw-purple/20 bg-white/95 text-iw-purple shadow-md transition-[background-color,transform] hover:bg-iw-gold hover:text-iw-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold sm:left-4 sm:size-12"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6 sm:size-7" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-iw-purple/20 bg-white/95 text-iw-purple shadow-md transition-[background-color,transform] hover:bg-iw-gold hover:text-iw-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold sm:right-4 sm:size-12"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6 sm:size-7" strokeWidth={2} />
          </button>
          <p className="font-blueprint absolute inset-x-0 bottom-0 z-10 mx-auto mb-4 w-fit rounded-sm bg-white/90 px-3 py-1.5 text-center text-[10px] uppercase tracking-[0.18em] text-iw-purple shadow-sm sm:mb-5 sm:text-[11px]">
            {index + 1} / {count}
          </p>
        </>
      ) : null}
    </div>
  );
}

export function ImpactYearChapter({
  year,
  name,
  epithet,
  body,
  theme,
  priority,
  gallery,
  image,
  imageAlt,
}: {
  year: string;
  name: string;
  epithet: string;
  body: string;
  theme: ConferenceChapterTheme;
  priority?: boolean;
  gallery?: readonly EditionGallerySlide[];
  image?: string;
  imageAlt?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const cardShell =
    theme === "zenith"
      ? "border-iw-gold/40 shadow-[0_24px_48px_-12px_rgba(75,36,106,0.35)]"
      : theme === "awakening"
        ? "border-iw-purple/20 shadow-[0_20px_40px_-16px_rgba(75,36,106,0.12)]"
        : theme === "upcoming"
          ? "border-2 border-dashed border-iw-gold/50 shadow-[0_20px_40px_-16px_rgba(75,36,106,0.1)]"
          : "border-iw-purple/30 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.12)]";

  const textPanelClass =
    theme === "zenith"
      ? "bg-iw-purple text-iw-white"
      : theme === "awakening"
        ? "border-t border-iw-purple/10 bg-iw-white/95 text-iw-purple lg:border-l lg:border-t-0"
        : theme === "upcoming"
          ? "bg-linear-to-br from-iw-mist via-iw-white to-iw-mist text-iw-purple"
          : "bg-iw-parchment text-iw-purple";

  const imageOnRight = theme === "zenith";
  const imageColOrder = imageOnRight ? "lg:order-2" : "lg:order-1";
  const textColOrder = imageOnRight ? "lg:order-1" : "lg:order-2";

  const headingClass = theme === "zenith" ? "text-white" : "text-iw-purple";
  const bodyClass = theme === "zenith" ? "text-white/88" : "text-iw-purple/88";

  const chapterLabel =
    theme === "upcoming" ? "Next chapter" : `Conference · ${year}`;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"
    >
      <div
        className={`overflow-hidden rounded-2xl border bg-iw-white ${cardShell} lg:grid lg:grid-cols-12 lg:gap-0 lg:min-h-[min(560px,calc(100vh-12rem))]`}
      >
        <div
          className={`relative min-h-[280px] w-full overflow-hidden bg-iw-white sm:min-h-[360px] lg:col-span-8 lg:h-full lg:min-h-0 ${imageColOrder}`}
        >
          <ChapterMedia
            gallery={gallery}
            image={image}
            imageAlt={imageAlt}
            priority={priority}
          />
        </div>
        <div
          className={`flex flex-col justify-center gap-4 p-8 sm:p-10 lg:col-span-4 lg:p-12 ${textPanelClass} ${textColOrder}`}
        >
          <p className="font-blueprint text-[10px] uppercase tracking-[0.22em] text-iw-gold sm:text-[11px]">
            {chapterLabel}
          </p>
          <h2
            className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.35rem] ${headingClass}`}
          >
            {name}
            <span className="mt-1 block font-display text-xl font-normal italic text-iw-gold sm:text-2xl">
              ({epithet})
            </span>
          </h2>
          <div className="h-px max-w-16 bg-iw-gold/80" aria-hidden />
          <p className={`font-sans text-base leading-relaxed sm:text-lg ${bodyClass}`}>
            {body}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
