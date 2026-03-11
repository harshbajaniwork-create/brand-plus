"use client";

/**
 * ProcessAccreditations
 * Section 03 — "Accreditations"
 *
 * LAYOUT (matching inspo):
 *  - Left col (1–3):  small "03 ACCREDITATIONS" label, top-aligned
 *  - Right col (7–13): stacked accreditation items
 *    Each item: title (large, bold) stacked above subtitle/description
 *    Separator lines between items (border-t)
 *    No separator on first item
 */

const accreditations = [
  {
    title: "ISO 9001 Certified",
    subtitle: "Quality Management System ISO 9001:2015",
  },
  {
    title: "Brand Council Member",
    subtitle:
      "Active member of the International Brand Council, committed to advancing ethical branding practices and industry-wide excellence.",
  },
  {
    title: "ADC — Art Directors Club",
    subtitle:
      "Recognised by the Art Directors Club for creative excellence. Our work upholds the highest standards of design craft and conceptual rigour.",
  },
  {
    title: "B Corp Aligned",
    subtitle:
      "Operating in alignment with B Corp standards — balancing profit with purpose, and measuring success by our impact on people and planet.",
  },
];

export function ProcessAccreditations() {
  return (
    <section className="relative bg-white text-black mt-100 md:mt-150 pb-100">
      {/* Bottom-left corner mark */}
      <div className="absolute w-16 h-16 md:w-20 md:h-20 left-0 bottom-0">
        <div className="absolute w-8 md:w-12 h-px bg-black left-4 top-0" />
        <div className="absolute w-px h-8 md:h-12 bg-black right-0 bottom-4" />
      </div>
      {/* Bottom-right corner mark */}
      <div className="absolute w-16 h-16 md:w-20 md:h-20 right-0 bottom-0">
        <div className="absolute w-8 md:w-12 h-px bg-black right-4 top-0" />
        <div className="absolute w-px h-8 md:h-12 bg-black left-0 bottom-4" />
      </div>

      <div className="grid-w">
        {/* ── Left label: col 1–3 ── */}
        <div className="col-span-full md:col-span-3 max-md:mb-52">
          <div className="flex gap-x-4 uppercase body-14">
            <span className="text-[#cacfcb]">03</span>
            <span className="tracking-widest">Accreditations</span>
          </div>
        </div>

        {/* ── Right list: col 7–13 ── */}
        <div className="col-span-full md:col-start-7 md:col-end-13 flex flex-col gap-y-32 md:gap-y-68">
          {accreditations.map((item, i) => (
            <div key={i} className="flex flex-col gap-y-16 md:gap-y-10">
              <h3 className="body-36 md:body-24 lg:body-36">{item.title}</h3>
              <div className="body-20">{item.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
