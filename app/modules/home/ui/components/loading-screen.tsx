import { useEffect } from "react";
import { runLoader } from "@/lib/animations/loader";
import { runHeaderEntrance } from "@/lib/animations/header-anim";

/**
 * LoadingScreen
 * Exact recreation of the inspo loading screen DOM structure.
 * The JS animation (loader.ts) targets these class names.
 */
export function LoadingScreen() {
  useEffect(() => {
    // Small delay to let React render the DOM
    const timer = setTimeout(() => {
      runLoader(() => {
        // After loader finishes, animate the header in
        runHeaderEntrance();
      });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* White panel that covers everything during load */}
      <div className="loader-panel" />

      {/* Main loader: centered logo + corner text */}
      <div className="loader">
        {/* Split logo — top half slides up, bottom half stays */}
        <div className="loader-logo svg-wrapper">
          <div style={{ position: "relative", width: "100%" }}>
            {/* Top SVG (moves up on complete) */}
            <div className="loader-logo-top" style={{ width: "100%" }}>
              <BrandSVG />
            </div>
            {/* Bottom SVG (stationary reference) */}
            <div
              className="loader-logo-bottom"
              style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            >
              <BrandSVG />
            </div>
          </div>
        </div>

        {/* Overlay (darkens logo at end) */}
        <div className="loader-overlay" />

        {/* Top-left: Studio type */}
        <div
          style={{
            position: "absolute",
            top: "var(--margin)",
            left: 0,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            columnGap: "var(--gutter)",
            paddingInline: "var(--margin)",
            color: "var(--color-black)",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <div className="loader-title body-16">
              <div className="line-w">
                <span
                  className="line"
                  style={{ display: "block", willChange: "transform" }}
                >
                  Design &amp; Branding studio
                </span>
              </div>
              <div className="line-w">
                <span
                  className="line"
                  style={{ display: "block", willChange: "transform" }}
                >
                  brand<span style={{ fontStyle: "italic" }}>+</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: location + loading counter */}
        <div
          style={{
            position: "absolute",
            bottom: "var(--margin)",
            left: 0,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            columnGap: "var(--gutter)",
            paddingInline: "var(--margin)",
            color: "var(--color-black)",
          }}
        >
          {/* Location */}
          <div style={{ gridColumn: "1 / 4" }}>
            <div className="loader-location body-16">
              <div className="line-w">
                <span
                  className="line"
                  style={{ display: "block", willChange: "transform" }}
                >
                  Dieffenbachstraße 37
                </span>
              </div>
              <div className="line-w">
                <span
                  className="line"
                  style={{ display: "block", willChange: "transform" }}
                >
                  Berlin, Germany
                </span>
              </div>
            </div>
          </div>

          {/* Loading + counter */}
          <div
            style={{
              gridColumn: "4 / -1",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
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

/**
 * BrandSVG — the "brand+" wordmark as a text-based SVG
 * Using the same aspect ratio as the inspo (1512 × 150 viewBox)
 */
function BrandSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      style={{ width: "100%", height: "auto", display: "block" }}
      aria-hidden="true"
    >
      <text
        x="50%"
        y="90"
        fill="currentColor"
        textAnchor="middle"
        fontFamily="Europa-Grotesk, Inter, sans-serif"
        fontWeight="400"
        fontSize="110"
        letterSpacing="-2"
      >
        brand+
      </text>
    </svg>
  );
}
