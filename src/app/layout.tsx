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

const siteUrl = "https://www.pacificai.tech";
const siteDescription =
  "Local-first AI agent setup and automation consulting for solo founders, real-estate agents, restaurant owners, trades, and small shops across greater Portland and the Pacific Northwest.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pacific AI Tech - Local AI Agent Setup in Portland",
    template: "%s | Pacific AI Tech",
  },
  description: siteDescription,
  applicationName: "Pacific AI Tech",
  keywords: [
    "Pacific AI Tech",
    "AI agent setup",
    "Claude Cowork setup",
    "Hermes Agent setup",
    "small business automation",
    "local-first AI",
    "Portland AI consultant",
    "Vancouver AI automation",
    "Pacific Northwest AI automation",
  ],
  authors: [{ name: "Pacific AI Tech", url: siteUrl }],
  creator: "Pacific AI Tech",
  publisher: "Pacific AI Tech",
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    title: "Pacific AI Tech - Local AI Agent Setup in Portland",
    description: siteDescription,
    url: "/",
    siteName: "Pacific AI Tech",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/roses.jpeg",
        width: 1200,
        height: 800,
        alt: "Pacific AI Tech local AI agent setup in the Pacific Northwest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific AI Tech - Local AI Agent Setup in Portland",
    description: siteDescription,
    images: ["/pacific-ai-tech/img/roses.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
