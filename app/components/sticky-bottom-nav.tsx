"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export function StickyBottomNav() {
  const [isVisible, setIsVisible] = useState(false);
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

      // 1. Trigger exit animation on current label
      setAnimating(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // 2. After exit completes, swap text and trigger entrance
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

  // ── Visibility: show after scrolling past 80vh ──
  useEffect(() => {
    const scrollEl = document.getElementById("app") ?? window;

    const onScroll = () => {
      const scrollTop =
        scrollEl instanceof Window
          ? scrollEl.scrollY
          : (scrollEl as HTMLElement).scrollTop;
      setIsVisible(scrollTop > window.innerHeight * 0.8);
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-8 left-1/2 z-[100] transition-[opacity,transform] duration-700 ease-out"
      style={{
        transform: `translateX(-50%) translateY(${isVisible ? "0px" : "32px"})`,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <div
        className="
          bg-black text-white
          pl-5 pr-6 py-3
          rounded-full
          flex items-center gap-5
          shadow-[0_8px_40px_rgba(0,0,0,0.3)]
          border border-white/[0.08]
          backdrop-blur-md
        "
      >
        {/* ── Left label (Studio → project name) ── */}
        <div className="h-[18px] overflow-hidden flex items-center min-w-[80px] justify-center">
          <span
            className="block text-white/50 text-[13px] uppercase tracking-widest whitespace-nowrap
                       transition-[opacity,transform] duration-[250ms] ease-out"
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
              ? `/work/${activeWork.toLowerCase().replace(/\s+/g, "-")}`
              : "#portfolio"
          }
          className="text-white text-[13px] uppercase tracking-widest font-medium
                     flex items-center gap-1.5 no-underline
                     hover:opacity-70 transition-opacity"
        >
          Discover
          <span className="text-white/60 font-normal">+</span>
        </Link>
      </div>
    </div>
  );
}
