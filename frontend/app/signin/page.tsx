"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

declare global {
  interface Window {
    google: any;
  }
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: handleGoogleSignIn,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("google-signin-button"),
          { theme: "filled_black", size: "large", width: "100%" }
        );
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleGoogleSignIn = async (response: any) => {
    try {
      const token = response.credential;
      if (!token) throw new Error("No credential received");
      
      const decoded = JSON.parse(atob(token.split(".")[1]));

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          googleId: decoded.sub,
          picture: decoded.picture,
        }),
      });

      if (!res.ok) throw new Error("Google sign-in failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/app";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/app";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
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
              Welcome Back
            </h1>
            <p className="text-white/60">Sign in to your OmniDoc account</p>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 backdrop-blur-md border border-white/10 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
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
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-white">
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-sm text-neon-cyan hover:text-neon-cyan/80 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
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

              {/* Sign In Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-neon-pink to-neon-purple 
                         rounded-lg font-semibold text-white flex items-center justify-center gap-2
                         hover:shadow-lg hover:shadow-neon-pink/50 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
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

            {/* Google Sign-In Button */}
            <div id="google-signin-button" className="w-full mb-3"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-white/60">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-neon-cyan font-semibold hover:text-neon-cyan/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
