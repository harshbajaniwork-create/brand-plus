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
          src="https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/df34b30f-aba3-4519-8eb6-7859b4660f7b/220422_FUHUB_FOYER.jpg?format=2500w"
          alt="Architecture — process"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
}
