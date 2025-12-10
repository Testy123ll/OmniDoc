"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Save,
  Trash2,
  Type,
  Highlighter,
  MessageSquare,
} from "lucide-react";

interface PDFEditorProps {
  params: {
    id: string;
  };
}

export default function PDFEditor({ params }: PDFEditorProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    { id: "text", icon: Type, label: "Add Text" },
    { id: "highlight", icon: Highlighter, label: "Highlight" },
    { id: "comment", icon: MessageSquare, label: "Comment" },
    { id: "draw", icon: Trash2, label: "Draw" },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <main className="pt-20 pb-8">
        {/* Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel m-4 p-4 flex flex-wrap items-center justify-between gap-4 rounded-xl"
        >
          {/* Left - Zoom & View Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(25, zoom - 10))}
              className="p-2 rounded-lg glass-button hover:bg-white/20 transition"
              title="Zoom out"
            >
              <ZoomOut size={20} />
            </button>
            <span className="px-4 py-2 glass-button rounded-lg text-sm font-semibold">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="p-2 rounded-lg glass-button hover:bg-white/20 transition"
              title="Zoom in"
            >
              <ZoomIn size={20} />
            </button>

            <div className="w-px h-8 bg-white/20 mx-2"></div>

            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 rounded-lg glass-button hover:bg-white/20 transition"
              title="Rotate"
>
              <RotateCw size={20} />
            </button>
          </div>

          {/* Middle - Edit Tools */}
          <div className="flex items-center gap-2">
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                onClick={() =>
                  setSelectedTool(selectedTool === tool.id ? null : tool.id)
                }
                whileHover={{ scale: 1.05 }}
                className={`p-2 rounded-lg transition ${
                  selectedTool === tool.id
                    ? "bg-neon-purple text-white"
                    : "glass-button hover:bg-white/20"
                }`}
                title={tool.label}
              >
                <tool.icon size={20} />
              </motion.button>
            ))}
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg glass-button hover:bg-white/20 transition">
              <Save size={20} />
            </button>
            <button className="p-2 rounded-lg glass-button hover:bg-white/20 transition">
              <Download size={20} />
            </button>
          </div>
        </motion.div>

        {/* Editor Area */}
        <div className="flex gap-4 px-4">
          {/* Sidebar - Thumbnails */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-32 glass-panel p-4 rounded-xl h-[600px] overflow-y-auto"
          >
            <h3 className="font-bold mb-4 text-sm">Pages</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <motion.div
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[3/4] bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 rounded-lg 
                             border-2 border-white/20 hover:border-neon-pink cursor-pointer transition-all flex 
                             items-center justify-center text-xs font-bold"
                >
                  Page {page}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div
              className="glass-panel p-8 rounded-xl shadow-2xl"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              }}
            >
              {/* PDF/Document Preview Placeholder */}
              <div className="w-96 h-[528px] bg-gradient-to-br from-white to-gray-200 rounded-lg shadow-lg 
                            flex items-center justify-center border-2 border-white/20">
                <div className="text-center text-gray-600">
                  <p className="text-lg font-bold">Document ID: {params.id}</p>
                  <p className="text-sm mt-2">PDF/Document content appears here</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Properties Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-80 glass-panel p-6 rounded-xl"
          >
            <h3 className="font-bold mb-4">Properties</h3>
            {selectedTool ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 block mb-2">
                    Tool: {selectedTool.toUpperCase()}
                  </label>
                  {selectedTool === "text" && (
                    <>
                      <input
                        type="text"
                        placeholder="Enter text"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm"
                      />
                      <select className="w-full mt-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm">
                        <option>Font: Arial</option>
                        <option>Helvetica</option>
                        <option>Times</option>
                      </select>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-white/60 text-sm">Select a tool to edit properties</p>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
