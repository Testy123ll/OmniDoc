import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { config } from "@/config";
import nodemailer, { Transporter } from "nodemailer";
import crypto from "crypto";

// Email transporter (configure with your email service)
let transporter: Transporter;

try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER || "your-email@gmail.com",
      pass: process.env.EMAIL_PASSWORD || "your-app-password",
    },
  });
} catch (err) {
  console.warn("Email transporter not configured");
}

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const generateJWT = (userId: string) => {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
};

// REGISTER - Send verification email
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      plan: "free",
      storageUsed: 0,
      storageLimit: 1073741824, // 1GB
      emailVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;

    // Log verification link for development
    console.log(`\n📧 Verification link for ${email}:\n${verificationUrl}\n`);

    try {
      if (transporter) {
        await transporter.sendMail({
          to: email,
          subject: "Verify your OmniDoc email",
          html: `
            <h2>Welcome to OmniDoc!</h2>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationUrl}" style="padding: 10px 20px; background: #ff006e; color: white; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
            <p>Link expires in 24 hours.</p>
            <p>If you didn't create this account, please ignore this email.</p>
          `,
        });
        console.log(`✅ Verification email sent to ${email}`);
      }
    } catch (emailError) {
      console.warn("Email sending failed:", emailError);
    }

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account.",
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.query;

    console.log(`🔍 Verifying email: ${email}, token: ${token}`);

    const user = await User.findOne({
      email,
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      console.log(`❌ No user found with email ${email} and valid token`);
      // Debug: find user with email to check token
      const debugUser = await User.findOne({ email });
      if (debugUser) {
        console.log(`📝 User exists but token mismatch. Stored: ${debugUser.verificationToken}, Received: ${token}`);
      }
      return res.status(400).json({ error: "Invalid or expired verification token" });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    const jwtToken = generateJWT(user._id.toString());

    res.json({
      message: "Email verified successfully",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ error: "Email verification failed" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ error: "Please verify your email first" });
    }

    if (!user.password) {
      return res.status(403).json({ error: "Please sign in with Google" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateJWT(user._id.toString());

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// GOOGLE OAUTH CALLBACK
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { email, name, googleId, picture } = req.body;

    if (!email || !googleId) {
      return res.status(400).json({ error: "Email and Google ID required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user from Google OAuth
      user = new User({
        email,
        name: name || email.split("@")[0],
        googleId,
        picture,
        plan: "free",
        storageUsed: 0,
        storageLimit: 1073741824,
        emailVerified: true, // Google verified
      });
      await user.save();
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      if (picture) user.picture = picture;
      await user.save();
    }

    const token = generateJWT(user._id.toString());

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        plan: user.plan,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

// GET CURRENT USER
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        storageUsed: user.storageUsed,
        storageLimit: user.storageLimit,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "Failed to get user" });
  }
};

// RESEND VERIFICATION EMAIL
export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: "Email already verified" });
    }

    const verificationToken = generateVerificationToken();
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${email}`;

    try {
      if (transporter) {
        await transporter.sendMail({
          to: email,
          subject: "Verify your OmniDoc email",
          html: `
            <h2>Verify your email</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationUrl}" style="padding: 10px 20px; background: #ff006e; color: white; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
            <p>Link expires in 24 hours.</p>
          `,
        });
      }
    } catch (emailError) {
      console.warn("Email sending failed:", emailError);
    }

    res.json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ error: "Failed to resend verification email" });
  }
};