import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { RevealText } from "@/components/reveal-text";
import { useLanguage } from "@/lib/i18n/context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function getScrollPhaseWeights(titleRow: HTMLElement) {
  const titleHeight = titleRow.offsetHeight;
  const viewportHeight = window.innerHeight;
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const headerHeight = 3.8 * rootFontSize;

  const entryDistance = Math.max(viewportHeight - headerHeight, 1);
  const holdDistance = Math.max(headerHeight, 1);
  const exitDistance = Math.max(titleHeight, 1);
  const total = entryDistance + holdDistance + exitDistance;

  return {
    entry: entryDistance / total,
    hold: holdDistance / total,
    exit: exitDistance / total,
  };
}

function buildWorkScrollTimeline(
  titleRow: HTMLElement,
  brackets?: {
    left: HTMLElement;
    right: HTMLElement;
    title: HTMLElement;
  },
) {
  const weights = getScrollPhaseWeights(titleRow);

  if (brackets) {
    gsap.set([brackets.left, brackets.right], { xPercent: 0 });
    gsap.set(brackets.title, { letterSpacing: "0em" });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: titleRow,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  if (brackets) {
    tl.to(
      brackets.left,
      { xPercent: -90, ease: "none", duration: weights.entry },
      0,
    )
      .to(
        brackets.right,
        { xPercent: 90, ease: "none", duration: weights.entry },
        0,
      )
      .to(
        brackets.title,
        { letterSpacing: "0.04em", ease: "none", duration: weights.entry },
        0,
      );
  }

  tl.to({}, { duration: weights.hold });

  if (brackets) {
    tl.to(
      brackets.left,
      { xPercent: 0, ease: "none", duration: weights.exit },
    )
      .to(
        brackets.right,
        { xPercent: 0, ease: "none", duration: weights.exit },
        "<",
      )
      .to(
        brackets.title,
        { letterSpacing: "0em", ease: "none", duration: weights.exit },
        "<",
      );
  }

  return tl;
}

function buildImageRevealTimeline(
  imageWrap: HTMLElement,
  imageContainer: HTMLElement,
) {
  gsap.fromTo(
    imageWrap,
    { scale: 0, transformOrigin: "center center" },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: imageContainer,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

function buildImageVanishTimeline(
  imageWrap: HTMLElement,
  titleRow: HTMLElement,
  imageContainer: HTMLElement,
) {
  gsap.fromTo(
    imageWrap,
    { scale: 1, transformOrigin: "center center" },
    {
      scale: 0,
      ease: "none",
      scrollTrigger: {
        trigger: titleRow,
        start: "top top",
        endTrigger: imageContainer,
        end: "bottom 3.8rem",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

const WorkItem: React.FC<{
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
}> = ({ title, category, year, image, href }) => {
  const ref = useRef<HTMLDivElement>(null);
  const titleRowRef = useRef<HTMLDivElement>(null);
  const bracketLeftRef = useRef<HTMLDivElement>(null);
  const bracketRightRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const titleRow = titleRowRef.current;
      const bracketLeft = bracketLeftRef.current;
      const bracketRight = bracketRightRef.current;
      const titleEl = titleRef.current;
      const imageWrap = imageWrapRef.current;
      const imageContainer = imageContainerRef.current;

      if (
        !titleRow ||
        !bracketLeft ||
        !bracketRight ||
        !titleEl ||
        !imageWrap ||
        !imageContainer
      ) {
        return;
      }

      const mm = gsap.matchMedia();

      gsap.set(imageWrap, { transformOrigin: "center center" });

      mm.add("(min-width: 1280px)", () => {
        buildWorkScrollTimeline(titleRow, {
          left: bracketLeft,
          right: bracketRight,
          title: titleEl,
        });
        buildImageRevealTimeline(imageWrap, imageContainer);
        buildImageVanishTimeline(imageWrap, titleRow, imageContainer);
      });

      mm.add("(max-width: 1279px)", () => {
        buildWorkScrollTimeline(titleRow);
        buildImageRevealTimeline(imageWrap, imageContainer);
        buildImageVanishTimeline(imageWrap, titleRow, imageContainer);
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [title] },
  );

  return (
    <div
      ref={ref}
      className="group w-full cursor-pointer mb-32 last:mb-0"
      data-work-title={title}
      data-work-href={href}
    >
      <div className="flex flex-col gap-8 md:gap-16">
        {/* Title with Brackets */}
        <div
          ref={titleRowRef}
          className="relative w-full flex justify-center items-center gap-4 md:gap-8 xl:gap-0 px-4 md:px-12 text-4xl md:text-6xl lg:text-8xl font-serif"
        >
          <div className="absolute top-1/2 left-4 w-8 md:w-12 h-px bg-black -translate-y-4 md:-translate-y-8 transition-all duration-500 group-hover:w-16 md:group-hover:w-24"></div>
          <div className="absolute top-1/2 right-4 w-8 md:w-12 h-px bg-black -translate-y-4 md:-translate-y-8 transition-all duration-500 group-hover:w-16 md:group-hover:w-24"></div>

          <div
            ref={bracketLeftRef}
            className="flex xl:justify-end xl:flex-1"
          >
            [
          </div>
          <h3
            ref={titleRef}
            className="text-center max-xl:flex-1 mx-4 xl:mx-0"
          >
            {title}
          </h3>
          <div ref={bracketRightRef} className="xl:flex-1">
            ]
          </div>
        </div>

        {/* Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full">
          <div className="col-span-1 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10">
            <div
              ref={imageContainerRef}
              className="relative w-full aspect-[4/3] overflow-hidden flex justify-center items-center"
            >
              <div ref={imageWrapRef} className="w-full h-full">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
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
  const { t } = useLanguage();
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
          <span className="text-mist">{t("home.portfolio.number")}</span>
          <h2>{t("home.portfolio.title")}</h2>
        </div>
        <div className="hidden md:block text-mist">
          {t("home.portfolio.number")}
        </div>
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
