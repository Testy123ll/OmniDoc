import { VercelRequest, VercelResponse } from "@vercel/node";

// This handler is called by Vercel for every request to /api/*
export default async (req: VercelRequest, res: VercelResponse) => {
  // Dynamic import of the compiled Express app
  const { default: app } = await import("../dist/server.js");

  // Simple CORS headers for preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    return res.status(200).end();
  }

  // Pass request to Express app
  return app(req, res);
};

