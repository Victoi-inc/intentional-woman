/**
 * Programme timeline: 1st & 3rd edition use local galleries (`edition-galleries.ts`);
 * 2nd & upcoming use Unsplash (`next.config` remotePatterns).
 */

import type { StaticImageData } from "next/image";

import {
  FIRST_EDITION_GALLERY,
  SECOND_EDITION_GALLERY,
  THIRD_EDITION_GALLERY,
} from "./edition-galleries";

import walk1 from "@/assets/power walk/walk-1.jpeg";
import walk2 from "@/assets/power walk/walk-2.jpeg";
import walk3 from "@/assets/power walk/walk-3.jpeg";
import walk4 from "@/assets/power walk/walk-4.jpeg";
import walk5 from "@/assets/power walk/walk-5.jpeg";
import walk6 from "@/assets/power walk/walk-6.jpeg";
import walk7 from "@/assets/power walk/walk-7.jpeg";
import walk8 from "@/assets/power walk/walk-8.jpeg";

import spkDelphine from "@/assets/speakers/Delfine-Nforngwei.jpeg";
import spkJude from "@/assets/speakers/Jude-Bonsi.jpeg";
import spkChristelleE from "@/assets/speakers/Christelle-Essoka.jpeg";
import spkAyuk from "@/assets/speakers/Ayuk-Rennet.jpeg";
import spkLeila from "@/assets/speakers/Leila-KIGHA.jpeg";
import spkCommy from "@/assets/speakers/Commy-Musa.jpeg";
import spkTebo from "@/assets/speakers/Mme-Tebo-Louise.jpeg";
import spkZeh from "@/assets/speakers/Zeh-Christelle-Nadesh.jpg";

export type ConferenceChapterTheme =
  | "foundation"
  | "awakening"
  | "zenith"
  | "upcoming";

export const TIMELINE = {
  y2023: {
    year: "2023",
    name: "No More Excuses",
    epithet: "First edition",
    body: "We opened with a clear mandate: stop outsourcing your future to circumstance. Sessions tackled limiting beliefs, personal accountability, and the courage to begin—so women left with practical next steps, not another reason to wait.",
    gallery: FIRST_EDITION_GALLERY,
    theme: "foundation" as const,
  },
  y2024: {
    year: "2024",
    name: "Invest in Yourself. Grow",
    epithet: "Second edition",
    body: "The room centred on self-investment as strategy—financial literacy intensives, skills and career growth tracks, wellbeing and resilience, and reframing development as capital you compound over time, not a luxury you postpone.",
    gallery: SECOND_EDITION_GALLERY,
    theme: "awakening" as const,
  },
  y2025: {
    year: "2025",
    name: "Arise and Shine",
    epithet: "Third edition",
    body: "We turned up the lights on visibility and voice—keynotes and breakouts on stepping forward with clarity, leadership in public and private life, and carrying purpose into rooms where decisions are made, so rising wasn’t a slogan but a shared practice.",
    gallery: THIRD_EDITION_GALLERY,
    theme: "zenith" as const,
  },
  upcoming: {
    year: "Next",
    name: "The Audacity to Win",
    epithet: "Fourth edition · Coming soon",
    body: "The next gathering will sharpen ambition with integrity—what it takes to compete, build, and finish strong without shrinking your values. Programme details, dates, and registration will be announced; join the list through our usual channels so you don’t miss the opening.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Sunrise over hills—forward-looking, hopeful horizon",
    theme: "upcoming" as const,
  },
} as const;

export const WALK_FRAMES: readonly { src: StaticImageData; alt: string }[] = [
  { src: walk1, alt: "The iWoman Power Walk — participants in motion" },
  { src: walk2, alt: "The iWoman Power Walk — walking together through the city" },
  { src: walk3, alt: "The iWoman Power Walk — the crowd on the move" },
  { src: walk4, alt: "The iWoman Power Walk — women marching with purpose" },
  { src: walk5, alt: "The iWoman Power Walk — energy along the route" },
  { src: walk6, alt: "The iWoman Power Walk — community on the walk" },
  { src: walk7, alt: "The iWoman Power Walk — stepping out in unity" },
  { src: walk8, alt: "The iWoman Power Walk — declaring the city ours" },
];

export const MENTORS: readonly {
  name: string;
  title: string;
  kind: string;
  src: StaticImageData;
  alt: string;
}[] = [
  {
    name: "Delphine Nforgwei",
    title: "Coach & Counselor",
    kind: "Keynote Speaker",
    src: spkDelphine,
    alt: "Portrait of Delphine Nforgwei, Keynote Speaker",
  },
  {
    name: "Jude Bonsi",
    title: "Information Systems Engineer",
    kind: "Master Mind Instructor",
    src: spkJude,
    alt: "Portrait of Jude Bonsi, Master Mind Instructor",
  },
  {
    name: "Christelle Essoka",
    title: "FIFA-Licensed Football Agent",
    kind: "Panelist",
    src: spkChristelleE,
    alt: "Portrait of Christelle Essoka, Panelist",
  },
  {
    name: "Ayuk Rennet",
    title: "Multimedia Journalist · Founder, Apex Communication",
    kind: "Event Moderator (MC)",
    src: spkAyuk,
    alt: "Portrait of Ayuk Rennet, Event Moderator",
  },
  {
    name: "Leila Kigha",
    title: "Communication & Brand Specialist",
    kind: "Panelist",
    src: spkLeila,
    alt: "Portrait of Leila Kigha, Panelist",
  },
  {
    name: "Commy Musa",
    title:
      "Field Communications Coordinator, West & Central Africa at CBM (Christian Blind Mission) · Founder, SisterSpeak237",
    kind: "Speaker",
    src: spkCommy,
    alt: "Portrait of Commy Musa, Founder of SisterSpeak237",
  },
  {
    name: "Mme Tebo Louise",
    title: "HSE Professional, Oil & Gas",
    kind: "Speaker",
    src: spkTebo,
    alt: "Portrait of Mme Tebo Louise, HSE Professional",
  },
  {
    name: "Zeh Christelle Nadesh",
    title: "Nurse Educator & Consultant",
    kind: "Speaker",
    src: spkZeh,
    alt: "Portrait of Zeh Christelle Nadesh, Nurse Educator and Consultant",
  },
];
