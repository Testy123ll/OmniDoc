import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { config } from '../config';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Construct local file URL
    // In production, this would be a cloud storage URL
    const fileUrl = `${config.backendUrl || 'http://localhost:5000'}/uploads/${req.file.filename}`;
    
    res.status(200).json({ 
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'An error occurred during file upload.' });
  }
};

export const getFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // In a real app, 'id' might be a DB ID or filename. 
      // Here we assume client sends filename as ID for simplicity in this "rebuild"
      const filePath = path.join(process.cwd(), 'uploads', id);
      
      if (fs.existsSync(filePath)) {
         res.sendFile(filePath);
      } else {
         res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
       res.status(500).json({ message: 'Error retrieving file' });
    }
};

export const listFiles = async (req: Request, res: Response) => {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        return res.json({ files: [] });
      }

      const files = fs.readdirSync(uploadsDir).map(file => {
        const stats = fs.statSync(path.join(uploadsDir, file));
        return {
          id: file, // Using filename as ID
          name: file,
          size: stats.size,
          createdAt: stats.birthtime,
          url: `${config.backendUrl || 'http://localhost:5000'}/uploads/${file}`
        };
      });

      res.json({ files });
    } catch (error) {
      console.error("List files error:", error);
      res.status(500).json({ message: 'Failed to list files' });
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const filePath = path.join(process.cwd(), 'uploads', id);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'File deleted successfully' });
      } else {
        res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete file' });
    }
};

export const convertFile = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

export const getConversionStatus = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};

export const batchConvert = async (req: Request, res: Response) => {
  res.status(501).json({ message: "Not implemented" });
};