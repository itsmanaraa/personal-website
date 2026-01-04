import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MANARA | Systems & Intelligence",
  description: "Personal website of MANARA, a multidisciplinary engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-accent-glow selection:text-accent-dark`}
      >
        <SmoothScroll>
          <ScrollProgress />
          <Navigation />
          <CustomCursor />
          <GrainOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
