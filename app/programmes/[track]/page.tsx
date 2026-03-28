import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgrammeDetailNodes } from "@/components/programmes/programme-detail-nodes";
import {
  PROGRAMME_TRACKS,
  type ProgrammeTrackId,
  getTrackById,
} from "@/lib/programmes/registration-config";

const VALID_IDS: readonly ProgrammeTrackId[] = [
  "corporate",
  "personal",
  "cohort",
];

function isTrackId(s: string): s is ProgrammeTrackId {
  return (VALID_IDS as readonly string[]).includes(s);
}

export function generateStaticParams() {
  return PROGRAMME_TRACKS.map((t) => ({ track: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track: slug } = await params;
  if (!isTrackId(slug)) {
    return { title: "Programme | Intentional Woman" };
  }
  const track = getTrackById(slug);
  return {
    title: `${track.title} | Programmes | Intentional Woman`,
    description: track.listingSummary,
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: slug } = await params;
  if (!isTrackId(slug)) notFound();

  const track = getTrackById(slug);

  return (
    <main className="flex min-h-0 flex-1 flex-col scroll-mt-20 bg-iw-mist pt-16 sm:pt-20">
      <article className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-8 sm:pb-24 sm:pt-12 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/programmes"
            className="font-accent text-xs font-bold uppercase tracking-[0.22em] text-iw-purple/70 no-underline transition-colors hover:text-iw-gold"
          >
            ← Programmes
          </Link>
        </nav>

        <header className="mb-10 border-b border-iw-purple/10 pb-10">
          <p className="font-accent mb-3 text-xs font-bold uppercase tracking-[0.35em] text-iw-gold">
            Full programme outline
          </p>
          <h1 className="font-display text-balance text-3xl font-semibold tracking-tight text-iw-purple sm:text-4xl md:text-[2.35rem] md:leading-tight">
            {track.title}
          </h1>
          <p className="font-sans mt-5 text-lg leading-relaxed text-iw-purple/78">
            {track.listingSummary}
          </p>
        </header>

        <div className="programme-detail-body">
          <ProgrammeDetailNodes nodes={track.readMore} />
        </div>

        <footer className="mt-16 border-t border-iw-purple/10 pt-12">
          <div className="rounded-2xl border border-iw-gold/35 bg-linear-to-br from-iw-purple/[0.06] to-iw-white p-8 shadow-sm sm:p-10">
            <p className="font-display text-xl font-semibold text-iw-purple sm:text-2xl">
              Ready to register?
            </p>
            <p className="font-sans mt-3 text-base leading-relaxed text-iw-purple/75">
              Continue to the programmes page with this track selected, complete
              the registration form, and we will follow up with enrolment
              options.
            </p>
            <Link
              href={`/programmes?track=${track.id}#programme-registration`}
              className="font-accent mt-8 inline-flex min-h-[3.25rem] w-full items-center justify-center rounded-sm bg-iw-gold px-8 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-iw-purple transition-[filter] hover:brightness-105 sm:w-auto"
            >
              Register for this track
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
