"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl md:text-6xl font-black mb-4 gradient-text">
          About OmniDoc
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Learn more about our mission and vision.
        </p>
      </motion.div>
      {/* Add more content here */}
    </section>
  );
}
