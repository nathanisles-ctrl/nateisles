"use client";

import { useEffect, useState } from "react";

// Edit this date when you have a confirmed launch.
// Format: ISO 8601 — "YYYY-MM-DDTHH:MM:SSZ"
export const LAUNCH_DATE = "2026-10-01T00:00:00Z";

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

export default function Countdown() {
  const target = new Date(LAUNCH_DATE);
  const [t, setT] = useState(diff(target));

  useEffect(() => {
    const i = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(i);
  }, [target]);

  if (!t) {
    return (
      <div className="text-ember font-display text-4xl md:text-6xl font-black tracking-[0.04em]">
        DOORS OPEN.
      </div>
    );
  }

  const cells = [
    { label: "DAYS", value: t.days },
    { label: "HOURS", value: t.hours },
    { label: "MINUTES", value: t.minutes },
    { label: "SECONDS", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
      {cells.map((c) => (
        <div
          key={c.label}
          className="border border-bone/10 p-4 md:p-6 text-center"
        >
          <div className="font-display font-black text-bone text-3xl md:text-6xl tracking-[0.04em] tabular-nums">
            {String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-ember font-mono text-[9px] md:text-[10px] tracking-[0.3em]">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
