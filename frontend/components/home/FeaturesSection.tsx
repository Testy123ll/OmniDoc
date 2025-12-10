"use client";

import { motion } from "framer-motion";
import {
  FileText,
  PenTool,
  Sparkles,
  Share2,
  Lock,
  Zap,
} from "lucide-react";

const colorClasses = {
  "neon-cyan": {
    bg: "bg-neon-cyan/20",
    text: "text-neon-cyan",
  },
  "neon-pink": {
    bg: "bg-neon-pink/20",
    text: "text-neon-pink",
  },
  "neon-purple": {
    bg: "bg-neon-purple/20",
    text: "text-neon-purple",
  },
  "neon-green": {
    bg: "bg-neon-green/20",
    text: "text-neon-green",
  },
} as const;

type ColorKey = keyof typeof colorClasses;

const features: Array<{
  icon: any;
  title: string;
  description: string;
  color: ColorKey;
}> = [
  {
    icon: FileText,
    title: "Universal Conversion",
    description: "Convert between 300+ file formats instantly without quality loss.",
    color: "neon-cyan",
  },
  {
    icon: PenTool,
    title: "Professional Editing",
    description: "Edit PDFs, text, images with advanced tools. Add annotations, merge, split.",
    color: "neon-pink",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    description: "Grammar fixes, rewrites, summarization, translation, and more with AI.",
    color: "neon-purple",
  },
  {
    icon: Share2,
    title: "Smart Collaboration",
    description: "Share documents, collaborate in real-time, and sync across devices.",
    color: "neon-green",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "End-to-end encryption, password protection, and GDPR compliance.",
    color: "neon-pink",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-5 second conversions, optimized performance, and instant preview.",
    color: "neon-cyan",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
          Powerful Features
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Everything you need to convert, edit, and enhance documents professionally
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 group cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${colorClasses[feature.color].bg} group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${colorClasses[feature.color].text}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
