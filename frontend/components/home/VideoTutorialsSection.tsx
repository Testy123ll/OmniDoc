"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoTutorialsSection() {
  const categories = [
    { name: "Editing", icon: "📝" },
    { name: "Conversion", icon: "🔄" },
    { name: "AI Tools", icon: "✨" },
    { name: "Student Tips", icon: "🎓" },
    { name: "Office Workflows", icon: "💼" },
  ];

  const videos = [
    { title: "How to Convert PDF to Word", category: "Conversion", duration: "5:32" },
    { title: "Editing PDFs Like a Pro", category: "Editing", duration: "8:15" },
    { title: "Using AI for Document Summaries", category: "AI Tools", duration: "6:45" },
    { title: "Quick Note Taking Guide", category: "Student Tips", duration: "4:20" },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
          Video Tutorials
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Learn how to master OmniDoc with our comprehensive video guides
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="px-4 py-2 rounded-lg glass-button hover:bg-white/20 transition-all text-sm font-semibold"
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel overflow-hidden group cursor-pointer"
          >
            <div className="relative h-64 bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="p-4 rounded-full bg-neon-pink/80 group-hover:bg-neon-pink transition-all"
              >
                <Play size={32} className="fill-white" />
              </motion.button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded bg-neon-purple/30 text-neon-cyan">
                  {video.category}
                </span>
                <span className="text-xs text-white/60">{video.duration}</span>
              </div>
              <h3 className="text-lg font-bold">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
