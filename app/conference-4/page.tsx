import type { Metadata } from "next";
import { ConferenceFourSponsorPage } from "@/components/conference-4/conference-four-sponsor-page";

export const metadata: Metadata = {
  title:
    "Fund Access — Scale Impact | The Intentional Woman Conference — 4th Edition",
  description:
    "Fund a woman's access to the 4th edition of The Intentional Woman Conference. Every 25,000 FCFA scales impact for one more woman.",
  openGraph: {
    title:
      "Fund Access — Scale Impact | The Intentional Woman Conference — 4th Edition",
    description:
      "Fund a woman's access to the 4th edition of The Intentional Woman Conference. Every 25,000 FCFA scales impact for one more woman.",
  },
};

export default function ConferenceFourRoute() {
  return (
    <main className="flex flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <ConferenceFourSponsorPage />
    </main>
  );
}
