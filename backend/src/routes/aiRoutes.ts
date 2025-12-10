import express from "express";
import {
  write,
  edit,
  summarize,
  translate,
  analyze,
} from "@/controllers/aiController";
import { authenticate } from "@/middleware/auth";

const router = express.Router();

router.post("/write", authenticate, write);
router.post("/edit", authenticate, edit);
router.post("/summarize", authenticate, summarize);
router.post("/translate", authenticate, translate);
router.post("/analyze", authenticate, analyze);

export default router;
