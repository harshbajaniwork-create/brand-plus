"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyPillProps {
  children: ReactNode;
  /** Optional override for visibility. If not provided, uses internal scroll logic (80vh threshold) */
  visible?: boolean;
  className?: string;
  threshold?: number;
}

export function StickyPill({
  children,
  visible,
  className,
  threshold,
}: StickyPillProps) {
  const [internalVisible, setInternalVisible] = useState(false);

  useEffect(() => {
    // If 'visible' prop is provided, we don't need scroll logic
    if (visible !== undefined) return;

    const scrollEl = document.getElementById("app") ?? window;
    const scrollThreshold = threshold ?? window.innerHeight * 0.8;

    const onScroll = () => {
      const scrollTop =
        scrollEl instanceof Window
          ? scrollEl.scrollY
          : (scrollEl as HTMLElement).scrollTop;
      setInternalVisible(scrollTop > scrollThreshold);
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [visible, threshold]);

  const isActuallyVisible = visible !== undefined ? visible : internalVisible;

  return (
    <AnimatePresence>
      {isActuallyVisible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn("fixed bottom-8 left-1/2 z-[100]", className)}
        >
          <div
            className="
              bg-black text-white
              pl-5 pr-6 py-3
              rounded-full
              flex items-center gap-5
              shadow-md
              border border-white/[0.08]
              backdrop-blur-md
            "
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
