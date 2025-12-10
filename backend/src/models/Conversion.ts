import mongoose from "mongoose";

interface IConversion {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  sourceFileId: mongoose.Types.ObjectId;
  targetFormat: string;
  status: "pending" | "processing" | "completed" | "failed";
  resultFileId?: mongoose.Types.ObjectId;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

const conversionSchema = new mongoose.Schema<IConversion>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sourceFileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    targetFormat: { type: String, required: true, lowercase: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    resultFileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    error: { type: String },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IConversion>("Conversion", conversionSchema);
