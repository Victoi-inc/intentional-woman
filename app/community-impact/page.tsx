import type { Metadata } from "next";

import { HallOfImpact } from "@/components/community-impact/hall-of-impact";

export const metadata: Metadata = {
  title: "Community Impact | Intentional Woman",
  description:
    "Intentional Woman Conference editions—No More Excuses (2023), Invest in Yourself. Grow (2024), Arise and Shine (2025), and The Audacity to Win coming soon—plus mentors, Power Walk, and impact milestones.",
};

export default function CommunityImpactPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <HallOfImpact />
    </main>
  );
}
