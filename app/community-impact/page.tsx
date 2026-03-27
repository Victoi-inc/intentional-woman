import type { Metadata } from "next";

import { HallOfImpact } from "@/components/community-impact/hall-of-impact";

export const metadata: Metadata = {
  title: "Community Impact | Intentional Woman",
  description:
    "A legacy of intentionality—annual milestones, the Power Walk, mentors and keynote speakers, and the achievements that scaled our reach.",
};

export default function CommunityImpactPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <HallOfImpact />
    </main>
  );
}
