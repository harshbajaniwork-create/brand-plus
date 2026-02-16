import { HeroSection } from "../components/hero-section";
import { ServicesSection } from "../components/services-section";
import { PortfolioSection } from "../components/portfolio-section";
import { AboutSection } from "../components/about-section";
import { StatsSection } from "../components/stats-section";
import { TeamSection } from "../components/team-section";
import { TestimonialsSection } from "../components/testimonials-section";
import { BlogSection } from "../components/blog-section";


export function HomeView() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <StatsSection />
      <TeamSection />
      <TestimonialsSection />
      <BlogSection />
    </main>
  );
}
