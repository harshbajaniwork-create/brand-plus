"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  openMenu,
  closeMenu,
  getMenuState,
} from "@/lib/animations/header-toggle";

/**
 * Navigation
 *
 * Behavior:
 *  - Transparent bg + white text when at the top of the page (over dark hero)
 *  - White bg + black text when user scrolls into light content sections
 *
 * Layout (desktop ≥1280px):
 *  brand+  |  Work  Process  Studio  ···  15:44  Berlin, DEU  Contact
 *
 * Layout (mobile <1280px):
 *  brand+  |  Menu
 */
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [berlinTime, setBerlinTime] = useState("--:--");
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Berlin time — 24h format, updates every second
  const updateTime = useCallback(() => {
    const now = new Date();
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const h = parts.find((p) => p.type === "hour")?.value ?? "00";
    const m = parts.find((p) => p.type === "minute")?.value ?? "00";
    setBerlinTime(`${h}:${m}`);
  }, []);

  useEffect(() => {
    setMounted(true);
    updateTime();
    intervalRef.current = setInterval(updateTime, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [updateTime]);

  // Scroll detection — switches color scheme once user scrolls past the Hero Section (~100vh)
  useEffect(() => {
    const scrollEl = document.getElementById("app") ?? window;

    const handleScroll = () => {
      // Threshold is roughly the height of the hero section (100vh)
      // Subtracting a small amount (like the header height) ensures it turns white
      // right as it hits the next section.
      const threshold = window.innerHeight - 80;
      const y =
        scrollEl instanceof Window
          ? scrollEl.scrollY
          : (scrollEl as HTMLElement).scrollTop;
      setIsScrolled(y > threshold);
    };

    scrollEl.addEventListener("scroll", handleScroll, { passive: true });
    // Also re-check on resize in case vh changes
    window.addEventListener("resize", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    if (getMenuState()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Dynamic classes based on scroll state
  const navBg = isScrolled
    ? "bg-white border-b border-black/[0.08]"
    : "bg-transparent";
  const textColor = isScrolled ? "text-black" : "text-white";
  const dimColor = isScrolled ? "text-black/40" : "text-white/40";

  return (
    <>
      {/* ================================================================
          HEADER BAR
          ================================================================ */}
      <header
        id="header"
        className={`
          sticky top-0 left-0 right-0 w-full z-100
          flex items-end
          px-(--margin) pb-1.5
          h-(--header-height)
          transition-colors duration-450ms ease-[cubic-bezier(0.23,1,0.32,1)]
          ${navBg} ${textColor}
        `}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="brand+ home"
          className={`header-logo shrink-0 no-underline ${textColor} transition-colors duration-450`}
          style={{
            fontFamily: "Europa-Grotesk, Inter, sans-serif",
            fontSize: "var(--text-16)",
            letterSpacing: "-0.02em",
            transform: "translateY(162%)",
            overflow: "hidden",
            display: "block",
          }}
        >
          brand+
        </a>

        {/* Desktop nav links — flex-grow fills center space */}
        <nav
          className="header-links desktop-nav flex-1 flex items-end pl-10 gap-8"
          aria-label="Main navigation"
          style={{ transform: "translateX(-80px)", overflow: "hidden" }}
        >
          {[
            { label: "Work", href: "/work" },
            { label: "Process", href: "/process" },
            { label: "Studio", href: "/studio" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`no-underline whitespace-nowrap hover:opacity-40 transition-opacity duration-300 ${textColor}`}
              style={{
                fontSize: "var(--text-16)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right cluster: time + location + contact */}
        <div className="header-right-cluster desktop-nav flex items-end gap-8 shrink-0">
          {/* Time — dimmed */}
          <span
            className={`header-time whitespace-nowrap ${dimColor} transition-colors duration-450ms`}
            style={{
              fontSize: "var(--text-16)",
              transform: "translateY(100%)",
            }}
          >
            {mounted ? berlinTime : "--:--"}
          </span>

          {/* Location */}
          <span
            className={`header-location whitespace-nowrap ${textColor} transition-colors duration-450ms`}
            style={{
              fontSize: "var(--text-16)",
              transform: "translateY(100%)",
            }}
          >
            Berlin, DEU
          </span>

          {/* Contact */}
          <a
            href="/contact"
            className={`header-contact whitespace-nowrap no-underline hover:opacity-40 transition-opacity duration-300 ${textColor}`}
            style={{
              fontSize: "var(--text-16)",
              transform: "translateY(100%)",
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          className={`mobile-nav header-toggler shrink-0 bg-transparent border-0 p-0 cursor-pointer ${textColor} hover:opacity-40 transition-opacity duration-300`}
          aria-label="Open menu"
          onClick={handleMenuToggle}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-16)",
            transform: "translateY(100%)",
            overflow: "hidden",
          }}
        >
          Menu
        </button>
      </header>

      {/* ================================================================
          MOBILE FULLSCREEN MENU
          ================================================================ */}
      <div
        className="header-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
      >
        <div
          className="header-menu-inner"
          style={{ paddingTop: "calc(var(--header-height) + 4rem)" }}
        >
          {/* Close button */}
          <div
            className="absolute top-0 right-(--margin) flex items-end pb-1.5"
            style={{ height: "var(--header-height)" }}
          >
            <button
              className="header-toggler-close bg-transparent border-0 p-0 cursor-pointer text-black hover:opacity-40 transition-opacity duration-300"
              onClick={closeMenu}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-16)",
                transform: "translateY(100%)",
              }}
            >
              Close
            </button>
          </div>

          {/* Logo at top-left */}
          <div
            className="absolute top-0 left-(--margin) flex items-end pb-1.5"
            style={{ height: "var(--header-height)" }}
          >
            <a
              href="/"
              className="no-underline text-black"
              onClick={closeMenu}
              style={{
                fontFamily: "Europa-Grotesk, Inter, sans-serif",
                fontSize: "var(--text-16)",
              }}
            >
              brand+
            </a>
          </div>

          {/* Nav links — large */}
          <nav className="flex flex-col gap-3">
            {[
              { label: "Home", href: "/" },
              { label: "Work", href: "/work" },
              { label: "Process", href: "/process" },
              { label: "Studio", href: "/studio" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <div key={item.href} style={{ overflow: "hidden" }}>
                <a
                  href={item.href}
                  className="header-link-mobile block no-underline text-black hover:opacity-40 transition-opacity duration-300"
                  onClick={closeMenu}
                  style={{
                    fontSize: "var(--text-36)",
                    lineHeight: "110%",
                    transform: "translateY(100%)",
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>

          {/* Socials at bottom */}
          <div className="absolute bottom-(--margin) left-(--margin) right-(--margin) flex gap-6">
            {[
              { label: "Instagram", href: "https://www.instagram.com" },
              { label: "Linkedin", href: "https://www.linkedin.com" },
            ].map((s) => (
              <div key={s.label} style={{ overflow: "hidden" }}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-social-link block no-underline text-black hover:opacity-40 transition-opacity duration-300"
                  style={{
                    fontSize: "var(--text-16)",
                    transform: "translateY(100%)",
                  }}
                >
                  {s.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay behind mobile menu */}
      <div className="header-overlay" onClick={closeMenu} />

      {/* Breakpoint visibility — scoped to avoid Tailwind purge issues */}
      <style>{`
        .desktop-nav { display: flex; }
        .mobile-nav   { display: none;  }
        @media (max-width: 1279px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: block !important; }
        }
      `}</style>
    </>
  );
}
