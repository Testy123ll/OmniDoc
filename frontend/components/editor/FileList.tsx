"use client";

import { motion } from "framer-motion";
import { Download, Trash2, Edit2 } from "lucide-react";
import { useAppStore } from "@/store/app";
import { formatFileSize } from "@/utils/helpers";
import Link from "next/link";

export default function FileList() {
  const { uploadedFiles } = useAppStore();

  if (uploadedFiles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-white/60"
      >
        <p>No files uploaded yet. Drag or upload your first file above.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {uploadedFiles.map((file) => (
        <motion.div
          key={file.id}
          whileHover={{ scale: 1.02 }}
          className="glass-panel p-4 flex items-center justify-between"
        >
          <div className="flex-1">
            <h3 className="font-semibold truncate">{file.name}</h3>
            <p className="text-sm text-white/60">
              {formatFileSize(file.size)} • {file.type.toUpperCase()}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link href={`/app/editor/${file.id}`}>
              <button className="p-2 rounded-lg glass-button hover:bg-white/20 transition">
                <Edit2 size={18} />
              </button>
            </Link>
            <button className="p-2 rounded-lg glass-button hover:bg-white/20 transition">
              <Download size={18} />
            </button>
            <button className="p-2 rounded-lg glass-button hover:bg-red-500/20 transition">
              <Trash2 size={18} className="text-red-400" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
