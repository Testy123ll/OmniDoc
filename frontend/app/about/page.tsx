"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { CheckCircle } from "lucide-react";

const features = [
  "✨ Fastest conversions in the industry",
  "🔒 256-bit encryption for all files",
  "🌍 99.9% uptime guarantee",
  "📱 Works on all devices",
  "🚀 Instant file processing",
  "♻️ Auto-delete after 24 hours",
  "🎯 Batch processing support",
  "⚡ Zero server logs",
  "🔄 Real-time progress tracking",
  "📊 Advanced analytics",
];

const missionAndVision = [
  {
    title: "Our Mission",
    description:
      "To revolutionize document handling by providing an intuitive, powerful, and accessible platform that serves everyone from students to enterprises.",
    icon: "🎯",
    ariaLabel: "Target icon",
  },
  {
    title: "Our Vision",
    description:
      "A world where document conversion, editing, and AI enhancement are so seamless that anyone can focus on their content instead of the tools.",
    icon: "🌟",
    ariaLabel: "Star icon",
  },
];

const teamMembers = [
  { name: "Alex Johnson", role: "Founder & CEO" },
  { name: "Sarah Chen", role: "CTO" },
  { name: "Marcus Rodriguez", role: "Design Lead" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-black gradient-text mb-4">About OmniDoc</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Transforming how the world handles documents. From students to enterprises,
              OmniDoc makes document management simple, powerful, and beautiful.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {missionAndVision.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-2xl"
              >
                <div className="text-4xl mb-4">
                  <span role="img" aria-label={item.ariaLabel}>{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-4xl font-black gradient-text mb-8 text-center">
              Why Choose OmniDoc?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-panel p-4 flex items-center gap-4"
                >
                  <CheckCircle size={24} className="text-neon-green flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-black gradient-text mb-8">Our Team</h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12">
              Built by a passionate team of engineers, designers, and product specialists
              dedicated to making document management better.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.name}
                  whileHover={{ scale: 1.05 }}
                  className="glass-panel p-8 rounded-2xl"
                >
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan mx-auto mb-4"
                    role="img"
                    aria-label={`Avatar for ${member.name}`}
                  ></div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-white/60 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
