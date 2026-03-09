"use client";

import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Project } from "@/modules/works/data/works-data";

interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  return (
    <div className="min-h-screen pt-40 pb-40">
      {/* ── Title ── */}
      <div className="px-(--margin)">
        <motion.h1
          className="text-[clamp(3.6rem,12vw,7.2rem)] font-normal leading-none max-w-[95%]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {project.name}
        </motion.h1>
      </div>

      {/* ── Metadata row ── */}
      <motion.div
        className="px-(--margin) mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {project.client && (
          <div>
            <span className="text-[#9a9a9a]">Client </span>
            <span className="font-normal">{project.client}</span>
          </div>
        )}
        <div>
          <span className="text-[#9a9a9a]">Typology </span>
          <span className="font-normal">{project.typology}</span>
        </div>
        <div>
          <span className="text-[#9a9a9a]">Year </span>
          <span className="font-normal">{project.year}</span>
        </div>
        {project.status && (
          <div>
            <span className="text-[#9a9a9a]">Status </span>
            <span className="font-normal">{project.status}</span>
          </div>
        )}
      </motion.div>

      {/* ── Hero image ── */}
      <motion.div
        className="mt-10 px-(--margin)"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-fit object-cover"
        />
      </motion.div>

      {/* ── Blockquote ── */}
      {project.quote && (
        <motion.div
          className="px-(--margin) py-20 md:py-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <blockquote className="text-[clamp(2.4rem,5vw,4.8rem)] font-normal leading-[1.1] max-w-[90%]">
            &ldquo;{project.quote}&rdquo;
          </blockquote>
        </motion.div>
      )}

      {/* ── About the Project ── */}
      {project.description && (
        <motion.div
          className="px-(--margin) grid grid-cols-12 gap-4 py-16 border-t border-black/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Label — left ~25% */}
          <div className="col-span-12 md:col-span-3">
            <span className="uppercase tracking-[0.15em] text-black">
              About the Project
            </span>
          </div>
          {/* Description — right ~75% */}
          <div className="col-span-12 md:col-span-9">
            <p className="text-[clamp(1rem,1.8vw,1.35rem)] leading-relaxed font-normal text-black max-w-[85%]">
              {project.description}
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Project Details table ── */}
      {project.details && project.details.length > 0 && (
        <motion.div
          className="px-(--margin) mt-16 md:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-12 border-t border-black/10">
            {/* "PROJECT DETAILS" label — left col, pinned to top */}
            <div className="col-span-12 md:col-span-3 pt-6 pb-6">
              <div className="uppercase tracking-[0.15em] text-black flex items-center gap-2">
                <span className="w-px h-3 bg-black inline-block" />
                Project Details
              </div>
            </div>

            {/* Table rows — right ~75% */}
            <div className="col-span-12 md:col-span-9">
              {project.details.map((d, i) => (
                <div
                  key={i}
                  className="border-b border-black/10 py-6 grid grid-cols-2 gap-8"
                >
                  <span className="text-base text-[#9a9a9a]">{d.label}</span>
                  <span className="text-base font-normal">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-20 md:mt-32 space-y-6 px-(--margin)">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <img
                src={img}
                alt={`${project.name} gallery ${i + 1}`}
                className="w-full"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Back to all works ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <Link
          to="/works"
          className="flex items-center gap-2 bg-black text-white text-sm px-6 py-3 rounded-full hover:bg-black/90 transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to all works
        </Link>
      </div>
    </div>
  );
}
