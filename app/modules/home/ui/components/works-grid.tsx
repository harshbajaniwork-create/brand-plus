import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

function parseSize(value: string) {
  return Number.parseFloat(value) || 0;
}

/** Larger tiles read as foreground (full opacity), smaller tiles feel distant. */
function depthOpacity(w: string, h: string) {
  const area = parseSize(w) * parseSize(h);
  const t = Math.min(1, Math.max(0, (area - 72) / (220 - 72)));
  return 0.22 + t * 0.78;
}

function depthScale(w: string, h: string) {
  const area = parseSize(w) * parseSize(h);
  const t = Math.min(1, Math.max(0, (area - 72) / (220 - 72)));
  return 0.82 + t * 0.18;
}

const CENTER_IMAGE =
  "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/09cf5bf2-8667-4dba-bd2d-536378112cc4/BENJAMIN-%C2%A9Ebener-0872-1.jpg?format=2500w";

const BATCH_SIZE = 3;
const BATCH_SCROLL = 0.2;
const ENTRANCE_LEN = 0.13;

function getBatchEntrance(index: number, isHero = false) {
  const batch = isHero
    ? Math.ceil(gridImages.length / BATCH_SIZE)
    : Math.floor(index / BATCH_SIZE);
  const entranceStart = batch * BATCH_SCROLL;
  return { entranceStart, entranceEnd: entranceStart + ENTRANCE_LEN };
}

/* ─── Scattered grid — revealed in waves of 3, hero tile last ─── */
const gridImages = [
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/feb0e197-21dd-4668-a5ab-9bfcc74d2470/IMG_8113.jpg?format=1500w",
    top: "0%",
    left: "-3%",
    w: "14vw",
    h: "55vh",
    speed: 0.15,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ccd7c34a-e2be-4e5b-92af-b7a889037a6b/IMG_8117.jpg?format=1500w",
    top: "2%",
    left: "26%",
    w: "10vw",
    h: "20vh",
    speed: 0.08,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/dd5c6831-b2a4-413e-a357-2f2ad17936ba/IMG_8103.jpg?format=1500w",
    top: "0%",
    left: "42%",
    w: "18vw",
    h: "32vh",
    speed: 0.12,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/4c63f65b-dec7-484a-9f1f-c2a322873910/04%2BHof%2Bschwebend%2BUpdate%2B006_Bildrechte.jpg?format=1000w",
    top: "0%",
    left: "68%",
    w: "15vw",
    h: "34vh",
    speed: 0.18,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ad5002e2-1034-4504-83df-a2d948116cc9/03%2BBlick%2Bnach%2Boben%2BUpdate%2B005_Bildrechte.jpg?format=750w",
    top: "8%",
    left: "90%",
    w: "12vw",
    h: "28vh",
    speed: 0.06,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ea0e18df-6c64-46ad-a179-dca86b107350/02%2BStrasse%2BNacht%2B008_Bildrechte.jpg?format=1500w",
    top: "52%",
    left: "2%",
    w: "12vw",
    h: "22vh",
    speed: 0.1,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/df34b30f-aba3-4519-8eb6-7859b4660f7b/220422_FUHUB_FOYER.jpg?format=2500w",
    top: "45%",
    left: "22%",
    w: "8vw",
    h: "18vh",
    speed: 0.05,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/dbf5305c-5f3d-4017-ba63-65d8639baac2/220422_FUHUB_LABOR.jpg?format=1500w",
    top: "72%",
    left: "30%",
    w: "12vw",
    h: "28vh",
    speed: 0.14,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/bb71c161-9dc9-464f-ac9a-c406598521c8/PERSPEKTIVE_Eingang-himmelblau.jpg?format=1500w",
    top: "55%",
    left: "70%",
    w: "14vw",
    h: "30vh",
    speed: 0.16,
  },
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/d0d8cbb8-472e-464e-a6f4-b71323e02f9f/PERSPEKTIVE_Strasse-himmelblau.jpg?format=1500w",
    top: "70%",
    left: "88%",
    w: "14vw",
    h: "32vh",
    speed: 0.07,
  },
];

const heroTile = {
  src: CENTER_IMAGE,
  top: "80%",
  left: "55%",
  w: "9vw",
  h: "16vh",
  speed: 0.09,
};

function ParallaxImage({
  src,
  top,
  left,
  w,
  h,
  speed,
  index,
  scrollYProgress,
  heroExpandProgress,
}: {
  src: string;
  top: string;
  left: string;
  w: string;
  h: string;
  speed: number;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  heroExpandProgress: MotionValue<number>;
}) {
  const baseOpacity = depthOpacity(w, h);
  const baseScale = depthScale(w, h);
  const { entranceStart, entranceEnd } = getBatchEntrance(index);
  const driftMid = Math.min(entranceEnd + 0.12, 0.92);
  const driftEnd = Math.min(entranceEnd + 0.28, 0.98);

  const gridOpacity = useTransform(
    scrollYProgress,
    [entranceStart, entranceEnd],
    [0, baseOpacity],
  );
  const opacity = useTransform(
    [gridOpacity, heroExpandProgress],
    ([grid, expand]: number[]) => grid * (1 - Math.min(1, expand * 1.4)),
  );
  const scale = useTransform(
    scrollYProgress,
    [entranceStart, entranceEnd],
    [baseScale, 1],
  );
  const gridY = useTransform(
    scrollYProgress,
    [entranceStart, entranceEnd, driftMid, driftEnd],
    [110, 0, speed * -35, speed * -115],
  );
  const y = useTransform(
    [gridY, heroExpandProgress],
    ([grid, expand]: number[]) => `${grid - expand * 90}vh`,
  );

  return (
    <motion.div
      className="absolute z-[5] overflow-hidden"
      style={{ top, left, width: w, height: h, y, opacity, scale }}
    >
      <img src={src} alt="Work" className="w-full h-full object-cover" />
    </motion.div>
  );
}

function ExpandableHeroTile({
  top,
  left,
  w,
  h,
  speed,
  gridScrollYProgress,
  heroExpandProgress,
  heroOverlay,
  heroBgY,
}: {
  top: string;
  left: string;
  w: string;
  h: string;
  speed: number;
  gridScrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  heroExpandProgress: MotionValue<number>;
  heroOverlay: MotionValue<number>;
  heroBgY: MotionValue<string>;
}) {
  const baseOpacity = depthOpacity(w, h);
  const baseScale = depthScale(w, h);
  const { entranceStart, entranceEnd } = getBatchEntrance(0, true);
  const driftMid = Math.min(entranceEnd + 0.08, 0.95);

  const gridOpacity = useTransform(
    gridScrollYProgress,
    [entranceStart, entranceEnd],
    [0, baseOpacity],
  );
  const opacity = useTransform(
    [gridOpacity, heroExpandProgress],
    ([grid, expand]: number[]) => Math.max(grid, expand),
  );
  const gridScale = useTransform(
    gridScrollYProgress,
    [entranceStart, entranceEnd],
    [baseScale, 1],
  );
  const scale = useTransform(
    [gridScale, heroExpandProgress],
    ([grid, expand]: number[]) => (expand > 0 ? 1 : grid),
  );

  const gridY = useTransform(
    gridScrollYProgress,
    [entranceStart, entranceEnd, driftMid],
    [110, 0, speed * -20],
  );
  const y = useTransform(
    [gridY, heroExpandProgress],
    ([grid, expand]: number[]) => `${grid * (1 - expand)}vh`,
  );

  const width = useTransform(heroExpandProgress, [0, 1], [w, "100vw"]);
  const height = useTransform(heroExpandProgress, [0, 1], [h, "100vh"]);
  const topPos = useTransform(heroExpandProgress, [0, 1], [top, "0%"]);
  const leftPos = useTransform(heroExpandProgress, [0, 1], [left, "0%"]);
  const zIndex = useTransform(heroExpandProgress, (p) => (p > 0.02 ? 10 : 5));

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        top: topPos,
        left: leftPos,
        width,
        height,
        y,
        opacity,
        scale,
        zIndex,
      }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y: heroBgY }}
      >
        <img
          src={CENTER_IMAGE}
          alt="Works Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        style={{ opacity: heroOverlay }}
        className="absolute inset-0 bg-black"
      />
    </motion.div>
  );
}

export default function WorksGrid() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: headingApproachProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: headingShrinkProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "20% start"],
  });

  const { scrollYProgress: gridScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["14% start", "68% start"],
  });

  const { scrollYProgress: heroExpandProgress } = useScroll({
    target: containerRef,
    offset: ["64% start", "74% start"],
  });

  const { scrollYProgress: visionScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["74% start", "end end"],
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(headingApproachProgress, [0, 1], [-30, 0]);
  const titleScale = useTransform(headingShrinkProgress, [0, 1], [2.5, 1]);
  const titleExitY = useTransform(heroExpandProgress, [0, 0.25], [0, -55]);
  const titleOpacity = useTransform(heroExpandProgress, [0, 0.18], [1, 0]);
  const titleCombinedY = useTransform(
    [titleY, titleExitY],
    ([approach, exit]: number[]) => `${approach + exit}vh`,
  );

  const heroOverlay = useTransform(visionScrollYProgress, [0, 0.08], [0, 0.45]);
  const heroBgY = useTransform(visionScrollYProgress, [0.82, 1], ["0%", "-10%"]);

  const visionSlides = t("home.vision.slides", {
    returnObjects: true,
  }) as Array<{
    heading: string;
    text: string;
  }>;

  // ~1 viewport of scroll per vision point (spread across dedicated vision track)
  const slide1End = 0.3;
  const slide2Start = 0.28;
  const slide2End = 0.62;
  const slide3Start = 0.6;

  const headingX = useTransform(
    visionScrollYProgress,
    [0, slide1End, slide2Start + 0.04, slide2End, slide3Start + 0.04, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  );

  const opacity1 = useTransform(
    visionScrollYProgress,
    [0, 0.05, slide1End, slide1End + 0.06],
    [0, 1, 1, 0.15],
  );
  const opacity2 = useTransform(
    visionScrollYProgress,
    [0, slide2Start, slide2Start + 0.05, slide2End, slide2End + 0.06],
    [0, 0.15, 1, 1, 0.15],
  );
  const opacity3 = useTransform(
    visionScrollYProgress,
    [0, slide3Start, slide3Start + 0.05, 1],
    [0, 0.15, 1, 1],
  );

  const textOpacity1 = useTransform(
    visionScrollYProgress,
    [0, 0.05, slide1End, slide1End + 0.05],
    [0, 1, 1, 0],
  );
  const textOpacity2 = useTransform(
    visionScrollYProgress,
    [0, slide2Start, slide2Start + 0.05, slide2End, slide2End + 0.05],
    [0, 0, 1, 1, 0],
  );
  const textOpacity3 = useTransform(
    visionScrollYProgress,
    [0, slide3Start, slide3Start + 0.05, 1],
    [0, 0, 1, 1],
  );

  const lineWidth = useTransform(
    visionScrollYProgress,
    [0, 0.1],
    ["0%", "100%"],
  );
  const separatorOpacity = useTransform(visionScrollYProgress, [0, 0.06], [0, 1]);

  const visionContentOpacity = useTransform(
    visionScrollYProgress,
    [0, 0.06],
    [0, 1],
  );

  const stepNumber = useTransform(visionScrollYProgress, (pos): string => {
    if (pos < slide2Start + 0.02) return "01";
    if (pos < slide3Start + 0.02) return "02";
    return "03";
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[1500vh] bg-white text-black works-grid"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center will-change-transform">
        {gridImages.map((img, i) => (
          <ParallaxImage
            key={i}
            index={i}
            {...img}
            scrollYProgress={gridScrollYProgress}
            heroExpandProgress={heroExpandProgress}
          />
        ))}

        <ExpandableHeroTile
          {...heroTile}
          gridScrollYProgress={gridScrollYProgress}
          heroExpandProgress={heroExpandProgress}
          heroOverlay={heroOverlay}
          heroBgY={heroBgY}
        />

        <motion.div
          style={{
            scale: titleScale,
            y: titleCombinedY,
            opacity: titleOpacity,
          }}
          className="z-20 flex items-start gap-3 absolute pointer-events-none isolate"
        >
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight"
            style={{ lineHeight: 1 }}
          >
            {t("home.worksGrid.allWork")}
          </span>
          <sup className="text-lg md:text-2xl lg:text-3xl mt-1 md:mt-2">
            (27)
          </sup>
        </motion.div>

        <motion.div
          style={{ opacity: visionContentOpacity }}
          className="relative z-30 w-full h-full flex flex-col justify-center pointer-events-none"
        >
          <div className="absolute top-[18%] md:top-[22%] w-full overflow-hidden px-4 md:px-12">
            <motion.div
              className="flex whitespace-nowrap"
              style={{ x: headingX }}
            >
              {visionSlides.map((slide, i) => {
                const opacities = [opacity1, opacity2, opacity3];
                return (
                  <motion.span
                    key={i}
                    className="inline-block w-full shrink-0 text-4xl md:text-7xl lg:text-8xl font-serif tracking-tight text-white"
                    style={{ opacity: opacities[i] }}
                  >
                    {slide.heading}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: separatorOpacity }}
            className="absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-12 flex items-center gap-4 md:gap-8"
          >
            <div className="overflow-hidden min-w-[20px]">
              <motion.span className="text-white/80 text-xs md:text-sm uppercase">
                {stepNumber}
              </motion.span>
            </div>
            <motion.div
              style={{ width: lineWidth }}
              className="h-px bg-white/40 flex-1 origin-left"
            />
            <div className="overflow-hidden min-w-[50px] text-right">
              <span className="text-white text-xs md:text-sm uppercase font-medium">
                {t("home.vision.label")}
              </span>
            </div>
          </motion.div>

          <div className="absolute bottom-[20%] md:bottom-[22%] right-0 w-full md:w-1/2 px-4 md:px-12 flex justify-end">
            <div className="relative w-full max-w-lg min-h-[160px]">
              {visionSlides.map((slide, i) => {
                const textOpacities = [
                  textOpacity1,
                  textOpacity2,
                  textOpacity3,
                ];
                return (
                  <motion.div
                    key={i}
                    style={{ opacity: textOpacities[i] }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <p className="text-base md:text-xl lg:text-2xl leading-relaxed text-white/90 font-serif italic">
                      {slide.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
