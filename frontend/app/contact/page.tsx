"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-black gradient-text mb-4">Get in Touch</h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: "Email",
                content: "hello@omnidoc.io",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (555) 123-4567",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "San Francisco, CA",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 text-center"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-neon-cyan" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neon-purple transition-all"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neon-purple transition-all"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neon-purple transition-all"
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-neon-purple transition-all resize-none"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-neon-pink to-neon-purple 
                           hover:shadow-lg hover:shadow-neon-pink/50 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
