"use client";

import { useState, useEffect, useRef } from "react";

/**
 * StudioTeam — matches inspo DOM exactly
 *
 * Structure:
 *  - Outer relative wrapper with negative top margin
 *  - Name rows: each is a full grid-w row, name sits at col-start-5 col-end-9
 *  - Image panel: absolute-full grid overlay, col-start-10 col-end-13,
 *    with a sticky inner container so image stays in view while names scroll
 *  - Role bracket: below the sticky image inside that same sticky container
 *
 * Active state: the `.a` class on a team-item turns its name black.
 * Scroll detection: IntersectionObserver on each name row — when a row's
 * top half enters the viewport center, it becomes active.
 */

const MEMBERS = [
  {
    name: "Lukas Bauer",
    role: "Creative Director",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-19-768x1025.jpg",
  },
  {
    name: "Mia Schröder",
    role: "Brand Strategist",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-20-768x1025.jpg",
  },
  {
    name: "Jonas Kern",
    role: "Identity Designer",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-13-768x1025.jpg",
  },
  {
    name: "Sophie Weiss",
    role: "Digital Director",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-12-768x1025.jpg",
  },
  {
    name: "Felix Hartmann",
    role: "Brand Consultant",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-9-768x1025.jpg",
  },
  {
    name: "Anna Fischer",
    role: "Associate",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-2-768x1025.jpg",
  },
  {
    name: "Ben Müller",
    role: "Associate",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/image-3-768x1025.jpg",
  },
];

export function StudioTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const nameRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  // Scroll-driven activation via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    nameRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hoveredIndex === null) {
            setActiveIndex(i);
          }
        },
        {
          // Fire when name crosses the upper-third of the viewport
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [hoveredIndex]);

  return (
    <section
      className="relative bg-white text-black mb-96"
      style={{ marginTop: "-4rem" }} // -mt-17 equivalent, pulls up into quote section
    >
      {/* ── Name rows ── */}
      <div className="relative">
        {MEMBERS.map((m, i) => (
          <div
            key={m.name}
            ref={(el) => {
              nameRefs.current[i] = el;
            }}
            className="grid-w py-8 md:py-5 cursor-default"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Label only on first row */}
            {i === 0 && (
              <div className="col-span-4 md:col-span-4 flex items-center gap-3 self-center">
                <span
                  className="body-12 tracking-widest uppercase"
                  style={{ color: "#cacfcb" }}
                >
                  01
                </span>
                <span className="body-12 tracking-widest uppercase font-medium">
                  Meet the Team
                </span>
              </div>
            )}

            {/* Name — starts at col 5 */}
            <div
              className={`
                col-span-3
                md:col-start-5 md:col-end-9
                flex flex-col
                body-24 md:body-36 lg:body-48
                font-bold
                transition-colors duration-300
                ${i === 0 ? "" : "col-start-1"}
              `}
              style={{
                letterSpacing: "-0.02em",
                color: i === displayIndex ? "#000000" : "#cacfcb",
              }}
            >
              {m.name}
            </div>
          </div>
        ))}

        {/* ── Sticky image panel — absolute overlay on the full name list ── */}
        <div
          className="absolute inset-0 grid-w pointer-events-none"
          aria-hidden="true"
        >
          {/* Occupies cols 10–13, matching inspo `col-start-10 col-end-13` */}
          <div className="col-start-4 col-end-7 md:col-start-10 md:col-end-13">
            <div
              className="sticky flex flex-col gap-y-10"
              style={{ top: "calc(var(--header-height) + 2rem)" }}
            >
              {/* Portrait — 3:4 aspect */}
              <div className="relative w-full" style={{ paddingTop: "133%" }}>
                {MEMBERS.map((m, i) => (
                  <img
                    key={m.name}
                    src={m.image}
                    alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
                    style={{ opacity: i === displayIndex ? 1 : 0 }}
                  />
                ))}
              </div>

              {/* Role in brackets */}
              <div className="flex justify-between items-center pointer-events-auto">
                <span className="body-14 text-black/40 max-xl:hidden">[</span>
                <span className="relative flex-1 xl:text-center">
                  {MEMBERS.map((m, i) => (
                    <span
                      key={m.name}
                      className="body-14 transition-opacity duration-300 xl:whitespace-nowrap"
                      style={{
                        opacity: i === displayIndex ? 1 : 0,
                        position: i === 0 ? "relative" : "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        textAlign: "inherit",
                      }}
                    >
                      {m.role}
                    </span>
                  ))}
                </span>
                <span className="body-14 text-black/40 max-xl:hidden">]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
