import type { StaticImageData } from "next/image";

import d1636 from "@/assets/1st edition/DSC 1636.jpg";
import d1669 from "@/assets/1st edition/DSC 1669.jpg";
import d1678 from "@/assets/1st edition/DSC 1678.jpg";
import d1710 from "@/assets/1st edition/DSC 1710.jpg";
import d1761 from "@/assets/1st edition/DSC 1761.jpg";

import t7529 from "@/assets/3rd edition/DSC 7529.jpg";
import t7591 from "@/assets/3rd edition/DSC 7591.jpg";
import t7604 from "@/assets/3rd edition/DSC 7604.jpg";
import t7613 from "@/assets/3rd edition/DSC 7613.jpg";
import t7765 from "@/assets/3rd edition/DSC 7765 from iwoman.jpg";

export type EditionGallerySlide = {
  src: StaticImageData;
  alt: string;
};

/** Intentional Woman Conference — 1st edition (2023), “No More Excuses” */
export const FIRST_EDITION_GALLERY: readonly EditionGallerySlide[] = [
  {
    src: d1636,
    alt: "Intentional Woman Conference 2023 — first edition gathering",
  },
  {
    src: d1669,
    alt: "Intentional Woman Conference 2023 — participants in session",
  },
  {
    src: d1678,
    alt: "Intentional Woman Conference 2023 — community moment",
  },
  {
    src: d1710,
    alt: "Intentional Woman Conference 2023 — conference atmosphere",
  },
  {
    src: d1761,
    alt: "Intentional Woman Conference 2023 — attendees",
  },
];

/** Intentional Woman Conference — 3rd edition (2025), “Arise and Shine” */
export const THIRD_EDITION_GALLERY: readonly EditionGallerySlide[] = [
  {
    src: t7529,
    alt: "Intentional Woman Conference 2025 — third edition",
  },
  {
    src: t7591,
    alt: "Intentional Woman Conference 2025 — plenary and crowd",
  },
  {
    src: t7604,
    alt: "Intentional Woman Conference 2025 — session",
  },
  {
    src: t7613,
    alt: "Intentional Woman Conference 2025 — gathering",
  },
  {
    src: t7765,
    alt: "Intentional Woman Conference 2025 — celebration",
  },
];
