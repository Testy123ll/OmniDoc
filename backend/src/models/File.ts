import mongoose from "mongoose";

interface IFile {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  originalName: string;
  storageName: string;
  mimeType: string;
  size: number;
  format: string;
  url: string;
  publicUrl?: string;
  uploadedAt: Date;
  expiresAt?: Date;
}

const fileSchema = new mongoose.Schema<IFile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: { type: String, required: true },
    storageName: { type: String, required: true, unique: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    format: { type: String, required: true, lowercase: true },
    url: { type: String, required: true },
    publicUrl: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IFile>("File", fileSchema);
