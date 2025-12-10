export type FileFormat = 
  | 'pdf' 
  | 'docx' 
  | 'doc' 
  | 'xlsx' 
  | 'xls' 
  | 'pptx' 
  | 'txt' 
  | 'jpg' 
  | 'png' 
  | 'gif' 
  | 'bmp';

export interface UploadedFile {
  id: string;
  name: string;
  type: FileFormat;
  size: number;
  uploadedAt: Date;
  url: string;
  userId: string;
}

export interface ConversionJob {
  id: string;
  sourceFile: UploadedFile;
  targetFormat: FileFormat;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: UploadedFile;
  error?: string;
  createdAt: Date;
}

export interface PDFDocument {
  id: string;
  file: UploadedFile;
  pages: number;
  editing: boolean;
}

export interface AIPrompt {
  id: string;
  type: 'write' | 'edit' | 'summarize' | 'translate' | 'analyze';
  input: string;
  output: string;
  language?: string;
  tone?: 'formal' | 'casual' | 'academic' | 'friendly';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'business';
  storageUsed: number;
  storageLimit: number;
  createdAt: Date;
}
