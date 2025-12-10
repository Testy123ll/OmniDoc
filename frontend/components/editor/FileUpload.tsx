"use client";

import { motion } from "framer-motion";
import { Upload, FileUp, Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { useAppStore } from "@/store/app";
import { fileAPI } from "@/lib/api";
import { toast } from "react-hot-toast";
import { generateId, formatFileSize } from "@/utils/helpers";
import type { UploadedFile } from "@/types";

export default function FileUpload() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { addFile } = useAppStore();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        await handleFiles(files);
      }
    },
    []
  );

  const handleFiles = async (files: FileList) => {
    setIsUploading(true);
    const uploadPromises: Promise<any>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadPromises.push(
        fileAPI
          .upload(file)
          .then((response) => {
            const uploadedFile: UploadedFile = {
              id: generateId(),
              name: file.name,
              type: file.name.split(".").pop()?.toLowerCase() as any,
              size: file.size,
              uploadedAt: new Date(),
              url: response.data.url,
              userId: "user-1",
            };
            addFile(uploadedFile);
            toast.success(`${file.name} uploaded!`);
          })
          .catch((error) => {
            toast.error(`Failed to upload ${file.name}`);
          })
      );
    }

    await Promise.all(uploadPromises);
    setIsUploading(false);
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await handleFiles(e.target.files);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          isDragActive
            ? "border-neon-pink bg-neon-pink/20 scale-105"
            : "border-white/30 hover:border-white/50 bg-white/5"
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleInputChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <motion.div
          animate={isUploading ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isUploading ? Infinity : 0 }}
        >
          {isUploading ? (
            <Loader size={48} className="mx-auto text-neon-cyan animate-spin" />
          ) : (
            <FileUp size={48} className="mx-auto text-neon-purple mb-4" />
          )}
        </motion.div>

        <p className="text-lg font-bold mb-2">
          {isUploading ? "Uploading..." : "Drag files here or click to upload"}
        </p>
        <p className="text-white/60 text-sm">
          Supported: PDF, Word, Excel, PowerPoint, Images, and 300+ more formats
        </p>
      </div>
    </motion.div>
  );
}
