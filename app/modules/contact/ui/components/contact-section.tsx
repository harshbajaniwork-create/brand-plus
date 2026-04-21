"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";

const ROTATING_WORDS_EN = [
  "Queensland",
  "New South Wales",
  "South Australia",
  "Tasmania",
  "Victoria",
  "Western Australia",
  "the rest of the World",
];

const ROTATING_WORDS_DE = [
  "Berlin",
  "München",
  "Hamburg",
  "Köln",
  "Frankfurt",
  "Stuttgart",
  "der Rest der Welt",
];

export function ContactSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [phase, setPhase] = useState<"idle" | "animating">("idle");

  const rotatingWords =
    language === "de" ? ROTATING_WORDS_DE : ROTATING_WORDS_EN;

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (currentIndex + 1) % rotatingWords.length;
      setNextIndex(next);
      setPhase("animating");
      setTimeout(() => {
        setCurrentIndex(next);
        setPhase("idle");
      }, 600);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, rotatingWords]);

  const getTransform = (i: number) => {
    if (i === currentIndex && phase === "idle") return "translateY(0%)";
    if (i === nextIndex && phase === "animating") return "translateY(0%)";
    if (i === currentIndex && phase === "animating") return "translateY(-100%)";
    return "translateY(100%)";
  };

  return (
    <section
      className="relative"
      style={{ backgroundColor: "#c8cdc8", minHeight: "100svh" }}
    >
      {/*
        Main grid — uses align-content:end to push everything
        to the bottom of the viewport, just like the inspo.
        Two conceptual rows:
          ROW 1: heading (left 7 cols) + business/phone (right 5 cols)
          ROW 2: socials (left)        + address/image  (right 5 cols)
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridTemplateRows: "auto auto",
          gap: "0 var(--gutter, 1.5rem)",
          paddingLeft: "var(--margin, 2rem)",
          paddingRight: "var(--margin, 2rem)",
          paddingTop: "calc(var(--header-height, 60px) + 4rem)",
          paddingBottom: "var(--margin, 2rem)",
          minHeight: "100svh",
          alignContent: "end",
        }}
      >
        {/* ╔══════════════════════════════════════════╗
            ║   ROW 1 – LEFT: Heading                  ║
            ╚══════════════════════════════════════════╝ */}
        <div
          style={{ gridColumn: "1 / 8", gridRow: "1 / 2" }}
          className="max-md:col-span-full"
        >
          <h1
            className="font-bold leading-[1.05]"
            style={{
              letterSpacing: "-0.02em",
              fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            }}
          >
            <span style={{ display: "block" }}>{t("contact.heading")}</span>
            <span>in </span>
            {/* Rotating word container */}
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                overflow: "hidden",
                verticalAlign: "bottom",
              }}
            >
              {/* All words positioned absolutely */}
              {rotatingWords.map((word: string, i: number) => (
                <span
                  key={word}
                  style={{
                    display: "inline-block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    whiteSpace: "nowrap",
                    transition: "transform 700ms cubic-bezier(0.23,1,0.32,1)",
                    transform: getTransform(i),
                  }}
                >
                  {word}
                </span>
              ))}

              {/* Invisible longest word to hold container size */}
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  position: "relative",
                  whiteSpace: "nowrap",
                  visibility: "hidden",
                }}
              >
                {rotatingWords.reduce((a: string, b: string) =>
                  a.length >= b.length ? a : b,
                )}
              </span>
            </span>
          </h1>
        </div>

        {/* ╔══════════════════════════════════════════╗
            ║   ROW 1 – RIGHT: Business + Phone       ║
            ╚══════════════════════════════════════════╝ */}
        <div
          style={{ gridColumn: "8 / 13", gridRow: "1 / 2" }}
          className="max-md:col-span-full max-md:mt-12"
        >
          {/* BUSINESS */}
          <div className="flex items-baseline gap-x-8 flex-wrap">
            <span className="uppercase text-2xl tracking-wider shrink-0">
              {t("contact.business")}
            </span>
            <a
              href="mailto:home@brandplus.berlin"
              className="text-2xl no-underline hover:text-white transition-colors duration-200"
              style={{ color: "inherit" }}
            >
              home@brandplus.berlin
            </a>
          </div>

          {/* PHONE */}
          {/* <div className="flex items-baseline gap-x-8 flex-wrap mt-6">
            <span
              className="uppercase text-2xl tracking-wider shrink-0"
              style={{ minWidth: "6rem" }}
            >
              {t("contact.phone")}
            </span>
            <a
              href="tel:+4930123456789"
              className="text-2xl no-underline hover:text-white transition-colors duration-200"
              style={{ color: "inherit" }}
            >
              +49 30 1234 5678
            </a>
          </div> */}
        </div>

        {/* ╔══════════════════════════════════════════╗
            ║   ROW 2 – LEFT: Socials (bottom)        ║
            ╚══════════════════════════════════════════╝ */}
        <div
          style={{ gridColumn: "1 / 8", gridRow: "2 / 3", alignSelf: "end" }}
          className="max-md:col-span-full max-md:mt-8"
        >
          <div className="flex gap-2 text-2xl" style={{ paddingTop: "6rem" }}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-white transition-colors duration-200"
              style={{ color: "inherit" }}
            >
              {t("contact.instagram")},
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline hover:text-white transition-colors duration-200"
              style={{ color: "inherit" }}
            >
              {t("contact.linkedin")}
            </a>
          </div>
        </div>

        {/* ╔══════════════════════════════════════════╗
            ║   ROW 2 – RIGHT: Address + Image        ║
            ╚══════════════════════════════════════════╝ */}
        <div
          style={{
            gridColumn: "8 / 13",
            gridRow: "2 / 3",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--gutter, 1.5rem)",
            marginTop: "clamp(2rem, 4vw, 4rem)",
          }}
          className="max-md:col-span-full"
        >
          {/* Address */}
          <div className="flex flex-col justify-between">
            <span className="uppercase text-2xl tracking-wider">
              {t("contact.address")}
            </span>
            <div className="text-2xl mt-3" style={{ lineHeight: "1.6" }}>
              Dieffenbachstraße 37
              <br />
              10967 Berlin
            </div>
          </div>

          {/* Portrait image */}
          <div className="overflow-hidden" style={{ aspectRatio: "3 / 4" }}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/61323486bd579669f1017ee9/b8116445-bcc5-4e9b-b800-8a58802fa4e0/BENJAMIN-%C2%A9Ebener-0890-1.jpg?format=750w"
              alt="Studio office"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
