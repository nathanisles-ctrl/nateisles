import { NextResponse } from "next/server";

export const runtime = "edge";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SECRET = process.env.NEXUS_SHARED_SECRET;
const KEY = "nexus:events";
const MAX_EVENTS = 100;

export async function POST(req: Request) {
  if (!SECRET || !UPSTASH_URL || !UPSTASH_TOKEN) {
    return NextResponse.json(
      { error: "Nexus endpoint not configured" },
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization") || "";
  if (auth !== `Bearer ${SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object" || !body.type) {
    return NextResponse.json(
      { error: "bad payload — must be JSON with at least { type }" },
      { status: 400 }
    );
  }

  const event = {
    ...body,
    received_at: Date.now(),
    ts: typeof body.ts === "number" ? body.ts : Math.floor(Date.now() / 1000),
  };

  const headers = {
    Authorization: `Bearer ${UPSTASH_TOKEN}`,
    "Content-Type": "application/json",
  };

  // LPUSH the new event then LTRIM to keep the list bounded.
  const lpush = await fetch(`${UPSTASH_URL}/lpush/${KEY}`, {
    method: "POST",
    headers,
    body: JSON.stringify([JSON.stringify(event)]),
  });

  if (!lpush.ok) {
    return NextResponse.json(
      { error: "store failed", status: lpush.status },
      { status: 502 }
    );
  }

  await fetch(`${UPSTASH_URL}/ltrim/${KEY}/0/${MAX_EVENTS - 1}`, {
    method: "POST",
    headers,
  });

  return NextResponse.json({ ok: true });
}
