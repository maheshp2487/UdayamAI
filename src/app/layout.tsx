import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlobalCopilot } from "@/components/ui/GlobalCopilot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UdayamAI — Project Feasibility & Credit Appraisal Platform",
  description: "Techno-economic project appraisal, dynamic unit economics, and concessional MSME subsidy structuring for Indian enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-950`}>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <GlobalCopilot />
      </body>
    </html>
  );
}
