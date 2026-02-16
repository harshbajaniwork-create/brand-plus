"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Innovation and Crafts",
    category: "art & illustration",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Modern Living Space",
    category: "interior design",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Urban Architecture",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Minimalist Kitchen",
    category: "interior design",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Contemporary Office",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "Luxury Bedroom",
    category: "interior design",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop",
  },
];

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 bg-muted/20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-wider text-primary font-medium mb-4"
          >
            Best Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4"
          >
            Our Portfolio
          </motion.h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={false}
                  animate={{ y: hoveredId === project.id ? 0 : 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs uppercase tracking-wider text-primary font-medium mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3 font-serif">
                    {project.title}
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredId === project.id ? 1 : 0,
                      y: hoveredId === project.id ? 0 : 10,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 text-white"
                  >
                    <span className="text-sm">View Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Corner Accent */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: hoveredId === project.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
              >
                <ArrowUpRight className="w-6 h-6 text-primary-foreground" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
