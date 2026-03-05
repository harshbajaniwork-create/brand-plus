/**
 * header-toggle.ts
 * Pure JS mobile menu open/close animations.
 *
 * Open:  .header-menu slides from translateY(-100%) → translateY(0)
 *        .header-menu-inner slides from translateY(100%) → translateY(0)
 *        mobile links stagger in from translateY(100%) → translateY(0)
 *        overlay fades in
 *
 * Close: reverse of above
 */

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const DUR_MENU = "0.7s";
const DUR_INNER = "0.8s";
const DUR_LINK = "0.6s";
const DUR_OVERLAY = "0.5s";

let isOpen = false;

export function openMenu() {
  const menu = document.querySelector<HTMLElement>(".header-menu");
  const inner = document.querySelector<HTMLElement>(".header-menu-inner");
  const overlay = document.querySelector<HTMLElement>(".header-overlay");
  const links = document.querySelectorAll<HTMLElement>(".header-link-mobile");
  const socials = document.querySelectorAll<HTMLElement>(".header-social-link");
  const closeBtn = document.querySelector<HTMLElement>(".header-toggler-close");

  if (!menu) return;
  isOpen = true;

  // Prevent background scroll
  document.body.classList.add("no-scroll");

  // Set initial states
  if (inner) {
    inner.style.transition = "none";
    inner.style.transform = "translateY(100%)";
  }
  links.forEach((link) => {
    link.style.transition = "none";
    link.style.transform = "translateY(100%)";
  });
  socials.forEach((s) => {
    s.style.transition = "none";
    s.style.transform = "translateY(100%)";
  });
  if (closeBtn) {
    closeBtn.style.transition = "none";
    closeBtn.style.transform = "translateY(100%)";
  }

  // Slide menu down
  menu.style.transition = `transform ${DUR_MENU} ${EASE}`;
  menu.style.transform = "translateY(0)";

  // Fade overlay
  if (overlay) {
    overlay.style.pointerEvents = "auto";
    overlay.style.transition = `opacity ${DUR_OVERLAY} ${EASE}`;
    overlay.style.opacity = "0.5";
  }

  // Slide in inner content
  setTimeout(() => {
    if (inner) {
      inner.style.transition = `transform ${DUR_INNER} ${EASE}`;
      inner.style.transform = "translateY(0)";
    }

    if (closeBtn) {
      closeBtn.style.transition = `transform ${DUR_LINK} ${EASE}`;
      closeBtn.style.transform = "translateY(0)";
    }

    // Stagger links
    links.forEach((link, i) => {
      setTimeout(() => {
        link.style.transition = `transform ${DUR_LINK} ${EASE}`;
        link.style.transform = "translateY(0)";
      }, i * 60);
    });

    // Stagger socials
    socials.forEach((s, i) => {
      setTimeout(
        () => {
          s.style.transition = `transform ${DUR_LINK} ${EASE}`;
          s.style.transform = "translateY(0)";
        },
        200 + i * 60,
      );
    });
  }, 100);
}

export function closeMenu() {
  const menu = document.querySelector<HTMLElement>(".header-menu");
  const inner = document.querySelector<HTMLElement>(".header-menu-inner");
  const overlay = document.querySelector<HTMLElement>(".header-overlay");
  const links = document.querySelectorAll<HTMLElement>(".header-link-mobile");
  const socials = document.querySelectorAll<HTMLElement>(".header-social-link");

  if (!menu) return;
  isOpen = false;

  document.body.classList.remove("no-scroll");

  // Slide inner out first
  if (inner) {
    inner.style.transition = `transform ${DUR_INNER} ${EASE}`;
    inner.style.transform = "translateY(100%)";
  }

  links.forEach((link) => {
    link.style.transition = `transform 0.4s ${EASE}`;
    link.style.transform = "translateY(100%)";
  });

  socials.forEach((s) => {
    s.style.transition = `transform 0.4s ${EASE}`;
    s.style.transform = "translateY(100%)";
  });

  // Then slide menu up
  setTimeout(() => {
    menu.style.transition = `transform ${DUR_MENU} ${EASE}`;
    menu.style.transform = "translateY(-100%)";

    if (overlay) {
      overlay.style.transition = `opacity ${DUR_OVERLAY} ${EASE}`;
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.pointerEvents = "none";
      }, 500);
    }
  }, 150);
}

export function toggleMenu() {
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

export function getMenuState() {
  return isOpen;
}
