"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter } from "lucide-react";

const team = [
  {
    name: "Leio Man",
    role: "Lead Architect",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Robert Front",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  },
  {
    name: "Matt Huk",
    role: "3D Specialist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Hasib Sharif",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
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
            Some thoughts from Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4"
          >
            Our Employees
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We feel proud for our expert team members beatae ipsum dolor sit amet, 
            consectetur adipisicing elit mauris vitae consequat nibh, vitae interdum mi.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-white" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-white" />
                  </a>
                </motion.div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
