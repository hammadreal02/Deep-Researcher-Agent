import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResoluteAI — Deep Research Agent",
  description:
    "An autonomous AI research agent that Plans, Researches, Analyzes, and Reports on any topic. Powered by Gemini 2.5 Flash and OpenAI Agents SDK.",
  openGraph: {
    title: "ResoluteAI — Deep Research Agent",
    description:
      "An autonomous AI research agent that Plans, Researches, Analyzes, and Reports on any topic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="h-full antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
