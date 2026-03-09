"use client";

import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Project } from "@/modules/works/data/works-data";

interface WorksGridViewProps {
  projects: Project[];
}

export default function WorksGridView({ projects }: WorksGridViewProps) {
  // Split projects into two columns for staggered masonry effect
  const leftCol: Project[] = [];
  const rightCol: Project[] = [];
  projects.forEach((p, i) => {
    if (i % 2 === 0) leftCol.push(p);
    else rightCol.push(p);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12">
      {/* Left column */}
      <div className="flex flex-col gap-12">
        {leftCol.map((project, i) => (
          <GridItem key={project.slug} project={project} index={i * 2} />
        ))}
      </div>

      {/* Right column — offset down for staggered look */}
      <div className="flex flex-col gap-12 md:mt-32">
        {rightCol.map((project, i) => (
          <GridItem key={project.slug} project={project} index={i * 2 + 1} />
        ))}
      </div>
    </div>
  );
}

function GridItem({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: (index % 2) * 0.1,
      }}
    >
      <Link to={`/works/${project.slug}`} className="group block">
        {/* Image or Video */}
        <div className="relative overflow-hidden">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
          )}
        </div>

        {/* Project info */}
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="text-base font-normal text-black">
            {project.name}
          </span>
          <div className="flex items-baseline gap-6 text-sm text-[#9a9a9a]">
            <span>{project.type}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
