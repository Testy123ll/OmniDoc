"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import VerifyEmailClient from "@/components/auth/VerifyEmailClient";

function VerifyEmailContent() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <VerifyEmailClient />
      </main>
      <Footer />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-bg" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
