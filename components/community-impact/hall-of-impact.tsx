"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { MENTORS, TIMELINE, WALK_FRAMES } from "./community-impact-data";
import { ImpactYearChapter } from "./impact-year-chapter";
import { PowerWalkSection } from "./power-walk-section";

function SectionIntro({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
      <p className="font-blueprint mb-2 text-[10px] uppercase tracking-[0.24em] text-iw-gold sm:text-[11px]">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl">
        {title}
      </h2>
      <p className="font-sans mt-3 text-sm leading-relaxed text-iw-purple/72 sm:text-base">
        {subtitle}
      </p>
    </header>
  );
}

function MentorsGallery() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"
    >
      <SectionIntro
        eyebrow="Voices that shaped the room"
        title="Mentors & keynote speakers"
        subtitle="Global mentors and plenary voices who carried the framework from stage to sidewalk—with rigor, warmth, and receipts."
      />
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
        {MENTORS.map((m) => (
          <li key={m.name}>
            <article className="group text-center">
              <div
                className="relative mx-auto aspect-square max-w-[200px] overflow-hidden rounded-[1.35rem] bg-iw-purple/10 shadow-md ring-2 ring-transparent transition-[filter,box-shadow,ring-color] duration-300 group-hover:ring-iw-gold sm:max-w-none"
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                />
              </div>
              <p className="font-accent mt-3 text-sm font-bold tracking-tight text-iw-purple sm:text-base">
                {m.name}
              </p>
              <p className="font-blueprint mt-1 text-[10px] uppercase leading-snug tracking-[0.14em] text-iw-purple/55 sm:text-[11px] sm:tracking-[0.16em]">
                {m.kind}
              </p>
              <p className="font-blueprint mt-1.5 text-[11px] leading-snug text-iw-purple/75 sm:text-xs">
                {m.title}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}

function AchievementBento() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10"
    >
      <SectionIntro
        eyebrow="Beyond the main stage"
        title="Achievement cards"
        subtitle="Milestones that did not always make the banner—but rewrote what was possible for the women we serve."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-2 lg:gap-5">
        <article className="flex flex-col justify-between rounded-2xl border border-iw-purple/12 bg-iw-white p-6 shadow-sm md:col-span-2 md:row-span-2 lg:col-span-3 lg:row-span-2 lg:p-8">
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-iw-purple sm:text-3xl">
              Financial literacy milestone
            </h3>
            <div className="mt-3 h-px w-12 bg-iw-gold" aria-hidden />
            <p className="font-sans mt-4 text-sm leading-relaxed text-iw-purple/75 sm:text-base">
              Cohort after cohort moved from anxiety to agency—budgeting labs, investment literacy, and
              board-ready financial storytelling.
            </p>
          </div>
          <p className="font-display mt-8 text-4xl font-semibold text-iw-gold sm:text-5xl lg:mt-10">
            400+
            <span className="mt-2 block font-accent text-xs font-bold uppercase tracking-[0.18em] text-iw-purple/60 sm:text-sm">
              Women certified
            </span>
          </p>
        </article>

        <article className="overflow-hidden rounded-2xl border border-iw-purple/12 bg-iw-white shadow-sm md:col-span-2 lg:col-span-3">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
              alt="Smartphone showing an app interface"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="font-display text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl">
              Launch of the IW app
            </h3>
            <p className="font-sans mt-2 text-sm leading-relaxed text-iw-purple/72">
              A single front door for programmes, community, and resources—built so intention travels with
              you, not the other way around.
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-iw-purple/12 bg-iw-white shadow-sm md:col-span-2 lg:col-span-3 lg:flex lg:min-h-[200px]">
          <div className="relative aspect-[16/10] w-full shrink-0 lg:aspect-auto lg:w-[min(44%,280px)]">
            <Image
              src="https://images.unsplash.com/photo-1578894447457-a095652fe59d?auto=format&fit=crop&w=1000&q=80"
              alt="Coastal city waterfront at dusk"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 280px"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
            <h3 className="font-display text-xl font-semibold tracking-tight text-iw-purple sm:text-2xl">
              Regional outreach
            </h3>
            <p className="font-blueprint mt-1 text-[10px] uppercase tracking-[0.2em] text-iw-gold sm:text-[11px]">
              Douala · Cameroon
            </p>
            <p className="font-sans mt-3 text-sm leading-relaxed text-iw-purple/72">
              Neighbourhood convenings, translator-led circles, and local NGO partnerships that rooted the
              model where the need was loudest.
            </p>
          </div>
        </article>
      </div>
    </motion.section>
  );
}

export function HallOfImpact() {
  return (
    <div className="bg-iw-mist">
      <div className="sticky top-16 z-40 border-b border-iw-purple/10 bg-iw-mist/92 py-3.5 backdrop-blur-md sm:top-[4.5rem]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 text-center font-accent text-[10px] font-bold uppercase leading-snug tracking-[0.18em] text-iw-purple sm:gap-x-4 sm:text-xs sm:tracking-[0.2em]">
          <span>3 Conference editions</span>
          <span className="text-iw-gold" aria-hidden>
            //
          </span>
          <span>4th · The Audacity to Win · Soon</span>
          <span className="text-iw-gold" aria-hidden>
            //
          </span>
          <span>50+ Mentors</span>
          <span className="text-iw-gold" aria-hidden>
            //
          </span>
          <span>1,200+ Lives changed</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-6 pt-10 text-center sm:px-8 sm:pb-8 sm:pt-14 lg:px-10">
        <p className="font-blueprint mb-3 text-[10px] uppercase tracking-[0.28em] text-iw-gold sm:text-[11px]">
          Community impact
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-iw-purple sm:text-5xl lg:text-6xl">
          A Legacy of Intentionality
        </h1>
        <p className="font-sans mx-auto mt-5 max-w-2xl text-base leading-relaxed text-iw-purple/75 sm:text-lg">
          The Intentional Woman Conference in three themes so far—from “No More Excuses” to “Arise and
          Shine”—with a fourth chapter, “The Audacity to Win,” on the horizon.
        </p>
      </div>

      <div className="space-y-16 pb-20 sm:space-y-20 sm:pb-24 lg:space-y-24 lg:pb-28">
        <ImpactYearChapter {...TIMELINE.y2025} priority />
        <ImpactYearChapter {...TIMELINE.y2024} />
        <ImpactYearChapter {...TIMELINE.y2023} />
        <ImpactYearChapter {...TIMELINE.upcoming} />

        <PowerWalkSection frames={WALK_FRAMES} />

        <MentorsGallery />

        <AchievementBento />

        <p className="font-sans px-5 pb-16 text-center text-sm text-iw-purple/55 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="font-accent font-semibold uppercase tracking-widest underline decoration-iw-gold/50 underline-offset-4"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
