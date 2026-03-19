import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { RevealText } from "@/components/reveal-text";

const WorkItem: React.FC<{
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
}> = ({ title, category, year, image, href }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const bracketOffset = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div
      ref={ref}
      className="group w-full cursor-pointer mb-32 last:mb-0"
      data-work-title={title}
      data-work-href={href}
    >
      <div className="flex flex-col gap-8 md:gap-16">
        {/* Title with Brackets */}
        <div className="relative w-full flex justify-center items-center px-4 md:px-12">
          <div className="absolute top-1/2 left-4 w-8 md:w-12 h-px bg-black -translate-y-4 md:-translate-y-8 transition-all duration-500 group-hover:w-16 md:group-hover:w-24"></div>
          <div className="absolute top-1/2 right-4 w-8 md:w-12 h-px bg-black -translate-y-4 md:-translate-y-8 transition-all duration-500 group-hover:w-16 md:group-hover:w-24"></div>

          <div className="flex items-center gap-4 md:gap-8 text-4xl md:text-6xl lg:text-8xl font-serif">
            <motion.span
              style={{ x: useTransform(bracketOffset, (v) => -v) }}
              className="opacity-100"
            >
              [
            </motion.span>
            <h3 className="text-center mx-4">{title}</h3>
            <motion.span style={{ x: bracketOffset }} className="opacity-100">
              ]
            </motion.span>
          </div>
        </div>

        {/* Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
            <div className="relative w-full aspect-[4/3] overflow-hidden flex justify-center items-center">
              <motion.div
                className="w-full h-full"
                style={{ scale: imageScale }}
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="flex justify-between mt-4 text-sm uppercase">
              <RevealText>{category}</RevealText>
              <RevealText>{year}</RevealText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SelectedWorks() {
  const works = [
    {
      title: "German Expo Pavilion",
      category: "Ausstellung",
      href: "/works/expo",
      year: "2025",
      image:
        "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/d6c8f28a-f552-446f-878f-59151e5fb57c/IMG_8113_6896.jpg",
    },
    {
      title: "Neo",
      href: "/works/neo",
      category:
        "Mehrgeschossiger Neubau eines Bürogebäudes mit Veranstaltungsbereich",
      year: "2023",
      image:
        "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/a5fda4f0-18b8-462f-b58f-ba787a9d8d24/rwplus_NEO_Aerial.jpg?format=2500w",
    },
    {
      title: "FuHub",
      href: "/works/fuhub",
      category: "Mehrgeschossiger Neubau eines Büro- und Laborgebäudes",
      year: "2019",
      image:
        "https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/df34b30f-aba3-4519-8eb6-7859b4660f7b/220422_FUHUB_FOYER.jpg?format=2500w",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white text-black">
      {/* Header */}
      <div className="flex justify-between px-4 md:px-12 mb-20 md:mb-32 uppercase text-sm">
        <div className="flex gap-4">
          <span className="text-mist">02</span>
          <h2>Selected Works</h2>
        </div>
        <div className="hidden md:block text-mist">02</div>
        <div>17 - 25'</div>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {works.map((work, index) => (
          <WorkItem
            key={index}
            title={work.title}
            category={work.category}
            year={work.year}
            image={work.image}
            href={work.href}
          />
        ))}
      </div>
    </section>
  );
}
