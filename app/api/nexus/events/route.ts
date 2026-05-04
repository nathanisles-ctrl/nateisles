import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 0;

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "nexus:events";

export async function GET() {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return NextResponse.json({
      events: [],
      configured: false,
    });
  }

  try {
    const r = await fetch(`${UPSTASH_URL}/lrange/${KEY}/0/49`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: "no-store",
    });

    if (!r.ok) {
      return NextResponse.json({
        events: [],
        configured: true,
        error: "fetch failed",
      });
    }

    const data = await r.json();
    const raw: string[] = data.result || [];
    const events = raw
      .map((s) => {
        try {
          return JSON.parse(s);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    return NextResponse.json({ events, configured: true });
  } catch {
    return NextResponse.json({
      events: [],
      configured: true,
      error: "fetch threw",
    });
  }
}
