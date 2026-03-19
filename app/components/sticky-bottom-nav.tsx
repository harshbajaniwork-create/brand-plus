"use client";

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { StickyPill } from "./sticky-pill";

export function StickyBottomNav() {
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [displayLabel, setDisplayLabel] = useState("Studio");
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Active work label + href swap with slide animation ──
  useEffect(() => {
    const handler = (e: CustomEvent<{ label: string; href?: string }>) => {
      const { label, href } = e.detail;
      const nextLabel = label ?? "Studio";

      if (nextLabel === displayLabel && href === activeHref) return;

      setAnimating(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setDisplayLabel(nextLabel);
        setActiveHref(href || null);
        setAnimating(false);
      }, 250);
    };

    window.addEventListener("activeWorkChange", handler as EventListener);
    return () => {
      window.removeEventListener("activeWorkChange", handler as EventListener);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayLabel, activeHref]);

  // ── Scroll-based section detection ──
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          let label = "Studio";
          let href: string | undefined;

          if (sectionId === "studio") {
            label = "Studio";
          } else if (sectionId === "portfolio") {
            label = "Studio";
            href = "#portfolio";
          } else if (entry.target.classList.contains("works-grid")) {
            label = "All Work";
            href = "#portfolio";
          } else if (entry.target.classList.contains("vision-section")) {
            label = "Vision";
            href = "#vision";
          }

          window.dispatchEvent(
            new CustomEvent("activeWorkChange", { detail: { label, href } }),
          );
        }
      });
    }, observerOptions);

    // Observer for individual work items - now reads href from data attribute
    const workItemOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px",
      threshold: 0,
    };

    const workItemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const workTitle = entry.target.getAttribute("data-work-title");
          const workHref = entry.target.getAttribute("data-work-href");

          if (workTitle) {
            window.dispatchEvent(
              new CustomEvent("activeWorkChange", {
                detail: {
                  label: workTitle,
                  href: workHref || undefined,
                },
              }),
            );
          }
        }
      });
    }, workItemOptions);

    // Observe sections
    const studioSection = document.getElementById("studio");
    if (studioSection) sectionObserver.observe(studioSection);

    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) sectionObserver.observe(portfolioSection);

    // Observe individual work items
    const workItems = document.querySelectorAll("[data-work-title]");
    workItems.forEach((item) => workItemObserver.observe(item));

    const worksGrid = document.querySelector(".works-grid");
    if (worksGrid) sectionObserver.observe(worksGrid);

    const visionSection = document.querySelector(".vision-section");
    if (visionSection) sectionObserver.observe(visionSection);

    return () => {
      sectionObserver.disconnect();
      workItemObserver.disconnect();
    };
  }, []);

  // Determine the final href for the Discover link
  const discoverHref = activeHref || "#portfolio";

  return (
    <StickyPill>
      {/* ── Left label (Studio → project name) ── */}
      <div className="h-[18px] overflow-hidden flex items-center min-w-[80px] justify-center">
        <span
          className="block text-white/50 text-[14px] uppercase tracking-widest whitespace-nowrap
                     transition-[opacity,transform] duration-250 ease-out"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(6px)" : "translateY(0px)",
          }}
        >
          {displayLabel}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-3.5 bg-white/20 shrink-0" />

      {/* ── Discover + ── */}
      <Link
        to={discoverHref}
        className="text-white text-[14px] uppercase tracking-widest font-medium
                   flex items-center gap-1.5 no-underline
                   hover:opacity-70 transition-opacity"
      >
        Discover
        <span className="text-white/60 font-normal">+</span>
      </Link>
    </StickyPill>
  );
}
