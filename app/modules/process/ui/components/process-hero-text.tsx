"use client";

import { useEffect, useRef } from "react";

/**
 * ProcessHeroText
 * Large intro text with alternating gray / black words — matching the
 * Telha Clarke process page opening typography.
 */
export function ProcessHeroText() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black px-(--margin) pt-40 pb-0"
      style={{ paddingTop: "calc(var(--header-height) + 12rem)" }}
    >
      <p className="process-hero-text body-48 md:body-60 xl:body-72 font-normal max-w-[95vw] mb-8">
        {/* Row 1 — all gray */}
        <span className="text-[#cacfcb]">
          Our work responds to a collection of influences;{" "}
        </span>
        {/* Row 2 — mixed */}
        <span className="text-black font-bold">strategic vision</span>
        <span className="text-[#cacfcb]">, the </span>
        <span className="text-black font-bold">client&apos;s ambition</span>
        <span className="text-[#cacfcb]">, our own</span>
        <br className="hidden md:block" />
        {/* Row 3 */}
        <span className="text-black font-bold"> design conviction</span>
        <span className="text-[#cacfcb]">, &amp; </span>
        <span className="text-black font-bold">cultural resonance</span>
        <span className="text-[#cacfcb]">.</span>
      </p>
    </section>
  );
}
