"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    title: "In Good Taste: Mark Finlay Architects and Interiors",
    author: "ALEX SMITH",
    date: "Aug 06 2024",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop",
    excerpt: "Discover how Mark Finlay combines architecture and interior design to create stunning spaces.",
  },
  {
    id: 2,
    title: "Five Things You Should Know About Modern Furniture",
    author: "ALEX SMITH",
    date: "Aug 06 2024",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    excerpt: "Modern furniture trends that are shaping the future of interior design.",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-background relative overflow-hidden">
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
            Latest News
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-serif mb-4"
          >
            Our Blogs
          </motion.h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 font-serif group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <Button variant="ghost" className="group/btn p-0 h-auto font-medium">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
