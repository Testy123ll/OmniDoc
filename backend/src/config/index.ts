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

// Validate required environment variables in production
if (config.nodeEnv === 'production') {
  const missingVars: string[] = [];

  if (!process.env.MONGODB_URI && !process.env.DATABASE_URL) missingVars.push('MONGODB_URI or DATABASE_URL');
  if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
  if (!process.env.CLOUDINARY_NAME) missingVars.push('CLOUDINARY_NAME');
  if (!process.env.CLOUDINARY_API_KEY) missingVars.push('CLOUDINARY_API_KEY');
  if (!process.env.CLOUDINARY_API_SECRET) missingVars.push('CLOUDINARY_API_SECRET');

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables for production: ${missingVars.join(', ')}`);
  }
}

