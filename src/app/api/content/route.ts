import { NextResponse } from "next/server";
import { getContent, saveContent, type SiteContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  let body: SiteContent;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || typeof body.photo !== "string" || !body.videos) {
    return NextResponse.json({ error: "Malformed content payload." }, { status: 400 });
  }

  try {
    await saveContent(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save content.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
