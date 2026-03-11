"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * ProcessParallaxImage
 * A full-width architectural image with a subtle parallax scroll effect.
 * As the user scrolls, the image translates upward at a slower rate.
 */
export function ProcessParallaxImage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves image up by 15% while the section scrolls through viewport
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "100vh", minHeight: "480px" }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y }}
      >
        <img
          src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-10-1920x1281.jpg"
          alt="Architecture — process"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
