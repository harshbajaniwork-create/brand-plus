/**
 * Hero Section Animations
 * Pure JavaScript parallax and entrance effects.
 */

export function initHeroParallax() {
  const heroImage = document.querySelector<HTMLElement>(".hero-parallax-img");
  const scrollEl = document.getElementById("app") ?? window;

  if (!heroImage) return;

  const handleScroll = () => {
    const y =
      scrollEl instanceof Window
        ? scrollEl.scrollY
        : (scrollEl as HTMLElement).scrollTop;
    // Slow parallax effect
    const translateVal = y * 0.4;
    heroImage.style.transform = `translate3d(0, ${translateVal}px, 0)`;
  };

  scrollEl.addEventListener("scroll", handleScroll, { passive: true });
  return () => scrollEl.removeEventListener("scroll", handleScroll);
}

export function runHeroEntrance() {
  const title = document.querySelector<HTMLElement>(".hero-title");
  const bottom = document.querySelector<HTMLElement>(".hero-bottom");

  if (title) {
    title.style.transition =
      "opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
    title.style.opacity = "0";
    title.style.transform = "translateY(20px)";

    setTimeout(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }, 100);
  }

  if (bottom) {
    bottom.style.transition = "opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1)";
    bottom.style.opacity = "0";

    setTimeout(() => {
      bottom.style.opacity = "1";
    }, 400);
  }
}
