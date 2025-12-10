"use client";

import { useAppStore } from "@/store/app";
import { useEffect, useState } from "react";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    setMounted(true);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
