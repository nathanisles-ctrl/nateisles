"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: { commits?: { message: string }[]; ref?: string };
};

const HANDLE = "nathanisles-ctrl";

function formatType(t: string) {
  return (
    {
      PushEvent: "PUSH",
      CreateEvent: "CREATE",
      PullRequestEvent: "PR",
      IssuesEvent: "ISSUE",
      WatchEvent: "STAR",
      ForkEvent: "FORK",
      PublicEvent: "PUBLIC",
      ReleaseEvent: "RELEASE",
    } as Record<string, string>
  )[t] || t.replace("Event", "").toUpperCase();
}

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return `${Math.floor(s)}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export default function GithubFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${HANDLE}/events/public?per_page=8`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setEvents(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="border border-bone/10 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-ember font-mono text-[10px] tracking-[0.3em]">
          GITHUB / @{HANDLE}
        </p>
        <span className="flex items-center gap-2 text-bone/50 font-mono text-[10px] tracking-[0.25em]">
          <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-soft" />
          LIVE
        </span>
      </div>

      {loading && (
        <p className="text-bone/40 font-mono text-xs tracking-[0.2em]">
          FETCHING…
        </p>
      )}

      {error && (
        <p className="text-bone/50 font-mono text-xs tracking-[0.2em]">
          Feed unavailable. Check{" "}
          <a
            href={`https://github.com/${HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember hover:text-ember-light"
          >
            github.com/{HANDLE} →
          </a>
        </p>
      )}

      {!loading && !error && events.length === 0 && (
        <p className="text-bone/50 font-mono text-xs tracking-[0.2em]">
          No public activity yet. Building in private.
        </p>
      )}

      {events.length > 0 && (
        <ul className="space-y-3">
          {events.map((e) => {
            const msg =
              e.payload?.commits?.[0]?.message ||
              e.payload?.ref?.replace("refs/heads/", "") ||
              "—";
            return (
              <li
                key={e.id}
                className="grid grid-cols-[60px_1fr_60px] gap-4 items-baseline text-sm"
              >
                <span className="text-ember font-mono text-[10px] tracking-[0.25em]">
                  {formatType(e.type)}
                </span>
                <a
                  href={`https://github.com/${e.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/85 hover:text-bone truncate transition-colors duration-300"
                  title={msg}
                >
                  <span className="text-bone/60">{e.repo.name}</span>
                  <span className="ml-3 text-bone/85">{msg.slice(0, 80)}</span>
                </a>
                <span className="text-bone/40 font-mono text-[10px] tracking-[0.25em] text-right">
                  {timeAgo(e.created_at)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
