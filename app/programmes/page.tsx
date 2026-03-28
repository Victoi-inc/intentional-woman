import type { Metadata } from "next";
import { Suspense } from "react";
import { ProgrammesEngine } from "@/components/programmes/programmes-engine";

export const metadata: Metadata = {
  title: "Programmes | Intentional Woman",
  description:
    "Corporate solutions, 1:1 personal development, and cohort group programmes—read full outlines, then register for the track and programmes you want to explore.",
};

function ProgrammesFallback() {
  return (
    <div className="min-h-dvh bg-iw-mist" aria-hidden>
      <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 sm:pt-14 lg:px-10">
        <div className="mx-auto mb-14 h-8 max-w-md animate-pulse rounded bg-iw-purple/10 sm:mb-16" />
        <div className="h-64 rounded-2xl bg-iw-white/60 shadow-sm ring-1 ring-iw-purple/5" />
      </div>
    </div>
  );
}

export default function ProgrammesPage() {
  return (
    <main className="flex flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <Suspense fallback={<ProgrammesFallback />}>
        <ProgrammesEngine />
      </Suspense>
    </main>
  );
}
