import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const RevealText = ({
  children,
  className,
  delay = 0,
}: RevealTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
