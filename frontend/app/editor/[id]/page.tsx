"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import AISidebar from "@/components/ai/AISidebar";
import { FileText, Settings, Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAppStore } from "@/store/app";

export default function EditorPage() {
  const params = useParams();
  const fileId = params.id as string;
  const { uploadedFiles } = useAppStore();
  const [file, setFile] = useState<any>(null);

  useEffect(() => {
    // Find file from store
    const foundFile = uploadedFiles.find((f) => f.id === fileId);
    if (foundFile) {
      setFile(foundFile);
    }
  }, [fileId, uploadedFiles]);

  if (!file) {
    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center">
             <div className="text-center">
                 <h1 className="text-2xl font-bold mb-4">File not found</h1>
                 <Link href="/" className="text-neon-cyan hover:underline">Return to Dashboard</Link>
             </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 flex pt-20 pb-4 px-4 gap-4 h-screen max-h-screen max-w-[1920px] mx-auto w-full">
        {/* LEFT PANEL: Metadata & Tools */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-72 hidden lg:flex flex-col gap-4"
        >
          {/* Back Button */}
          <Link href="/">
             <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-2">
                 <ArrowLeft size={16} /> Back to Dashboard
             </button>
          </Link>

          {/* File Info Card */}
          <div className="glass-panel p-5 flex flex-col gap-4">
             <div className="flex items-center gap-3">
                 <div className="p-3 rounded-lg bg-neon-purple/20 text-neon-purple">
                     <FileText size={24} />
                 </div>
                 <div className="overflow-hidden">
                     <h2 className="font-bold truncate text-sm" title={file.name}>{file.name}</h2>
                     <p className="text-xs text-white/50">{file.type?.toUpperCase()}</p>
                 </div>
             </div>
             
             <div className="grid grid-cols-2 gap-2 mt-2">
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition flex flex-col items-center gap-1">
                     <Download size={16} />
                     <span className="text-[10px] opacity-70">Export</span>
                 </button>
                 <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition flex flex-col items-center gap-1">
                     <Share2 size={16} />
                     <span className="text-[10px] opacity-70">Share</span>
                 </button>
             </div>
          </div>

          {/* Tools List (Mock) */}
          <div className="glass-panel flex-1 p-5 overflow-y-auto">
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Editor Tools</h3>
              <div className="space-y-2">
                  {["Text Formatting", "Insert Image", "Add Signature", "Watermark", "Page Numbers"].map((tool, i) => (
                      <button key={i} className="w-full text-left p-3 rounded-lg hover:bg-white/5 text-sm transition-colors flex items-center justify-between group">
                          {tool}
                          <Settings size={14} className="opacity-0 group-hover:opacity-50" />
                      </button>
                  ))}
              </div>
          </div>
        </motion.div>

        {/* CENTER PANEL: Document Viewer */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 glass-panel relative flex flex-col"
        >
            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <span className="text-sm font-mono text-white/50">Page 1 / 1</span>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-white/10 rounded">Fit</button>
                        <button className="p-1.5 hover:bg-white/10 rounded">50%</button>
                        <button className="p-1.5 hover:bg-white/10 rounded">100%</button>
                    </div>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 bg-black/20 overflow-auto p-8 flex justify-center">
                 <div className="w-full max-w-3xl bg-white text-black min-h-[800px] shadow-2xl p-12">
                     <h1 className="text-3xl font-bold mb-6 text-black">{file.name}</h1>
                     <p className="text-gray-600 mb-4">
                         This is a preview of your document contents. In the production version, this would be a full-fidelity canvas renderer for PDF, Word, and Image formats.
                     </p>
                     <p className="text-gray-600">
                         For now, you can use the AI sidebar on the right to interact with this document context.
                     </p>
                 </div>
            </div>
        </motion.div>

        {/* RIGHT PANEL: AI Sidebar */}
        <div className="w-80 hidden md:block">
            <AISidebar />
        </div>
      </div>
    </div>
  );
}
