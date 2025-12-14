import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  data: {
    type: Buffer, // Storing file content directly in DB for MVP
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const File = mongoose.models.File || mongoose.model("File", fileSchema);
