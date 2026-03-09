import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/* ─── Scattered grid image data ─── */
const gridImages = [
  // top-left large (bleeding off edge)
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-19-480x720.jpg",
    top: "0%",
    left: "-3%",
    w: "14vw",
    h: "55vh",
    speed: 0.15,
  },
  // top-center-left small
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Hepburn-20-480x320.jpg",
    top: "2%",
    left: "26%",
    w: "10vw",
    h: "20vh",
    speed: 0.08,
  },
  // top-center large
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18f6b6b3c?w=480&h=720&fit=crop&q=80",
    top: "0%",
    left: "42%",
    w: "18vw",
    h: "32vh",
    speed: 0.12,
  },
  // top-right large
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/08/Parlington-2-480x480.jpg",
    top: "0%",
    left: "68%",
    w: "15vw",
    h: "34vh",
    speed: 0.18,
  },
  // top-right edge small
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/10/Argo-5-480x720.jpg",
    top: "8%",
    left: "90%",
    w: "12vw",
    h: "28vh",
    speed: 0.06,
  },
  // mid-left small
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=480&h=320&fit=crop&q=80",
    top: "52%",
    left: "2%",
    w: "12vw",
    h: "22vh",
    speed: 0.1,
  },
  // mid-left-center small (faded)
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Ormond-21-2-480x720.jpg",
    top: "45%",
    left: "22%",
    w: "8vw",
    h: "18vh",
    speed: 0.05,
    opacity: 0.4,
  },
  // bottom-center-left
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-5-480x720.jpg",
    top: "72%",
    left: "30%",
    w: "12vw",
    h: "28vh",
    speed: 0.14,
  },
  // bottom-right large
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/11/CN-Residence-22-e1764201118833-480x480.jpg",
    top: "55%",
    left: "70%",
    w: "14vw",
    h: "30vh",
    speed: 0.16,
  },
  // bottom-right edge
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/12/Bala-In-Construction-480x640.jpg",
    top: "70%",
    left: "88%",
    w: "14vw",
    h: "32vh",
    speed: 0.07,
  },
  // bottom-center small (faded)
  {
    src: "https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-2-480x720.jpg",
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
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&h=1080&fit=crop&q=80";

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
  const y = useTransform(
    scrollYProgress,
    [0, 0.15],
    [`0vh`, `${speed * -60}vh`],
  );
  const fadeOut = useTransform(scrollYProgress, [0.12, 0.22], [baseOpacity, 0]);

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
      <img src={src} alt="Work" className="w-full h-full object-cover" />
    </motion.div>
  );
}

export default function WorksGrid() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ─── Phase 1: Title (0 → 0.15) ─── */
  // Heading starts massive (scale ~2.5) and shrinks to 1 as user scrolls in
  const titleScale = useTransform(scrollYProgress, [0, 0.12], [2.5, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0.14, 0.2], [1, 0]);

  /* ─── Phase 2: Center image scales to full screen (0.15 → 0.3) ─── */
  const heroWidth = useTransform(
    scrollYProgress,
    [0.12, 0.3],
    ["22vw", "100vw"],
  );
  const heroHeight = useTransform(
    scrollYProgress,
    [0.12, 0.3],
    ["32vh", "100vh"],
  );

  /* ─── Dark overlay on hero (for Vision section readability) ─── */
  const heroOverlay = useTransform(scrollYProgress, [0.25, 0.35], [0, 0.45]);

  /* ─── Phase 3: Horizontal scroll content (0.35 → 0.9) ─── */
  const contentOpacity = useTransform(scrollYProgress, [0.32, 0.38], [0, 1]);
  const contentX = useTransform(
    scrollYProgress,
    [0.38, 0.9],
    ["100%", "-100%"],
  );

  /* ─── CTA button ─── */
  const ctaOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.12, 0.9, 0.95],
    [0, 1, 1, 0],
  );
  const ctaLabel = useTransform(scrollYProgress, (p): string =>
    p < 0.3 ? "All Work" : "Vision",
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-white text-black works-grid"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center will-change-transform">
        {/* ── Scattered collage images with individual parallax ── */}
        {gridImages.map((img, i) => (
          <ParallaxImage key={i} {...img} scrollYProgress={scrollYProgress} />
        ))}

        {/* ── Center hero image — scales to full screen, becomes Vision bg ── */}
        <motion.div
          style={{
            width: heroWidth,
            height: heroHeight,
          }}
          className="absolute z-10 overflow-hidden"
        >
          <img
            src={CENTER_IMAGE}
            alt="Works Hero"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for Vision text readability */}
          <motion.div
            style={{ opacity: heroOverlay }}
            className="absolute inset-0 bg-black"
          />
        </motion.div>

        {/* ── Title: "All Work (27)" — starts huge, scales down, then fades ── */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="z-20 flex items-start gap-3 absolute pointer-events-none"
        >
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight"
            style={{ lineHeight: 1 }}
          >
            All Work
          </span>
          <sup className="text-lg md:text-2xl lg:text-3xl mt-1 md:mt-2">
            (27)
          </sup>
        </motion.div>

        {/* ── Horizontal scrolling featured projects ── */}
        <motion.div
          style={{ x: contentX, opacity: contentOpacity }}
          className="absolute top-0 left-0 h-full flex gap-24 md:gap-32 pl-[80vw] items-center z-30"
        >
          {/* Project 1 */}
          <div className="w-[350px] md:w-[500px] flex-shrink-0 flex flex-col gap-4 bg-white p-4">
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Ormond-21-2-480x720.jpg"
                className="w-full h-full object-cover"
                alt="Ormond"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Ormond</h3>
              <p className="text-sm uppercase text-mist">Residential</p>
            </div>
          </div>

          {/* Project 2 */}
          <div className="w-[280px] md:w-[380px] flex-shrink-0 flex flex-col gap-4 mt-24 bg-white p-4">
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img
                src="https://telhaclarke.com.au/wp-content/uploads/2025/10/ES-5-480x720.jpg"
                className="w-full h-full object-cover"
                alt="Elsternwick"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Elsternwick</h3>
              <p className="text-sm uppercase text-mist">Multi-Res</p>
            </div>
          </div>

          {/* Project 3 */}
          <div className="w-[450px] md:w-[650px] flex-shrink-0 flex flex-col gap-4 -mt-16 bg-white p-4">
            <div className="w-full aspect-[16/9] overflow-hidden">
              <img
                src="https://telhaclarke.com.au/wp-content/uploads/2025/09/StudioPiper_KensingtonRoad_SouthYarra_EXT-e1764222151372-480x254.jpg"
                className="w-full h-full object-cover"
                alt="Kensington Rd"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Kensington Rd</h3>
              <p className="text-sm uppercase text-mist">Commercial</p>
            </div>
          </div>

          {/* Project 4 */}
          <div className="w-[320px] md:w-[440px] flex-shrink-0 flex flex-col gap-4 mt-16 bg-white p-4">
            <div className="w-full aspect-[3/4] overflow-hidden">
              <img
                src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-2-480x720.jpg"
                className="w-full h-full object-cover"
                alt="Soho"
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif">Soho</h3>
              <p className="text-sm uppercase text-mist">Multi-Res</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
