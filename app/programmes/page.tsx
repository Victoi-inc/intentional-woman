import type { Metadata } from "next";
import { ProgrammesEngine } from "@/components/programmes/programmes-engine";

export const metadata: Metadata = {
  title: "Programmes | Intentional Woman",
  description:
    "Corporate solutions, 1:1 personal development, and cohort group programmes—read full outlines, then register for the track and programmes you want to explore.",
};

export default function ProgrammesPage() {
  return (
    <main className="flex flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <ProgrammesEngine />
    </main>
  );
}
