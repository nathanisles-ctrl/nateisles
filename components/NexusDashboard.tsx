"use client";

import { useEffect, useRef, useState } from "react";

type NexusEvent = {
  type: string;
  ts: number;
  received_at?: number;
  step?: string;
  detail?: string;
  vertical?: string;
  [k: string]: unknown;
};

const POLL_MS = 10000;

const typeColor: Record<string, string> = {
  pipeline_step: "text-ember",
  content_package: "text-bone",
  bot_interaction: "text-bone",
  error: "text-red-400",
  pipeline_start: "text-ember",
  pipeline_end: "text-ember",
};

const typeLabel = (t: string) => t.replace(/_/g, " ").toUpperCase();

function timeAgo(ts: number) {
  const s = Math.max(0, Math.floor(Date.now() / 1000) - ts);
  if (s < 5) return "now";
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
}

export default function NexusDashboard() {
  const [events, setEvents] = useState<NexusEvent[]>([]);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [error, setError] = useState(false);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;

    const tick = async () => {
      try {
        const r = await fetch("/api/nexus/events", { cache: "no-store" });
        if (!aliveRef.current) return;
        if (!r.ok) {
          setError(true);
          return;
        }
        const data = await r.json();
        if (!aliveRef.current) return;
        setConfigured(data.configured);
        setError(!!data.error);
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        }
      } catch {
        if (aliveRef.current) setError(true);
      }
    };

    tick();
    const interval = setInterval(tick, POLL_MS);

    return () => {
      aliveRef.current = false;
      clearInterval(interval);
    };
  }, []);

  const lastEvent = events[0];
  const lastEventAge = lastEvent
    ? Math.floor(Date.now() / 1000) - lastEvent.ts
    : null;

  // Health: green if heard from in last 10 min, amber if last hour, gray otherwise
  let health: "live" | "idle" | "stale" | "off" = "off";
  if (configured === false) health = "off";
  else if (!lastEvent) health = "stale";
  else if (lastEventAge !== null && lastEventAge < 600) health = "live";
  else if (lastEventAge !== null && lastEventAge < 3600) health = "idle";
  else health = "stale";

  const healthColor = {
    live: "bg-ember",
    idle: "bg-ember/50",
    stale: "bg-bone/30",
    off: "bg-bone/20",
  }[health];

  const healthLabel = {
    live: "ACTIVE",
    idle: "IDLE",
    stale: "QUIET",
    off: "STANDBY",
  }[health];

  return (
    <div className="border border-bone/10 bg-obsidian/60">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-bone/5">
        <div className="flex items-center gap-3">
          <span
            className={`h-2 w-2 rounded-full ${healthColor} ${
              health === "live" ? "pulse-soft" : ""
            }`}
          />
          <span className="text-ember font-mono text-[10px] tracking-[0.3em]">
            NEXUS / {healthLabel}
          </span>
        </div>
        <div className="text-bone/40 font-mono text-[10px] tracking-[0.3em]">
          {error
            ? "FEED ERROR"
            : configured === false
              ? "ENDPOINT NOT CONFIGURED"
              : `${events.length} EVENTS · POLLING ${POLL_MS / 1000}S`}
        </div>
      </div>

      {/* CURRENT STATUS LINE */}
      <div className="px-6 md:px-8 py-5 border-b border-bone/5">
        <div className="text-bone/40 font-mono text-[9px] tracking-[0.3em] mb-2">
          LAST HEARD
        </div>
        <div className="text-bone text-base md:text-lg">
          {lastEvent ? (
            <>
              <span className={typeColor[lastEvent.type] || "text-bone"}>
                {typeLabel(lastEvent.type)}
              </span>
              <span className="text-bone/40"> · </span>
              <span className="text-bone/85">
                {lastEvent.detail || lastEvent.step || "—"}
              </span>
              <span className="text-bone/40 font-mono text-xs ml-3">
                {timeAgo(lastEvent.ts)} ago
              </span>
            </>
          ) : (
            <span className="text-bone/40">
              {configured === false
                ? "Waiting for endpoint configuration."
                : "No events yet — Nexus hasn't reported in."}
            </span>
          )}
        </div>
      </div>

      {/* FEED */}
      <div className="max-h-[480px] overflow-y-auto">
        {events.length === 0 ? (
          <div className="px-6 md:px-8 py-12 text-center text-bone/30 font-mono text-xs tracking-[0.25em]">
            STANDBY
          </div>
        ) : (
          <ul>
            {events.map((e, i) => (
              <li
                key={`${e.ts}-${e.type}-${i}`}
                className="grid grid-cols-[100px_1fr_60px] gap-4 items-baseline px-6 md:px-8 py-3.5 border-b border-bone/5 last:border-b-0 hover:bg-bone/[0.02] transition-colors duration-300"
              >
                <span
                  className={`font-mono text-[9px] tracking-[0.25em] ${
                    typeColor[e.type] || "text-bone/60"
                  }`}
                >
                  {typeLabel(e.type)}
                </span>
                <span className="text-bone/85 text-sm truncate">
                  {e.step && (
                    <span className="text-ember/80 font-mono text-[10px] tracking-[0.2em] mr-2">
                      {e.step}
                    </span>
                  )}
                  {e.vertical && (
                    <span className="text-ember/80 font-mono text-[10px] tracking-[0.2em] mr-2">
                      [{e.vertical}]
                    </span>
                  )}
                  {e.detail || "—"}
                </span>
                <span className="text-bone/40 font-mono text-[10px] tracking-[0.25em] text-right">
                  {timeAgo(e.ts)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
