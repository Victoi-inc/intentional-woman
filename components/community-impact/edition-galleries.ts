import type { StaticImageData } from "next/image";

import d1636 from "@/assets/1st edition/DSC 1636.jpg";
import d1669 from "@/assets/1st edition/DSC 1669.jpg";
import d1678 from "@/assets/1st edition/DSC 1678.jpg";
import d1710 from "@/assets/1st edition/DSC 1710.jpg";
import d1761 from "@/assets/1st edition/DSC 1761.jpg";

import s6561 from "@/assets/2nd edition/IMG_6561.jpg";
import s6558 from "@/assets/2nd edition/IMG_6558.jpg";
import s6565 from "@/assets/2nd edition/IMG_6565.jpg";
import s6604 from "@/assets/2nd edition/IMG_6604.jpg";
import s6580 from "@/assets/2nd edition/IMG_6580.jpg";
import s6607 from "@/assets/2nd edition/IMG_6607.jpg";
import s6557 from "@/assets/2nd edition/IMG_6557.jpg";
import s6596 from "@/assets/2nd edition/IMG_6596.jpg";
import s6592 from "@/assets/2nd edition/IMG_6592.jpg";

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

/** Intentional Woman Conference — 2nd edition (2024), “Invest in Yourself. Grow” */
export const SECOND_EDITION_GALLERY: readonly EditionGallerySlide[] = [
  {
    src: s6561,
    alt: "Intentional Woman Conference 2024 — team on stage at the Invest in Yourself. Grow edition",
  },
  {
    src: s6558,
    alt: "Intentional Woman Conference 2024 — speaker addressing the room",
  },
  {
    src: s6565,
    alt: "Intentional Woman Conference 2024 — attendees at the conference backdrop",
  },
  {
    src: s6604,
    alt: "Intentional Woman Conference 2024 — guests gathered by the iWOMAN banner",
  },
  {
    src: s6580,
    alt: "Intentional Woman Conference 2024 — participants during the gathering",
  },
  {
    src: s6607,
    alt: "Intentional Woman Conference 2024 — attendees applauding during a session",
  },
  {
    src: s6557,
    alt: "Intentional Woman Conference 2024 — full audience in session",
  },
  {
    src: s6596,
    alt: "Intentional Woman Conference 2024 — attendees seated for a session",
  },
  {
    src: s6592,
    alt: "Intentional Woman Conference 2024 — participants taking notes",
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
