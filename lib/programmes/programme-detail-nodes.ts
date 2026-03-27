/**
 * Recursive content tree for programme “read more” dialogs.
 * Step 2 registration uses only `offerings[].label` (top-level programme names).
 */

export type ProgrammeDetailNode =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "section"; title: string; children: ProgrammeDetailNode[] };
