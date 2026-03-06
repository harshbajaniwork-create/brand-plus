import { HeroSection } from "../components/hero-section";
import { StudioSection } from "../components/studio-section";
import { ServicesSection } from "../components/services-section";
import { PortfolioSection } from "../components/portfolio-section";
import { AboutSection } from "../components/about-section";
import { StatsSection } from "../components/stats-section";
import { TeamSection } from "../components/team-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { BlogSection } from "../components/blog-section";
import { StickyBottomNav } from "@/components/sticky-bottom-nav";

export function HomeView() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div id="studio">
        <StudioSection />
      </div>
      <ServicesSection />
      <div id="portfolio">
        <PortfolioSection />
      </div>
      <AboutSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
      <StickyBottomNav />
    </main>
  );
}
