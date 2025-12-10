import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/omnidoc";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("Database already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.warn("MongoDB connection failed:", error instanceof Error ? error.message : error);
    console.warn("Server will run without database. Features requiring database will be unavailable.");
  }
}

export default mongoose;
