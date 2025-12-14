import express from "express";
import {
  write,
  edit,
  summarize,
  translate,
  analyze,
} from "../controllers/aiController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/write", write);
router.post("/edit", edit);
router.post("/summarize", summarize);
router.post("/translate", translate);
router.post("/analyze", analyze);

export default router;
