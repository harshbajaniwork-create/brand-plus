"use client";

/**
 * StudioQuote
 * Large blockquote offset by 2 columns (matching inspo DOM)
 * The quote flows inline after a 2-column spacer, so it wraps naturally
 * from the offset start point.
 */
export function StudioQuote() {
  return (
    <section className="relative bg-white text-black px-(--margin) py-32 md:py-48">
      <div className="w-full">
        {/* 2-column inline spacer — pushes quote start point right */}
        <span
          className="inline-block md:w-[calc(var(--column)*2)]"
          aria-hidden="true"
        />

        <blockquote className="inline body-48 md:body-60 xl:text-8xl! font-bold leading-[1.05] tracking-wider">
          "Each brand is singular, responding to multiple truths — the outcome
          is never a single vision."
        </blockquote>
      </div>
    </section>
  );
}
