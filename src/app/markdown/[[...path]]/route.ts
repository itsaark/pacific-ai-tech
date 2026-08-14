import { NodeHtmlMarkdown } from "node-html-markdown";

import { isAgentReadablePath } from "@/lib/agent-readable-pages";
import { siteUrl } from "@/lib/site";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

const markdownConverter = new NodeHtmlMarkdown(
  {
    bulletMarker: "-",
    codeBlockStyle: "fenced",
    keepDataImages: false,
    maxConsecutiveNewlines: 2,
    useInlineLinks: true,
    ignore: [
      "script",
      "style",
      "noscript",
      "svg",
      "form",
      "button",
    ],
  },
  {
    "div,footer,header,nav,section,span": (context) => {
      const className = context.node.getAttribute?.("class") ?? "";
      const shouldIgnore =
        context.node.getAttribute?.("aria-hidden") === "true" ||
        className.split(/\s+/).some((name) =>
          ["pat-site-head", "pat-site-foot"].includes(name),
        );

      return shouldIgnore
        ? { ignore: true, recurse: false }
        : (context.base ?? {});
    },
  },
);

function canonicalPath(path: string[] | undefined) {
  return path?.length ? `/${path.join("/")}` : "/";
}

function extractMainContent(html: string) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? html;
}

function trustedSourceOrigin(requestUrl: string) {
  const deploymentHost = process.env.VERCEL_URL?.trim();
  if (deploymentHost) return `https://${deploymentHost}`;

  const incomingUrl = new URL(requestUrl);
  const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
  return localHosts.has(incomingUrl.hostname) ? incomingUrl.origin : siteUrl;
}

function absolutizeSiteLinks(markdown: string) {
  return markdown.replace(
    /(!?\[[^\]]*\])\(\/(?!\/)([^)]+)\)/g,
    `$1(${siteUrl}/$2)`,
  );
}

function markdownResponse(markdown: string, pathname: string) {
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const markdownUrl =
    pathname === "/" ? `${siteUrl}/index.md` : `${siteUrl}${pathname}.md`;

  return new Response(markdown, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Location": canonicalUrl,
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonicalUrl}>; rel="canonical", <${markdownUrl}>; rel="self"; type="text/markdown"`,
      Vary: "Accept",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function GET(request: Request, context: RouteContext) {
  const { path } = await context.params;
  const pathname = canonicalPath(path);

  if (!isAgentReadablePath(pathname)) {
    return new Response("# Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const sourceUrl = new URL(pathname, trustedSourceOrigin(request.url));
  sourceUrl.search = "";

  const sourceResponse = await fetch(sourceUrl, {
    headers: {
      Accept: "text/html",
      "X-Pacific-Markdown-Source": "1",
    },
    next: { revalidate: 3600 },
  });

  if (!sourceResponse.ok) {
    return new Response("# Page unavailable\n", {
      status: sourceResponse.status,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const html = await sourceResponse.text();
  const pageHtml = extractMainContent(html);
  const body = absolutizeSiteLinks(markdownConverter.translate(pageHtml)).trim();
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const markdown = `${body}\n\n---\n\nCanonical source: ${canonicalUrl}\n`;

  return markdownResponse(markdown, pathname);
}
