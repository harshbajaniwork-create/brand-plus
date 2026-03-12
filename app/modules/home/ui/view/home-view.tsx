import { HeroSection } from "../components/hero-section";
import { StudioSection } from "../components/studio-section";

import SelectedWorks from "../components/portfolio-section";
import WorksGrid from "../components/works-grid";
import VisionSection from "../components/vision-section";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";

export function HomeView() {
  return (
    <>
      {/* home page */}
      <HeroSection />
      <div id="studio">
        <StudioSection />
      </div>
      <div id="portfolio">
        <SelectedWorks />
      </div>
      <WorksGrid />
      <VisionSection />
      <StickyBottomNav />
    </>
  );
}
