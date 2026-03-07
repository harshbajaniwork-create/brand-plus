import React, { useLayoutEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = "",
}) => (
  <div
    className={`scroll-stack-card relative w-full bg-white overflow-hidden ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    <div className="absolute left-0 right-0 top-0 h-px bg-black/10" />
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const endSpacerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);
  const lastPinStateRef = useRef(new Map<number, boolean>());
  const rafPendingRef = useRef(false);
  const lastPinnedTranslateYRef = useRef(new Map<number, number>());
  const pinLockTranslateYRef = useRef(new Map<number, number>());

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      return (scrollTop - start) / (end - start);
    },
    [],
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (parseFloat(value) / 100) * containerHeight;
      }
      return parseFloat(value as string);
    },
    [],
  );

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement as HTMLElement,
      };
    }

    const appScroller = document.getElementById("app") as HTMLElement | null;
    return {
      scrollTop: appScroller ? appScroller.scrollTop : 0,
      containerHeight: appScroller
        ? appScroller.clientHeight
        : window.innerHeight,
      scrollContainer: appScroller ?? (document.documentElement as HTMLElement),
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      }

      const appScroller = document.getElementById("app") as HTMLElement | null;
      if (!appScroller) return element.offsetTop;

      // Top of element relative to the scroll container content box.
      const elRect = element.getBoundingClientRect();
      const scrollerRect = appScroller.getBoundingClientRect();
      return elRect.top - scrollerRect.top + appScroller.scrollTop;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight, scrollContainer } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );

    const endElement = useWindowScroll
      ? (document.querySelector(".scroll-stack-end") as HTMLElement | null)
      : (containerRef.current?.querySelector(
          ".scroll-stack-end",
        ) as HTMLElement | null);

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      // Pin until the end spacer passes the stack position.
      // This keeps the first item pinned while subsequent items stack on top,
      // and releases only after the last item has had time to stack.
      const pinEnd = endElementTop - stackPositionPx;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = getElementOffset(cardsRef.current[j]);
          const jTriggerStart =
            jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const hysteresis = 8; // px buffer to prevent boundary flicker
      const lastPinned = lastPinStateRef.current.get(i) ?? false;
      const shouldPin =
        scrollTop >= pinStart + (lastPinned ? -hysteresis : hysteresis) &&
        scrollTop <= pinEnd - (lastPinned ? -hysteresis : hysteresis);

      lastPinStateRef.current.set(i, shouldPin);

      if (shouldPin) {
        // Lock the element at the moment it pins, so it doesn't drift while
        // later items stack on top.
        if (!pinLockTranslateYRef.current.has(i)) {
          const lockY =
            pinStart - cardTop + stackPositionPx + itemStackDistance * i;
          pinLockTranslateYRef.current.set(i, lockY);
        }

        translateY = pinLockTranslateYRef.current.get(i) ?? 0;

        // Prevent micro back-and-forth around boundaries (flicker)
        const lastPinnedY = lastPinnedTranslateYRef.current.get(i);
        if (typeof lastPinnedY === "number") {
          translateY =
            Math.abs(translateY - lastPinnedY) < 1 ? lastPinnedY : translateY;
        }
        lastPinnedTranslateYRef.current.set(i, translateY);
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
        lastPinnedTranslateYRef.current.delete(i);
        pinLockTranslateYRef.current.delete(i);
      } else {
        lastPinnedTranslateYRef.current.delete(i);
        pinLockTranslateYRef.current.delete(i);
      }

      const newTransform = {
        // snap to pixel to reduce shimmer
        translateY: Math.round(translateY),
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const handleScroll = useCallback(() => {
    if (rafPendingRef.current) return;
    rafPendingRef.current = true;
    requestAnimationFrame(() => {
      rafPendingRef.current = false;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : (host.querySelectorAll(".scroll-stack-card") ?? []),
    ) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Ensure we have enough scroll runway so items can remain pinned and stack
    // until the last one completes.
    const firstCard = cards[0];
    const approxCardHeight = firstCard
      ? firstCard.getBoundingClientRect().height
      : 0;
    const stackRunway =
      Math.max(0, cards.length - 1) * (approxCardHeight + itemDistance) +
      approxCardHeight;
    if (endSpacerRef.current && stackRunway > 0) {
      endSpacerRef.current.style.height = `${Math.ceil(stackRunway)}px`;
    }

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.position = "relative";
      card.style.zIndex = String(i + 1);
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
    });

    updateCardTransforms();

    const scrollEl: HTMLElement | Window = useWindowScroll
      ? window
      : ((document.getElementById("app") as HTMLElement | null) ?? window);

    scrollEl.addEventListener("scroll", handleScroll as EventListener, {
      passive: true,
    });

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll as EventListener);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      lastPinStateRef.current.clear();
      lastPinnedTranslateYRef.current.clear();
      pinLockTranslateYRef.current.clear();
      rafPendingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    onStackComplete,
    updateCardTransforms,
    handleScroll,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`.trim()}
      style={{ isolation: "isolate" }}
    >
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div ref={endSpacerRef} className="scroll-stack-end w-full" />
      </div>
    </div>
  );
};

export default ScrollStack;
