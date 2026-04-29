import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

/* ─── Scattered grid image data ─── */
const gridImages = [
  // top-left large (bleeding off edge)
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/feb0e197-21dd-4668-a5ab-9bfcc74d2470/IMG_8113.jpg?format=1500w",
    top: "0%",
    left: "-3%",
    w: "14vw",
    h: "55vh",
    speed: 0.15,
    opacity: 0.6,
  },
  // top-center-left small
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ccd7c34a-e2be-4e5b-92af-b7a889037a6b/IMG_8117.jpg?format=1500w",
    top: "2%",
    left: "26%",
    w: "10vw",
    h: "20vh",
    speed: 0.08,
    opacity: 0.3,
  },
  // top-center large
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/dd5c6831-b2a4-413e-a357-2f2ad17936ba/IMG_8103.jpg?format=1500w",
    top: "0%",
    left: "42%",
    w: "18vw",
    h: "32vh",
    speed: 0.12,
    opacity: 1,
  },
  // top-right large
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/4c63f65b-dec7-484a-9f1f-c2a322873910/04%2BHof%2Bschwebend%2BUpdate%2B006_Bildrechte.jpg?format=1000w",
    top: "0%",
    left: "68%",
    w: "15vw",
    h: "34vh",
    speed: 0.18,
    opacity: 0.5,
  },
  // top-right edge small
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ad5002e2-1034-4504-83df-a2d948116cc9/03%2BBlick%2Bnach%2Boben%2BUpdate%2B005_Bildrechte.jpg?format=750w",
    top: "8%",
    left: "90%",
    w: "12vw",
    h: "28vh",
    speed: 0.06,
    opacity: 0.4,
  },
  // mid-left small
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/ea0e18df-6c64-46ad-a179-dca86b107350/02%2BStrasse%2BNacht%2B008_Bildrechte.jpg?format=1500w",
    top: "52%",
    left: "2%",
    w: "12vw",
    h: "22vh",
    speed: 0.1,
    opacity: 0.7,
  },
  // mid-left-center small (faded)
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/df34b30f-aba3-4519-8eb6-7859b4660f7b/220422_FUHUB_FOYER.jpg?format=2500w",
    top: "45%",
    left: "22%",
    w: "8vw",
    h: "18vh",
    speed: 0.05,
    opacity: 0.3,
  },
  // bottom-center-left
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/dbf5305c-5f3d-4017-ba63-65d8639baac2/220422_FUHUB_LABOR.jpg?format=1500w",
    top: "72%",
    left: "30%",
    w: "12vw",
    h: "28vh",
    speed: 0.14,
    opacity: 0.8,
  },
  // bottom-right large
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/bb71c161-9dc9-464f-ac9a-c406598521c8/PERSPEKTIVE_Eingang-himmelblau.jpg?format=1500w",
    top: "55%",
    left: "70%",
    w: "14vw",
    h: "30vh",
    speed: 0.16,
    opacity: 0.6,
  },
  // bottom-right edge
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/d0d8cbb8-472e-464e-a6f4-b71323e02f9f/PERSPEKTIVE_Strasse-himmelblau.jpg?format=1500w",
    top: "70%",
    left: "88%",
    w: "14vw",
    h: "32vh",
    speed: 0.07,
    opacity: 0.4,
  },
  // bottom-center small (faded)
  {
    src: "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/09cf5bf2-8667-4dba-bd2d-536378112cc4/BENJAMIN-%C2%A9Ebener-0872-1.jpg?format=2500w",
    top: "80%",
    left: "55%",
    w: "9vw",
    h: "16vh",
    speed: 0.09,
    opacity: 0.35,
  },
];

/* ─── The center image — same one used in Vision section ─── */
const CENTER_IMAGE =
  "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/09cf5bf2-8667-4dba-bd2d-536378112cc4/BENJAMIN-%C2%A9Ebener-0872-1.jpg?format=2500w";

function ParallaxImage({
  src,
  top,
  left,
  w,
  h,
  speed,
  opacity: baseOpacity = 1,
  scrollYProgress,
}: {
  src: string;
  top: string;
  left: string;
  w: string;
  h: string;
  speed: number;
  opacity?: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Fade in from bottom when images start appearing
  const fadeIn = useTransform(scrollYProgress, [0, 0.1], [0, baseOpacity]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.4],
    [`10vh`, `${speed * -80}vh`],
  );
  const fadeOut = useTransform(scrollYProgress, [0.5, 0.65], [baseOpacity, 0]);

  return (
    <motion.div
      className="absolute overflow-hidden"
      style={{
        top,
        left,
        width: w,
        height: h,
        y,
        opacity: fadeOut,
      }}
    >
      <motion.img
        src={src}
        alt="Work"
        className="w-full h-full object-cover"
        style={{ opacity: fadeIn }}
      />
    </motion.div>
  );
}

export default function WorksGrid() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);

  // Scroll progress for heading animation (from section start to center)
  const { scrollYProgress: headingScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center center"],
  });

  // Scroll progress for images animation (from center to end)
  const { scrollYProgress: imagesScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center center", "end end"],
  });

  // Overall scroll progress for other animations (center image, vision)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── Phase 1: Title (0 → 1) ─── */
  // Heading starts from above, scales down, and pins in center
  const titleScale = useTransform(headingScrollYProgress, [0, 1], [2.5, 1]);
  const titleY = useTransform(headingScrollYProgress, [0, 1], ["-30vh", "0vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0.45, 0.55], [1, 0]);

  /* ─── Phase 2: Center image scales to full screen (0.7 → 0.9) ─── */
  const heroWidth = useTransform(scrollYProgress, [0.7, 0.9], ["9vw", "100vw"]);
  const heroHeight = useTransform(
    scrollYProgress,
    [0.7, 0.9],
    ["16vh", "100vh"],
  );
  const heroTop = useTransform(scrollYProgress, [0.7, 0.9], ["80%", "0%"]);
  const heroLeft = useTransform(scrollYProgress, [0.7, 0.9], ["55%", "0%"]);
  const heroOpacity = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]);

  /* ─── Dark overlay on hero (for Vision section readability) ─── */
  const heroOverlay = useTransform(scrollYProgress, [0.85, 0.9], [0, 0.45]);

  /* ─── Background vertical parallax for Vision section ─── */
  const heroBgY = useTransform(scrollYProgress, [0.9, 1], ["0%", "-10%"]);

  /* ─── CTA button ─── */
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.12, 0.4, 0.45],
    [0, 1, 1, 0],
  );
  const ctaLabel = useTransform(scrollYProgress, (p): string =>
    p < 0.3 ? t("home.worksGrid.allWork") : t("home.worksGrid.vision"),
  );

  /* ─── Vision content animations (0.8 → 1) ─── */
  const visionSlides = t("home.vision.slides", {
    returnObjects: true,
  }) as Array<{
    heading: string;
    text: string;
  }>;

  /* ─── Horizontal text sliding ─── */
  const headingX = useTransform(
    scrollYProgress,
    [0.9, 0.95, 0.97, 0.98, 0.99, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  );

  /* ─── Individual heading opacities ─── */
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.9, 0.95, 0.97],
    [0, 1, 1, 0.2],
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.95, 0.97, 0.98, 0.99],
    [0, 0.2, 1, 1, 0.2],
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0, 0.98, 0.99, 1],
    [0, 0.2, 1, 1],
  );

  /* ─── Description text fade swap ─── */
  const textOpacity1 = useTransform(
    scrollYProgress,
    [0, 0.9, 0.95, 0.97],
    [0, 1, 1, 0],
  );
  const textOpacity2 = useTransform(
    scrollYProgress,
    [0, 0.97, 0.98, 0.99, 1],
    [0, 0, 1, 1, 0],
  );
  const textOpacity3 = useTransform(
    scrollYProgress,
    [0, 0.99, 1, 1],
    [0, 0, 1, 1],
  );

  /* ─── Separator line expand ─── */
  const lineWidth = useTransform(
    scrollYProgress,
    [0, 0.9, 0.95],
    ["0%", "0%", "100%"],
  );
  const separatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 0.9],
    [0, 0, 1],
  );

  /* ─── Overall Vision content opacity ─── */
  const visionContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 0.9],
    [0, 0, 1],
  );

  /* ─── Step counter ─── */
  const stepNumber = useTransform(scrollYProgress, (pos): string => {
    if (pos < 0.9) return "01";
    if (pos < 0.95) return "02";
    return "03";
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-white text-black works-grid"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center will-change-transform">
        {/* ── Scattered collage images with individual parallax ── */}
        {gridImages.map((img, i) => (
          <ParallaxImage
            key={i}
            {...img}
            scrollYProgress={imagesScrollYProgress}
          />
        ))}

        {/* ── Center hero image — scales to full screen, becomes Vision bg ── */}
        <motion.div
          style={{
            width: heroWidth,
            height: heroHeight,
            top: heroTop,
            left: heroLeft,
            opacity: heroOpacity,
          }}
          className="absolute z-10 overflow-hidden"
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
          {/* Dark overlay for Vision text readability */}
          <motion.div
            style={{ opacity: heroOverlay }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>

        {/* ── Title: "All Work (27)" — starts from above, scales down, pins, then fades ── */}
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="z-20 flex items-start gap-3 absolute pointer-events-none"
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

        {/* ── Vision content overlay (appears after image enlarges) ── */}
        <motion.div
          style={{ opacity: visionContentOpacity }}
          className="relative z-30 w-full h-full flex flex-col justify-center"
        >
          {/* ── Horizontal sliding headings ── */}
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

          {/* ── Separator line with counter ── */}
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

          {/* ── Description text (right-aligned, fading swap) ── */}
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
