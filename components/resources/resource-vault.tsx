"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { FreeArticlesSection } from "@/components/resources/free-articles-section";

const UNSPLASH = "https://images.unsplash.com";

type CoverTheme = "purple" | "light";

type Resource = {
  id: string;
  title: string;
  category: string;
  format: string;
  priceUsd: number;
  description: string;
  inside: string[];
  coverSrc: string;
  coverAlt: string;
  fileMeta: string;
  width: number;
  height: number;
  coverTheme: CoverTheme;
};

const RESOURCES: Resource[] = [
  {
    id: "framework-guide",
    title: "The 4-Stage Framework Guide",
    category: "Intentional Woman · Core Curriculum",
    format: "E-book",
    priceUsd: 20,
    coverTheme: "purple",
    description:
      "A definitive walkthrough of the Intentional Woman architecture—from orientation through identity, systems, and economic leverage—with prompts you can reuse in cohorts or solo implementation.",
    inside: [
      "Stage maps with outcome checkpoints",
      "Facilitator notes and reflection prompts",
      "Alignment exercises for teams",
      "Glossary tied to the blueprint language",
    ],
    coverSrc: `${UNSPLASH}/photo-1544947950-fa07a98d237f?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Stack of hardcover books, warm tones",
    fileMeta: "EPUB + PDF · 12.4 MB",
    width: 700,
    height: 900,
  },
  {
    id: "financial-workbook",
    title: "Financial Literacy Workbook",
    category: "Wealth & Capability",
    format: "Interactive PDF",
    priceUsd: 15,
    coverTheme: "light",
    description:
      "Fillable worksheets for cash flow, goals, and decision hygiene—designed to remove shame from the numbers and install habits that hold under pressure.",
    inside: [
      "Monthly cash-flow canvas",
      "Debt and savings scenario ladders",
      "Negotiation prep one-pager",
      "Quarterly review ritual template",
    ],
    coverSrc: `${UNSPLASH}/photo-1512820790803-83ca734da794?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Open book pages with typography",
    fileMeta: "PDF · 8.2 MB",
    width: 700,
    height: 800,
  },
  {
    id: "leadership-templates",
    title: "Leadership Systems Template",
    category: "Operations & Teams",
    format: "Digital Asset",
    priceUsd: 10,
    coverTheme: "purple",
    description:
      "Notion-ready and spreadsheet-friendly templates for cadences, delegation, and visibility—so leadership runs on systems, not adrenaline.",
    inside: [
      "Weekly operating rhythm board",
      "Stakeholder communication matrix",
      "1:1 and team ritual scripts",
      "Metrics snapshot dashboard (CSV)",
    ],
    coverSrc: `${UNSPLASH}/photo-1532012197267-da84d127e765?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Person reading a book by natural light",
    fileMeta: "ZIP · 4.1 MB",
    width: 700,
    height: 900,
  },
  {
    id: "arise-shine-2025",
    title: "Arise & Shine 2025 Conference Highlights",
    category: "Events & Immersives",
    format: "Video Bundle",
    priceUsd: 25,
    coverTheme: "light",
    description:
      "Curated keynotes, worship sets, and breakout replays from Arise & Shine 2025—built to refill your vision when you cannot be in the room.",
    inside: [
      "Main-stage highlight reel",
      "Three breakout intensives (HD)",
      "Speaker notes PDF companion",
      "Private podcast feed (90 days)",
    ],
    coverSrc: `${UNSPLASH}/photo-1507003211169-0a1dd7228f2d?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Bright creative workspace with notebook",
    fileMeta: "MP4 + PDF · 1.9 GB",
    width: 700,
    height: 750,
  },
  {
    id: "intention-planner",
    title: "The Intention Planner",
    category: "Planning & Rhythm",
    format: "Digital Template",
    priceUsd: 12,
    coverTheme: "purple",
    description:
      "A quarter-by-quarter planner that connects weekly intentions to measurable outcomes—minimal fluff, maximum follow-through.",
    inside: [
      "Quarterly north-star spread",
      "Weekly block planner (print + digital)",
      "Habit and boundary trackers",
      "Month-end review prompts",
    ],
    coverSrc: `${UNSPLASH}/photo-1517842645767-c96b00f0e838?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Journal and pen on a clean desk",
    fileMeta: "Notion + PDF · 6.8 MB",
    width: 700,
    height: 900,
  },
  {
    id: "public-speaking-masterclass",
    title: "Public Speaking for Women Leaders",
    category: "Voice & Presence",
    format: "Video Masterclass",
    priceUsd: 35,
    coverTheme: "light",
    description:
      "Structure, breath, and authority on stage or on camera—so your message lands without performing for approval.",
    inside: [
      "Five module HD curriculum",
      "Downloadable slide frameworks",
      "Warm-up and recovery audio",
      "Q&A vault from live cohorts",
    ],
    coverSrc: `${UNSPLASH}/photo-1478147427282-58a87a120781?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Speaker addressing an audience",
    fileMeta: "MP4 · 3.2 GB",
    width: 700,
    height: 800,
  },
  {
    id: "grant-writing-ngo",
    title: "Grant Writing for NGOs",
    category: "Institutional Partners",
    format: "Resource Pack",
    priceUsd: 45,
    coverTheme: "purple",
    description:
      "Templates, budgets, and narrative arcs tuned for foundations and bilateral funders—written with dignity for the communities you serve.",
    inside: [
      "Logic model starter kit",
      "Budget narrative boilerplates",
      "Theory of change worksheet set",
      "Sample proposals (sanitised)",
    ],
    coverSrc: `${UNSPLASH}/photo-1450101499163-c8848c66ca75?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Hands writing notes at a desk",
    fileMeta: "DOCX + XLSX + PDF · 22 MB",
    width: 700,
    height: 900,
  },
  {
    id: "quarterly-systems-checklist",
    title: "Quarterly Systems Review Checklist",
    category: "Operations",
    format: "PDF Guide",
    priceUsd: 5,
    coverTheme: "light",
    description:
      "A one-page ritual to audit what broke, what scaled, and what to cut—before you plan the next ninety days.",
    inside: [
      "Systems health scorecard",
      "Energy and capacity prompts",
      "Delegation and handoff audit",
      "Printable one-pager",
    ],
    coverSrc: `${UNSPLASH}/photo-1454165205744-3b78555e5572?w=700&q=82&auto=format&fit=crop`,
    coverAlt: "Planning documents and laptop on a desk",
    fileMeta: "PDF · 1.1 MB",
    width: 700,
    height: 800,
  },
];

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Mock Paystack-style confirmation; replace with Paystack Pop in production. */
function mockPaystackPopup(
  onSuccess: () => void,
  onDismiss: () => void,
) {
  if (typeof window === "undefined") {
    onDismiss();
    return;
  }
  const ok = window.confirm(
    "Mock Paystack checkout\n\nSimulate a successful payment?",
  );
  if (ok) {
    window.setTimeout(onSuccess, 500);
  } else {
    onDismiss();
  }
}

function CoverFace({
  resource,
  layoutId,
  layoutIdEnabled,
  className,
  sizes,
}: {
  resource: Resource;
  layoutId?: string;
  layoutIdEnabled: boolean;
  className?: string;
  sizes: string;
}) {
  const isPurple = resource.coverTheme === "purple";
  const overlay = isPurple
    ? "bg-linear-to-t from-iw-purple/65 via-iw-purple/20 via-[46%] to-transparent"
    : "bg-linear-to-t from-iw-white/70 via-white/15 via-[46%] to-transparent";

  const inner = (
    <div className="relative h-full w-full">
      <Image
        src={resource.coverSrc}
        alt={resource.coverAlt}
        fill
        className="object-cover"
        sizes={sizes}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${overlay}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-linear-to-t px-4 pb-4 pt-16 sm:px-5 sm:pb-5 sm:pt-20 ${
          isPurple
            ? "from-iw-purple/92 via-iw-purple/40 via-[28%] to-transparent"
            : "from-iw-white/92 via-white/35 via-[28%] to-transparent"
        }`}
      >
        <p
          className={`font-blueprint line-clamp-2 text-[9px] uppercase leading-snug tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em] ${
            isPurple ? "text-iw-gold/90" : "text-iw-purple/70"
          }`}
        >
          {resource.category}
        </p>
        <p
          className={`font-display text-balance text-lg font-semibold leading-[1.15] tracking-tight sm:text-xl ${
            isPurple ? "text-white" : "text-iw-purple"
          }`}
        >
          {resource.title}
        </p>
        <p
          className="font-blueprint text-[10px] uppercase tracking-[0.18em] text-iw-gold sm:text-[11px] sm:tracking-[0.2em]"
        >
          {resource.format} · {formatPrice(resource.priceUsd)}
        </p>
      </div>
    </div>
  );

  if (layoutIdEnabled && layoutId) {
    return (
      <motion.div layoutId={layoutId} className={className}>
        {inner}
      </motion.div>
    );
  }

  return <div className={className}>{inner}</div>;
}

function BookCard({
  resource,
  selectedId,
  onOpen,
  reduceMotion,
}: {
  resource: Resource;
  selectedId: string | null;
  onOpen: (r: Resource) => void;
  reduceMotion: boolean | null;
}) {
  const isActive = selectedId === resource.id;
  const layoutId = `vault-cover-${resource.id}`;
  const rm = reduceMotion === true;

  return (
    <div
      className="mx-auto w-full max-w-[280px] [perspective:1200px] sm:max-w-[300px]"
      style={{ perspective: "1200px" }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(resource)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(resource);
          }
        }}
        className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold focus-visible:ring-offset-2 focus-visible:ring-offset-iw-mist"
      >
        <motion.div
          className="relative origin-center"
          style={{ transformStyle: "preserve-3d" }}
          initial={false}
          animate={
            rm
              ? { rotateY: 0, rotateX: 0, scale: 1 }
              : { rotateY: -12, rotateX: 2, scale: 1 }
          }
          whileHover={
            rm
              ? undefined
              : {
                  rotateY: 0,
                  rotateX: 0,
                  scale: 1.055,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 24,
                    mass: 0.72,
                  },
                }
          }
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.8,
          }}
        >
          <div
            className="relative aspect-[3/4.1] rounded-xl shadow-[0_28px_56px_-14px_rgba(75,36,106,0.32),0_14px_28px_-12px_rgba(75,36,106,0.18),0_4px_12px_-4px_rgba(0,0,0,0.08)] ring-1 ring-iw-purple/12"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute -left-1.5 top-2 bottom-2 z-0 w-3 rounded-l-md bg-linear-to-r from-black/45 via-iw-purple/50 to-transparent opacity-80 shadow-[-8px_0_20px_rgba(75,36,106,0.35)]"
              style={{
                transform: "translateZ(-10px) rotateY(-22deg)",
                transformOrigin: "right center",
              }}
              aria-hidden
            />
            <CoverFace
              resource={resource}
              layoutId={layoutId}
              layoutIdEnabled={!isActive}
              sizes="(max-width: 640px) 85vw, 300px"
              className="relative z-[1] h-full w-full overflow-hidden rounded-xl"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function ResourceVault() {
  const reduceMotion = useReducedMotion();
  const dialogTitleId = useId();
  const [selected, setSelected] = useState<Resource | null>(null);
  const [paidMap, setPaidMap] = useState<Record<string, boolean>>({});
  const [payBusy, setPayBusy] = useState(false);

  const close = useCallback(() => {
    setSelected(null);
    setPayBusy(false);
  }, []);

  useEffect(() => {
    if (!selected) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, close]);

  const isPaid = selected ? paidMap[selected.id] === true : false;

  const handlePayment = () => {
    if (!selected || payBusy) return;
    setPayBusy(true);
    mockPaystackPopup(
      () => {
        setPaidMap((m) => ({ ...m, [selected.id]: true }));
        setPayBusy(false);
      },
      () => setPayBusy(false),
    );
  };

  return (
    <LayoutGroup>
      <div className="min-h-dvh bg-iw-mist pb-28">
        <div className="mx-auto max-w-7xl px-6 pt-6 sm:px-10 lg:px-14">
          <header className="mx-auto mb-16 max-w-2xl text-center sm:mb-20 lg:mb-24">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-iw-purple sm:text-5xl">
              The Resource Vault
            </h1>
            <p className="font-sans mt-4 text-lg text-iw-purple/75 sm:text-xl">
              Equipping your journey with systemic tools — and free reading to
              reason with clarity.
            </p>
          </header>

          <FreeArticlesSection />

          <h2 className="font-display mx-auto mb-12 max-w-2xl text-center text-2xl font-semibold tracking-tight text-iw-purple sm:mb-14 sm:text-3xl">
            The vault
          </h2>

          <ul className="grid grid-cols-1 justify-items-center gap-y-16 gap-x-12 sm:grid-cols-2 sm:gap-x-14 sm:gap-y-20 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-24 xl:grid-cols-4">
            {RESOURCES.map((r) => (
              <li key={r.id} className="w-full max-w-[300px] justify-self-center">
                <BookCard
                  resource={r}
                  selectedId={selected?.id ?? null}
                  onOpen={setSelected}
                  reduceMotion={reduceMotion}
                />
              </li>
            ))}
          </ul>

          <p className="font-sans mt-20 text-center text-sm text-iw-purple/55 sm:mt-24">
            <Link
              href="/"
              className="font-accent font-semibold uppercase tracking-widest underline decoration-iw-gold/50 underline-offset-4"
            >
              ← Back to home
            </Link>
          </p>
        </div>

        <AnimatePresence>
          {selected ? (
            <motion.div
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute inset-0 bg-iw-purple/55 backdrop-blur-md"
              />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={dialogTitleId}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 8 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                  mass: 0.85,
                }}
                className="relative z-10 flex max-h-[min(92dvh,880px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-iw-purple/15 bg-iw-white shadow-[0_32px_64px_-16px_rgba(75,36,106,0.35),0_16px_32px_-12px_rgba(75,36,106,0.2)] md:flex-row"
              >
                <div className="relative w-full shrink-0 md:w-[min(44%,320px)] md:self-stretch">
                  <div className="relative aspect-[3/4] w-full md:absolute md:inset-0 md:aspect-auto md:h-full">
                    <CoverFace
                      resource={selected}
                      layoutId={`vault-cover-${selected.id}`}
                      layoutIdEnabled
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="relative h-full min-h-[280px] w-full overflow-hidden md:rounded-l-2xl md:rounded-r-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="absolute right-3 top-3 z-[2] rounded-full bg-iw-white/95 px-3 py-1.5 font-accent text-xs font-bold uppercase tracking-widest text-iw-purple shadow-lg ring-1 ring-iw-purple/10 hover:bg-white md:right-auto md:left-3"
                  >
                    Close
                  </button>
                </div>

                <div className="flex max-h-[min(60dvh,560px)] flex-1 flex-col gap-4 overflow-y-auto p-6 sm:p-8 md:max-h-[min(92dvh,880px)]">
                  <div>
                    <p className="font-blueprint mb-1 text-[10px] uppercase tracking-[0.2em] text-iw-purple/50">
                      {selected.category}
                    </p>
                    <p className="font-blueprint mb-2 text-[10px] uppercase tracking-[0.18em] text-iw-purple/45">
                      {selected.format} · {selected.fileMeta}
                    </p>
                    <h2
                      id={dialogTitleId}
                      className="font-display text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl"
                    >
                      {selected.title}
                    </h2>
                    <p className="font-display mt-3 text-3xl font-semibold text-iw-gold">
                      {formatPrice(selected.priceUsd)}
                    </p>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-iw-purple/78 sm:text-base">
                    {selected.description}
                  </p>
                  <div>
                    <h3 className="font-accent mb-2 text-xs font-bold uppercase tracking-widest text-iw-purple">
                      What&apos;s inside
                    </h3>
                    <ul className="font-sans space-y-2 text-sm text-iw-purple/85">
                      {selected.inside.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="text-iw-gold" aria-hidden>
                            ·
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!isPaid ? (
                    <button
                      type="button"
                      disabled={payBusy}
                      onClick={handlePayment}
                      className="font-accent mt-auto w-full rounded-sm bg-iw-purple py-3.5 text-sm font-bold uppercase tracking-widest text-iw-gold transition-[filter,opacity] hover:brightness-110 disabled:opacity-60"
                    >
                      {payBusy ? "Opening checkout…" : "Buy"}
                    </button>
                  ) : (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(
                          "Demo: download would start here. Production uses signed URLs + Supabase Realtime for purchase state.",
                        );
                      }}
                      className="font-accent mt-auto flex min-h-12 w-full items-center justify-center rounded-sm border-2 border-iw-gold bg-iw-gold/10 py-3.5 text-center text-sm font-bold uppercase tracking-widest text-iw-purple no-underline transition-colors hover:bg-iw-gold/20"
                    >
                      Download now
                    </a>
                  )}

                  <p className="font-blueprint text-center text-[10px] leading-relaxed text-iw-purple/45">
                    Checkout is mocked for this build. In production, Paystack
                    confirms payment and access can sync via a{" "}
                    <span className="text-iw-purple/60">Supabase Realtime</span>{" "}
                    subscription—here we use local state to preview the unlock.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
