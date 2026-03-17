"use client";

import { StudioHero } from "../components/studio-hero";
import { StudioQuote } from "../components/studio-quote";
import { StudioTeam } from "../components/studio-team";
import { StudioValuesVision } from "../components/studio-values-vision";
import { StudioAwards } from "../components/studio-awards";
import { StudioJobs } from "../components/studio-jobs";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
/**
 * StudioView — assembles all studio page sections in order:
 * 1. Hero (large heading left, sticky paragraph, tall image right)
 * 2. Quote (large centered blockquote)
 * 3. Team (hover + scroll-driven member activation with portraits)
 * 4. Values (full-width image shrinks from left) + Vision (3-state reveal)
 * 5. Awards (table)
 * 6. Jobs (paragraph + arrow CTA rows)
 */
export function StudioView() {
  return (
    <div className="relative w-full bg-white overflow-x-clip">
      <Navigation forceTheme="light" />
      <StudioHero />
      <StudioQuote />
      <StudioTeam />
      <StudioValuesVision />
      <StudioAwards />
      <StudioJobs />
      <Footer />
    </div>
  );
}
