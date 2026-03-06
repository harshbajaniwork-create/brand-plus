import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio Section Animations
 * Uses GSAP for character-split reveal and the "sliding" sticky image effect.
 */

export function initStudioAnimations() {
  const chars = document.querySelectorAll<HTMLElement>(
    ".studio-subtitle .char",
  );
  const studioTitle = document.querySelector<HTMLElement>(".studio-title-text");
  const stickyImg = document.querySelector<HTMLElement>(".studio-sticky-img");
  const scroller = document.getElementById("app") ? "#app" : window;

  // 1. Character/Title Reveals
  const revealTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".studio-section",
      start: "top 70%",
      scroller: scroller,
      once: true,
    },
  });

  if (chars.length > 0) {
    revealTl.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: "power2.out",
    });
  }

  if (studioTitle) {
    revealTl.to(
      studioTitle,
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5",
    );
  }

  // 2. Sliding Sticky Image (The Inspo behavior)
  if (stickyImg) {
    gsap.to(stickyImg, {
      y: "12rem", // Reduced slide to prevent overlap with bottom row
      ease: "none",
      scrollTrigger: {
        trigger: ".studio-section",
        start: "top 20%",
        end: "bottom 80%",
        scroller: scroller,
        scrub: 1.5,
      },
    });
  }

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
