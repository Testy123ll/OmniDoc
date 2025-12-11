import express, { Express } from "express";
import cors from "cors";
import * as path from "path";
import { config } from "@/config";
import { authenticate, errorHandler } from "@/middleware/auth";
import authRoutes from "@/routes/authRoutes";
import fileRoutes from "@/routes/fileRoutes";
import aiRoutes from "@/routes/aiRoutes";
import pdfRoutes from "@/routes/pdfRoutes";
import { connectDB } from "@/config/database";

const app: Express = express();

// Middleware
const allowedOrigins = [
  config.frontendUrl,
  "https://omnidoc.vercel.app", // Example production URL
  "https://omnidoc-frontend.vercel.app" // Alternative frontend URL
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
  res.json({ status: "OK", timestamp: new Date() });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "OmniDoc API Server", status: "running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handling
app.use(errorHandler);

// Start server (only in development/non-serverless)
const startServer = async () => {
  try {
    // Connect to MongoDB but don't block startup
    await connectDB().catch(err => {
      console.error("MongoDB connection error (server will continue):", err instanceof Error ? err.message : err);
    });

    const port = config.port;
    app.listen(port, () => {
      console.log(`🚀 OmniDoc API running on http://localhost:${port}`);
      console.log(`📚 Database: ${config.databaseUrl}`);
      console.log(`🌐 Frontend: ${config.frontendUrl}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Only start server if this is not serverless (Vercel)
if (!process.env.VERCEL) {
  startServer();
}

// Export app for Vercel serverless
export default app;
