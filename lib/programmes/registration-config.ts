import type { ProgrammeDetailNode } from "./programme-detail-nodes";
import {
  COHORT_READ_MORE,
  CORPORATE_READ_MORE,
  PERSONAL_READ_MORE,
} from "./programme-read-more-content";

export type ProgrammeTrackId = "personal" | "corporate" | "cohort";

export type ProgrammeOffering = {
  id: string;
  label: string;
};

export type ProgrammeTrackConfig = {
  id: ProgrammeTrackId;
  /** Page section + form step 1 label */
  title: string;
  /** Short line under title on registration step 1 */
  listingSummary: string;
  /** Opening paragraphs on the programmes page (no bullets on the card) */
  overview: string[];
  /** Full nested content for the programme detail page */
  readMore: ProgrammeDetailNode[];
  /** Step 2: top-level programme names only (no nested focus areas) */
  offerings: ProgrammeOffering[];
};

export const PROGRAMME_TRACKS: readonly ProgrammeTrackConfig[] = [
  {
    id: "corporate",
    title: "Corporate solutions",
    listingSummary:
      "Structured, outcome-driven programmes for organisations—identity, capability, finance, and leadership in the workplace.",
    overview: [
      "IWOMAN partners with organizations to design and deliver structured, outcome-driven programs that strengthen women’s identity, capabilities, financial growth, and leadership readiness within the workplace.",
      "Our approach goes beyond traditional training. We build integrated development systems that translate directly into improved workforce productivity, stronger engagement, and measurable performance outcomes.",
      "We work with corporates, financial institutions, NGOs, and public sector organizations seeking to invest in women not just as participants but as drivers of performance and growth.",
    ],
    readMore: [...CORPORATE_READ_MORE],
    offerings: [
      {
        id: "co-identity-pd",
        label: "Identity & Personal Development Program",
      },
      {
        id: "co-fin-lit",
        label: "Financial Literacy & Economic Empowerment Program",
      },
      {
        id: "co-leadership",
        label: "Leadership & Career Advancement Programme",
      },
      {
        id: "co-resilience",
        label: "Emotional Resilience & Work-Life Integration Training",
      },
      {
        id: "co-entrepreneurship",
        label: "Entrepreneurship & Income Development Program",
      },
    ],
  },
  {
    id: "personal",
    title: "Personal development (1:1 programs)",
    listingSummary:
      "Private one-on-one programmes for tailored growth through personal, financial, and professional transitions.",
    overview: [
      "Our Private Development Programs are designed for women who are ready for focused, personalized growth.",
      "These one-on-one programs provide tailored guidance, deep introspection, and structured support to help women move through critical transitions personally, financially, and professionally.",
      "Each program is designed to address a specific need, with clear outcomes and practical implementation.",
    ],
    readMore: [...PERSONAL_READ_MORE],
    offerings: [
      {
        id: "pd-identity-clarity",
        label: "Identity Clarity & Personal Alignment Program",
      },
      {
        id: "pd-life-direction",
        label: "Life Direction & Intentional Living Program",
      },
      {
        id: "pd-financial-reset",
        label: "Financial Reset & Personal Economy Program",
      },
      {
        id: "pd-emotional-healing",
        label: "Emotional Healing & Stability Program",
      },
      {
        id: "pd-personal-power",
        label: "Personal Power, Confidence & Expression Program",
      },
    ],
  },
  {
    id: "cohort",
    title: "Cohort programs (group programs)",
    listingSummary:
      "Collective cohort experiences with curriculum, mentorship, peer accountability, and practical implementation.",
    overview: [
      "Our IWOMAN Collective Programs are structured, cohort-based experiences designed to guide women through transformation within a community of accountability, learning, and shared growth.",
      "They bring together structured curriculum, mentorship, peer accountability, and practical implementation.",
      "Women do not grow alone—they grow within a system.",
    ],
    readMore: [...COHORT_READ_MORE],
    offerings: [
      { id: "ch-identity-reset", label: "Identity Reset Program" },
      { id: "ch-intentional-101", label: "Intentional Living 101" },
      {
        id: "ch-financial-foundations",
        label: "Financial Foundations Program",
      },
      { id: "ch-income-wealth", label: "Income & Wealth Building Program" },
      { id: "ch-leadership", label: "Leadership & Influence Program" },
    ],
  },
] as const;

export function getTrackById(id: ProgrammeTrackId): ProgrammeTrackConfig {
  const t = PROGRAMME_TRACKS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown track: ${id}`);
  return t;
}
