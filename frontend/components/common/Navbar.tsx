"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access store after mounting
    const { useAppStore } = require("@/store/app");
    const store = useAppStore.getState();
    setIsDarkMode(store.isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const { useAppStore } = require("@/store/app");
    useAppStore.setState({ isDarkMode: !isDarkMode });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel m-2 md:m-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="text-2xl font-black gradient-text">
              OmniDoc
            </Link>
          </motion.div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg glass-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-2"
          >
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg text-white/80 hover:bg-white/10 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
