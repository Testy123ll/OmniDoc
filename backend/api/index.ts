import { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cors from "cors";
import * as path from "path";

// Load environment variables early
import dotenv from "dotenv";
dotenv.config();

// Import configurations and routes
import { config } from "../src/config";
import { errorHandler } from "../src/middleware/auth";
import authRoutes from "../src/routes/authRoutes";
import fileRoutes from "../src/routes/fileRoutes";
import aiRoutes from "../src/routes/aiRoutes";
import pdfRoutes from "../src/routes/pdfRoutes";
import { connectDB } from "../src/config/database";

// Create Express app for serverless
const app = express();

// CORS configuration
const allowedOrigins = [
  config.frontendUrl,
  "https://omnidoc.vercel.app",
  "https://omnidoc-frontend.vercel.app"
];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Static files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/pdf", pdfRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date(), environment: "serverless" });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "OmniDoc API Server", status: "running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found", path: req.path });
});

// Error handling
app.use(errorHandler);

// Connect to database on cold start
let dbConnected = false;
connectDB().then(() => {
  dbConnected = true;
  console.log("Database connected on serverless startup");
}).catch(err => {
  console.error("Database connection error (will retry):", err instanceof Error ? err.message : err);
});

// Export handler for Vercel
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};

