import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn } from "node:child_process";

const port = 43_000 + (process.pid % 10_000);
const origin = "http://127.0.0.1:" + port;
let server;

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function directMarkdownPath(pathname) {
  return pathname === "/" ? "/index.md" : pathname + ".md";
}

async function waitForServer() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Next.js test server did not become ready");
}

before(async () => {
  server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        VERCEL_URL: "pacifica-ai-tech-protected.example.vercel.app",
      },
      stdio: ["ignore", "ignore", "inherit"],
    },
  );
  await waitForServer();
});

after(() => {
  server?.kill("SIGTERM");
});

test("homepage is meaningful, hierarchical HTML without JavaScript", async () => {
  const response = await fetch(origin);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html/);

  const html = await response.text();
  const text = visibleText(html);
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) =>
    Number(match[1]),
  );

  assert.ok(
    text.length >= 500,
    "expected at least 500 text characters, received " + text.length,
  );
  assert.equal(headings.filter((level) => level === 1).length, 1);
  assert.ok(headings.includes(2), "expected at least one H2 after the H1");
  for (let index = 1; index < headings.length; index += 1) {
    assert.ok(
      headings[index] <= headings[index - 1] + 1,
      "heading level skips from H" +
        headings[index - 1] +
        " to H" +
        headings[index],
    );
  }

  const efficiency = text.length / html.length;
  assert.ok(
    efficiency >= 0.05,
    "expected at least 5% content efficiency, received " +
      (efficiency * 100).toFixed(2) +
      "%",
  );
  assert.doesNotMatch(html, /self\.__next_f|id=["']_R_["']/);
});

test("browser visitors retain the existing interactive site shell", async () => {
  const response = await fetch(origin, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140.0 Safari/537.36",
    },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /class="pat-site"/);
  assert.match(html, /class="pat-menu-toggle"/);
  assert.match(html, /self\.__next_f/);
});

test("homepage structured data identifies the company and both founders", async () => {
  const html = await (await fetch(origin)).text();
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => JSON.parse(match[1]));
  const nodes = blocks.flatMap((block) => block["@graph"] ?? [block]);
  const company = nodes.find(
    (node) => node["@type"] === "ProfessionalService",
  );

  assert.equal(company?.name, "Pacific AI Tech");
  assert.equal(company?.url, "https://www.pacificaitech.com/");
  assert.ok(company?.description);
  assert.equal(company?.founder?.length, 2);
  for (const founder of company.founder) {
    assert.equal(founder["@type"], "Person");
    assert.ok(founder.name);
    assert.ok(founder.url);
    assert.ok(founder.sameAs);
    assert.ok(founder.jobTitle);
  }
});

test("unknown HTML and Markdown paths return recoverable 404 responses", async () => {
  const pathname = "/agent-readiness-path-that-does-not-exist";
  const htmlResponse = await fetch(origin + pathname, {
    headers: { "User-Agent": "curl/8.7.1" },
  });
  const html = await htmlResponse.text();
  assert.equal(htmlResponse.status, 404);
  assert.match(html, /llms\.txt/);
  assert.match(html, /sitemap\.xml/);
  assert.match(html, /rel="alternate" type="text\/markdown"/);

  const markdownResponse = await fetch(origin + pathname, {
    headers: { Accept: "text/markdown" },
  });
  const markdown = await markdownResponse.text();
  assert.equal(markdownResponse.status, 404);
  assert.match(
    markdownResponse.headers.get("content-type") ?? "",
    /^text\/markdown/,
  );
  assert.match(markdown, /^# 404 .*Page not found/m);
  assert.match(markdown, /llms\.txt/);
  assert.match(markdown, /sitemap\.xml/);

  const directMarkdownResponse = await fetch(origin + pathname + ".md");
  assert.equal(directMarkdownResponse.status, 404);
  assert.match(
    directMarkdownResponse.headers.get("content-type") ?? "",
    /^text\/markdown/,
  );
  assert.match(await directMarkdownResponse.text(), /^# 404 .*Page not found/m);
});

test("agent instructions explain when and how to engage the company", async () => {
  for (const pathname of ["/llms.txt", "/llms-full.txt"]) {
    const response = await fetch(origin + pathname);
    const body = await response.text();
    assert.equal(response.status, 200);
    assert.match(body, /## When to use Pacific AI Tech/i);
    assert.match(body, /book/i);
    assert.match(body, /approval/i);
    assert.match(body, /programmatic service API/i);
  }
});

test("non-browser agents receive real site content even when VERCEL_URL points elsewhere", async () => {
  const response = await fetch(origin + "/services", {
    headers: { "User-Agent": "curl/8.7.1" },
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /class="pat-site"/);
  assert.match(html, /<h1[\s>]/i);
  assert.doesNotMatch(html, /Log in to Vercel/i);
  assert.doesNotMatch(html, /vercel\.com\/login/i);
  assert.match(
    response.headers.get("link") ?? "",
    /rel="alternate"; type="text\/markdown"/,
  );

  const markdownResponse = await fetch(origin + "/services", {
    headers: { Accept: "text/markdown" },
  });
  const markdown = await markdownResponse.text();
  assert.equal(markdownResponse.status, 200);
  assert.ok(markdown.length >= 500);
  assert.doesNotMatch(markdown, /Privacy Policy\]\(https:\/\/www\.pacificaitech\.com\/legal\//);
});

test("every sitemap page and machine-readable counterpart is available", async () => {
  for (const pathname of [
    "/robots.txt",
    "/llms.txt",
    "/llms-full.txt",
    "/sitemap.xml",
  ]) {
    const response = await fetch(origin + pathname);
    assert.equal(response.status, 200, pathname + " should return 200");
  }

  const robots = await (await fetch(origin + "/robots.txt")).text();
  assert.match(robots, /User-agent: GPTBot[\s\S]*?Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/www\.pacificaitech\.com\/sitemap\.xml/);

  const llms = await (await fetch(origin + "/llms.txt")).text();
  assert.match(llms, /^# Pacific AI Tech$/m);
  assert.match(llms, /^## When to use Pacific AI Tech$/mi);

  const sitemapResponse = await fetch(origin + "/sitemap.xml");
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/i);

  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  const paths = [
    ...sitemap.matchAll(
      /<loc>https:\/\/www\.pacificaitech\.com([^<]*)<\/loc>/g,
    ),
  ].map((match) => match[1] || "/");
  assert.ok(paths.length >= 10, "expected the sitemap to list public pages");

  for (const pathname of paths) {
    const htmlResponse = await fetch(origin + pathname);
    assert.equal(
      htmlResponse.status,
      200,
      pathname + " HTML should return 200",
    );

    const negotiatedResponse = await fetch(origin + pathname, {
      headers: { Accept: "text/markdown" },
    });
    const negotiatedBody = await negotiatedResponse.text();
    assert.equal(
      negotiatedResponse.status,
      200,
      pathname + " negotiated Markdown should return 200",
    );
    assert.match(
      negotiatedResponse.headers.get("content-type") ?? "",
      /^text\/markdown/,
    );
    assert.ok(
      negotiatedBody.length >= 500,
      pathname + " negotiated Markdown should contain page content",
    );

    const directResponse = await fetch(
      origin + directMarkdownPath(pathname),
    );
    const directBody = await directResponse.text();
    assert.equal(
      directResponse.status,
      200,
      pathname + " direct Markdown should return 200",
    );
    assert.match(
      directResponse.headers.get("content-type") ?? "",
      /^text\/markdown/,
    );
    assert.ok(
      directBody.length >= 500,
      pathname + " direct Markdown should contain page content",
    );
  }
});
