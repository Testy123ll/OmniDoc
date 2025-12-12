import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/omnidoc";

// Check if we're in a serverless environment (Vercel)
const isServerless = !!process.env.VERCEL;

export async function connectDB() {
  try {
    // In serverless environments, we need to handle connections differently
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // For serverless environments, we might want to disconnect after each request
    // But for now, we'll just connect as needed
    await mongoose.connect(MONGODB_URI, {
      // These options help with serverless environments
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.warn("MongoDB connection failed:", error instanceof Error ? error.message : error);
    console.warn("Server will run without database. Features requiring database will be unavailable.");
    
    // In serverless environments, we don't want to crash the function
    if (!isServerless) {
      throw error;
    }
  }
}

// For serverless environments, we might want to gracefully close connections
export async function disconnectDB() {
  if (isServerless && mongoose.connection.readyState >= 1) {
    await mongoose.disconnect();
  }
}

export default mongoose;