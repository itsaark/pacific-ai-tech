import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

import "./globals.css";

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
  title: "Page not found | Pacific AI Tech",
  description:
    "This Pacific AI Tech page does not exist. Continue with the sitemap, agent instructions, services, or homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        jetbrainsMono.variable,
        newsreader.variable,
      )}
    >
      <body>
        <main className="pat-site pat-not-found">
          <div className="pat-wrap pat-not-found-inner">
            <Link className="pat-brand" href="/" aria-label="Pacific AI Tech home">
              Pacific&nbsp;AI&nbsp;Tech
            </Link>
            <section aria-labelledby="not-found-title">
              <span className="pat-eyebrow">404 · Page not found</span>
              <h1 id="not-found-title">That path does not exist.</h1>
              <p className="pat-lede">
                Use one of these machine-readable indexes or primary pages to
                find the right Pacific AI Tech resource.
              </p>
              <nav aria-label="404 recovery links" className="pat-not-found-links">
                <Link href="/sitemap.xml">XML sitemap</Link>
                <Link href="/llms.txt">Agent instructions</Link>
                <Link href="/services">Services</Link>
                <Link href="/">Home</Link>
              </nav>
            </section>
          </div>
        </main>
      </body>
    </html>
  );
}
