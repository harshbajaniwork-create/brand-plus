import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RevealText } from "@/components/react-bits/reveal-text";
import { useLanguage } from "@/lib/i18n/context";

const steps = [
  {
    name: "Schematic Design",
    id: "01",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/12/Anderson-Sketch-480x600.png",
  },
  {
    name: "Development & Town Planning Applications",
    id: "02",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/10/PNG-AXO-03-NO-BADGE-480x600.jpg",
  },
  {
    name: "Design Development",
    id: "03",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/Italian-Club-External1-480x476.jpg",
  },
  {
    name: "Marketing",
    id: "04",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/12/Marketing-Plan-2-480x340.jpg",
  },
  {
    name: "Interior Design",
    id: "05",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/11/CN-Residence-22-e1764201118833-480x480.jpg",
  },
  {
    name: "Construction Documentation",
    id: "06",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/12/Bala-In-Construction-480x640.jpg",
  },
  {
    name: "Contract Administration",
    id: "07",
    image:
      "https://telhaclarke.com.au/wp-content/uploads/2025/09/Soho-2-480x720.jpg",
  },
];

export default function ProcessSection() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="relative py-32 px-4 md:px-12 bg-white text-black min-h-screen">
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20">
        <div className="absolute left-4 bottom-0 w-8 h-px bg-black"></div>
        <div className="absolute right-0 top-4 w-px h-8 bg-black"></div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20">
        <div className="absolute right-4 bottom-0 w-8 h-px bg-black"></div>
        <div className="absolute left-0 top-4 w-px h-8 bg-black"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20">
        <div className="absolute left-4 top-0 w-8 h-px bg-black"></div>
        <div className="absolute right-0 bottom-4 w-px h-8 bg-black"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20">
        <div className="absolute right-4 top-0 w-8 h-px bg-black"></div>
        <div className="absolute left-0 bottom-4 w-px h-8 bg-black"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* List */}
        <div className="col-span-1 lg:col-span-8">
          <div className="flex flex-wrap gap-x-2 gap-y-4 text-3xl md:text-5xl font-serif leading-tight">
            {steps.map((step, index) => (
              <span
                key={index}
                onMouseEnter={() => setActiveStep(index)}
                className={`cursor-pointer transition-colors duration-300 ${activeStep === index ? "text-black" : "text-mist/50"}`}
              >
                {step.name} <sup className="text-lg">({step.id})</sup>{" "}
                {index < steps.length - 1 && (
                  <span className="text-mist/30">/</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Image Display */}
        <div className="col-span-1 lg:col-span-4 relative h-[50vh] lg:h-auto">
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={steps[activeStep].image}
                alt={steps[activeStep].name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Footer of section */}
      <div className="grid grid-cols-1 md:grid-cols-12 mt-32">
        <div className="col-span-1 md:col-span-2 flex gap-4 uppercase text-sm">
          <span className="text-mist">{t("home.process.number")}</span>
          <span>{t("home.process.label")}</span>
        </div>
        <div className="col-span-1 md:col-start-7 md:col-end-11">
          <div className="text-xl md:text-2xl leading-relaxed">
            <RevealText>{t("home.process.description")}</RevealText>
          </div>
        </div>
      </div>
    </section>
  );
}
