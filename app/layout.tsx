import type { Metadata } from "next";
import InteractiveBackground from "@/components/InteractiveBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic — AI Agent Marketplace",
  description: "Deploy specialized AI agents curated for extreme precision.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
