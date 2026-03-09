"use client";

import { useState, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Project } from "@/modules/works/data/works-data";

interface WorksListViewProps {
  projects: Project[];
}

export default function WorksListView({ projects }: WorksListViewProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const hoveredProject = projects.find((p) => p.slug === hoveredSlug);

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {/* Cursor-following image */}
      <motion.div
        className="fixed pointer-events-none z-40"
        animate={{
          x: mousePos.x + 20,
          y: mousePos.y - 120,
          opacity: hoveredSlug ? 1 : 0,
          scale: hoveredSlug ? 1 : 0.9,
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          y: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2 },
        }}
        style={{ width: 220, height: 280 }}
      >
        {hoveredProject && (
          <img
            src={hoveredProject.image}
            alt={hoveredProject.name}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 py-3 border-b border-black/10  uppercase ">
        <div className="col-span-3">Project</div>
        <div className="col-span-2">Typology</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-3">Location</div>
        <div className="col-span-1 text-right">Date</div>
      </div>

      {/* Rows */}
      {projects.map((project) => {
        const isHovered = hoveredSlug === project.slug;
        return (
          <Link
            key={project.slug}
            to={`/works/${project.slug}`}
            className="block -mx-(--margin)"
            onMouseEnter={() => setHoveredSlug(project.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <motion.div
              className="px-(--margin) grid grid-cols-12 gap-4 py-4 border-b border-black/5 cursor-pointer transition-colors duration-200"
              animate={{
                backgroundColor: isHovered
                  ? "var(--color-brand-red, #8B2500)"
                  : "#ffffff",
                color: isHovered ? "#ffffff" : "#000000",
              }}
              transition={{ duration: 0.15 }}
            >
              <div className="col-span-3 font-normal">{project.name}</div>
              <div className="col-span-2">{project.typology}</div>
              <div className="col-span-3">{project.type}</div>
              <div className="col-span-3">{project.location}</div>
              <div className="col-span-1 text-right">{project.year}</div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
