export const WHY_SUPPORT_BULLETS = [
  "Workforce productivity",
  "Economic participation",
  "Leadership pipelines",
  "Community stability",
] as const;

export type SupportContributionKind =
  | "sponsor-woman"
  | "fund-cohort"
  | "strategic-partner"
  | "custom-amount";

export const CONTRIBUTION_LABELS: Record<SupportContributionKind, string> = {
  "sponsor-woman": "Sponsor a Woman",
  "fund-cohort": "Fund a Cohort",
  "strategic-partner": "Strategic Partner",
  "custom-amount": "Custom Amount",
};

export const SPONSOR_AMOUNT_TIERS = [50, 100, 300, 500] as const;

export const COHORT_AMOUNT_TIERS = [
  { label: "Starter (1–10)", amount: 500 },
  { label: "Mid-level (11–20)", amount: 1000 },
  { label: "Lead (21–50)", amount: 2500 },
] as const;

export const STRATEGIC_BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Prefer to discuss",
] as const;

export const SUPPORT_TIER_CARDS = [
  {
    kind: "sponsor-woman" as const,
    title: "Sponsor a Woman",
    tagline: "Direct impact · Individual sponsorship",
    intro:
      "Support the full or partial participation of one woman in an IWOMAN programme. This could be access to:",
    bullets: [
      "Structured personal development programmes",
      "Mentorship and accountability systems",
      "Financial and personal growth training",
      "Event access",
    ],
    nominate:
      "Sponsors may choose to nominate a specific woman to receive programme access, or request IWOMAN to allocate placement to a qualified participant based on programme criteria.",
    framework:
      "All placements are managed within IWOMAN's structured selection and programme framework to ensure alignment and impact. All support is implemented within IWOMAN's structured programme framework to ensure quality, accountability, and measurable impact.",
    ideal:
      "Individuals and professionals who want to create direct, tangible impact.",
    accessLabel: "Access tiers",
    accessNote: "Tap an amount to open the form with that tier selected, or use the main CTA below.",
  },
  {
    kind: "fund-cohort" as const,
    title: "Fund a Cohort",
    tagline: "Scaled impact · Group sponsorship",
    intro:
      "Enable access for a group of women to participate in a structured cohort programme. Sponsors may choose to:",
    bullets: [
      "Designate a specific group or community of women to be supported",
      "Entrust IWOMAN to identify and onboard a qualified cohort aligned with programme objectives",
    ],
    nominate: null as string | null,
    framework:
      "Cohort composition and programme delivery remain structured to ensure consistency, quality, and measurable outcomes. All support is implemented within IWOMAN's structured programme framework to ensure quality, accountability, and measurable impact.",
    ideal:
      "Organizations, foundations, and individuals seeking broader impact.",
    accessLabel: "Access tiers",
    accessNote: "Select a cohort tier below or use Fund a Cohort to specify another amount.",
  },
  {
    kind: "strategic-partner" as const,
    title: "Strategic Partner",
    tagline: "Institutional impact · Long-term collaboration",
    intro:
      "Partner with IWOMAN to support women's development at scale through structured, long-term initiatives. This includes:",
    bullets: [
      "Programme sponsorship",
      "Corporate training integration",
      "Co-branded impact initiatives",
      "CSR-aligned partnerships",
    ],
    nominate:
      "Organizations may define partnership objectives and target beneficiary groups, collaborate with IWOMAN to design tailored programmes or initiatives, and engage in co-structured delivery aligned with CSR, workforce, or impact goals.",
    framework:
      "All partnerships are developed through direct consultation to ensure alignment with organizational priorities and measurable impact outcomes. All support is implemented within IWOMAN's structured programme framework to ensure quality, accountability, and measurable impact.",
    ideal:
      "Corporations, financial institutions, NGOs, and public sector organizations.",
    accessLabel: "Access",
    accessNote: "Custom structured partnership — we align scope, beneficiaries, and delivery in consultation with you.",
  },
] as const;
