"use client";

/**
 * ProcessPhilosophy
 * Section 01 — two-column layout with a small "01 OUR PHILOSOPHY" label on
 * the left and body text on the right. Below the text: two full-width
 * side-by-side images.
 */
export function ProcessPhilosophy() {
  return (
    <section className="relative bg-white text-black">
      {/* ── 01 Philosophy — two-column text ── */}
      <div className="grid-w py-24 md:py-32">
        {/* Left label */}
        <div className="col-span-full md:col-span-3 flex items-start gap-4 uppercase body-12 mb-10 md:mb-0">
          <span className="text-[#cacfcb]">01</span>
          <span className="tracking-widest">Our Philosophy</span>
        </div>

        {/* Right body text */}
        <div className="col-span-full md:col-start-5 md:col-end-11 xl:col-start-7 xl:col-end-13">
          <p className="body-16 leading-[1.6] text-black">
            We are driven by a belief that brand identity can deepen people's
            connection to a business, enrich the way they interact with it, and
            preserve the cultural narratives that give it meaning. Our lasting
            impact will be thoughtful, context-led identities that honour their
            roots, strengthen their communities, and stand as enduring
            contributions to a more purposeful world.
          </p>
        </div>
      </div>

      {/* ── Side-by-side images ── */}
      <div className="w-full flex gap-1 md:gap-2">
        <div
          className="flex-1 overflow-hidden"
          style={{ height: "100vh", minHeight: 360 }}
        >
          <img
            src="https://telhaclarke.com.au/wp-content/uploads/2025/09/Loller-19-1200x1799.jpg"
            alt="Brand identity — spatial"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="flex-1 overflow-hidden"
          style={{ height: "100vh", minHeight: 360 }}
        >
          <img
            src="https://telhaclarke.com.au/wp-content/uploads/2025/08/TheSaint_30-1200x1799.jpg"
            alt="Brand identity — interior"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
