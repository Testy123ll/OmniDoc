"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FileUpload from "@/components/editor/FileUpload";
import FileList from "@/components/editor/FileList";
import AISidebar from "@/components/ai/AISidebar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { fileAPI } from "@/lib/api";
import { useAppStore } from "@/store/app";
import { toast } from "react-hot-toast";

export default function Home() {
  const [selectedText, setSelectedText] = useState("");
  const { setFiles } = useAppStore();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const res = await fileAPI.listFiles();
        // The backend returns { files: [...] } based on fileController.ts
        if (res.data && res.data.files) {
            // Map backend 'type' (mimetype usually) to likely extension if needed, 
            // but fileController says it returns { id, name, size, mimetype, createdAt, url }
            // The frontend UploadedFile type expects { id, name, type, size, uploadedAt, url, userId }
            // We need to map it carefully.
            const mappedFiles = res.data.files.map((f: any) => ({
                id: f.id,
                name: f.name,
                type: f.name.split('.').pop()?.toLowerCase() as any,
                size: f.size,
                uploadedAt: new Date(f.createdAt),
                url: f.url,
                userId: "user-1" // Mock user
            }));
            setFiles(mappedFiles);
        }
      } catch (error) {
        console.error("Failed to load files", error);
        toast.error("Could not load your files");
      }
    };
    loadFiles();
  }, [setFiles]);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
            <span className="text-neon-cyan text-sm font-mono uppercase tracking-wider">Universal Workspace v1.0</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="text-white">OMNI</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">DOC</span>
          </h1>
          
          <p className="text-white/60 max-w-2xl mx-auto text-lg mb-12 font-light">
            Advanced file manipulation powered by artificial intelligence.
            <br />
            <span className="text-neon-pink">Convert</span> • <span className="text-neon-purple">Edit</span> • <span className="text-neon-cyan">Analyze</span>
          </p>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Convert PDF", color: "from-red-500 to-orange-500" },
              { label: "Edit Text", color: "from-blue-500 to-cyan-500" },
              { label: "AI Analysis", color: "from-purple-500 to-pink-500" },
              { label: "Merge Files", color: "from-green-500 to-emerald-500" },
            ].map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group overflow-hidden rounded-xl p-[1px]"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-dark-bg/90 backdrop-blur-xl rounded-xl p-4 h-full border border-white/10 group-hover:border-transparent transition-colors">
                  <span className="font-semibold text-sm">{action.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
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
      
      <Footer />
    </div>
  );
}
