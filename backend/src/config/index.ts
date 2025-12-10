import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/omnidoc",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || "52428800"), // 50MB
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
