"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import FileUpload from "@/components/editor/FileUpload";
import FileList from "@/components/editor/FileList";
import AISidebar from "@/components/ai/AISidebar";
import Navbar from "@/components/common/Navbar";

export default function AppPage() {
  const [selectedText, setSelectedText] = useState("");

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black gradient-text mb-2">
            Document Workspace
          </h1>
          <p className="text-white/60">
            Upload, convert, and edit your documents with AI assistance
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="space-y-8">
              {/* Upload Section */}
              <div>
                <h2 className="text-xl font-bold mb-4">Upload Files</h2>
                <FileUpload />
              </div>

              {/* File List Section */}
              <div>
                <h2 className="text-xl font-bold mb-4">Your Documents</h2>
                <FileList />
              </div>
            </div>
          </motion.div>

          {/* Right Panel - AI Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-96"
          >
            <AISidebar selectedText={selectedText} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
