import { Request, Response } from 'express';
// import * as path from 'path';
// import * as fs from 'fs'; // Removed fs dependency for serverless persistence
import { config } from '../config';
import { File } from '../models/File';
import { connectDB } from '../config/database';

// Helper to ensure DB connection
const ensureDb = async () => {
    await connectDB();
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    await ensureDb();
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save to MongoDB
    const newFile = await File.create({
        filename: `${Date.now()}-${req.file.originalname}`,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        data: req.file.buffer // Multer memory storage gives us this buffer
    });

    const fileUrl = `${config.backendUrl || 'http://localhost:5000'}/api/files/${newFile._id}`; // Serve via ID endpoint
    
    res.status(200).json({ 
      message: 'File uploaded successfully',
      url: fileUrl,
      id: newFile._id,
      filename: newFile.filename,
      originalName: newFile.originalName,
      size: newFile.size,
      mimetype: newFile.mimetype
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ message: 'An error occurred during file upload.' });
  }
};

export const getFile = async (req: Request, res: Response) => {
    try {
      await ensureDb();
      const { id } = req.params;
      
      const file = await File.findById(id);
      
      if (file) {
         res.setHeader('Content-Type', file.mimetype);
         res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
         res.send(file.data); // Send buffer data
      } else {
         res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
       console.error("Get file error:", error);
       res.status(500).json({ message: 'Error retrieving file' });
    }
};

export const listFiles = async (req: Request, res: Response) => {
    try {
      await ensureDb();
      // Don't return the data buffer in list to save bandwidth
      const files = await File.find({}, { data: 0 }).sort({ createdAt: -1 });

      const formattedFiles = files.map(file => ({
          id: file._id,
          name: file.originalName,
          size: file.size,
          mimetype: file.mimetype,
          createdAt: file.createdAt,
          url: `${config.backendUrl || 'http://localhost:5000'}/api/files/${file._id}`
      }));

      res.json({ files: formattedFiles });
    } catch (error) {
      console.error("List files error:", error);
      res.status(500).json({ message: 'Failed to list files' });
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    try {
      await ensureDb();
      const { id } = req.params;
      
      const result = await File.findByIdAndDelete(id);
      
      if (result) {
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