"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function PowerWalkSection({
  frames,
}: {
  frames: readonly { src: string; alt: string }[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const blurPx = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [10, 2, 0, 3, 12]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative border-y border-iw-purple/10 bg-iw-purple py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(253,195,0,0.08)_2px,rgba(253,195,0,0.08)_4px)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="mb-10 text-center sm:mb-12">
          <p className="font-blueprint mb-2 text-[10px] uppercase tracking-[0.24em] text-iw-gold sm:text-[11px]">
            In motion
          </p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The iWoman Power Walk
          </h2>
          <p className="font-sans mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            One route, one rhythm—thousands of steps declaring that our cities belong to the
            intentional. Scroll the film strip to relive the energy.
          </p>
        </header>

        <motion.div
          style={reduceMotion ? undefined : { filter }}
          className="relative -mx-5 will-change-[filter] sm:-mx-8 lg:-mx-10"
        >
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 pt-2 [scrollbar-width:thin] sm:gap-5 sm:px-8 lg:px-10">
            {frames.map((frame, i) => (
              <figure
                key={frame.src}
                className="relative w-[min(72vw,280px)] shrink-0 snap-center first:pl-0"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-sm border-[10px] border-iw-purple bg-black shadow-[0_0_0_2px_rgba(253,195,0,0.35),12px_12px_0_0_rgba(0,0,0,0.25)]">
                  <div className="absolute left-0 top-0 z-[1] flex h-full w-3 flex-col justify-evenly border-r border-white/15 bg-black/90 py-2">
                    {Array.from({ length: 8 }).map((_, hole) => (
                      <span
                        key={hole}
                        className="mx-auto block size-1.5 rounded-full bg-iw-purple/80"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 z-[1] flex h-full w-3 flex-col justify-evenly border-l border-white/15 bg-black/90 py-2">
                    {Array.from({ length: 8 }).map((_, hole) => (
                      <span
                        key={hole}
                        className="mx-auto block size-1.5 rounded-full bg-iw-purple/80"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    className="object-cover"
                    sizes="280px"
                  />
                </div>
                <figcaption className="sr-only">{frame.alt}</figcaption>
                <p className="font-blueprint mt-2 text-center text-[9px] uppercase tracking-[0.2em] text-iw-gold/90">
                  Frame {String(i + 1).padStart(2, "0")}
                </p>
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
