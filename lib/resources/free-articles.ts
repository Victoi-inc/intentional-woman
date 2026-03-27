export type FreeArticle = {
  id: string;
  title: string;
  subtitle: string;
  minutes: number;
  paragraphs: string[];
};

/** Short reflective reads — expand on the Resources page (no paywall). */
export const FREE_ARTICLES: FreeArticle[] = [
  {
    id: "reason-before-rush",
    title: "Reason before the rush",
    subtitle: "Why slowing down is not the opposite of ambition",
    minutes: 6,
    paragraphs: [
      "Most of us were trained to equate speed with seriousness. If you are not busy, you are not trying. If you are not visible, you are not committed. That story sells well — until your calendar becomes a proxy for your worth, and your nervous system pays the bill.",
      "Reasoning is the practice of asking: what is this decision for, who benefits from it, and what would still be true if no one applauded? It is not hesitation; it is alignment. When you reason before you rush, you choose fewer things — but you choose them with weight.",
      "Try this week: before you say yes to a new obligation, write one sentence on the outcome you want from the next ninety days. If the yes does not strengthen that sentence, treat the invitation as data, not a command.",
    ],
  },
  {
    id: "systems-over-willpower",
    title: "Systems over willpower",
    subtitle: "Designing a life that does not depend on heroic days",
    minutes: 7,
    paragraphs: [
      "Willpower is a finite budget. Systems are interest that compounds. A system is anything that makes the next right step obvious, easy, and repeatable — a calendar block, a checklist, a boundary you keep without negotiating it in the moment.",
      "Women are often praised for endurance. Endurance without structure becomes invisible labour: you carry what should be shared, automated, or deleted. Building systems is how you translate care into sustainability.",
      "Pick one friction you felt this month — late payments, missed follow-ups, depleted mornings. Name the smallest repeatable fix: a fifteen-minute Friday close-out, a template message, a hard stop at night. Install that one lever before you add another.",
    ],
  },
  {
    id: "money-as-clarity",
    title: "Money as clarity, not judgment",
    subtitle: "Reading your numbers without shame",
    minutes: 5,
    paragraphs: [
      "Money triggers storylines: deserving, discipline, dignity. Many of those stories were written long before you earned your first wage. When you look at cash flow, you are not measuring your goodness; you are measuring your options.",
      "Reasoning with money means separating facts from verdicts. The fact might be: this month’s margin is thin. The verdict might be: I am behind in life. One of those sentences helps you plan; the other drains the energy you need to plan.",
      "If you have avoided your numbers, start with a single snapshot — inflow, fixed outflow, and one discretionary bucket you could trim without dishonouring your joy. Clarity is the gentlest form of power.",
    ],
  },
];
