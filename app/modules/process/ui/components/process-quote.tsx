"use client";

import { useLanguage } from "@/lib/i18n/context";

/**
 * ProcessQuote
 * A large, bold blockquote that dominates the viewport.
 * Matches the Telha Clarke "Each project is unique…" section.
 */
export function ProcessQuote() {
  const { t } = useLanguage();
  return (
    <section className="relative bg-white text-black px-(--margin) py-32 md:py-40">
      <blockquote className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-wide">
        {t("process.quote")}
      </blockquote>
    </section>
  );
}
