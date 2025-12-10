import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";

export const dynamic = "force-dynamic";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OmniDoc - Universal File Converter & AI Editor",
  description: "Convert, edit, and enhance documents with AI. Support for 300+ formats.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} bg-dark-bg text-white`}>
        <ThemeWrapper>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
        </ThemeWrapper>
      </body>
    </html>
  );
}
