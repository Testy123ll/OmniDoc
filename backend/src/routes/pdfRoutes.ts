import express from "express";
import {
  editText,
  addAnnotation,
  mergePDFs,
  splitPDF,
} from "@/controllers/pdfController";
import { authenticate } from "@/middleware/auth";

const router = express.Router();

router.post("/:fileId/edit-text", authenticate, editText);
router.post("/:fileId/annotate", authenticate, addAnnotation);
router.post("/merge", authenticate, mergePDFs);
router.post("/:fileId/split", authenticate, splitPDF);

export default router;
