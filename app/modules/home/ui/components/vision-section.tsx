import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

/* ─── Same image used as the center hero in WorksGrid ─── */
const VISION_BG =
  "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/09cf5bf2-8667-4dba-bd2d-536378112cc4/BENJAMIN-%C2%A9Ebener-0872-1.jpg?format=2500w";

export default function VisionSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement | null>(null);
  const visionSlides = t("home.vision.slides", {
    returnObjects: true,
  }) as Array<{
    heading: string;
    text: string;
  }>;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── Background vertical parallax ─── */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  /* ─── Horizontal text sliding ───
     All 3 headings sit in a row. We translateX the row so the active one
     is centered. Each heading takes ~33% of the scroll range. */
  const headingX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.35, 0.6, 0.65, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  );

  /* ─── Individual heading opacities ─── */
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.32], [1, 1, 0.2]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.28, 0.35, 0.55, 0.62],
    [0.2, 1, 1, 0.2],
  );
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.67, 1], [0.2, 1, 1]);

  /* ─── Description text fade swap ─── */
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const textOpacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.6, 0.65],
    [0, 1, 1, 0],
  );
  const textOpacity3 = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);

  /* ─── Separator line expand ─── */
  const lineWidth = useTransform(scrollYProgress, [0, 0.08], ["0%", "100%"]);

  /* ─── Step counter ─── */
  const stepNumber = useTransform(scrollYProgress, (pos): string => {
    if (pos < 0.3) return "01";
    if (pos < 0.65) return "02";
    return "03";
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-black text-white w-full vision-section"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center will-change-transform">
        {/* ── Full-screen background with vertical parallax ── */}
        <motion.div
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
          style={{ y: bgY }}
        >
          <img
            src={VISION_BG}
            alt="Vision"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        {/* ── Content overlay ── */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center">
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
                    className="inline-block w-full flex-shrink-0 text-4xl md:text-7xl lg:text-8xl font-serif tracking-tight"
                    style={{ opacity: opacities[i] }}
                  >
                    {slide.heading}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>

          {/* ── Separator line with counter ── */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-12 flex items-center gap-4 md:gap-8">
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
          </div>

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
        </div>
      </div>
    </section>
  );
}
