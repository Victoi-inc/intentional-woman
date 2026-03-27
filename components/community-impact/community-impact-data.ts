/** Unsplash sources — configured in next.config remotePatterns */

export const TIMELINE = {
  y2025: {
    year: "2025",
    name: "Arise & Shine",
    epithet: "The Zenith",
    body: "Our largest gathering yet—three days of keynotes, breakouts, and covenant circles. The room proved what we already knew: when women move with intention, entire communities recalibrate.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Large conference hall with stage lighting and audience",
    theme: "zenith" as const,
  },
  y2024: {
    year: "2024",
    name: "The Awakening",
    epithet: "Deepening the Framework",
    body: "We moved from inspiration to implementation—tighter curricula, longer mentorship arcs, and a shared language for systemic change that women could take back to their boards, businesses, and homes.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Workshop participants seated in a bright training room",
    theme: "awakening" as const,
  },
  y2023: {
    year: "2023",
    name: "The Foundation",
    epithet: "Where It Began",
    body: "A small circle, a bold hypothesis, and the first public declaration that intention—not hustle—would be our north star. Every number since grew from this room.",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Team gathered for an early community event",
    theme: "foundation" as const,
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
