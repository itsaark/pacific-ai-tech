import { blogPosts } from "@/lib/blog-posts";
import { caseStudies } from "@/lib/case-studies";

const staticAgentReadablePaths = [
  "/",
  "/services",
  "/portland-ai-consultant",
  "/oregon-washington-ai-consulting",
  "/idaho-ai-consulting",
  "/contact",
  "/about",
  "/book",
  "/privacy",
  "/terms",
  "/case-studies",
  "/blog",
] as const;

export const agentReadablePaths = new Set<string>([
  ...staticAgentReadablePaths,
  ...caseStudies.map((study) => `/case-studies/${study.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
]);

export function isAgentReadablePath(pathname: string) {
  return agentReadablePaths.has(pathname);
}
