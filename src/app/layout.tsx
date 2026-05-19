import type { Metadata } from "next";
import "./globals.css";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Pacific AI Tech",
  description:
    "AI agent setup and automation consulting for small operators across greater Portland and the Pacific Northwest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        jetbrainsMono.variable,
        newsreader.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
