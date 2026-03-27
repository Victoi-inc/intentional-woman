import type { Metadata } from "next";
import { BlueprintJourney } from "@/components/model/blueprint-journey";

export const metadata: Metadata = {
  title: "Our Model | Intentional Woman",
  description:
    "Identity, capability, income, and leadership: IWOMAN’s structured model for sustainable economic empowerment—skills, systems, and real outcomes.",
};

export default function ModelPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <BlueprintJourney />
    </main>
  );
}
