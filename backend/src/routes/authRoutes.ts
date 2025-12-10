import express from "express";
import {
  register,
  login,
  getCurrentUser,
  verifyEmail,
  resendVerificationEmail,
  googleAuth,
} from "@/controllers/authController";
import { authenticate } from "@/middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/google", googleAuth);
router.get("/me", authenticate, getCurrentUser);

export default router;
