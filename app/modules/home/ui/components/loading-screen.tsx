import { useEffect, useState } from "react";
import { runLoader } from "@/lib/animations/loader";
import { runHeaderEntrance } from "@/lib/animations/header-anim";
import SplitText from "@/components/react-bits/split-text";

/**
 * LoadingScreen
 *
 * The "brand+" wordmark in the center uses SplitText to animate each
 * character in on mount. Once all letters have finished animating,
 * the normal loader sequence (progress counter → panel wipe → header
 * entrance) kicks off.
 */
export function LoadingScreen() {
  const [splitDone, setSplitDone] = useState(false);

  // Only start the loader animation after the split-text has finished
  useEffect(() => {
    if (!splitDone) return;

    const timer = setTimeout(() => {
      runLoader(() => {
        runHeaderEntrance();
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [splitDone]);

  return (
    <>
      {/* White panel that covers everything during load */}
      <div className="loader-panel" />

      {/* Main loader: centered logo + corner text */}
      <div className="loader">
        {/* ── Centered brand+ wordmark with SplitText ── */}
        <div className="loader-logo svg-wrapper">
          <div className="relative w-full flex items-center justify-center">
            {/* Top half — slides up on loader complete */}
            <div className="loader-logo-top w-full text-center">
              <BrandWordmark onComplete={() => setSplitDone(true)} />
            </div>
          </div>
        </div>

        {/* Overlay (darkens logo at end) */}
        <div className="loader-overlay" />

        {/* ── Top-left: Studio descriptor ── */}
        <div className="absolute top-(--margin) left-0 w-full grid grid-cols-6 gap-x-(--gutter) px-(--margin) text-black">
          <div className="col-span-full">
            <div className="loader-title body-16">
              <div className="line-w">
                <span
                  className="line block"
                  style={{ willChange: "transform" }}
                >
                  Design &amp; Branding studio
                </span>
              </div>
              <div className="line-w">
                <span
                  className="line block"
                  style={{ willChange: "transform" }}
                >
                  brand<span className="italic">+</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom: location + loading counter ── */}
        <div className="absolute bottom-(--margin) left-0 w-full grid grid-cols-6 gap-x-(--gutter) px-(--margin) text-black">
          {/* Location */}
          <div className="col-span-3">
            <div className="loader-location body-16">
              <div className="line-w">
                <span
                  className="line block"
                  style={{ willChange: "transform" }}
                >
                  Dieffenbachstraße 37
                </span>
              </div>
              <div className="line-w">
                <span
                  className="line block"
                  style={{ willChange: "transform" }}
                >
                  Berlin, Germany
                </span>
              </div>
            </div>
          </div>

          {/* Loading + counter */}
          <div className="col-span-3 flex justify-end">
            <div className="flex flex-col items-start">
              <div className="overflow-hidden">
                <div
                  className="loader-loading body-16"
                  style={{ willChange: "transform" }}
                >
                  Loading
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="loader-counter body-16"
                  style={{ willChange: "transform" }}
                >
                  0%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame bars (left/right decorative borders) */}
      <div className="frame">
        <div className="frame-left" />
        <div className="frame-right" />
      </div>

      {/* Page overlay */}
      <div className="page-overlay" />
    </>
  );
}

/* ─────────────────────────────────────────────
   BrandWordmark
   Animated version — used in loader-logo-top.
   Calls onComplete when every character has
   finished its entrance animation.
───────────────────────────────────────────── */
interface BrandWordmarkProps {
  onComplete: () => void;
}

function BrandWordmark({ onComplete }: BrandWordmarkProps) {
  return (
    <SplitText
      text="brand+"
      className="
        font-black uppercase tracking-[-0.02em] leading-none
        text-[clamp(52px,10vw,130px)]
        text-black
      "
      delay={60}
      duration={1.9}
      ease="power3.out"
      splitType="chars"
      from={{ opacity: 0, y: 50 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="0px"
      textAlign="center"
      onLetterAnimationComplete={onComplete}
    />
  );
}
