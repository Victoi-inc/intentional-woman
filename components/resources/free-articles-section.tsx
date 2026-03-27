"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useCallback, useId, useState } from "react";
import {
  FREE_ARTICLES,
  type FreeArticle,
} from "@/lib/resources/free-articles";

function ArticleCard({
  article,
  open,
  onToggle,
  reduceMotion,
}: {
  article: FreeArticle;
  open: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
}) {
  const panelId = useId();
  const btnId = useId();

  return (
    <article className="overflow-hidden rounded-xl border border-iw-purple/12 bg-iw-white shadow-[0_12px_40px_-20px_rgba(75,36,106,0.2)]">
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6">
        <div className="min-w-0 flex-1">
          <p className="font-blueprint text-[10px] uppercase tracking-[0.22em] text-iw-purple/45">
            Free to read · ~{article.minutes} min
          </p>
          <h2 className="font-display mt-2 text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl">
            {article.title}
          </h2>
          <p className="font-sans mt-1.5 text-sm leading-relaxed text-iw-purple/72 sm:text-base">
            {article.subtitle}
          </p>
        </div>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="font-accent inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-sm border-2 border-iw-purple/25 bg-iw-mist/50 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-iw-purple transition-[border-color,background-color,color] hover:border-iw-gold hover:bg-iw-gold/10 hover:text-iw-purple focus:outline-none focus-visible:ring-2 focus-visible:ring-iw-gold sm:self-center"
        >
          {open ? "Close" : "Read"}
          <ChevronDown
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-iw-purple/10"
          >
            <div className="space-y-4 px-5 pb-6 pt-4 sm:px-6 sm:pb-7">
              {article.paragraphs.map((p, i) => (
                <p
                  key={`${article.id}-${i}`}
                  className="font-sans text-sm leading-[1.7] text-iw-purple/82 sm:text-[15px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export function FreeArticlesSection() {
  const reduceMotion = useReducedMotion();
  const rm = reduceMotion === true;
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section
      className="mx-auto mb-20 max-w-3xl sm:mb-24"
      aria-labelledby="free-articles-heading"
    >
      <div className="mb-8 text-center sm:mb-10">
        <p className="font-accent text-[10px] font-bold uppercase tracking-[0.35em] text-iw-gold">
          Reading room
        </p>
        <h2
          id="free-articles-heading"
          className="font-display mt-3 text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl"
        >
          Free articles to reason
        </h2>
        <p className="font-sans mx-auto mt-3 max-w-xl text-base leading-relaxed text-iw-purple/72 sm:text-lg">
          Short pieces to read slowly — for reflection, not performance. No
          checkout; just thinking room.
        </p>
      </div>

      <ul className="flex flex-col gap-5 sm:gap-6">
        {FREE_ARTICLES.map((article) => (
          <li key={article.id}>
            <ArticleCard
              article={article}
              open={openId === article.id}
              onToggle={() => toggle(article.id)}
              reduceMotion={rm}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
