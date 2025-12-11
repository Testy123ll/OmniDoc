import { VercelRequest, VercelResponse } from "@vercel/node";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import the Express app
import app from "../dist/server";

// Export the handler for Vercel
export default async (req: VercelRequest, res: VercelResponse) => {
  // Simple CORS headers for preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }

  // Pass to Express app
  return app(req, res);
};
