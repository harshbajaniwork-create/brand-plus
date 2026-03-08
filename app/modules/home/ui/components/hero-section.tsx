"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { initHeroParallax, runHeroEntrance } from "@/lib/animations/hero-anim";

/**
 * HeroSection
 * Exact recreation of the inspo hero section (telhaclarke.com.au) + Brand CTA.
 *
 * Characteristics:
 *  - Full-screen (100vh)
 *  - Parallax background image (pure JS)
 *  - Large centered-left typography: "Driven by History, Centered on Context, Embracing Culture"
 *  - brand+ CTA button using the new #752517 color
 *  - "[Scroll down]" hint at bottom
 *  - Black overlay for white navbar text visibility
 */
export function HeroSection() {
  useEffect(() => {
    const cleanupParallax = initHeroParallax();
    runHeroEntrance();

    return () => {
      if (cleanupParallax) cleanupParallax();
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* 
          Parallax Background Image 
          We use a div with a child image so we can transform the image independently.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-parallax-img absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop&q=80"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/24" />
        </div>
      </div>

      {/* 
          Main Content Container
          Grid-based layout matching the inspo site's 12-column grid.
      */}
      <div className="relative h-full px-[var(--margin)] grid grid-cols-6 md:grid-cols-12 items-center pointer-events-none">
        <div className="col-span-full md:col-start-1 md:col-end-10 xl:col-end-9 flex flex-col items-start gap-12">
          <h1
            className="hero-title body-48 md:body-72 xl:body-100 text-white font-normal uppercase leading-[1.1] opacity-0"
            style={{ fontFamily: "Europa-Grotesk, Inter, sans-serif" }}
          >
            Nachhaltig
            <br />
            Gestalten
          </h1>

          <div
            className="hero-cta-wrapper pointer-events-auto opacity-0"
            style={{
              transition: "opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.8s",
            }}
          >
            <Button variant="cta" size="lg" className="px-10 py-8">
              Brandschutz planbar
            </Button>
          </div>
        </div>
      </div>

      {/* 
          Bottom Hint ("Scroll down")
          Sticky/Bottom-aligned matching inspo.
      */}
      <div className="absolute bottom-[var(--margin)] left-[var(--margin)] right-[var(--margin)] grid grid-cols-6 md:grid-cols-12 items-end text-white pointer-events-none">
        <div className="hero-bottom col-span-full opacity-0 flex justify-between items-end">
          {/* Scroll Down */}
          <div className="flex gap-2 body-16 uppercase opacity-52">
            <span>[</span>
            <span>Scroll down</span>
            <span>]</span>
          </div>

          {/* Minimal Brand Identifier (Optional, matches inspo's layout) */}
          <div className="hidden md:block col-start-10 col-end-13 body-16 md:body-20 max-w-[24rem]">
            Design studio / Branding & Identity
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Helper to reveal the CTA wrapper after load
            setTimeout(() => {
              const cta = document.querySelector('.hero-cta-wrapper');
              if (cta) cta.style.opacity = '1';
            }, 1000);
          `,
        }}
      />
    </section>
  );
}
