"use client";

import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Link } from "react-router";

/**
 * StickyBottomNav
 * A floating pill-shaped navigation widget that appears after the Hero Section.
 * Contains "Studio" and "Discover +" links as seen in the inspo design.
 */
export function StickyBottomNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById("app") ?? window;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.8;
      const y =
        scrollEl instanceof Window
          ? scrollEl.scrollY
          : (scrollEl as HTMLElement).scrollTop;
      setIsVisible(y > threshold);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-12 left-1/2 -translate-x-1/2 z-100 transition-all duration-700 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none",
      )}
    >
      <div className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-8 shadow-2xl border border-white/10">
        <Link
          to="#studio"
          className="text-white/52 hover:text-white transition-colors body-16 uppercase tracking-tight"
        >
          Studio
        </Link>
        <div className="w-px h-4 bg-white/20" />
        <Link
          to="#portfolio"
          className="text-white hover:text-white/80 transition-colors body-16 uppercase font-medium flex items-center gap-1"
        >
          Discover <span className="opacity-70">+</span>
        </Link>
      </div>
    </div>
  );
}
