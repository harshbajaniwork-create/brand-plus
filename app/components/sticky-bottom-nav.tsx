"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

import { StickyPill } from "./sticky-pill";

export function StickyBottomNav() {
  const [activeWork, setActiveWork] = useState<string | null>(null);
  const [displayLabel, setDisplayLabel] = useState("Studio");
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Active work label swap with slide animation ──
  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      const incoming = e.detail;
      const next = incoming ?? "Studio";
      if (next === displayLabel) return;

      setAnimating(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setDisplayLabel(next);
        setActiveWork(incoming);
        setAnimating(false);
      }, 250);
    };

    window.addEventListener("activeWorkChange", handler as EventListener);
    return () => {
      window.removeEventListener("activeWorkChange", handler as EventListener);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayLabel]);

  // ── Scroll-based section detection ──
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          let label = "Studio";

          if (sectionId === "studio") {
            label = "Studio";
          } else if (sectionId === "portfolio") {
            label = "Studio"; // Default for portfolio section
          } else if (entry.target.classList.contains("works-grid")) {
            label = "All Work";
          } else if (entry.target.classList.contains("vision-section")) {
            label = "Vision";
          }

          window.dispatchEvent(
            new CustomEvent("activeWorkChange", { detail: label }),
          );
        }
      });
    }, observerOptions);

    // Separate observer for individual work items with more sensitive detection
    const workItemOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // Trigger when work item is more centered
      threshold: 0,
    };

    const workItemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const workTitle = entry.target.getAttribute("data-work-title");
          if (workTitle) {
            window.dispatchEvent(
              new CustomEvent("activeWorkChange", { detail: workTitle }),
            );
          }
        }
      });
    }, workItemOptions);

    // Observe studio section
    const studioSection = document.getElementById("studio");
    if (studioSection) sectionObserver.observe(studioSection);

    // Observe portfolio section
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) sectionObserver.observe(portfolioSection);

    // Observe individual work items
    const workItems = document.querySelectorAll("[data-work-title]");
    workItems.forEach((item) => workItemObserver.observe(item));

    // Observe works grid
    const worksGrid = document.querySelector(".works-grid");
    if (worksGrid) sectionObserver.observe(worksGrid);

    // Observe vision section
    const visionSection = document.querySelector(".vision-section");
    if (visionSection) sectionObserver.observe(visionSection);

    return () => {
      sectionObserver.disconnect();
      workItemObserver.disconnect();
    };
  }, []);

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
        to={
          activeWork
            ? `/works/${activeWork.toLowerCase().replace(/\s+/g, "-")}`
            : "#portfolio"
        }
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
