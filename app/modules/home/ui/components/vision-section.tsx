import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function VisionSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.35, 0.6, 0.65],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);

  const stepNumber = useTransform(scrollYProgress, (pos): string => {
    if (pos < 0.3) return "01";
    if (pos < 0.65) return "02";
    return "03";
  });

  const lineWidth = useTransform(scrollYProgress, [0, 0.1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-black text-white w-full"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center will-change-transform">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Stanhope-3-2-480x720.jpg"
            alt="Vision"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-center">
          <div className="absolute top-1/4 w-full text-center px-4">
            <div className="relative h-24 md:h-32 w-full flex justify-center items-center text-4xl md:text-7xl lg:text-8xl font-serif tracking-tight">
              <motion.span style={{ opacity: opacity1 }} className="absolute">
                Design integrity
              </motion.span>
              <motion.span style={{ opacity: opacity2 }} className="absolute">
                Innovation
              </motion.span>
              <motion.span style={{ opacity: opacity3 }} className="absolute">
                Enhanced living
              </motion.span>
            </div>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 md:px-12 flex items-center gap-4 md:gap-8">
            <div className="overflow-hidden min-w-[20px]">
              <motion.span className="text-white/80 text-xs md:text-sm uppercase">
                {stepNumber}
              </motion.span>
            </div>
            <motion.div
              style={{ width: lineWidth }}
              className="h-[1px] bg-white/40 flex-1 origin-left"
            ></motion.div>
            <div className="overflow-hidden min-w-[50px] text-right">
              <span className="text-white text-xs md:text-sm uppercase font-medium">
                Vision
              </span>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-0 w-full md:w-1/2 px-4 md:px-12 flex justify-end">
            <div className="relative w-full max-w-lg">
              <motion.div
                style={{ opacity: opacity1 }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-lg md:text-2xl leading-relaxed text-white/90">
                  Our design aesthetic is established through a consistent
                  process and a detailed concept brief, which considers client
                  needs, site context, and the future occupiers.
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: opacity2 }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-lg md:text-2xl leading-relaxed text-white/90">
                  Telha Clarke welcomes innovation through research and
                  technology to contribute new ideas and challenging theories.
                  We see technology as a tool.
                </p>
              </motion.div>
              <motion.div
                style={{ opacity: opacity3 }}
                className="absolute top-0 left-0 w-full"
              >
                <p className="text-lg md:text-2xl leading-relaxed text-white/90">
                  We believe enhanced user experience and well-being should be
                  at the forefront of design. We constantly consider the impact
                  of design on the end user.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12">
            <button className="bg-black text-white px-6 py-3 flex items-center gap-2 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
              <span>Vision</span>
              <span className="font-bold">Discover +</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
