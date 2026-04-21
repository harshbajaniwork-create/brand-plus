"use client";

import { useEffect } from "react";
import { initStudioAnimations } from "@/lib/animations/studio-anim";
import { useLanguage } from "@/lib/i18n/context";

/**
 * StudioSection
 * Exact recreation of the inspo "About" section as provided in the DOM.
 *
 * FIX: Removed nested grid div which was breaking the layout.
 * Children are now direct children of .grid-w for correct column spanning.
 */
export function StudioSection() {
  const { t } = useLanguage();
  useEffect(() => {
    const cleanup = initStudioAnimations();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className="studio-section relative grid-w pt-(--margin) mb-40 xl:pb-(--margin) bg-white text-black overflow-hidden">
      {/* Decorative Corners */}
      {/* Top Left */}
      <div className="absolute w-16 h-16 md:w-20 md:h-20 left-0 top-0 pointer-events-none z-20">
        <div className="absolute w-8 md:w-12 h-px bg-black left-4 bottom-0" />
        <div className="absolute w-px h-8 md:h-12 bg-black right-0 top-4" />
      </div>
      {/* Top Right */}
      <div className="absolute w-16 h-16 md:w-20 md:h-20 right-0 top-0 pointer-events-none z-20">
        <div className="absolute w-8 md:w-12 h-px bg-black right-4 bottom-0" />
        <div className="absolute w-px h-8 md:h-12 bg-black left-0 top-4" />
      </div>

      {/* 
          Sticky Image Column 
          Matches <div class="col-span-full md:col-span-3 xl:col-span-2 ...">
      */}
      <div className="studio-image-container col-span-full md:col-span-3 xl:col-span-2 max-md:mb-[5.2rem] relative z-10">
        <div className="relative w-full h-0 pt-[120%]">
          <div className="absolute top-0 left-0 w-full h-[calc(100%+25rem)]">
            <div className="studio-sticky-img relative w-full h-0 pt-[120%] overflow-hidden">
              <div className="absolute inset-0">
                <figure className="w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-22-480x720.jpg"
                    alt="Studio"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
          Content Column 
          Matches <div class="col-span-full md:col-start-5 xl:col-start-7 md:col-end-11 ...">
      */}
      <div className="col-span-full md:col-start-5 xl:col-start-7 md:col-end-11 max-md:order-first max-md:mb-[5.2rem] flex flex-col justify-between relative z-10">
        <div className="studio-subtitle flex gap-x-10 uppercase body-14">
          <div className="subtitle-number text-[#cacfcb] overflow-hidden flex">
            <span className="char translate-y-full opacity-0">0</span>
            <span className="char translate-y-full opacity-0">1</span>
          </div>
          <div className="subtitle-text text-black flex overflow-hidden">
            {t("home.studio.subtitle")
              .split("")
              .map((char, i) => (
                <span key={i} className="char translate-y-full opacity-0">
                  {char}
                </span>
              ))}
          </div>
        </div>

        <div className="wysiwyg w-full max-md:mt-10 body-16 leading-[1.3] mt-8">
          <p>{t("home.studio.description")}</p>
        </div>
      </div>

      {/* 
          Large Centered Title 
          Matches <div class="col-span-full mb-32 md:mt-250 md:mb-100">
      */}
      <div className="col-span-full mb-32 md:mt-60 md:mb-20 relative z-10">
        <div className="block md:-mt-10 lg:-mt-12 xl:-mt-14">
          <span className="inline-block md:w-(--width-col-4) xl:w-(--width-col-offset-3) max-md:hidden"></span>
          <h2 className="studio-title-text translate-y-5 opacity-0 inline w-full body-36 md:body-48 lg:body-60 xl:body-72 leading-[1.1] font-normal uppercase">
            {t("home.studio.title")}
          </h2>
        </div>
      </div>

      {/* Bottom Small Text Side-by-Side */}
      <div className="col-span-full md:col-start-1 md:col-end-4 xl:col-start-4 xl:col-end-6 body-16 max-md:mb-[3.2rem] uppercase relative z-10">
        {t("home.studio.founders")}
      </div>

      <div className="col-span-full md:col-start-5 xl:col-start-7 md:col-end-11 xl:pb-40 body-16 leading-relaxed relative z-10">
        <p className="whitespace-pre-line">{t("home.studio.claim")}</p>
      </div>
    </section>
  );
}
