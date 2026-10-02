import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: `${profile.name} | Backend & Full-Stack Developer`,
  description:
    "Premium engineering portfolio for Md Sadique Shakeel, focused on backend systems, cloud, DevOps, AI/ML integration, and production full-stack applications.",
  keywords: [
    "Md Sadique Shakeel",
    "backend developer",
    "Spring Boot",
    "Java",
    "AWS",
    "microservices",
    "Next.js",
    "portfolio"
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} | Developer Portfolio`,
    description: profile.summary,
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b16" },
    { media: "(prefers-color-scheme: light)", color: "#f7fafc" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
