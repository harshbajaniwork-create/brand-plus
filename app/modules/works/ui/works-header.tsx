"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface WorksHeaderProps {
  label: string;
  count: number;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

export default function WorksHeader({
  label,
  count,
  drawerOpen,
  onToggleDrawer,
}: WorksHeaderProps) {
  const [hovered, setHovered] = useState(false);
  const countStr = String(count).padStart(2, "0");

  return (
    <div className="px-(--margin) flex items-end justify-between">
      {/* Left: Title */}
      <h1 className="text-[clamp(3.6rem,12vw,7.2rem)] font-normal leading-none tracking-[-0.01em]">
        {label}{" "}
        <sup className="text-[0.38em] align-super text-[#cacfcb] font-sans tracking-normal">
          ({countStr})
        </sup>
      </h1>

      {/* Right: Filters button */}
      <button
        className="relative mb-[0.15em] cursor-pointer overflow-visible"
        onClick={onToggleDrawer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-center gap-3">
          {/* Sliding text container */}
          <div className="relative overflow-hidden">
            {/* "Filters" — slides out left only when drawer opens */}
            <motion.span
              className="block text-[clamp(3.6rem,12vw,7.2rem)] text-[#cacfcb] font-normal leading-[1.2em] whitespace-nowrap"
              animate={{ x: drawerOpen ? "-110%" : "0%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              Filters
            </motion.span>

            {/* "Close" — slides in from right only when drawer opens */}
            <motion.span
              className="block text-[clamp(3.6rem,12vw,7.2rem)] text-black font-normal leading-[1.2em] whitespace-nowrap absolute top-0 left-0"
              initial={{ x: "110%" }}
              animate={{ x: drawerOpen ? "0%" : "110%" }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              Close
            </motion.span>
          </div>

          {/* Rotating + icon — rotates on hover OR when open */}
          <motion.span
            className="text-[clamp(3.6rem,12vw,7.2rem)] text-[#cacfcb] leading-none select-none"
            style={{ display: "inline-block", transformOrigin: "center" }}
            animate={{ rotate: drawerOpen || hovered ? 45 : 0 }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            +
          </motion.span>
        </div>
      </button>
    </div>
  );
}
