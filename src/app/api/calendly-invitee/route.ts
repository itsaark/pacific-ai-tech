export const runtime = "nodejs";

// Only exact Calendly invitee API URIs are ever fetched. The UUIDs are
// unguessable and known only to the visitor who just completed the booking,
// so returning the invitee email to that visitor does not widen access.
const INVITEE_URI_PATTERN =
  /^https:\/\/api\.calendly\.com\/scheduled_events\/[A-Za-z0-9-]+\/invitees\/[A-Za-z0-9-]+$/;

export async function GET(request: Request) {
  const token = process.env.CALENDLY_API_TOKEN?.trim();
  if (!token) {
    return Response.json({ email: null });
  }

  const uri = new URL(request.url).searchParams.get("uri") ?? "";
  if (!INVITEE_URI_PATTERN.test(uri)) {
    return Response.json({ email: null }, { status: 400 });
  }

  try {
    const response = await fetch(uri, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) {
      return Response.json({ email: null });
    }

    const data = (await response.json()) as {
      resource?: { email?: unknown };
    };
    const email =
      typeof data.resource?.email === "string" ? data.resource.email : null;

    return Response.json({ email });
  } catch {
    return Response.json({ email: null });
  }
}
