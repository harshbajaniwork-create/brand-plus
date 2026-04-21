"use client";

import { motion, AnimatePresence } from "framer-motion";
import { getLocalizedCategories } from "@/modules/works/data/works-data";
import { useLanguage } from "@/lib/i18n/context";

interface FiltersDrawerProps {
  open: boolean;
  activeFilter: string;
  onSelect: (key: string) => void;
}

export default function FiltersDrawer({
  open,
  activeFilter,
  onSelect,
}: FiltersDrawerProps) {
  const { t } = useLanguage();
  const categories = getLocalizedCategories(t);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="px-(--margin) overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pt-8 pb-20 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            {categories.map((cat, i) => {
              const isActive = cat.key === activeFilter;
              const countStr = String(cat.count).padStart(2, "0");

              return (
                <span key={cat.key} className="inline-flex items-baseline mb-2">
                  {i > 0 && (
                    <span className="text-[clamp(2.4rem,6vw,5.6rem)] text-[#cacfcb] font-normal mr-4 opacity-50">
                      /
                    </span>
                  )}
                  <button
                    onClick={() => onSelect(cat.key)}
                    className={`cursor-pointer text-[clamp(2.4rem,6vw,5.6rem)] font-normal leading-none transition-colors duration-400 ${
                      isActive ? "text-black" : "text-[#cacfcb]"
                    } hover:text-black`}
                  >
                    {cat.label}
                    <sup className="text-[0.35em] align-super ml-1 font-sans">
                      ({countStr})
                    </sup>
                  </button>
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
