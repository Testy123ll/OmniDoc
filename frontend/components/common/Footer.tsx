"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black gradient-text mb-4">OmniDoc</h3>
            <p className="text-white/60">
              Universal document conversion and AI-powered editing platform.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="/#features" className="hover:text-white transition">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="/security" className="hover:text-white transition">Security</a></li>
              <li><a href="/roadmap" className="hover:text-white transition">Roadmap</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/60">
              <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
              <li><a href="/cookies" className="hover:text-white transition">Cookies</a></li>
              <li><a href="/gdpr" className="hover:text-white transition">GDPR</a></li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © 2024 OmniDoc. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass-button hover:text-neon-cyan transition">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass-button hover:text-neon-cyan transition">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@omnidoc.com" className="p-2 rounded-lg glass-button hover:text-neon-cyan transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
