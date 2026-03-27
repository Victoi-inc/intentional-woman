"use client";

import { FeaturedProgramme } from "./featured-programme";
import { LatestResource } from "./latest-resource";
import { ModelTeaser } from "./model-teaser";
import { PartnershipInvite } from "./partnership-invite";
import { PortalHero } from "./portal-hero";
import { AboutIntentionalWoman } from "./about-intentional-woman";
import { StatTicker } from "./stat-ticker";
import { SupportAccess } from "./support-access";

export function HomePage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-iw-mist">
      <main className="flex flex-1 flex-col">
        <PortalHero />
        <AboutIntentionalWoman />
        <ModelTeaser />
        <StatTicker />
        <FeaturedProgramme />
        <PartnershipInvite />
        <LatestResource />
        <SupportAccess />
      </main>
    </div>
  );
}
