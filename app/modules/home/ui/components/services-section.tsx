"use client";

import { motion } from "framer-motion";
import { Building2, Palette, Box, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "Architecture",
    description: "Cras mollis turpis a ipsum ultes, nec cond imentum ipsum consequat. We create innovative architectural designs.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Cras mollis turpis a ipsum ultes, nec cond imentum ipsum consequat. Transform your space with stunning interiors.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Box,
    title: "3D Modeling",
    description: "Cras mollis turpis a ipsum ultes, nec cond imentum ipsum consequat. Visualize your project before construction.",
    color: "from-orange-500 to-red-500",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-wider text-primary font-medium mb-4"
          >
            Best Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4"
          >
            Our Services
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative bg-card border rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-2xl hover:border-primary/20">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-linear-to-br ${service.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Read More Link */}
                <Button variant="ghost" className="group/btn p-0 h-auto font-medium">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>

                {/* Hover Gradient Effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
