import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  blogPosts,
  formatBlogDate,
  getBlogPost,
  type BlogPost,
} from "@/lib/blog-posts";
import { bookingUrl, businessId, siteUrl, websiteId } from "@/lib/site";

function plainText(value: string) {
  return value.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)");
}

function isSafeHref(href: string) {
  return href.startsWith("/") || href.startsWith("https://");
}

function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }
    const label = match[1];
    const href = match[2];
    if (isSafeHref(href)) {
      const external = href.startsWith("https://");
      nodes.push(
        <a
          key={`${href}-${index}`}
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>,
      );
    } else {
      nodes.push(label);
    }
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

function articleSchema(post: BlogPost) {
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: post.seoTitle,
      description: post.metaDescription,
      isPartOf: { "@id": websiteId },
      about: { "@id": `${pageUrl}#post` },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      datePublished: post.publishedDate,
      dateModified: post.modifiedDate,
      inLanguage: "en-US",
    },
    {
      "@type": "BlogPosting",
      "@id": `${pageUrl}#post`,
      headline: post.title,
      description: post.metaDescription,
      image: post.heroImage ? `${siteUrl}${post.heroImage.src}` : undefined,
      datePublished: post.publishedDate,
      dateModified: post.modifiedDate,
      author: {
        "@type": "Organization",
        "@id": businessId,
        name: "Pacific AI Tech",
        url: siteUrl,
      },
      publisher: {
        "@type": "Organization",
        "@id": businessId,
        name: "Pacific AI Tech",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/pacific-ai-tech/img/logo-pine-icon.png`,
        },
      },
      mainEntityOfPage: {
        "@id": `${pageUrl}#webpage`,
      },
      keywords: post.topics,
      citation: post.citation
        ? {
            "@type": "CreativeWork",
            text: post.citation.quote,
            url: post.citation.href,
            datePublished: "2026-09-23",
            author: {
              "@type": "Person",
              name: post.citation.speaker,
              url: "https://x.com/paulg",
            },
          }
        : undefined,
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
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
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: pageUrl,
        },
      ],
    },
  ];

  if (post.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: plainText(faq.answer),
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  return {
    title: post.seoTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      url: `/blog/${post.slug}`,
      siteName: "Pacific AI Tech",
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.modifiedDate,
      images: post.heroImage
        ? [
            {
              url: post.heroImage.src,
              width: post.heroImage.width,
              height: post.heroImage.height,
              alt: post.heroImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.metaDescription,
      images: post.heroImage ? [post.heroImage.src] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = articleSchema(post);

  return (
    <main className="pat-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader bookingUrl={bookingUrl} />

      <article className="pat-case-detail">
        <div className="pat-wrap">
          <Link className="pat-back-link" href="/blog">
            <ArrowLeft data-icon="inline-start" />
            Blog
          </Link>

          <header className="pat-blog-hero">
            <p className="pat-case-client-line">
              Field notes · {post.topics[0]}
            </p>
            <h1>{post.title}</h1>
            <p className="pat-lede">{post.excerpt}</p>
            <div className="pat-blog-meta">
              <span>
                {formatBlogDate(post.publishedDate)} · {post.readingTime}
              </span>
            </div>
          </header>

          {post.heroImage ? (
            <figure className="pat-case-hero-image">
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
                width={post.heroImage.width}
                height={post.heroImage.height}
                sizes="(max-width: 900px) calc(100vw - 28px), 1240px"
                preload
              />
              <figcaption>{post.heroImage.caption}</figcaption>
            </figure>
          ) : null}

          <div className="pat-case-narrative">
            {post.citation ? (
              <section>
                <h2>{post.citation.speaker}</h2>
                <figure className="pat-blog-quote">
                  <blockquote cite={post.citation.href}>
                    <p>{post.citation.quote}</p>
                  </blockquote>
                  <figcaption>
                    <a
                      href={post.citation.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.citation.hrefLabel}
                    </a>
                    <span aria-hidden="true">·</span>
                    <span>{post.citation.date}</span>
                  </figcaption>
                </figure>
              </section>
            ) : null}
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <div className="pat-case-narrative-copy">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                </div>
              </section>
            ))}
            {post.faqs?.length ? (
              <section className="pat-blog-faq">
                <h2>Questions the record answers</h2>
                <div className="pat-case-narrative-copy">
                  {post.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3>{faq.question}</h3>
                      <p>
                        <RichText text={faq.answer} />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="pat-case-next">
            <div>
              <h2>Want this running in your business?</h2>
              <p>
                See how our{" "}
                <Link href="/portland-ai-consultant">
                  Portland AI consulting and workflow implementation
                </Link>{" "}
                works, or bring us the repeat task that keeps interrupting the
                day.
              </p>
            </div>
            <Button
              render={<a href={bookingUrl} />}
              nativeButton={false}
              className="pat-btn pat-btn-primary"
            >
              Book a call
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
