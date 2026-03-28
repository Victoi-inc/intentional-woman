/**
 * Programme timeline: 1st & 3rd edition use local galleries (`edition-galleries.ts`);
 * 2nd & upcoming use Unsplash (`next.config` remotePatterns).
 */

import {
  FIRST_EDITION_GALLERY,
  THIRD_EDITION_GALLERY,
} from "./edition-galleries";

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
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Participants learning together in a workshop setting",
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

export const WALK_FRAMES = [
  {
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    alt: "Women walking together outdoors in conversation",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765099-3d61b0423d38?auto=format&fit=crop&w=800&q=80",
    alt: "Community members on a group walk",
  },
  {
    src: "https://images.unsplash.com/photo-1517457371038-c7e9b730d3c7?auto=format&fit=crop&w=800&q=80",
    alt: "Crowd in motion along a city street",
  },
  {
    src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    alt: "Group walk through an urban plaza",
  },
  {
    src: "https://images.unsplash.com/photo-1529154168674-38b36d0dde42?auto=format&fit=crop&w=800&q=80",
    alt: "Participants walking with banners at a community event",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
    alt: "March for community awareness",
  },
] as const;

export type MentorKind = "Keynote Speaker" | "Global Mentor";

export const MENTORS: readonly {
  name: string;
  title: string;
  kind: MentorKind;
  src: string;
  alt: string;
}[] = [
  {
    name: "Dr. Amara Nkosi",
    title: "Opening Keynote · Systems Leadership",
    kind: "Keynote Speaker",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a keynote speaker",
  },
  {
    name: "Elena Vasquez",
    title: "Finance & Stewardship Track",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
  {
    name: "Chioma Okafor",
    title: "Faith & Vocation Plenary",
    kind: "Keynote Speaker",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a keynote speaker",
  },
  {
    name: "James Okonkwo",
    title: "NGO Partnerships · West Africa",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
  {
    name: "Sarah Lin",
    title: "Digital Equity & Access",
    kind: "Keynote Speaker",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a keynote speaker",
  },
  {
    name: "Fatima Al-Rashid",
    title: "Coaching Cohort Lead · MENA",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
  {
    name: "Rev. Denise Holt",
    title: "Closing Charge · Covenant Circles",
    kind: "Keynote Speaker",
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a keynote speaker",
  },
  {
    name: "Mireille Tchouassi",
    title: "Regional Convening · Central Africa",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
  {
    name: "Priya Menon",
    title: "Health & Wholeness Lab",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
  {
    name: "Dr. Keisha Boyd",
    title: "Research & Impact Metrics",
    kind: "Keynote Speaker",
    src: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a keynote speaker",
  },
  {
    name: "Anaïs Dubois",
    title: "Entrepreneurship Studio · EU Hub",
    kind: "Global Mentor",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    alt: "Portrait of a mentor",
  },
];
