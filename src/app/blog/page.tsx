import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, formatBlogDate } from "@/lib/blog-posts";
import { bookingUrl, businessId, siteUrl, websiteId } from "@/lib/site";

export const metadata: Metadata = {
  title: "Small Business AI Automation Blog",
  description:
    "Field notes on practical AI for small businesses: workflow automation builds, tool breakdowns, and the operating details behind real AI deployments.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Small Business AI Automation Blog",
    description:
      "Field notes on practical AI for small businesses: workflow automation builds, tool breakdowns, and the operating details behind real AI deployments.",
    url: "/blog",
    siteName: "Pacific AI Tech",
    type: "website",
    images: [
      {
        url: "/pacific-ai-tech/img/blog/property-management-tenant-communication-automation-ascii.jpg",
        width: 1920,
        height: 1281,
        alt: "Pacific AI Tech small business AI automation blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Small Business AI Automation Blog",
    description:
      "Practical AI write-ups for small businesses: the tools, the handoffs, and the workflows worth automating first.",
    images: [
      "/pacific-ai-tech/img/blog/property-management-tenant-communication-automation-ascii.jpg",
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/blog#webpage`,
      url: `${siteUrl}/blog`,
      name: "Small Business AI Automation Blog",
      description: metadata.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": businessId },
      breadcrumb: { "@id": `${siteUrl}/blog#breadcrumb` },
      mainEntity: { "@id": `${siteUrl}/blog#post-list` },
      dateModified: "2026-08-15",
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/blog#post-list`,
      name: "Pacific AI Tech blog posts",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/blog#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${siteUrl}/blog`,
        },
      ],
    },
  ],
};

export default function BlogPage() {
  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <section className="pat-subpage-hero" aria-labelledby="blog-title">
        <div className="pat-wrap">
          <div className="pat-subpage-hero-grid">
            <div>
              <h1 id="blog-title">
                AI automation field notes: what{" "}
                <span className="pat-serif-emphasis">actually works</span>{" "}
                inside small businesses.
              </h1>
            </div>
            <p className="pat-lede">
              Write-ups on the tools, workflows, and handoffs behind real AI
              deployments for small businesses: what gets automated, what
              stays human, and what is worth building first.
            </p>
          </div>
        </div>
      </section>

      <section className="pat-case-index" aria-label="Blog posts">
        <div className="pat-wrap">
          <div className="pat-case-index-grid">
            {blogPosts.map((post) => (
              <Link
                className="pat-case-index-card"
                href={`/blog/${post.slug}`}
                key={post.slug}
              >
                <div>
                  <div className="pat-case-index-meta">
                    <Badge variant="ghost" className="pat-num" aria-label="Post type">
                      Field notes
                    </Badge>
                    <span>{post.topics[0]}</span>
                  </div>
                  {post.heroImage ? (
                    <div className="pat-case-index-thumb" aria-hidden="true">
                      <Image
                        src={post.heroImage.src}
                        alt=""
                        width={post.heroImage.width}
                        height={post.heroImage.height}
                        sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 1080px) calc(50vw - 62px), 540px"
                      />
                    </div>
                  ) : null}
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                </div>
                <div className="pat-case-index-details">
                  <span>{formatBlogDate(post.publishedDate)}</span>
                  <span>{post.readingTime}</span>
                  <span>{post.topics[0]}</span>
                </div>
                <span className="pat-case-card-foot">
                  Read post
                  <ArrowUpRight data-icon="inline-end" />
                </span>
              </Link>
            ))}
          </div>

          <div className="pat-case-submit">
            <div>
              <h2>Have a workflow that keeps stealing the day?</h2>
              <p>
                We help small operators turn repeat work into local AI systems:
                research, reminders, files, follow-ups, approvals, and the
                handoff back to the person in charge.
              </p>
            </div>
            <Button
              render={<a href={bookingUrl} />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Talk through a workflow
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
