"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "motion/react";

const VISION_ITEMS = [
  {
    title: "Design Integrity",
    body: "Our design aesthetic is established through a consistent process and a detailed concept brief, which considers client needs, site context, and the future occupiers. We combine and test these elements to create a singular design vision concealing many influencing layers. This singular vision, like a piece of artwork, is unique and individual. We believe the principles of design quality should always be present no matter the project brief or building scale.",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Stanhope-2.jpg",
  },
  {
    title: "Innovation",
    body: "brand+ welcomes innovation through research and technology to contribute new ideas and challenging theories. We see technology as a tool — integral to our work — however we believe human intelligence must drive creativity. We heavily invest time in research through leading industry seminars and international study tours.",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/PNG-1-768x768.jpg",
  },
  {
    title: "Enhanced Living",
    body: "We believe enhanced user experience and well-being should be at the forefront of design. We constantly consider the impact of design on the end user to ensure our work promotes positive human interaction and encourages healthier, enriched experiences.",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hurstmon-10-1920x1281.jpg",
  },
];

const TOTAL_H = "700vh";
const LEFT_W = "57%";
const RIGHT_W = "43%";
const VISION_START = 0.28;

const BP = {
  textFadeStart: 0.05,
  textFadeEnd: 0.2,
  shrinkStart: 0.05,
  shrinkEnd: 0.28,
};

export function StudioValuesVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVision, setActiveVision] = useState(0);

  // useMotionValue for image Y positions — no React re-render on change
  const img1Y = useMotionValue(100); // 100 = fully below, 0 = fully covering
  const img2Y = useMotionValue(100);

  // Derived transform strings for the container (slides up)
  const img1ContainerY = useTransform(img1Y, (v) => `${v}%`);
  const img2ContainerY = useTransform(img2Y, (v) => `${v}%`);

  // Counter-translate for the inner image (stays visually fixed)
  const img1InnerY = useTransform(img1Y, (v) => `${-v}%`);
  const img2InnerY = useTransform(img2Y, (v) => `${-v}%`);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageWidthPct = useTransform(
    scrollYProgress,
    [BP.shrinkStart, BP.shrinkEnd],
    ["100%", RIGHT_W],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [BP.textFadeStart, BP.textFadeEnd],
    [1, 0],
  );
  const valuesLabelOpacity = useTransform(
    scrollYProgress,
    [BP.shrinkEnd, BP.shrinkEnd + 0.04],
    [1, 0],
  );
  const visionOpacity = useTransform(
    scrollYProgress,
    [BP.shrinkEnd - 0.03, BP.shrinkEnd + 0.04],
    [0, 1],
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < VISION_START) {
      img1Y.set(100);
      img2Y.set(100);
      setActiveVision(0);
      return;
    }

    const vp = (v - VISION_START) / (1 - VISION_START); // 0–1 within vision phase

    // Image 1 reveal: travels from vp 0.167 → 0.333
    const i1Raw = (vp - 0.167) / 0.166;
    img1Y.set((1 - Math.max(0, Math.min(1, i1Raw))) * 100);

    // Image 2 reveal: travels from vp 0.500 → 0.667
    const i2Raw = (vp - 0.5) / 0.166;
    img2Y.set((1 - Math.max(0, Math.min(1, i2Raw))) * 100);

    // Content switches when new image is 50% across its reveal travel
    if (vp < 0.25) setActiveVision(0);
    else if (vp < 0.583) setActiveVision(1);
    else setActiveVision(2);
  });

  return (
    <div ref={containerRef} style={{ height: TOTAL_H }} className="relative">
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* 02 VALUES label */}
        <motion.div
          className="absolute z-30 top-0 left-0 flex items-center gap-3 uppercase body-12 text-white"
          style={{
            padding: "var(--margin, 2rem)",
            opacity: valuesLabelOpacity,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>02</span>
          <span className="tracking-widest font-medium">Our Values</span>
        </motion.div>

        {/* Values body text — bottom right over image */}
        <motion.div
          className="absolute z-20 text-white"
          style={{
            opacity: textOpacity,
            right: "var(--margin, 2rem)",
            bottom: "var(--margin, 2rem)",
            width: "22rem",
          }}
        >
          <p className="body-16 leading-[1.75] mb-4">
            We provide a boutique level of service and a hands-on approach.
          </p>
          <p className="body-16 leading-[1.75]">
            Underpinning all of our work is an understanding of context, client
            needs and user experience, so that buildings and spaces are
            meaningful and remain relevant over time.
          </p>
        </motion.div>

        {/* 03 VISION panel — left column */}
        <motion.div
          className="absolute z-20 left-0 top-0 bottom-0 flex flex-col justify-end"
          style={{
            opacity: visionOpacity,
            width: LEFT_W,
            paddingLeft: "var(--margin, 2rem)",
            paddingRight: "var(--margin, 2rem)",
            paddingBottom: "var(--margin, 2rem)",
          }}
        >
          <div className="relative" style={{ height: "22rem" }}>
            {VISION_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className="absolute bottom-0 left-0 w-full"
                style={{
                  transition: "opacity 450ms ease, transform 450ms ease",
                  opacity: i === activeVision ? 1 : 0,
                  transform:
                    i === activeVision ? "translateY(0)" : "translateY(16px)",
                  pointerEvents: i === activeVision ? "auto" : "none",
                }}
              >
                <div className="flex items-center gap-3 uppercase body-12 mb-10">
                  <span style={{ color: "#cacfcb" }}>03</span>
                  <span className="tracking-widest font-medium">
                    Our Vision
                  </span>
                </div>
                <h3 className="body-48 md:body-60 font-medium mb-5">
                  {item.title}
                </h3>
                <p
                  className="text-4xl! max-w-6xl"
                  style={{ color: "rgba(0,0,0,0.65)" }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image panel — right-anchored, shrinks from left */}
        <motion.div
          className="absolute top-0 right-0 h-full"
          style={{ width: imageWidthPct, overflow: "hidden" }}
        >
          {/* Base image — always behind */}
          <img
            src={VISION_ITEMS[0].image}
            alt={VISION_ITEMS[0].title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 1 }}
          />

          {/* Image 1 reveal — container slides up, inner image counter-translates */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 2, y: img1ContainerY }}
          >
            <motion.img
              src={VISION_ITEMS[1].image}
              alt={VISION_ITEMS[1].title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ y: img1InnerY }}
            />
          </motion.div>

          {/* Image 2 reveal — same pattern */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 3, y: img2ContainerY }}
          >
            <motion.img
              src={VISION_ITEMS[2].image}
              alt={VISION_ITEMS[2].title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ y: img2InnerY }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
