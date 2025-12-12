import { VercelRequest, VercelResponse } from "@vercel/node";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

// Create Express app for serverless
const app = express();

// CORS configuration - simplified for serverless
app.use(cors({
  origin: "*",
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Routes - imported inline to avoid module loading issues
app.use("/api/auth", require("../src/routes/authRoutes").default);
app.use("/api/files", require("../src/routes/fileRoutes").default);
app.use("/api/ai", require("../src/routes/aiRoutes").default);
app.use("/api/pdf", require("../src/routes/pdfRoutes").default);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date(), environment: "serverless" });
});

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "OmniDoc API Server", status: "running" });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Endpoint not found", path: req.path });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error occurred:", err);
  res.status(500).json({ 
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

// Export handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Connect to database for each request in serverless environment
  try {
    const { connectDB } = require("../src/config/database");
    await connectDB();
  } catch (dbError) {
    console.error("Database connection error:", dbError);
    // Continue anyway as some endpoints might not need DB
  }
  
  return app(req, res);
};