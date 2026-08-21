import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const siteUrl = "https://www.pacificaitech.com";
const sourceBypassHeader = "x-pacific-markdown-source";
const internalRewriteHeader = "x-pacific-internal-rewrite";
const agentHtmlRequestHeader = "x-pacific-agent-html";
const nextVaryHeaders = [
  "rsc",
  "next-router-state-tree",
  "next-router-prefetch",
  "next-router-segment-prefetch",
];

const crawlerPatterns = [
  ["OAI-SearchBot", /oai-searchbot/i],
  ["ChatGPT-User", /chatgpt-user/i],
  ["GPTBot", /gptbot/i],
  ["PerplexityBot", /perplexitybot/i],
  ["Perplexity-User", /perplexity-user/i],
  ["Claude-SearchBot", /claude-searchbot/i],
  ["Claude-User", /claude-user/i],
  ["ClaudeBot", /claudebot/i],
  ["anthropic-ai", /anthropic-ai/i],
  ["Google-Extended", /google-extended/i],
  ["Applebot-Extended", /applebot-extended/i],
  ["Meta-ExternalAgent", /meta-externalagent/i],
  ["CCBot", /ccbot/i],
  ["Googlebot", /googlebot/i],
  ["Bingbot", /bingbot/i],
] as const;

function requestedMarkdown(acceptHeader: string | null) {
  if (!acceptHeader) return false;

  return acceptHeader.split(",").some((range) => {
    const [rawType, ...parameters] = range.split(";");
    const type = rawType.trim().toLowerCase();
    const quality = parameters
      .map((parameter) => parameter.trim().toLowerCase())
      .find((parameter) => parameter.startsWith("q="));
    const qualityValue = quality ? Number(quality.slice(2)) : 1;

    return (
      (type === "text/markdown" || type === "text/x-markdown") &&
      Number.isFinite(qualityValue) &&
      qualityValue > 0
    );
  });
}

function crawlerName(userAgent: string | null) {
  if (!userAgent) return null;
  return crawlerPatterns.find(([, pattern]) => pattern.test(userAgent))?.[0] ?? null;
}

function sourcePathFromMarkdownPath(pathname: string) {
  if (pathname === "/index.md") return "/";
  return pathname.endsWith(".md") ? pathname.slice(0, -3) || "/" : null;
}

function markdownRoute(pathname: string, request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname === "/" ? "/markdown" : `/markdown${pathname}`;
  destination.search = "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(internalRewriteHeader, "1");

  const response = NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
  response.headers.set("Vary", "Accept");
  return response;
}

function agentHtmlRoute(pathname: string, request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname === "/" ? "/agent-html" : `/agent-html${pathname}`;
  destination.search = "";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(internalRewriteHeader, "1");
  requestHeaders.set(agentHtmlRequestHeader, "1");

  const response = NextResponse.rewrite(destination, {
    request: { headers: requestHeaders },
  });
  response.headers.set("Vary", "Accept, User-Agent");
  return response;
}

function isPublicFile(pathname: string) {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname === "/llms-full.txt" ||
    (/\.[a-z0-9]+$/i.test(pathname) && !pathname.endsWith(".md"))
  );
}

function needsScriptlessHtml(userAgent: string | null, crawler: string | null) {
  if (crawler) return true;
  if (!userAgent) return true;

  return !/mozilla\/5\.0|chrome\/|safari\/|firefox\/|edg\//i.test(userAgent);
}

export function proxy(request: NextRequest) {
  if (
    request.headers.get(sourceBypassHeader) === "1" ||
    request.headers.get(internalRewriteHeader) === "1"
  ) {
    return NextResponse.next();
  }

  const explicitMarkdownPath = sourcePathFromMarkdownPath(
    request.nextUrl.pathname,
  );
  const acceptsMarkdown = requestedMarkdown(request.headers.get("accept"));
  const userAgent = request.headers.get("user-agent");
  const crawler = crawlerName(userAgent);

  if (crawler) {
    console.info(
      JSON.stringify({
        event: "crawler_request",
        crawler,
        method: request.method,
        path: request.nextUrl.pathname,
        markdown: Boolean(explicitMarkdownPath || acceptsMarkdown),
      }),
    );
  }

  if (request.method === "GET" && (explicitMarkdownPath || acceptsMarkdown)) {
    return markdownRoute(explicitMarkdownPath ?? request.nextUrl.pathname, request);
  }

  const isReactServerComponentRequest =
    request.headers.has("rsc") || request.nextUrl.searchParams.has("_rsc");

  if (request.method !== "GET" || isReactServerComponentRequest) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (
    !isPublicFile(pathname) &&
    needsScriptlessHtml(userAgent, crawler)
  ) {
    return agentHtmlRoute(pathname, request);
  }

  const markdownUrl =
    pathname === "/" ? `${siteUrl}/index.md` : `${siteUrl}${pathname}.md`;
  const response = NextResponse.next();
  response.headers.set(
    "Link",
    `<${markdownUrl}>; rel="alternate"; type="text/markdown"`,
  );
  response.headers.set("Vary", [...nextVaryHeaders, "Accept"].join(", "));

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
