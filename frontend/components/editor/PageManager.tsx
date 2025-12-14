"use client";

import { motion } from "framer-motion";
import { 
  Grid, 
  RotateCw, 
  Trash2, 
  Move,
  Layers
} from "lucide-react";

interface PageManagerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function PageManager({ isOpen, onToggle }: PageManagerProps) {
  // Mock pages
  const pages = [1, 2, 3, 4];

  if (!isOpen) {
      return (
          <button 
            onClick={onToggle}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-dark-secondary p-2 rounded-r-xl border border-l-0 border-white/10 hover:bg-white/5 transition"
            title="Pages"
          >
              <Layers size={20} />
          </button>
      )
  }

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-48 bg-dark-secondary border-r border-white/10 flex flex-col h-full absolute left-0 top-0 z-20"
    >
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold text-sm">Pages</h3>
          <button onClick={onToggle} className="text-white/50 hover:text-white">
              <Layers size={16} />
          </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {pages.map((page) => (
              <div key={page} className="group relative bg-black/20 p-2 rounded-lg border border-transparent hover:border-neon-purple/50 transition cursor-pointer">
                  {/* Page Thumbnail Placeholder */}
                  <div className="aspect-[3/4] bg-white flex items-center justify-center mb-2">
                       <span className="text-black/20 text-xl font-bold">{page}</span>
                  </div>
                  
                  <span className="text-xs text-white/50 block text-center">Page {page}</span>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2 rounded-lg backdrop-blur-sm">
                      <div className="flex gap-2">
                          <button className="p-1.5 rounded bg-white/10 hover:bg-white/20" title="Rotate">
                              <RotateCw size={14} />
                          </button>
                          <button className="p-1.5 rounded bg-white/10 hover:bg-red-500/20 text-red-400" title="Delete">
                              <Trash2 size={14} />
                          </button>
                      </div>
                      <button className="p-1.5 rounded bg-white/10 hover:bg-white/20 cursor-move" title="Move">
                          <Move size={14} />
                      </button>
                  </div>
              </div>
          ))}
      </div>

      <div className="p-2 border-t border-white/10">
          <button className="w-full py-2 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple text-xs font-bold rounded-lg transition">
              + ADD PAGE
          </button>
      </div>
    </motion.div>
  );
}
