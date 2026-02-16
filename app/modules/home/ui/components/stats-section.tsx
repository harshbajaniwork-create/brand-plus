"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Award, Users, DollarSign, Briefcase } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: 352,
    label: "Projects Completed",
    suffix: "",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    value: 567,
    label: "Satisfied Clients",
    suffix: "",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: DollarSign,
    value: 656,
    label: "Monthly Revenue",
    suffix: "M",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    value: 17,
    label: "Awards Won",
    suffix: "",
    color: "from-orange-500 to-red-500",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

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
            Our Achievements
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4"
          >
            Numbers Speak
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-card border rounded-2xl p-8 text-center h-full transition-all duration-300 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-2">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} p-0.5`}>
                    <div className="w-full h-full bg-background rounded-xl flex items-center justify-center">
                      <stat.icon className="w-8 h-8 text-foreground" />
                    </div>
                  </div>
                </div>

                {/* Counter */}
                <h3 className="text-5xl font-bold mb-4 font-serif">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>

                {/* Label */}
                <p className="text-muted-foreground font-medium">{stat.label}</p>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
