import { contactEmail, siteUrl } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_000;
const MIN_FORM_AGE_MS = 1_500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;

type LeadPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  workflow?: unknown;
  consent?: unknown;
  website?: unknown;
  formStartedAt?: unknown;
  sourcePage?: unknown;
  attribution?: unknown;
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\0/g, "").trim().slice(0, maxLength);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "pacificaitech.com" ||
      hostname === "www.pacificaitech.com" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

function cleanAttribution(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  const source = value as Record<string, unknown>;
  const allowedKeys = [
    "gclid",
    "gbraid",
    "wbraid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "landing_page",
    "landing_referrer",
    "captured_at",
  ];

  return Object.fromEntries(
    allowedKeys
      .map((key) => [key, cleanText(source[key], 500)] as const)
      .filter(([, item]) => item.length > 0)
  );
}

function formatLeadEmail(input: {
  name: string;
  email: string;
  company: string;
  phone: string;
  workflow: string;
  sourcePage: string;
  attribution: Record<string, string>;
}) {
  const attributionLines = Object.entries(input.attribution)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  return [
    "New consultation request from pacificaitech.com",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company: ${input.company}`,
    `Phone: ${input.phone || "Not provided"}`,
    `Source page: ${input.sourcePage || siteUrl}`,
    "",
    "Workflow they want help with:",
    input.workflow,
    "",
    "Attribution:",
    attributionLines || "No paid-campaign attribution captured",
  ].join("\n");
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ message: "Request origin was not accepted." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ message: "Request format was not accepted." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ message: "Request was too large." }, { status: 413 });
  }

  let payload: LeadPayload;

  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return Response.json({ message: "Request could not be read." }, { status: 400 });
  }

  const honeypot = cleanText(payload.website, 200);
  if (honeypot) {
    return Response.json({ ok: true });
  }

  const formStartedAt = Number(payload.formStartedAt);
  const formAge = Date.now() - formStartedAt;
  if (
    !Number.isFinite(formStartedAt) ||
    formAge < MIN_FORM_AGE_MS ||
    formAge > MAX_FORM_AGE_MS
  ) {
    return Response.json(
      { message: "Please reload the page and try again." },
      { status: 400 }
    );
  }

  const name = cleanText(payload.name, 100);
  const email = cleanText(payload.email, 254).toLowerCase();
  const company = cleanText(payload.company, 140);
  const phone = cleanText(payload.phone, 40);
  const workflow = cleanText(payload.workflow, 2_000);
  const sourcePage = cleanText(payload.sourcePage, 500);
  const attribution = cleanAttribution(payload.attribution);

  if (
    name.length < 2 ||
    !isEmail(email) ||
    company.length < 2 ||
    workflow.length < 20 ||
    payload.consent !== true
  ) {
    return Response.json(
      { message: "Please complete the required fields and accept the contact notice." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.LEAD_FROM_EMAIL;
  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL || contactEmail;

  if (!resendApiKey || !fromEmail) {
    console.error("Lead form delivery is not configured.");
    return Response.json(
      {
        message: `Online requests are temporarily unavailable. Please email ${contactEmail}.`,
      },
      { status: 503 }
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notificationEmail],
      reply_to: email,
      subject: `Consultation request: ${company}`,
      text: formatLeadEmail({
        name,
        email,
        company,
        phone,
        workflow,
        sourcePage,
        attribution,
      }),
    }),
  });

  if (!resendResponse.ok) {
    const providerMessage = await resendResponse.text();
    console.error("Lead email provider rejected the request:", providerMessage);
    return Response.json(
      {
        message: `We could not send this request. Please email ${contactEmail}.`,
      },
      { status: 502 }
    );
  }

  return Response.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
