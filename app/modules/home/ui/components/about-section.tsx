"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const services = [
  "Design Project",
  "Interior Visualization",
  "Landscape Design",
  "Architect Services",
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-wider text-primary font-medium mb-4">
              About Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold font-serif mb-6">
              What we actually do.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Architecture bibendum pharetra eleifend. Suspendisse vel volutpat purus, 
              sit amet bibendum nisl. Mollis turpis a ipsum ultes, nec condi mentum ipsum 
              consequat. Mauris vitae consequat nibh, vitae interdum mi.
            </p>

            {/* Services List */}
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Check className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-muted-foreground/30">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-lg font-medium">{service}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=1000&fit=crop"
                alt="Architecture"
                className="w-full h-full object-cover"
              />
              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -left-8 bg-card border rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">17+</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Years of</p>
                  <p className="font-bold">Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
