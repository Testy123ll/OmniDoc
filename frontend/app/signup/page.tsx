"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign up failed. Email may already be in use.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/app";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black gradient-text mb-2">
              Create Account
            </h1>
            <p className="text-white/60">Join millions using OmniDoc</p>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 backdrop-blur-md border border-white/10 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-neon-purple/60" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-white/40 focus:outline-none focus:border-neon-purple/50
                             focus:ring-2 focus:ring-neon-purple/20 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-neon-cyan/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/50
                             focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-semibold text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-neon-cyan/60" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/50
                             focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                    required
                  />
                </div>
                <p className="text-xs text-white/40 mt-1">At least 8 characters</p>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-semibold text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-neon-cyan/60" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                             text-white placeholder-white/40 focus:outline-none focus:border-neon-cyan/50
                             focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                    required
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Terms */}
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 rounded border-white/20 text-neon-cyan focus:ring-2 focus:ring-neon-cyan/20"
                  required
                />
                <span className="text-sm text-white/60">
                  I agree to the{" "}
                  <Link href="#" className="text-neon-cyan hover:text-neon-cyan/80">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="#" className="text-neon-cyan hover:text-neon-cyan/80">
                    Privacy Policy
                  </Link>
                </span>
              </motion.label>

              {/* Sign Up Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-neon-purple to-neon-pink 
                         rounded-lg font-semibold text-white flex items-center justify-center gap-2
                         hover:shadow-lg hover:shadow-neon-purple/50 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-white/50 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                className="py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg text-white/70 
                         font-semibold hover:bg-white/10 transition-all"
              >
                Google
              </button>
              <button
                className="py-2.5 px-4 bg-white/5 border border-white/10 rounded-lg text-white/70 
                         font-semibold hover:bg-white/10 transition-all"
              >
                GitHub
              </button>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center mt-6">
            <p className="text-white/60">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-neon-purple font-semibold hover:text-neon-purple/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
