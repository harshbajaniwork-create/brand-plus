"use client";

/**
 * StudioHero
 *
 * Layout: 2-column
 *  LEFT  (~50%): large heading at top + sticky paragraph pinned to BOTTOM
 *  RIGHT (~50%): tall portrait image with [Scroll down] label top-right
 *
 * The key fix:
 *  - Left column is `flex flex-col` with the heading at top
 *  - Paragraph has `position: sticky; bottom: <margin>` — pins to BOTTOM of viewport
 *  - [Scroll down] is positioned top-right of the image column
 *  - Section height is driven by the tall image, creating scroll room
 */
export function StudioHero() {
  const bottomMargin = "var(--bottom-margin, 2rem)";

  return (
    <section className="relative bg-white text-black pt-44">
      <div
        className="grid-w"
        style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
      >
        {/* LEFT: heading at top, paragraph sticky at bottom */}
        <div
          className="col-span-full md:col-span-5 xl:col-span-5 flex flex-col"
          style={{ minHeight: "100%" }}
        >
          {/* Heading — scrolls naturally */}
          <h1 className="body-48 md:body-60 xl:text-7xl! font-bold leading-[1.05]">
            Brand+ is a Berlin‑based branding & identity studio.
          </h1>

          {/* Spacer — pushes paragraph to bottom */}
          <div className="flex-1" style={{ minHeight: "4rem" }} />

          {/* Paragraph — sticky at BOTTOM of viewport */}
          <p
            className="body-16 leading-[1.75] text-black/80 max-w-md"
            style={{
              position: "sticky",
              bottom: "2rem",
              alignSelf: "flex-start",
            }}
          >
            We provide a strategic, hands-on approach to brand building.
            Underpinning all of our work is an understanding of context, client
            ambition, and cultural relevance — so that identities are
            meaningful, enduring, and deeply resonant.
            <br />
            <br />
            With experience spanning challenger brands, heritage institutions,
            and category-defining startups, we believe human intelligence must
            drive every creative decision.
          </p>
        </div>

        {/* RIGHT: tall portrait image + [Scroll down] label */}
        <div className="col-span-full md:col-start-7 md:col-end-13 relative mt-0">
          {/* [Scroll down] — top right of image column */}
          <div
            className="absolute top-0 right-0 text-black/30 text-sm"
            style={{ fontSize: "0.8rem", letterSpacing: "0.02em" }}
            aria-hidden="true"
          >
            [Scroll down]
          </div>

          <div className="overflow-hidden w-full">
            <img
              src="https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/4c63f65b-dec7-484a-9f1f-c2a322873910/04%2BHof%2Bschwebend%2BUpdate%2B006_Bildrechte.jpg?format=1000w"
              alt="brand+ studio"
              className="w-full object-cover object-center"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
