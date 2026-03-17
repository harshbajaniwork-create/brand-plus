"use client";

/**
 * StudioJobs
 * Bottom section: paragraph on left, heading + link/arrow on right
 * Arrow button scales on hover, arrow rotates 45° on hover
 */
export function StudioJobs() {
  return (
    <section className="relative bg-white text-black border-t border-black/10">
      <div className="grid-w py-24 md:py-32">
        {/* Left — label + paragraph */}
        <div className="col-span-full md:col-span-2 flex items-start gap-4 uppercase body-12 mb-8 md:mb-0">
          <span className="text-[#cacfcb]">05</span>
          <span className="tracking-widest">Opportunities</span>
        </div>

        <div className="col-span-full md:col-start-3 md:col-end-7 xl:col-start-3 xl:col-end-7">
          <p className="body-16 leading-[1.75] text-black/70">
            We're always looking for talented individuals who are passionate
            about brand, strategy, and design. If you believe in the power of
            identity and want to work with brands that matter, we'd love to
            hear from you.
          </p>
        </div>

        {/* Right — heading + CTA arrow */}
        <div className="col-span-full md:col-start-8 md:col-end-13 xl:col-start-8 xl:col-end-13 flex flex-col justify-between mt-12 md:mt-0">
          <h3
            className="body-36 md:body-48 font-bold leading-[1.05] mb-12"
            style={{ letterSpacing: "-0.02em" }}
          >
            Job Offers
          </h3>

          {/* Job listing row */}
          <div className="flex flex-col gap-6">
            {[
              { title: "Brand Strategist", type: "Full-time · Berlin" },
              { title: "Senior Identity Designer", type: "Full-time · Berlin" },
              { title: "Digital Brand Director", type: "Full-time · Remote" },
            ].map((job) => (
              <a
                key={job.title}
                href="/contact"
                className="group flex items-center justify-between py-5 border-t border-black/10 no-underline text-black hover:text-black transition-colors"
              >
                <div>
                  <p className="body-16 font-medium">{job.title}</p>
                  <p className="body-14 text-black/50 mt-1">{job.type}</p>
                </div>

                {/* Arrow button */}
                <div
                  className="
                    w-12 h-12 rounded-full border border-black/20
                    flex items-center justify-center shrink-0
                    transition-transform duration-300 ease-out
                    group-hover:scale-125
                  "
                >
                  <svg
                    className="w-4 h-4 transition-transform duration-300 ease-out group-hover:rotate-45"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 13L13 3M13 3H6M13 3V10" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
