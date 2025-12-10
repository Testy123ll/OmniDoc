import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  picture?: string;
  plan: "free" | "pro" | "business";
  storageUsed: number;
  storageLimit: number;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    name: { type: String, required: true },
    picture: { type: String },
    plan: { type: String, enum: ["free", "pro", "business"], default: "free" },
    storageUsed: { type: Number, default: 0 },
    storageLimit: { type: Number, default: 1073741824 }, // 1GB default
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },
    googleId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
