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

  const eventStr = JSON.stringify(event);

  // Use Upstash's pipeline endpoint — atomic LPUSH + LTRIM, unambiguous arg shape.
  // Each inner array is [COMMAND, ...args]. Args MUST be strings.
  const pipelineBody = [
    ["LPUSH", KEY, eventStr],
    ["LTRIM", KEY, "0", String(MAX_EVENTS - 1)],
  ];

  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pipelineBody),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "store failed", status: res.status, detail: errText },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
