import type { Config } from "tailwindcss";

/**
 * Intentional Woman — Tailwind theme extension (loaded via @config in globals.css).
 * Tailwind v4: theme tokens also surface as CSS variables (e.g. --color-iw-purple).
 */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        iw: {
          purple: "#4B246A",
          gold: "#FDC300",
          mist: "#F6F1FA",
          white: "#FFFFFF",
          /** Warm neutral page ground — distinct from mist (lavender paper) */
          parchment: "#FAF6F0",
        },
      },
      fontFamily: {
        display: [
          '"Libre Bodoni"',
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        accent: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        /** JetBrains Mono — set on /model via `--font-blueprint-mono` */
        blueprint: [
          "var(--font-blueprint-mono)",
          "ui-monospace",
          "monospace",
        ],
      },
      keyframes: {
        "gold-shine": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gold-shine": "gold-shine 2.5s ease-in-out infinite",
      },
      backgroundImage: {
        "iw-geometric-triangle":
          "linear-gradient(155deg, rgb(253 195 0 / 0.09) 0%, transparent 42%), linear-gradient(295deg, rgb(255 255 255 / 0.06) 0%, transparent 45%), repeating-linear-gradient(-60deg, rgb(255 255 255 / 0.04) 0 1px, transparent 1px 18px), repeating-linear-gradient(60deg, rgb(0 0 0 / 0.06) 0 1px, transparent 1px 22px)",
      },
    },
  },
} satisfies Config;

export default config;
