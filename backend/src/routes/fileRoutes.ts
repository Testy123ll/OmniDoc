import express from "express";
import {
  uploadFile,
  listFiles,
  deleteFile,
  convertFile,
  getConversionStatus,
  getFile,
  batchConvert,
} from "@/controllers/fileController";
import { authenticate } from "@/middleware/auth";
import { fileUpload } from "@/utils/upload";

const router = express.Router();

router.post("/upload", authenticate, fileUpload.single("file"), uploadFile);
router.get("/", authenticate, listFiles);
router.get("/:id", authenticate, getFile);
router.delete("/:id", authenticate, deleteFile);

// Conversion routes
router.post("/conversions/convert", authenticate, convertFile);
router.post("/conversions/batch", authenticate, batchConvert);
router.get("/conversions/:id/status", authenticate, getConversionStatus);

export default router;
