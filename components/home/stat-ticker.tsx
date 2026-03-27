"use client";

import { motion } from "framer-motion";

const LINE =
  "1,200+ WOMEN REACHED // 150+ MENTORED // 3 MAJOR CONFERENCES.";

export function StatTicker() {
  return (
    <section
      id="impact"
      className="scroll-mt-20 border-y border-iw-purple/15 bg-iw-gold py-3.5 sm:py-4"
      role="presentation"
      aria-label="Community impact snapshot"
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <p className="font-accent shrink-0 pr-16 text-sm font-bold uppercase tracking-[0.2em] text-iw-purple sm:pr-20 sm:text-base md:text-lg">
            {LINE}
          </p>
          <p className="font-accent shrink-0 pr-16 text-sm font-bold uppercase tracking-[0.2em] text-iw-purple sm:pr-20 sm:text-base md:text-lg">
            {LINE}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
