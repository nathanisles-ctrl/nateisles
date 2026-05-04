import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 0;

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = "nexus:events";

type AnyEvent = Record<string, unknown>;

// Defensive parser — handles every plausible shape we've seen from Upstash:
//   - "json string"             ← what we want (post-fix)
//   - ["json string"]            ← from the old buggy LPUSH where the array got stored as a value
//   - already-parsed object      ← if Upstash auto-decoded
//   - nested ["[\"json\"]"]      ← double-encoded nightmare scenario
// Returns null if it can't be normalized into an event-shaped object.
function normalize(raw: unknown): AnyEvent | null {
  // Already an object with a `type` field — done.
  if (
    raw &&
    typeof raw === "object" &&
    !Array.isArray(raw) &&
    "type" in raw
  ) {
    return raw as AnyEvent;
  }

  // String — try parsing once, then recurse on the result.
  if (typeof raw === "string") {
    try {
      return normalize(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  // Single-element array — unwrap and recurse.
  if (Array.isArray(raw) && raw.length === 1) {
    return normalize(raw[0]);
  }

  return null;
}

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
    const raw: unknown[] = Array.isArray(data?.result) ? data.result : [];

    const events = raw
      .map(normalize)
      .filter((e): e is AnyEvent => e !== null);

    return NextResponse.json({ events, configured: true });
  } catch {
    return NextResponse.json({
      events: [],
      configured: true,
      error: "fetch threw",
    });
  }
}
