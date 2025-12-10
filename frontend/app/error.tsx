"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-bg">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Something went wrong!</h1>
        <p className="text-white/60 mb-8">An error occurred while processing your request.</p>
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition inline-block"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
