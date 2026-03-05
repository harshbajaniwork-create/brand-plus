/**
 * footer-anim.ts
 * Animates the footer bottom strip (brand name) when it scrolls into view.
 */

export function initFooterAnim() {
  const footerBottom = document.querySelector<HTMLElement>(
    ".footer-bottom-inner",
  );
  if (!footerBottom) return;

  // Set initial translate
  footerBottom.style.transform = "translateY(40%)";
  footerBottom.style.transition = "none";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerBottom.style.transition =
            "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
          footerBottom.style.transform = "translateY(0%)";
          observer.unobserve(footerBottom);
        }
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(footerBottom);
}
