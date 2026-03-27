"use client";

import { motion, type MotionValue } from "framer-motion";

const GLOW_STYLE = {
  filter:
    "drop-shadow(0 0 4px rgba(253, 195, 0, 0.55)) drop-shadow(0 0 10px rgba(253, 195, 0, 0.35))",
} as const;

type BlueprintGrowthSvgProps = {
  pathLength?: MotionValue<number>;
  /** Hero strip: first trunk segment only, gold, always fully drawn */
  variant?: "journey" | "heroPeek";
};

/** Full path: four stages — trunk ↔ L/R branches (Identity → Capability → Income → Leadership) */
const PATH_FULL =
  "M 50 0 L 50 95 L 16 95 L 50 95 L 50 255 L 84 255 L 50 255 L 50 415 L 16 415 L 50 415 L 50 575 L 84 575 L 50 575 L 50 735";

/** First vertical segment only (aligns with full path start) */
const PATH_PEEK = "M 50 0 L 50 85";

export function BlueprintGrowthSvg({
  pathLength,
  variant = "journey",
}: BlueprintGrowthSvgProps) {
  if (variant === "heroPeek") {
    return (
      <svg
        className="pointer-events-none mx-auto h-full w-16 max-w-full sm:w-24"
        viewBox="0 0 100 90"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <path
          d={PATH_PEEK}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="text-iw-gold"
          style={GLOW_STYLE}
        />
      </svg>
    );
  }

  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-0 h-full w-20 -translate-x-1/2 sm:w-28"
      viewBox="0 0 100 735"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden
    >
      <motion.path
        d={PATH_FULL}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.65}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="text-iw-purple"
        style={{ pathLength, ...GLOW_STYLE }}
      />
    </svg>
  );
}
