import { create } from 'zustand';
import type { UploadedFile, ConversionJob, PDFDocument } from '@/types';

interface AppStore {
  user: any;
  setUser: (user: any) => void;
  
  uploadedFiles: UploadedFile[];
  addFile: (file: UploadedFile) => void;
  removeFile: (fileId: string) => void;
  
  conversions: ConversionJob[];
  addConversion: (conversion: ConversionJob) => void;
  updateConversion: (id: string, updates: Partial<ConversionJob>) => void;
  
  currentDocument: PDFDocument | null;
  setCurrentDocument: (doc: PDFDocument | null) => void;
  
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  uploadedFiles: [],
  addFile: (file) => set((state) => ({ uploadedFiles: [...state.uploadedFiles, file] })),
  removeFile: (fileId) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter((f) => f.id !== fileId),
  })),
  
  conversions: [],
  addConversion: (conversion) => set((state) => ({ conversions: [...state.conversions, conversion] })),
  updateConversion: (id, updates) => set((state) => ({
    conversions: state.conversions.map((c) => (c.id === id ? { ...c, ...updates } : c)),
  })),
  
  currentDocument: null,
  setCurrentDocument: (doc) => set({ currentDocument: doc }),
  
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
