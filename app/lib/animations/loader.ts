/**
 * loader.ts
 * Pure JS loader animation matching the inspo (telhaclarke.com.au) loading screen.
 *
 * Sequence:
 *  0ms   – Page loads. Loader panel (white) covers everything.
 *  100ms – Slide in "Loading" text + counter starts from 0
 *  200ms – Slide in location text lines, studio/type lines
 *  400ms – Counter reaches 100%, logo top half slides up
 *  1800ms – Loader panel fades out, white overlay -> transparent
 *  2000ms – Callback fires so app can trigger header entrance anim
 */

export interface LoaderElements {
  loaderPanel: HTMLElement | null;
  loaderLogoTop: HTMLElement | null;
  loaderLogoBottom: HTMLElement | null;
  loaderOverlay: HTMLElement | null;
  loaderLoading: HTMLElement | null;
  loaderCounter: HTMLElement | null;
  loaderTitleLines: NodeListOf<HTMLElement>;
  loaderLocationLines: NodeListOf<HTMLElement>;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function getElements(): LoaderElements {
  return {
    loaderPanel: document.querySelector(".loader-panel"),
    loaderLogoTop: document.querySelector(".loader-logo-top"),
    loaderLogoBottom: document.querySelector(".loader-logo-bottom"),
    loaderOverlay: document.querySelector(".loader-overlay"),
    loaderLoading: document.querySelector(".loader-loading"),
    loaderCounter: document.querySelector(".loader-counter"),
    loaderTitleLines: document.querySelectorAll<HTMLElement>(
      ".loader-title .line",
    ),
    loaderLocationLines: document.querySelectorAll<HTMLElement>(
      ".loader-location .line",
    ),
  };
}

function animateCounter(
  el: HTMLElement,
  duration: number,
  onComplete: () => void,
) {
  let start: number | null = null;

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOut(progress);
    const count = Math.round(eased * 100);
    el.textContent = `${count}%`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = "100%";
      onComplete();
    }
  }

  requestAnimationFrame(step);
}

function slideInLine(el: HTMLElement, delay: number) {
  el.style.transform = "translateY(-100%)";
  el.style.transition = "none";

  setTimeout(() => {
    el.style.transition = `transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)`;
    el.style.transform = "translateY(0%)";
  }, delay);
}

function slideUpLogoTop(el: HTMLElement) {
  // Move actual top SVG up so it "splits" off
  el.style.transition = `transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)`;
  el.style.transform = "translateY(-50%)"; // Only slide up half-way for visible split effect
}

export function runLoader(onComplete?: () => void) {
  const els = getElements();

  if (!els.loaderPanel) {
    // No loader in DOM, just call complete immediately
    onComplete?.();
    return;
  }

  // Initially set states
  if (els.loaderLogoTop) {
    els.loaderLogoTop.style.transform = "translateY(0)";
    els.loaderLogoTop.style.transition = "none";
  }

  // Hide text lines off-screen initially
  els.loaderTitleLines.forEach((line) => {
    line.style.transform = "translateY(-100%)";
    line.style.display = "block";
    line.style.willChange = "transform";
  });

  els.loaderLocationLines.forEach((line) => {
    line.style.transform = "translateY(-100%)";
    line.style.display = "block";
    line.style.willChange = "transform";
  });

  if (els.loaderLoading) {
    els.loaderLoading.style.transform = "translateY(-100%)";
    els.loaderLoading.style.display = "block";
    els.loaderLoading.style.willChange = "transform";
  }

  if (els.loaderCounter) {
    els.loaderCounter.style.transform = "translateY(-100%)";
    els.loaderCounter.style.display = "block";
    els.loaderCounter.style.willChange = "transform";
  }

  // Step 1: Slide in title lines
  setTimeout(() => {
    els.loaderTitleLines.forEach((line, i) => {
      slideInLine(line, i * 80);
    });
  }, 150);

  // Step 2: Slide in location lines
  setTimeout(() => {
    els.loaderLocationLines.forEach((line, i) => {
      slideInLine(line, i * 80);
    });
  }, 200);

  // Step 3: Slide in Loading label
  setTimeout(() => {
    if (els.loaderLoading) slideInLine(els.loaderLoading, 0);
  }, 250);

  // Step 4: Slide in counter + start counting
  setTimeout(() => {
    if (els.loaderCounter) {
      slideInLine(els.loaderCounter, 0);

      setTimeout(() => {
        if (els.loaderCounter) {
          animateCounter(els.loaderCounter, 1200, () => {
            // Counter done → slide logo top up
            setTimeout(() => {
              if (els.loaderLogoTop) slideUpLogoTop(els.loaderLogoTop);

              // Fade out overlay + panel
              setTimeout(() => {
                if (els.loaderPanel) {
                  els.loaderPanel.style.transition =
                    "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), visibility 0.8s";
                  els.loaderPanel.style.opacity = "0";
                  els.loaderPanel.style.visibility = "hidden";
                }

                // Fade out entire .loader wrapper
                const loaderEl = document.querySelector<HTMLElement>(".loader");
                if (loaderEl) {
                  loaderEl.style.transition =
                    "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
                  loaderEl.style.opacity = "0";
                }

                setTimeout(() => {
                  // Remove loader from DOM entirely
                  const loaderEl2 =
                    document.querySelector<HTMLElement>(".loader");
                  if (loaderEl2) loaderEl2.style.display = "none";
                  if (els.loaderPanel) els.loaderPanel.style.display = "none";

                  // Unlock scroll
                  document.body.classList.remove("no-scroll");

                  onComplete?.();
                }, 850);
              }, 300);
            }, 100);
          });
        }
      }, 100);
    }
  }, 300);

  // Lock scroll during load
  document.body.classList.add("no-scroll");
}
