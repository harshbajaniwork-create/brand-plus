"use client";

import { ProcessHeroText } from "../components/process-hero-text";
import { ProcessParallaxImage } from "../components/process-parallax-image";
import { ProcessQuote } from "../components/process-quote";
import { ProcessPhilosophy } from "../components/process-philosophy";
import { ProcessInitiatives } from "../components/process-initiatives";
import { ProcessAccreditations } from "../components/process-accreditations";

/**
 * ProcessView — orchestrates all process page sections in order.
 *
 * Page flow:
 * 1. Hero text (large mixed gray/black intro)
 * 2. Parallax image (full-width architectural photo)
 * 3. Quote (bold centered blockquote)
 * 4. 01 Philosophy (2-column text + side-by-side images)
 * 5. 02 Initiatives (stacking scroll animation × 4 cards)
 * 6. 03 Accreditations (certifications list)
 */
export function ProcessView() {
  return (
    <div
      data-page-view
      className="relative w-full bg-white overflow-x-clip"
    >
      {/* 1 — Intro text */}
      <ProcessHeroText />

      {/* 2 — Parallax image */}
      <ProcessParallaxImage />

      {/* 3 — Quote */}
      <ProcessQuote />

      {/* 4 — 01 Our Philosophy */}
      <ProcessPhilosophy />

      {/* 5 — 02 Our Initiatives (stacking cards) */}
      <ProcessInitiatives />

      {/* 6 — 03 Accreditations */}
      <ProcessAccreditations />
    </div>
  );
}
