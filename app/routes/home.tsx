import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";
import { Footer } from "@/components/footer";
import { HomeView } from "@/modules/home/ui/view/home-view";
import { LoadingScreen } from "@/modules/home/ui/components/loading-screen";
import { HeroSection } from "@/modules/home/ui/components/hero-section";
import { StudioSection } from "@/modules/home/ui/components/studio-section";
import SelectedWorks from "@/modules/home/ui/components/portfolio-section";
import WorksGrid from "@/modules/home/ui/components/works-grid";
import VisionSection from "@/modules/home/ui/components/vision-section";
import ProcessSection from "@/modules/home/ui/components/process-section";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "brand + | Innovative Branding & Design" },
    {
      name: "description",
      content:
        "Creating innovative branding solutions and design services that inspire and transform businesses.",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* Loading screen — runs animation on mount, then disappears */}
      <LoadingScreen />

      {/* Sticky navigation */}
      <Navigation />

      {/* Sticky bottom navigation */}
      <StickyBottomNav />

      {/* Main page content */}
      <div className="relative w-full bg-white">
        <main>
          <HeroSection />
          <div id="studio">
            <StudioSection />
          </div>
          <div id="portfolio">
            <SelectedWorks />
          </div>
          {/* <WorksGrid /> */}
          <VisionSection />
          <ProcessSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
