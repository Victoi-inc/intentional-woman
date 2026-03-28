/** Canonical copy for /model (Our Model). */

export const MODEL_HERO = {
  kicker: "Our Model",
  subkicker: "Intentional progression",
  title: "",
  lead:
    "At the core of IWOMAN is a clear and intentional progression. We believe that sustainable economic empowerment begins internally with identity and must be supported externally through skills, systems, and opportunity.",
  programsLead:
    "Our programs are designed to guide women through this full journey:",
  journeyClosing:
    "This is not theoretical. It is structured, practical, and outcome-driven.",
} as const;

/** Hero journey cards: title + short description (no separate stage sections on page). */
export const MODEL_JOURNEY_STEPS = [
  {
    id: 1 as const,
    label: "Identity",
    description:
      "Building clarity, confidence, emotional stability, and decision-making strength",
  },
  {
    id: 2 as const,
    label: "Capability",
    description:
      "Developing practical skills, financial literacy, and economic understanding",
  },
  {
    id: 3 as const,
    label: "Income",
    description:
      "Enabling women to generate, manage, and grow financial resources",
  },
  {
    id: 4 as const,
    label: "Leadership",
    description:
      "Positioning women to influence, lead, and create long-term impact",
  },
] as const;

export const WHAT_WE_DO = {
  title: "What We Do",
  lead: "IWOMAN designs and delivers integrated programs that combine:",
  bullets: [
    "Cohort-based learning experiences",
    "Mentorship and accountability systems",
    "Practical, income-focused training",
    "Financial capability development",
    "Institutional and corporate partnerships",
  ],
  closing:
    "Our approach is execution-first. It is focused on what women can apply, build, and sustain in real life.",
} as const;

export const PROBLEM = {
  title: "The Problem We Address",
  stats:
    "Across Africa, according to the World Bank, women represent over 50% of the population, yet McKinsey Global Institute reports that women contribute only approximately 33% of GDP. This is not a talent gap. It is a systems gap.",
  lead: "Women are navigating:",
  bullets: [
    "Limited access to practical financial knowledge",
    "Inconsistent mentorship and support systems",
    "Weak pathways from personal development to income generation",
    "Emotional and identity instability that affects decision-making",
    "Fragmented, short-term empowerment interventions",
  ],
  closing:
    "Most existing solutions are event-driven, non-integrated, and difficult to scale. This results in women who are present, capable, and active, yet under-leveraged in economic systems and leadership pipelines.",
} as const;

export const PERSPECTIVE = {
  title: "Our Perspective",
  lead:
    "We see women’s empowerment as infrastructure. Not as inspiration alone, not as isolated events and definitely not as charity. We see women’s empowerment as a structured, continuous, and scalable system that drives:",
  bullets: [
    "Economic participation",
    "Workforce productivity",
    "Financial independence",
    "Leadership development",
  ],
  closing:
    "When women are equipped with the right identity, systems, and support, the outcome is not just personal transformation, it is economic expansion and societal progress.",
} as const;

export const COMMITMENT = {
  title: "Our Commitment",
  paragraphs: [
    "IWOMAN is building a future where women are not just supported to grow, but are structurally positioned to earn, lead, and influence at scale.",
    "When a woman is developed intentionally, her impact is not incremental, it is exponential.",
  ],
} as const;
