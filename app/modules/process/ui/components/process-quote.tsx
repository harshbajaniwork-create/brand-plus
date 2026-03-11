"use client";

/**
 * ProcessQuote
 * A large, bold blockquote that dominates the viewport.
 * Matches the Telha Clarke "Each project is unique…" section.
 */
export function ProcessQuote() {
  return (
    <section className="relative bg-white text-black px-(--margin) py-32 md:py-40">
      <blockquote className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-wide">
        &ldquo;Each brand is singular, responding to multiple truths — the
        outcome is never a single vision.&rdquo;
      </blockquote>
    </section>
  );
}
