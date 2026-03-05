/**
 * header-anim.ts
 * Pure JS header entrance animations — triggered after loader completes.
 *
 * The header elements start translated off-screen and ease to natural position.
 */

export function runHeaderEntrance() {
  const headerLogo = document.querySelector<HTMLElement>(".header-logo");
  const headerLinks = document.querySelector<HTMLElement>(".header-links");
  const headerToggler = document.querySelector<HTMLElement>(".header-toggler");
  const headerTime = document.querySelector<HTMLElement>(".header-time");
  const headerLocation =
    document.querySelector<HTMLElement>(".header-location");
  const headerContact = document.querySelector<HTMLElement>(".header-contact");

  const transition = "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)";

  if (headerLogo) {
    headerLogo.style.transition = transition;
    headerLogo.style.transform = "translateY(0)";
  }

  if (headerLinks) {
    setTimeout(() => {
      headerLinks.style.transition = transition;
      headerLinks.style.transform = "translateX(0)";
    }, 50);
  }

  if (headerToggler) {
    setTimeout(() => {
      headerToggler.style.transition = transition;
      headerToggler.style.transform = "translateY(0)";
    }, 80);
  }

  if (headerTime) {
    setTimeout(() => {
      headerTime.style.transition = transition;
      headerTime.style.transform = "translateY(0)";
    }, 100);
  }

  if (headerLocation) {
    setTimeout(() => {
      headerLocation.style.transition = transition;
      headerLocation.style.transform = "translateY(0)";
    }, 130);
  }

  if (headerContact) {
    setTimeout(() => {
      headerContact.style.transition = transition;
      headerContact.style.transform = "translateY(0)";
    }, 160);
  }
}
