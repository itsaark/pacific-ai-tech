import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blogPosts, formatBlogDate, getBlogPost } from "@/lib/blog-posts";
import { bookingUrl, businessId, siteUrl, websiteId } from "@/lib/site";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/blog/${post.slug}#webpage`,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.seoTitle,
        description: post.metaDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": `${siteUrl}/blog/${post.slug}#post` },
        breadcrumb: {
          "@id": `${siteUrl}/blog/${post.slug}#breadcrumb`,
        },
        datePublished: post.publishedDate,
        dateModified: post.modifiedDate,
        inLanguage: "en-US",
      },
      {
        "@type": "BlogPosting",
        "@id": `${siteUrl}/blog/${post.slug}#post`,
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
          "@id": `${siteUrl}/blog/${post.slug}#webpage`,
        },
        keywords: post.topics,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blog/${post.slug}#breadcrumb`,
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
            item: `${siteUrl}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };

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
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <div className="pat-case-narrative-copy">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
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
