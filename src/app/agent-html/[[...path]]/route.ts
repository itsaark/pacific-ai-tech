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
  const deploymentHost = process.env.VERCEL_URL?.trim();
  if (deploymentHost) return `https://${deploymentHost}`;

  const incomingUrl = new URL(requestUrl);
  const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);
  return localHosts.has(incomingUrl.hostname)
    ? incomingUrl.origin
    : siteUrl;
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

  const sourceResponse = await fetch(sourceUrl, {
    headers: {
      Accept: "text/html",
      [sourceBypassHeader]: "1",
    },
  });

  const html = withoutHydrationScripts(await sourceResponse.text());
  const canonicalUrl = new URL(pathname, siteUrl).toString();
  const markdownUrl =
    pathname === "/" ? `${siteUrl}/index.md` : `${siteUrl}${pathname}.md`;
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
    `<${markdownUrl}>; rel="alternate"; type="text/markdown"`,
  );
  headers.set("Vary", "Accept, User-Agent");
  headers.set("X-Content-Type-Options", "nosniff");
  if (!sourceResponse.ok) headers.set("X-Robots-Tag", "noindex");

  return new Response(html, {
    status: sourceResponse.status,
    headers,
  });
}
