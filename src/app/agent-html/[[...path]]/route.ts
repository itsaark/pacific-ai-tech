const sourceBypassHeader = "x-pacific-markdown-source";
const agentHtmlRequestHeader = "x-pacific-agent-html";
const siteUrl = "https://www.pacificaitech.com";

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

function canonicalPath(path: string[] | undefined) {
  return path?.length ? `/${path.join("/")}` : "/";
}

function trustedSourceOrigin(requestUrl: string) {
  const incomingUrl = new URL(requestUrl);
  const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
  return localHosts.has(incomingUrl.hostname) ? incomingUrl.origin : siteUrl;
}

function withoutHydrationScripts(html: string) {
  return html
    .replace(
      /<script\b(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(
      /<link\b(?=[^>]*rel=["'](?:modulepreload|preload)["'])(?=[^>]*(?:as=["']script["']|href=["'][^"']+\.js(?:[?"'])))[^>]*>/gi,
      "",
    )
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, "")
    .replace(/<!--\$!?-->|<!--\/\$-->/g, "");
}

export async function GET(request: Request, context: RouteContext) {
  if (request.headers.get(agentHtmlRequestHeader) !== "1") {
    return new Response("Not found\n", { status: 404 });
  }

  const { path } = await context.params;
  const pathname = canonicalPath(path);
  const sourceUrl = new URL(pathname, trustedSourceOrigin(request.url));

  let sourceResponse: Response;
  try {
    sourceResponse = await fetch(sourceUrl, {
      headers: {
        Accept: "text/html",
        [sourceBypassHeader]: "1",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return agentUnavailableResponse(503, markdownUrl(pathname));
  }

  if (
    !sourceResponse.ok ||
    new URL(sourceResponse.url).origin !== sourceUrl.origin
  ) {
    return agentUnavailableResponse(
      sourceResponse.ok ? 502 : sourceResponse.status,
      markdownUrl(pathname),
    );
  }

  const html = withoutHydrationScripts(await sourceResponse.text());
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const alternateMarkdownUrl = markdownUrl(pathname);
  const headers = new Headers();
  headers.set(
    "Cache-Control",
    sourceResponse.ok
      ? "public, s-maxage=3600, stale-while-revalidate=86400"
      : "no-store",
  );
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Content-Location", canonicalUrl);
  headers.set(
    "Link",
    `<${alternateMarkdownUrl}>; rel="alternate"; type="text/markdown"`,
  );
  headers.set("Vary", "Accept, User-Agent");
  headers.set("X-Content-Type-Options", "nosniff");
  if (!sourceResponse.ok) headers.set("X-Robots-Tag", "noindex");

  return new Response(html, {
    status: sourceResponse.status,
    headers,
  });
}

function markdownUrl(pathname: string) {
  return pathname === "/" ? `${siteUrl}/index.md` : `${siteUrl}${pathname}.md`;
}

function agentUnavailableResponse(status: number, alternateMarkdownUrl: string) {
  const heading =
    status === 404 ? "404 — Page not found" : `${status} — Page temporarily unavailable`;
  const guidance =
    status === 404
      ? "That path does not exist on Pacific AI Tech. Use these machine-readable indexes to recover:"
      : "This page could not be served right now. Use these machine-readable indexes to recover:";

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${status} | Pacific AI Tech</title>
<meta name="robots" content="noindex, follow">
<link rel="alternate" type="text/markdown" href="${alternateMarkdownUrl}">
</head>
<body>
<main>
<h1>${heading}</h1>
<p>${guidance}</p>
<ul>
<li><a href="${siteUrl}/sitemap.xml">XML sitemap</a> — every canonical page</li>
<li><a href="${siteUrl}/llms.txt">Agent instructions (llms.txt)</a> — when to use Pacific AI Tech and how to engage</li>
<li><a href="${siteUrl}/services">Services overview</a></li>
<li><a href="${siteUrl}/">Home page</a></li>
</ul>
</main>
</body>
</html>`, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
