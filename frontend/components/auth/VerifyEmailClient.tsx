"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
          setStatus("error");
          setMessage("Invalid verification link");
          return;
        }

        const response = await fetch(`/api/auth/verify-email?token=${token}&email=${email}`);

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        setStatus("success");
        setMessage("Email verified successfully!");

        setTimeout(() => {
          router.push("/app");
        }, 2000);
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Verification failed");
      }
    };

    verifyToken();
  }, [searchParams, router]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md text-center"
    >
      {status === "loading" && (
        <>
          <Loader className="w-16 h-16 mx-auto text-neon-cyan animate-spin mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Verifying Email</h1>
          <p className="text-white/60">Please wait while we verify your email...</p>
        </>
      )}

      {status === "success" && (
        <>
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Email Verified!</h1>
          <p className="text-white/60 mb-4">{message}</p>
          <p className="text-white/40 text-sm">Redirecting to dashboard...</p>
        </>
      )}

      {status === "error" && (
        <>
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
          <p className="text-white/60 mb-6">{message}</p>
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-3 bg-gradient-to-r from-neon-pink to-neon-purple 
                     rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-neon-pink/50 transition-all"
          >
            Back to Sign Up
          </button>
        </>
      )}
    </motion.div>
  );
}
