"use client";

import { motion } from "framer-motion";
import { 
  Highlighter, 
  PenTool, 
  StickyNote, 
  Type, 
  Eraser, 
  Undo, 
  Redo, 
  Save 
} from "lucide-react";

interface EditorToolbarProps {
  onToolSelect: (tool: string) => void;
  activeTool: string;
}

export default function EditorToolbar({ onToolSelect, activeTool }: EditorToolbarProps) {
  const tools = [
    { id: "select", icon: <Type size={18} />, label: "Select" },
    { id: "highlight", icon: <Highlighter size={18} />, label: "Highlight" },
    { id: "pen", icon: <PenTool size={18} />, label: "Draw" },
    { id: "note", icon: <StickyNote size={18} />, label: "Note" },
    { id: "eraser", icon: <Eraser size={18} />, label: "Erase" },
  ];

  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-panel p-2 flex items-center justify-between mb-4"
    >
      <div className="flex items-center gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolSelect(tool.id)}
            className={`p-2 rounded-lg transition-all flex items-center gap-2 group relative ${
              activeTool === tool.id 
                ? "bg-neon-purple text-white shadow-[0_0_10px_rgba(131,56,236,0.5)]" 
                : "hover:bg-white/10 text-white/70"
            }`}
            title={tool.label}
          >
            {tool.icon}
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                {tool.label}
            </span>
          </button>
        ))}
      </div>

      <div className="h-6 w-px bg-white/10 mx-2"></div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-white/10 text-white/70">
            <Undo size={18} />
        </button>
        <button className="p-2 rounded-lg hover:bg-white/10 text-white/70">
            <Redo size={18} />
        </button>
        <button className="p-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan/30 flex items-center gap-2 text-xs font-bold px-3">
            <Save size={14} />
            SAVE
        </button>
      </div>
    </motion.div>
  );
}
