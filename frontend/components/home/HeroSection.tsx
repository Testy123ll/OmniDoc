"use client";

import { motion } from "framer-motion";
import { FileUp, Zap, Shield, Layers } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-dark-bg via-dark-secondary to-dark-bg flex items-center justify-center px-4 md:px-8 pt-20">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(131, 56, 236, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(131, 56, 236, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-neon-cyan/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      ></motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6 px-4 py-2 glass-panel"
        >
          <span className="text-sm font-semibold neon-cyan">
            ✨ The Future of Document Handling
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-7xl font-black mb-6 gradient-text"
        >
          Universal Document Power
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto"
        >
          Convert, edit, and enhance documents with AI. 300+ formats supported.
          Perfect for students, professionals, and teams.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center mb-12"
        >
          <button
            className="px-8 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-neon-pink to-neon-purple 
                       hover:shadow-2xl hover:shadow-neon-pink/50 transition-all transform hover:scale-105"
          >
            Start Converting
          </button>
          <button
            className="px-8 py-4 rounded-xl font-bold text-lg glass-button hover:bg-white/20 transition-all"
          >
            Watch Demo
          </button>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: FileUp, label: "300+ Formats" },
            { icon: Zap, label: "Ultra Fast" },
            { icon: Shield, label: "Secure" },
            { icon: Layers, label: "Full Edit" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="glass-panel p-4 text-center"
            >
              <item.icon className="w-8 h-8 mx-auto mb-2 text-neon-cyan" />
              <p className="text-sm font-semibold">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
