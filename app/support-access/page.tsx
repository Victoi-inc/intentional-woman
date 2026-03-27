import type { Metadata } from "next";
import { BridgeSupportPage } from "@/components/support-access/bridge-support-page";

export const metadata: Metadata = {
  title: "Support Access | Expanding Access, Scaling Impact | Intentional Woman",
  description:
    "Sponsor a woman, fund a cohort, or partner strategically—expand access to IWOMAN programmes and measurable impact.",
};

export default function SupportAccessPage() {
  return (
    <main className="flex flex-1 flex-col scroll-mt-20 pt-16 sm:pt-20">
      <BridgeSupportPage />
    </main>
  );
}
