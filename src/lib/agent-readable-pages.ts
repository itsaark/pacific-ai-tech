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
] as const;

export const agentReadablePaths = new Set<string>([
  ...staticAgentReadablePaths,
  ...caseStudies.map((study) => `/case-studies/${study.slug}`),
]);

export function isAgentReadablePath(pathname: string) {
  return agentReadablePaths.has(pathname);
}
