import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const GridItem = ({
  image,
  className,
}: {
  image: string;
  className?: string;
}) => {
  return (
    <div className={`relative w-full ${className ?? ""}`.trim()}>
      <div className="w-full h-0 pt-[130%] relative overflow-hidden">
        <motion.div className="absolute inset-0 h-full">
          <img src={image} alt="Work" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default function WorksGrid() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Title & Grid
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1.5, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], ["0%", "0%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.2], [1, 0]);

  // Phase 2: Image Scale
  const heroWidth = useTransform(
    scrollYProgress,
    [0.15, 0.3],
    ["25vw", "100vw"],
  );
  const heroHeight = useTransform(
    scrollYProgress,
    [0.15, 0.3],
    ["35vh", "100vh"],
  );
  const heroRadius = useTransform(scrollYProgress, [0.15, 0.3], ["0px", "0px"]);

  // Fade out other grid items
  const gridOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);

  // Phase 3: Horizontal Scroll
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const contentX = useTransform(
    scrollYProgress,
    [0.35, 0.9],
    ["100%", "-100%"],
  );

  // Background Parallax for the grid container
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-white text-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center will-change-transform">
        {/* Background Grid - Decorative items around the center */}
        <motion.div
          style={{ y: bgY, opacity: gridOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
        >
          <div className="grid grid-cols-4 gap-4 p-4 w-full max-w-7xl h-full items-center">
            <div className="col-span-1 self-start mt-20">
              <GridItem image="https://telhaclarke.com.au/wp-content/uploads/2025/09/Hepburn-20-480x320.jpg" />
            </div>
            <div className="col-span-1 col-start-4 self-end mb-20">
              <GridItem image="https://telhaclarke.com.au/wp-content/uploads/2025/08/Parlington-2-480x480.jpg" />
            </div>
            <div className="col-span-1 col-start-1 row-start-2 self-end mb-10">
              <GridItem image="https://telhaclarke.com.au/wp-content/uploads/2025/10/Argo-5-480x720.jpg" />
            </div>
            <div className="col-span-1 col-start-4 row-start-1 self-start mt-10">
              <GridItem image="https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-19-480x720.jpg" />
            </div>
          </div>
        </motion.div>

        {/* The Hero Image that scales to full screen */}
        <motion.div
          style={{
            width: heroWidth,
            height: heroHeight,
            borderRadius: heroRadius,
          }}
          className="absolute z-10 overflow-hidden"
        >
          <img
            src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Stanhope-3-2-480x720.jpg"
            alt="Works Hero"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay that fades in for content readability later */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className="absolute inset-0 bg-black/50"
          />
        </motion.div>

        {/* Pinned Title */}
        <motion.div
          style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
          className="z-20 flex items-start gap-2 absolute pointer-events-none text-brand-yellow/80"
        >
          <span className="text-6xl md:text-9xl font-serif">All Work</span>
          <sup className="text-xl md:text-3xl mt-4">(27)</sup>
        </motion.div>

        {/* Horizontal Scrolling Content */}
        <motion.div
          style={{ x: contentX, opacity: contentOpacity }}
          className="absolute top-0 left-0 h-full flex gap-32 pl-[80vw] items-center z-30"
        >
          <div className="w-[400px] md:w-[600px] flex-shrink-0 flex flex-col gap-4 bg-white p-4">
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

          <div className="w-[300px] md:w-[400px] flex-shrink-0 flex flex-col gap-4 mt-32 bg-white p-4">
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

          <div className="w-[500px] md:w-[700px] flex-shrink-0 flex flex-col gap-4 -mt-20 bg-white p-4">
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
        </motion.div>
      </div>
    </section>
  );
}
