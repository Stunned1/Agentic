import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import InteractiveBackground from "@/components/InteractiveBackground";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Agentic — AI Agent Marketplace",
  description: "Deploy specialized AI agents curated for extreme precision.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={publicSans.variable}>
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
