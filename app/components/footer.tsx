"use client";

import { useEffect, useRef } from "react";
import { initFooterAnim } from "@/lib/animations/footer-anim";
import { useLanguage } from "@/lib/i18n/context";

/**
 * Footer
 * Exact recreation of the inspo footer using Tailwind CSS.
 *
 * Structure:
 *  - TOP (White): Contact CTA, Newsletter, Nav links, Address/Phone/Email, Socials.
 *  - BOTTOM (Black Sticky): Large brand+ SVG, Copyright, Legal links.
 */
export function Footer() {
  const { t } = useLanguage();
  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    initFooterAnim();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current?.value || !emailRef.current.value.includes("@")) {
      formRef.current?.classList.add("error");
      return;
    }
    formRef.current?.classList.remove("error");
    // Show success message
    const successEl = formRef.current?.querySelector<HTMLElement>(
      ".newsletter-form-success-message",
    );
    if (successEl) {
      successEl.style.transition =
        "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      successEl.style.transform = "translateY(0%)";
    }
  };

  const scrollToTop = () => {
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer -mt-px">
      {/* ================================================================
          TOP SECTION — white background
          ================================================================ */}
      <div className="relative w-full flex-1 grid grid-cols-6 md:grid-cols-12 gap-x-(--gutter) px-(--margin) items-end pt-40 pb-(--margin) bg-white z-1 overflow-hidden">
        {/* Col 1–5: Contact CTA + Newsletter */}
        <div className="col-span-full xl:col-span-5 flex flex-col items-start justify-between gap-12 mb-8 xl:mb-0">
          {/* Talk to us */}
          <div className="flex flex-col items-start gap-4">
            <div className="body-24 text-(--color-mist)">
              {t("footer.talkToUs")}
            </div>
            <a
              href="/contact"
              className="link-underline body-24 text-black no-underline"
            >
              {t("footer.contactUs")}
            </a>
          </div>

          {/* Newsletter */}
          {/* <div className="w-full flex flex-col gap-2">
            <div className="body-14">Subscribe to our newsletter</div>
            <form
              id="newsletter-form"
              ref={formRef}
              noValidate
              onSubmit={handleNewsletterSubmit}
              className="relative flex justify-between gap-8 min-w-[24rem] border-b border-black overflow-hidden"
            >
              <input
                ref={emailRef}
                type="email"
                name="EMAIL"
                placeholder="Enter your email"
                className="body-14 block outline-none rounded-none border-0 bg-transparent flex-1 py-3 text-inherit font-inherit"
              />
              {/* Success message */}
          <div className="newsletter-form-success-message body-14 absolute top-0 left-0 py-3 translate-y-full">
            Thanks for joining!
          </div>
          <button
            type="submit"
            aria-label="Submit"
            className="relative w-6 h-6 flex items-center justify-center cursor-pointer bg-transparent border-0 text-inherit py-3"
          >
            <svg
              width="13"
              height="10"
              viewBox="0 0 13 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.19922 0C1.42013 0 1.59961 0.179477 1.59961 0.400391V3.9502C1.59967 4.08821 1.71158 4.2002 1.84961 4.2002H9.60352C9.5349 4.0811 9.45139 3.96801 9.34961 3.86621L6.73047 1.24805C6.555 1.07238 6.55504 0.787026 6.73047 0.611328L7.13867 0.204102C7.31436 0.028412 7.59964 0.0285033 7.77539 0.204102L12.1094 4.53809C12.3632 4.79193 12.3632 5.20417 12.1094 5.45801L7.77539 9.79199C7.59964 9.96759 7.31436 9.96768 7.13867 9.79199L6.73047 9.38477C6.55506 9.20908 6.55504 8.92372 6.73047 8.74805L9.34961 6.12988C9.45019 6.02929 9.53239 5.91733 9.60059 5.7998H0.5C0.223897 5.7998 6.33352e-05 5.57589 0 5.2998V0.400391C0 0.179477 0.179477 0 0.400391 0H1.19922Z"
                fill="currentColor"
              />
            </svg>
          </button>
          {/* </form> */}
          {/* </div> */}
        </div>

        {/* Col 7–8: Nav links + Back to top */}
        <div className="col-span-full xl:col-start-7 xl:col-end-9 flex flex-col items-start gap-40 mb-8 xl:mb-0">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1.5 items-start">
              {[
                { label: t("footer.home"), href: "/" },
                { label: t("footer.work"), href: "/works" },
                { label: t("footer.studio"), href: "/studio" },
                { label: t("footer.process"), href: "/process" },
                { label: t("footer.contact"), href: "/contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="body-14 no-underline text-inherit hover:text-(--color-mist) transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <button
            className="body-14 flex gap-4 cursor-pointer text-(--color-mist) bg-transparent border-0 font-inherit p-0 hover:text-black transition-colors duration-300"
            onClick={scrollToTop}
          >
            {t("footer.backToTop")}
          </button>
        </div>

        {/* Col 10–13: Address + Phone + Email + Socials */}
        <div className="col-span-full xl:col-start-10 xl:col-end-13 flex flex-col justify-between mb-8 xl:mb-0">
          <div className="flex flex-col gap-1.5">
            {/* Location */}
            <div className="flex gap-12">
              <div className="body-14 opacity-40">{t("footer.location")}</div>
              <p className="body-14 m-0 leading-relaxed whitespace-pre-line">
                {t("footer.address")}
              </p>
            </div>

            {/* Phone */}
            {/* <div className="flex gap-12">
              <div className="body-14 opacity-40">P</div>
              <a
                href="tel:+493012345678"
                className="body-14 no-underline text-inherit hover:text-(--color-mist) transition-colors duration-300"
              >
                +49 30 1234 5678
              </a>
            </div> */}

            {/* Email */}
            <div className="flex gap-12">
              <div className="body-14 opacity-40">
                {t("footer.contactLabel")}
              </div>
              <a
                href="mailto:home@brandplus.berlin"
                className="body-14 no-underline text-inherit hover:text-(--color-mist) transition-colors duration-300"
              >
                {t("footer.email")}
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-2.5 mt-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="body-14 no-underline text-inherit hover:text-(--color-mist) transition-colors duration-300"
            >
              {t("footer.instagram")},
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="body-14 no-underline text-inherit hover:text-(--color-mist) transition-colors duration-300"
            >
              {t("footer.linkedin")}
            </a>
          </div>
        </div>

        {/* Mobile: copyright + legal */}
        <div className="xl:hidden col-span-3 mt-6 body-12 text-(--color-mist)">
          {t("footer.allRightsReserved")}
          <br />
          {t("footer.copyright")}
        </div>
        <div className="xl:hidden col-span-3 flex justify-end mt-6">
          <div className="flex flex-col items-end text-(--color-mist)">
            <a
              href="/privacy-policy"
              className="body-12 no-underline text-inherit"
            >
              {t("footer.privacyPolicy")}
            </a>
            <a
              href="/terms-of-service"
              className="body-12 no-underline text-inherit"
            >
              {t("footer.termsOfService")}
            </a>
          </div>
        </div>
      </div>

      {/* ================================================================
          BOTTOM STICKY STRIP — black background with large brand name
          ================================================================ */}
      <div className="sticky bottom-0 w-full bg-black z-0 overflow-hidden">
        <div className="p-(--margin)">
          <div className="footer-bottom-inner flex flex-col gap-8 relative">
            {/* Overlay that fades in */}
            <div className="footer-bottom-overlay absolute inset-0 opacity-0 bg-black/40 pointer-events-none" />

            {/* Brand name — large SVG text */}
            <div className="svg-wrapper w-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                className="w-full block"
                aria-hidden="true"
              >
                <text
                  x="50%"
                  y="100"
                  fill="currentColor"
                  textAnchor="middle"
                  fontFamily="Europa-Grotesk, Inter, sans-serif"
                  fontWeight="400"
                  fontSize="110"
                  letterSpacing="-2"
                >
                  brand+
                </text>
              </svg>
            </div>

            {/* Desktop: copyright + legal row */}
            <div className="hidden xl:flex justify-between text-white body-12">
              <div className="opacity-50">
                {t("footer.allRightsReserved")}
                <br />
                {t("footer.copyright")}
              </div>
              <a
                href="/privacy-policy"
                className="opacity-50 no-underline text-inherit hover:opacity-100 transition-opacity duration-300 body-12"
              >
                {t("footer.privacyPolicy")}
              </a>
              <a
                href="/terms-of-service"
                className="opacity-50 no-underline text-inherit hover:opacity-100 transition-opacity duration-300 body-12"
              >
                {t("footer.termsOfService")}
              </a>
              <div className="flex gap-1.5 opacity-50">
                <span>{t("footer.madeWithPassionIn")}</span>
                <span className="opacity-100">{t("footer.berlin")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
