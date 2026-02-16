"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div {...fadeInUp}>
            <h3 className="text-2xl font-bold font-id mb-4">brand+</h3>
            <p className="text-muted-foreground mb-6">
              Creating innovative branding solutions and design services that inspire and transform businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div {...fadeInUp} transition={{ delay: 0.1, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary mt-1 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Dieffenbachstraße 37 2.HH Fabrik<br />
                  10967 Berlin
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@brandplus.berlin" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@brandplus.berlin
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+493012345678" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +49 30 1234 5678
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Nachhaltigkeit", "Projekte", "Service", "Awards", "Events", "Kontakt"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Recent News */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3, duration: 0.6 }}>
            <h4 className="text-lg font-semibold mb-4">Recent News</h4>
            <div className="space-y-4">
              <div>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2">
                  The Ultimate Guide to Modern Architecture
                </a>
                <p className="text-xs text-muted-foreground/60 mt-1">14 Jan 2024</p>
              </div>
              <div>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2">
                  Interior Design Trends for 2024
                </a>
                <p className="text-xs text-muted-foreground/60 mt-1">10 Jan 2024</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 pt-8 border-t text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 brand+. Made with passion in Berlin.{" "}
            <a href="/datenschutz" className="text-primary hover:underline">
              Datenschutz
            </a>
            {" · "}
            <a href="/impressum" className="text-primary hover:underline">
              Impressum
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
