import mongoose from "mongoose";

interface IAIPrompt {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "write" | "edit" | "summarize" | "translate" | "analyze";
  input: string;
  output: string;
  language?: string;
  tone?: "formal" | "casual" | "academic" | "friendly";
  createdAt: Date;
}

const aiPromptSchema = new mongoose.Schema<IAIPrompt>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["write", "edit", "summarize", "translate", "analyze"],
      required: true,
    },
    input: { type: String, required: true },
    output: { type: String, required: true },
    language: { type: String },
    tone: { type: String, enum: ["formal", "casual", "academic", "friendly"] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IAIPrompt>("AIPrompt", aiPromptSchema);
