"use client";

/**
 * StudioAwards
 * Clean table listing awards/recognition
 */

const awards = [
  {
    year: "2025",
    award: "Red Dot Award",
    category: "Brand Identity",
    project: "Arket Studio",
    result: "Winner",
  },
  {
    year: "2025",
    award: "D&AD Awards",
    category: "Graphic Design",
    project: "Meridian Health",
    result: "Shortlisted",
  },
  {
    year: "2024",
    award: "Brand New Awards",
    category: "Identity of the Year",
    project: "Volka Spirits",
    result: "Winner",
  },
  {
    year: "2024",
    award: "Cannes Lions",
    category: "Design — Brand Identity",
    project: "Volka Spirits",
    result: "Bronze",
  },
  {
    year: "2023",
    award: "Graphis Design Annual",
    category: "Corporate Identity",
    project: "Bauer Archiv",
    result: "Platinum",
  },
  {
    year: "2023",
    award: "IF Design Award",
    category: "Communication Design",
    project: "Meridian Health",
    result: "Commendation",
  },
];

export function StudioAwards() {
  return (
    <section className="relative bg-white text-black border-t border-black/10">
      <div className="grid-w py-24 md:py-32">
        {/* Label */}
        <div className="col-span-full md:col-span-2 flex items-start gap-4 uppercase body-12 mb-16 md:mb-0">
          <span className="text-[#cacfcb]">04</span>
          <span className="tracking-widest">Recognition</span>
        </div>

        {/* Table */}
        <div className="col-span-full md:col-start-3 md:col-end-13">
          {awards.map((row, i) => (
            <div
              key={i}
              className="
                flex flex-col md:flex-row md:items-center
                gap-2 md:gap-0
                py-5 border-t border-black/10
                first:border-t-0
              "
            >
              {/* Year */}
              <div className="md:w-20 shrink-0">
                <span className="body-14 text-black/40">{row.year}</span>
              </div>
              {/* Award */}
              <div className="flex-1">
                <span className="body-14 font-medium">{row.award}</span>
              </div>
              {/* Category */}
              <div className="flex-1 hidden md:block">
                <span className="body-14 text-black/60">{row.category}</span>
              </div>
              {/* Project */}
              <div className="flex-1 hidden md:block">
                <span className="body-14 text-black/60">{row.project}</span>
              </div>
              {/* Result */}
              <div className="md:w-32 shrink-0 text-right">
                <span className="body-14 text-black/60">{row.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
