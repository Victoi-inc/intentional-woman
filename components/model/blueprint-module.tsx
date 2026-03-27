"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export type BlueprintModuleProps = {
  moduleId: 1 | 2 | 3 | 4;
  label: string;
  title: string;
  children: ReactNode;
  image: { src: string; alt: string; width: number; height: number };
  side: "left" | "right";
  x: MotionValue<number>;
  onHoverChange: (hovered: boolean, id: 1 | 2 | 3 | 4) => void;
};

export function BlueprintModule({
  moduleId,
  label,
  title,
  children,
  image,
  side,
  x,
  onHoverChange,
}: BlueprintModuleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div style={{ x }} className="will-change-transform">
      <motion.article
        className={`relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-iw-purple/10 bg-iw-white/95 shadow-sm ring-1 ring-iw-purple/5 sm:max-w-5xl lg:max-w-6xl ${
          side === "left" ? "sm:flex-row" : "sm:flex-row-reverse"
        }`}
        whileHover={reduceMotion ? undefined : { scale: 1.02 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        onHoverStart={() => onHoverChange(true, moduleId)}
        onHoverEnd={() => onHoverChange(false, moduleId)}
      >
        <div className="relative aspect-[4/3] shrink-0 sm:aspect-auto sm:w-[40%] sm:min-h-[360px] lg:min-h-[400px] xl:min-h-[448px]">
          <div className="relative size-full overflow-hidden ring-2 ring-iw-gold/45 ring-inset shadow-[0_14px_44px_-10px_rgba(75,36,106,0.24),0_6px_20px_-6px_rgba(253,195,0,0.22)]">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="size-full object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 520px"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-iw-purple/25 to-transparent sm:bg-linear-to-r sm:from-transparent sm:to-iw-purple/20"
            aria-hidden
          />
        </div>
        <div className="flex flex-1 flex-col justify-center px-7 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <p className="font-blueprint mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-iw-purple/55 sm:text-xs sm:tracking-[0.32em]">
            {label}
          </p>
          <h2 className="font-display mb-5 text-3xl font-semibold tracking-tight text-iw-purple sm:mb-6 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <div className="font-sans space-y-4 text-base leading-relaxed text-iw-purple/80 sm:space-y-5 sm:text-lg lg:text-xl lg:leading-relaxed">
            {children}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
